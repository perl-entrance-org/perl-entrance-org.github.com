$(document).ready(function() {
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
	"connpass_event_id": {},
	"doorkeeper_event_id": {},
	"atndbeta_api_endpoint_url": "http://api.atnd.org/events/",
	"connpass_api_endpoint_url": "https://connpass.com/api/v1/event/",
	"doorkeeper_api_endpoint_url": "http://api.doorkeeper.jp/events/"
};

function keys(hash) {
	var keys = [];
	for (var key in hash) keys.push(key);
	return keys;
}

// Connpass
$(document).ready(function() {
	var endpoint_url = PerlEntrance.connpass_api_endpoint_url;
	$(".row .event-page a").each(function(i, v) {
		var matches = $(v).attr("href").match(/perl-entrance-([a-z]+?)\.connpass\.com\/event\/([0-9]+)\/?$/)
		if (matches)
			PerlEntrance["connpass_event_id"][matches[1]] = matches[2]
	})
	$.each(keys(PerlEntrance.connpass_event_id), function(index, region) {
		var $info_container = $("#" + region + "-capacity-information"),
			get_url = endpoint_url + "?event_id=" + PerlEntrance.connpass_event_id[region] + "&format=json";
		if (!$info_container[0]) return;
		$.ajax({
			url: get_url,
			type: "GET",
			dataType: "jsonp",
			success: function(json) {
				var event = json.events[0],
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

// ATND beta
$(document).ready(function() {
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
