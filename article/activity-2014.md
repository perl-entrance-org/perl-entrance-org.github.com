template: default
title: Perl入学式 活動履歴 (2014年度)
---

<style type="text/css">
img.profile {
witdh: 110px;
}
</style>

: my $supporters = {
:     papix => {
:         image       => 'https://avatars3.githubusercontent.com/u/1131623?v=2&s=460',
:         twitter     => 'http://twitter.com/__papix__',
:         github      => 'https://github.com/papix',
:     },
:     xtetsuji => {
:         image       => 'https://avatars1.githubusercontent.com/u/936784?v=2&s=460',
:         twitter     => 'http://twitter.com/xtetsuji',
:         github      => 'https://github.com/xtetsuji',
:     },
: };
: my $smss = ['twitter', 'github'];

<header>
    <div class="row">
        <div class="large-12 columns">
            <h1>Perl Entrance 活動履歴 (2014年度)</h1>
        </div>
    </div>
</header>
<section id="main-content">
    <div class="row">
        <div class="large-10 medium-10 columns push-2">
            <div class="row">
                <section id="homepage-sponsor">
                    <div class="block columns">
                        <h2 id="announce">2014/08/30 - Perl入学式 in YAPC::Asia</h2>

                        <div class="block columns">
                            <ul>
                                <li class="x-small"><a href="#papix" class="th radius"><img src="<: $supporters.papix.image :>"/></a></li>
                                <li class="x-small"><a href="#papix" class="th radius"><img src="<: $supporters.xtetsuji.image :>"/></a></li>
                            </ul>
                        </div>
                    </div>
                    <hr>
                    <div class="block columns">
                        <h2 id="core">コアスタッフ</h2>
: for $supporters.keys().sort() -> $s {
                        <h3>
                            <span class="x-small"><img src="<: $supporters[$s].image :>" /></span> <: $s :>
:   for $smss -> $sms {
                            : if $supporters[$s][$sms] {
                                <a href="<: $supporters[$s][$sms] :>" target="_blank"><span class="icon-social-<: $sms :>"></span></a>
                            : }
:   }
                        </h3>
: }
                        <h2 id="volunteer">ボランティアスタッフ</h2>
                    </div>
                </section>
            </div>
        </div>
        <div class="large-2 medium-2 columns pull-10">
            <ul class="side-nav">
                <li class="divider"></li>
                <li><a href="#announce">Perl入学式 in YAPC::Asia</a></li>
                <li class="divider"></li>
                <li><a href="#core">コアスタッフ</a></li>
                <li><a href="#volunteer">ボランティアスタッフ</a></li>
                <li class="divider"></li>
            </ul>
        </div>
    </div>
</section>
