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


// 日付を見て自動的に告知メッセージを表示する
// https://github.com/perl-entrance-org/perl-entrance-org.github.com/issues/93
$(document).ready(function() {
	"use strict";
	const now = new Date();
	$('.date').map((_,dataDom) => $(dataDom)).each((_, $dateDom) => {
    // 入学式開催日の日付の23:59:59と比較するようにする
		const nextEventDate = $dateDom.data('date') && new Date($dateDom.data('date')).setHours(23, 59, 59, 999);

		if (!nextEventDate) {
			return;
		}
		// 次回開催日が今日よりも過去である場合は次回告知をしていないので、その旨を表示する
		if (nextEventDate < now ){
			$dateDom.after('<div class="notice">次回の告知をお待ちください</div>');
		}
	});
})
