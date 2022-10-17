$(document).ready(function() {
	"use strict";
	// Load foundation
	$(document).foundation();

	// Smooth scroll
	$('a[href^="#top"]').click(function() {
		var speed = 400;
		var href= $(this).attr("href");
		var target = $(href == "#top" || href == "" ? 'html' : href);
		var position = target.offset().top;
		$('body,html').animate({scrollTop:position}, speed, 'swing');
		return false;
	});

	// PAGE TOP
	var topBtn = $('#page-top');
	$('#pagetop').hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#pagetop').fadeIn();
		} else {
			$('#pagetop').fadeOut();
		}
	});
});

// Event information
var PerlEntrance = {
	"atndbeta_event_id": {},
	//"connpass_event_id": {}, // ページから自動生成されるので不要
	"doorkeeper_event_id": {},
	"atndbeta_api_endpoint_url": "http://api.atnd.org/events/",
	"connpass_api_endpoint_url": "https://connpass.com/api/v1/event/",
	"doorkeeper_api_endpoint_url": "http://api.doorkeeper.jp/events/"
};

function keys(hash) {
	"use strict";
	var keys = [];
	for (var key in hash) keys.push(key);
	return keys;
}

// Promise の then 用、次までに ms ミリ秒の待ちを入れる
function wait(ms) {
	"use strict";
	return function() {
		var d = $.Deferred();
		setTimeout(function() { d.resolve() }, ms);
		return d.promise();
	};
}

// 日付を見て自動的に告知メッセージを表示する
// https://github.com/perl-entrance-org/perl-entrance-org.github.com/issues/93
$(document).ready(function() {
	"use strict";
	const now = new Date().toLocaleString({ timeZone: 'Asia/Tokyo' });
	$('.date').map((_,dataDom) => $(dataDom)).each((_, $dateDom) => {
		const nextEventDate = $dateDom.data('date') !== undefined ? 
			new Date($dateDom.data('date')).toLocaleDateString({ timeZone: 'Asia/Tokyo'})
			: undefined;

		if (!nextEventDate) {
			return;
		}
		// 次回開催日が今日よりも過去である場合は次回告知をしていないので、その旨を表示する
		if (nextEventDate < now){
			$dateDom.after('<div class="notice">次回の告知をお待ちください</div>');
		}
	});
})

// Connpass
$(document).ready(function() {
	"use strict";
	var endpoint_url = PerlEntrance.connpass_api_endpoint_url;
	var event_id_of = {}; // { region1: id1, region2: id2, ... }
	var $event_a_elements = $(".row .event-page a");

	// 古い perl-entrance-REGION グループの URL 処理
	$event_a_elements.each(function(i, a_element) {
		var matches = $(a_element).attr("href").match(/perl-entrance-([a-z]+?)\.connpass\.com\/event\/([0-9]+)\/?$/);
		if (matches) {
			event_id_of[matches[1]] = matches[2];
		}
	});

	// 新しい perl-entrance グループの URL 処理
	$event_a_elements.filter(
		"a[href^='https://perl-entrance.connpass.com/event/']"
	).each(function(){
		var $this = $(this);
		var region = $this.data("region");
		var matches = $this.attr("href").match(/https:\/\/perl-entrance\.connpass\.com\/event\/(\d+)/);
		var event_id = matches ? matches[1] : null;
		if ( event_id ) event_id_of[region] = event_id;
	});

	// 下記イベントオブジェクト用のメソッド
	var get_info_container = function() {
		return $("#" + this.region + "-capacity-information");
	};
	var ajax = function() {
		return $.ajax(this.url, {dataType: "jsonp"});
	};
	var render = function(json) {
		var r = json.events[0];
		var $container = this.get_info_container();
		// waiting: 補欠者, accepted: 参加者, limit: 定員
		if ( r && [r.waiting, r.accepted, r.limit].every(function(x){return typeof x !== "undefined"}) ) {
			var description = (r.limit ? r.limit + "人" : "定員無し") + " (現在" + r.accepted + "名参加, " + r.waiting + "名補欠)";
			$container.html(description);
		} else {
			$container.html("<span style='color: lightgray'>(データ取得ができませんでした)</span>");
		}
	};

	// いったんイベント特定に必要な最小限の情報を持ったイベントオブジェクトをイベント分作成する
	var events = keys(event_id_of).map(function(region, index) {
		var event_id = event_id_of[region];
		var url = endpoint_url + "?event_id=" + event_id + "&format=json";
		return {
			// properties
			region: region,
			event_id: event_id,
			url: url,
			// methods
			get_info_container: get_info_container,
			ajax: ajax,
			render: render
		};
	});

	// イベントごとにイベントオブジェクトを Ajax 処理する
	// connpass 側の負荷を考慮して同時にリクエストせず、
	// 1つのリクエストが終わった段階で次のリクエストを行う
	// this の参照が異なるため、.then の引数に event.ajax などと書くことはできず、無名関数で囲う必要がある
	events.reduce(function(promise, event) {
		return(promise
			.then(function(){return event.ajax()})
			.then(function(json){return event.render(json)})
			.then(wait(200)) // リクエストごとの待ち時間のミリ秒
		);
	}, $.Deferred().resolve().promise());
});

// ATND beta
$(document).ready(function() {
	"use strict";
	var endpoint_url = PerlEntrance.atndbeta_api_endpoint_url;
	$.each(keys(PerlEntrance.atndbeta_event_id), function(index, region) {
		var $info_container = $("#" + region + "-capacity-information"),
			get_url = endpoint_url + "?event_id=" + PerlEntrance.atndbeta_event_id[region] + "&format=jsonp";
		if (!$info_container[0]) return;
		$.ajax({
			url: get_url,
			type: "GET",
			dataType: "jsonp",
			success: function(json) {
				var event = json.events[0].event,
					waiting = event["waiting"], // 補欠者
					accepted = event["accepted"], // 参加者
					limit = event["limit"]; // 定員
				if (typeof waiting !== "undefined" && typeof accepted !== "undefined" && typeof limit !== "undefined") {
					$info_container.html(limit + "人 (現在" + accepted + "名参加, " + waiting + "名補欠)");
				} else {
					$info_container.html("(データ取得ができませんでした)");
				}
			}
		});
	});
});

// Doorkeeper
$(document).ready(function() {
	"use strict";
	var endpoint_url = PerlEntrance.doorkeeper_api_endpoint_url;
	$.each(keys(PerlEntrance.doorkeeper_event_id), function(index, region) {
		var $info_container = $("#" + region + "-capacity-information"),
			get_url = endpoint_url + PerlEntrance.doorkeeper_event_id[region];
		if (!$info_container[0]) return;
		$.ajax({
			url: get_url,
			type: "GET",
			dataType: "jsonp",
			success: function(json) {
				var event = json.event,
					waiting = event["waitlisted"], // 補欠者
					accepted = event["participants"], // 参加者
					limit = event["ticket_limit"]; // 定員
				if (typeof waiting !== "undefined" && typeof accepted !== "undefined" && typeof limit !== "undefined") {
					$info_container.html(limit + "人 (現在" + accepted + "名参加, " + waiting + "名補欠)");
				} else {
					$info_container.html("(データ取得ができませんでした)");
				}
			}
		});
	});
});
