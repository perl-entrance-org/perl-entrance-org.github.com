(function($, window, document, undefined) {
    'use strict';
    var PerlEntrance = {
        "zusaar_event_id": {
            "osaka": "5197004",
            "tokyo": "8387006",
            "fukuoka": "5157005",
            "gotanda": "5417006"
        },
        "atndbeta_event_id": {
            "perlbeginners": "49820"
        },
        "connpass_event_id": {
            "tenjinperl": "6466"
        },
        "zusaar_api_endpoint_url": "http://www.zusaar.com/api/event/",
        "atndbeta_api_endpoint_url": "http://api.atnd.org/events/",
        "connpass_api_endpoint_url": "http://connpass.com/api/v1/event/"
    },
        defined = function(args) {
            return args !== undefined;
        },
        statuses = function($el, limit, waiting, accepted) {
            if (defined(limit) && defined(waiting) && defined(accepted)) {
                $el.html(limit + "人 （現在" + accepted + "名参加、" + waiting + "名補欠）");
            } else {
                $el.html("（データが取得できませんでした）");
            }
        },
        zusaar = function() {
            var endpoint_url = PerlEntrance.zusaar_api_endpoint_url;
            $.each(["osaka", "tokyo", "fukuoka", "gotanda"], function(index, region) {
                var $info_container = $("#" + region + "-capacity-information"),
                    get_url = endpoint_url + "?event_id=" + PerlEntrance.zusaar_event_id[region] + "&format=jsonp";
                $.ajax({
                    url: get_url,
                    type: "GET",
                    dataType: "jsonp",
                    success: function(json) {
                        var event = json.event[0],
                            waiting = event["waiting"], // 補欠者
                            accepted = event["accepted"], // 参加者
                            limit = event["limit"]; // 定員
                        statuses($info_container, limit, waiting, accepted);
                    }
                });
            });
        },
        atndbeta = function() {
            var endpoint_url = PerlEntrance.atndbeta_api_endpoint_url;
            $.each(["perlbeginners"], function(index, region) {
                var $info_container = $("#" + region + "-capacity-information"),
                    get_url = endpoint_url + "?event_id=" + PerlEntrance.atndbeta_event_id[region] + "&format=jsonp";
                $.ajax({
                    url: get_url,
                    type: "GET",
                    dataType: "jsonp",
                    success: function(json) {
                        var event = json.events[0],
                            waiting = event["waiting"], // 補欠者
                            accepted = event["accepted"], // 参加者
                            limit = event["limit"]; // 定員
                        statuses($info_container, limit, waiting, accepted);
                    }
                });
            });
        },
        connpass = function() {
            var endpoint_url = PerlEntrance.connpass_api_endpoint_url;
            $.each(["tenjinperl"], function(index, region) {
                var $info_container = $("#" + region + "-capacity-information"),
                    get_url = endpoint_url + "?event_id=" + PerlEntrance.connpass_event_id[region] + "&format=json";
                $.ajax({
                    url: get_url,
                    type: "GET",
                    dataType: "jsonp",
                    success: function(json) {
                        var event = json.events[0],
                            waiting = event["waiting"], // 補欠者
                            accepted = event["accepted"], // 参加者
                            limit = event["limit"]; // 定員
                        statuses($info_container, limit, waiting, accepted);
                    }
                });
            });
        },
        init = function() {
            $(document).on('ready', function() {
                zusaar();
                atndbeta();
                connpass();
            });
        };
    init();
}(jQuery, window, document));
