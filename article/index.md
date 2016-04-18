template: index
---

<section id="homepage-update">
    <div class="row">
        <div class="title column">
            <center>
                <h4>Latest Update</h4>
            </center>
        </div>
        <div class="listed column">
            <dl class="article">
                <dt>2016.04.11</dt>
                <dd><a href="https://perl-entrance-tokyo.doorkeeper.jp/events/42912">Perl入学式 in 東京 第1回 環境構築編</a>のDoorKeeperを公開しました!</dd>
                <dt>2016.02.04</dt>
                <dd><a href="https://perl-entrance-osaka.doorkeeper.jp/events/38861">Perl入学式 in 大阪 第6回 モジュール/テスト編</a>のDoorKeeperを公開しました!</dd>
                <dt>2016.01.08</dt>
                <dd><a href="http://www.zusaar.com/event/14267004">Perl入学式 in 東京 第6回 モジュール/テスト編</a>のZusaarを公開しました!</dd>
            </dl>
        </div>
    </div>
</section>

<section id="homepage-event">
    <div class="row">
        <h2>Perl入学式とは? </h2>
        <div class="large-12 columns">
        </div>
    </div>
    <div class="row">
        <div class="large-12 columns">
            <center>
                <p>｢プログラミングに興味があるけど, ちょっと難しそう...｣と思っている貴方!</p>
                <p>｢他の言語使いだけど, ちょっとPerlも使ってみよっかな?｣と思っている貴方!</p>
                <p>｢仕事や研究でPerlを使い始めたけど, ちょっと自信ないな...｣と思っている貴方!</p>

                <p>
                ｢プログラミング未経験者｣から｢Perl初心者｣を対象としたワークショップ, ｢Perl入学式｣で一緒にPerlで学びましょう!<br>
                プログラミングの｢プ｣の字も知らないあなたでも大丈夫. 経験豊富な講師とサポーターが, <strong>あなたの学びを全力でサポートします.</strong>
                </p>

                <p>さあ, 私達と一緒にプログラミングの楽しさを体感しましょう!</p>

                <center>
                    <a href="<: '/about.html' | uri_for :>" class="button radius">Perl入学式について, もっと詳しく知りたい!</a>
                </center>

            </center>
        </div>
    </div>
    <div class="row headspace-20">
    </div>
</section>

<section id="homepage-event">
    <div class="row">
        <h2>2016年度のPerl入学式開講!</h2>
        <div class="large-12 columns">
        </div>
    </div>
    <div class="row">
        <div class="medium-4 large-4 columns ">
            <h4><i class="icon-leaf"></i> <a href="https://perl-entrance-tokyo.doorkeeper.jp/">Perl入学式 in東京</a> 第1回</h4>
            <p class="date">
                2016年5月14日（土）
                <!-- <span>次回の告知をお待ちください.</span> -->
            </p>
            <table class="detail">
                <tr>
                    <th>時間</th>
                    <td>10:00 - 18:00<br>（環境によって参加時間が異なります）</td>
                </tr>
                    <tr>
                    <th>定員</th>
                    <td><span id="tokyo-capacity-information"></span></td>
                </tr>
                <tr>
                    <th>会場</th>
                    <td><a href="http://www.gaiax.co.jp/corporate/access/" target="_blank">株式会社ガイアックス 6F セミナールーム </a></td>
                </tr>
                <tr>
                    <th>住所</th>
                    <td><a href="http://www.google.co.jp/maps?q=%E6%9D%B1%E4%BA%AC%E9%83%BD%E5%93%81%E5%B7%9D%E5%8C%BA%E8%A5%BF%E4%BA%94%E5%8F%8D%E7%94%B01-21-8+KSS%E4%BA%94%E5%8F%8D%E7%94%B0%E3%83%93%E3%83%AB+6F" target="_blank">東京都品川区西五反田1-21-8 KSS五反田ビル 6F </a></td>
                </tr>
            </table>
            <p><a href="https://perl-entrance-tokyo.doorkeeper.jp/events/42912" class="button radius expand" target="_blank">詳細はこちら!</a></p>
        </div>
        <div class="medium-4 large-4 columns ">
            <h4><i class="icon-leaf"></i> <a href="https://perl-entrance-osaka.doorkeeper.jp/">Perl入学式 in大阪</a> 第1回</h4>
            <p class="date">
                近日募集開始予定!
            </p>
        </div>
        <div class="medium-4 large-4 columns ">
            <h4><i class="icon-leaf"></i> <a href="https://perl-entrance-okinawa.doorkeeper.jp/">Perl入学式 in沖縄</a> 第1回</h4>
            <p class="date">
                近日募集開始予定!
            </p>
        </div>
    </div>

    <div class="row headspace-20">
    </div>
</section>

