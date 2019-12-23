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

// Connpass
$(document).ready(function() {
	"use strict";
	var endpoint_url = PerlEntrance.connpass_api_endpoint_url;
	var event_id_of = {}; // { region1: id1, region2: id2, ... }
	$(".row .event-page a").each(function(i, a_element) {
		var matches = $(a_element).attr("href").match(/perl-entrance-([a-z]+?)\.connpass\.com\/event\/([0-9]+)\/?$/);
		if (matches) {
			event_id_of[matches[1]] = matches[2];
		}
	});

	// 下記イベントオブジェクト用のメソッド
	var get_info_container = function() {
		return $("#" + this.region + "-capacity-information");
	};

	// いったんイベント特定に必要な最小限の情報を持ったイベントオブジェクトをイベント分作成する
	var events = $.map(keys(event_id_of), function(region, index) {
		var event_id = event_id_of[region];
		var url = endpoint_url + "?event_id=" + event_id + "&format=json";
		return {
			region: region,
			event_id: event_id,
			url: url,
			get_info_container: get_info_container
		};
	});

	// イベントごとにイベントオブジェクトを Ajax 処理する
	$.each(events, function(index, event) {
		$.ajax({
			url: event.url,
			type: "GET",
			dataType: "jsonp"
		}).then(function(json) {
			var api_res  = json.events[0];
			var waiting  = api_res["waiting"]; // 補欠者
			var accepted = api_res["accepted"]; // 参加者
			var limit    = api_res["limit"]; // 定員
			var message;
			if ( [waiting, accepted, limit].every(function(x){return typeof x !== "undefined"}) ) {
				message = limit + "人 (現在" + accepted + "名参加, " + waiting + "名補欠)";
			} else {
				message = "(データ取得ができませんでした)";
			}
			event.get_info_container().html(message);
		});
	});
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