<script src="http://code.jquery.com/jquery.js"></script>
<script type="text/javascript">
  var PerlEntrance = {
    "zusaar_event_id": {
      //"tokyo":   "14267004",
      //"tokyo-hokou": "15297004", // 本講と補講を併記する場合にはこれで
      "fukuoka": "11197005",
      "gotanda": "10047005"
    },
    "atndbeta_event_id": {
      "perlbeginners": "59344"
    },
    "connpass_event_id": {
      "tenjinperl": "8717"
    },
    "doorkeeper_event_id": {
      "tokyo": "42912",
      "naniwaperl": "20164",
      "osaka": "38861"
    },
    "zusaar_api_endpoint_url": "http://www.zusaar.com/api/event/",
    "atndbeta_api_endpoint_url": "http://api.atnd.org/events/",
    "connpass_api_endpoint_url": "http://connpass.com/api/v1/event/",
    "doorkeeper_api_endpoint_url": "http://api.doorkeeper.jp/events/"
  };

  // Zusaar
  $(document).ready(function(){
    var endpoint_url = PerlEntrance.zusaar_api_endpoint_url;
    $.each(["fukuoka", "gotanda", "tokyo-hokou"], function(index, region){
      var $info_container = $("#"+region+"-capacity-information"),
          get_url = endpoint_url+"?event_id="+PerlEntrance.zusaar_event_id[region]+"&format=jsonp";
      $.ajax({
        url: get_url,
        type: "GET",
        dataType: "jsonp",
        success: function(json) {
          var event = json.event[0],
              waiting  = event["waiting"],  // 補欠者
              accepted = event["accepted"], // 参加者
              limit    = event["limit"];    // 定員
          if ( typeof waiting !== "undefined" && typeof accepted !== "undefined" && typeof limit !== "undefined" ) {
            $info_container.html(limit+"人 (現在"+accepted+"名参加, "+waiting+"名補欠)");
          } else {
            $info_container.html("(データ取得ができませんでした)");
          }
        }
      });
    });
  });

  // ATND beta
  $(document).ready(function(){
    var endpoint_url = PerlEntrance.atndbeta_api_endpoint_url;
    $.each(["perlbeginners"], function(index, region){
      var $info_container = $("#"+region+"-capacity-information"),
          get_url = endpoint_url+"?event_id="+PerlEntrance.atndbeta_event_id[region]+"&format=jsonp";
      $.ajax({
        url: get_url,
        type: "GET",
        dataType: "jsonp",
        success: function(json) {
          var event = json.events[0].event,
              waiting  = event["waiting"],  // 補欠者
              accepted = event["accepted"], // 参加者
              limit    = event["limit"];    // 定員
          if ( typeof waiting !== "undefined" && typeof accepted !== "undefined" && typeof limit !== "undefined" ) {
            $info_container.html(limit+"人 (現在"+accepted+"名参加, "+waiting+"名補欠)");
          } else {
            $info_container.html("(データ取得ができませんでした)");
          }
        }
      });
    });
  });

  // Connpass
  $(document).ready(function(){
    var endpoint_url = PerlEntrance.connpass_api_endpoint_url;
    $.each(["tenjinperl"], function(index, region){
      var $info_container = $("#"+region+"-capacity-information"),
          get_url = endpoint_url+"?event_id="+PerlEntrance.connpass_event_id[region]+"&format=json";
      $.ajax({
        url: get_url,
        type: "GET",
        dataType: "jsonp",
        success: function(json) {
          var event = json.events[0],
              waiting  = event["waiting"],  // 補欠者
              accepted = event["accepted"], // 参加者
              limit    = event["limit"];    // 定員
          if ( typeof waiting !== "undefined" && typeof accepted !== "undefined" && typeof limit !== "undefined" ) {
            $info_container.html(limit+"人 (現在"+accepted+"名参加, "+waiting+"名補欠)");
          } else {
            $info_container.html("(データ取得ができませんでした)");
          }
        }
      });
    });
  });

  // Doorkeeper
  $(document).ready(function(){
    var endpoint_url = PerlEntrance.doorkeeper_api_endpoint_url;
    $.each(["tokyo", "osaka", "naniwaperl"], function(index, region){
      var $info_container = $("#"+region+"-capacity-information"),
          get_url = endpoint_url+PerlEntrance.doorkeeper_event_id[region];
      $.ajax({
        url: get_url,
        type: "GET",
        dataType: "jsonp",
        success: function(json) {
          var event = json.event,
              waiting  = event["waitlisted"],   // 補欠者
              accepted = event["participants"], // 参加者
              limit    = event["ticket_limit"]; // 定員
          if ( typeof waiting !== "undefined" && typeof accepted !== "undefined" && typeof limit !== "undefined" ) {
            $info_container.html(limit+"人 (現在"+accepted+"名参加, "+waiting+"名補欠)");
          } else {
            $info_container.html("(データ取得ができませんでした)");
          }
        }
      });
    });
  });

</script>
