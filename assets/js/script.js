// headerスクロールするとロゴの色変更
$(function () {
    $(window).on("scroll", function () {
        const sliderHeight = $(".header").height();
        if (sliderHeight - 30 < $(this).scrollTop()) {
        $(".header").addClass("header_bg");
        } else {
        $(".header").removeClass("header_bg");
        }
    });
});

// videoのlogoとimgが被らないように制御
const video = document.getElementById("video");
const coverImg = document.querySelector(".fv-background-video img");

// 表示を制御する秒数
const HIDE_AT_START = 11.5; // 最初6秒
const HIDE_AT_END = 15;  // 最後15秒

function updateCoverVisibility() {
    if (!video.duration) return;

    const t = video.currentTime;
    const endStart = video.duration - HIDE_AT_END;

    if (t < HIDE_AT_START || t > endStart) {
        coverImg.style.opacity = 0;
        coverImg.style.pointerEvents = "none";
    } else {
        coverImg.style.opacity = 1;
    }
}
// SP videoのクリックリベントを消去
document.addEventListener("DOMContentLoaded", () => {
    if (video) {
        video.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
        });

        video.addEventListener("touchstart", (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video");
    if (!video) return;

    ["click", "touchstart", "touchend"].forEach(evt => {
        video.addEventListener(evt, (e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
        });
    });
});

// 時間更新の度にチェック
video.addEventListener("timeupdate", updateCoverVisibility);

// 再生開始直後のduration取得遅延対策
video.addEventListener("loadedmetadata", updateCoverVisibility);
video.addEventListener("play", updateCoverVisibility);

// autoplay がうまく発火しないケース対策
setInterval(updateCoverVisibility, 500);

// 初回チェック
if (video.readyState >= 1) {
    updateCoverVisibility();
}


// slider
jQuery(($) => {
function initSlick($elOrSelector, options = {}) {
    const defaults = {
        infinite: true,
        autoplay: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        draggable: false,
        touchMove: false,
        dots: false,
    };

    const $els = ($elOrSelector instanceof jQuery) ? $elOrSelector : $($elOrSelector);

    $els.each(function() {
        const $el = $(this);
        if ($el.hasClass('slick-initialized')) return;
        $el.slick($.extend(true, {}, defaults, options));
        });
    }

  // results
initSlick('.results_slider', {
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1500,
    swipe: false,
    arrows: true,
    nextArrow: '<img loading="lazy" src="assets/image/result_arrow_right.webp" alt="right" class="next_icon">',
    prevArrow: '<img loading="lazy" src="assets/image/result_arrow_left.webp" alt="left" class="prev_icon">'
});

// news SPのみ
function toggleNewsSlider() {
    const $slider = $('.news_slider');
    const isSP = window.matchMedia('(max-width: 768px)').matches;

    if (isSP) {
        if (!$slider.hasClass('slick-initialized')) {
            initSlick($slider, {
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 1500,
            swipe: false,
            arrows: true,
            nextArrow: '<img loading="lazy" src="assets/image/result_arrow_right.webp" alt="right" class="next_icon">',
            prevArrow: '<img loading="lazy" src="assets/image/result_arrow_left.webp" alt="left" class="prev_icon">'
            });
        }
        } else {
        if ($slider.hasClass('slick-initialized')) {
            $slider.slick('unslick');
        }
        }
    }

    toggleNewsSlider();
    let newsResizeTimer = null;
    $(window).on('resize', function() {
        clearTimeout(newsResizeTimer);
        newsResizeTimer = setTimeout(toggleNewsSlider, 200);
    });

    // logo
    initSlick('.logo_slider', {
        slidesToShow: 4,
        slidesToScroll: 1,
        cssEase: 'linear',
        speed: 3500,
        autoplaySpeed: 0,
        arrows: false,
        responsive: [
        {
            breakpoint: 768,
            settings: {
            slidesToShow: 2
            }
        }
        ]
    });

// interview
    $('.interview_slider').each(function () {
    const $slider = $(this);

    // slick 初期化（autoplay は切る）
    initSlick($slider, {
        slidesToShow: 4,
        slidesToScroll: 1,
        speed: 900,
        cssEase: 'ease-in-out',
        arrows: true,
        autoplay: false,
        autoplaySpeed: 0,
        centerMode: false,
        dots: true,
        centerPadding: '0px',
        nextArrow: '<img loading="lazy" src="https://dym.engineer/creative-test_2/assets/image/result_arrow_right.webp" alt="right" class="next_icon">',
        prevArrow: '<img loading="lazy" src="https://dym.engineer/creative-test_2/assets/image/result_arrow_left.webp" alt="left sp_only" class="prev_icon">',
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '200px',
            }
        },
        {
            breakpoint: 640,
            settings: {
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '100px',
            }
        }
        ]
    });

    // 自前オートプレイ制御
    let autoTimer = null;
    const NORMAL_DELAY = 2500; // 通常の停止時間
    const LAST_DELAY = 4000;   // 最後のカードだけ長め

    function clearAuto() {
        if (autoTimer) {
        clearTimeout(autoTimer);
        autoTimer = null;
        }
    }

    function scheduleNext(delay) {
        clearAuto();
        autoTimer = setTimeout(() => {
        if (!$slider.hasClass('slick-initialized')) return;
        $slider.slick('slickNext');
        }, delay);
    }

    // 画面内4枚に pos-1〜4 を振る
    function updateGradientClasses(slick) {
        $(slick.$slides).removeClass('pos-1 pos-2 pos-3 pos-4');
        const $actives = $slider.find('.slick-active').not('.slick-cloned');
        $actives.each(function (i) {
        $(this).addClass('pos-' + (i + 1)); // 左から pos-1,pos-2...
        });
    }

    // init 時
    $slider.on('init', function (event, slick) {
        updateGradientClasses(slick);
        scheduleNext(NORMAL_DELAY);
    });

    // afterChange：停止時間＋クラス更新
    $slider.on('afterChange', function (event, slick, currentSlide) {
        const $current = $(slick.$slides[currentSlide]);
        const realIndex = $current.data('slick-index');
        const totalReal = slick.$slides.not('.slick-cloned').length;
        const isLast = (realIndex === totalReal - 1);

        scheduleNext(isLast ? LAST_DELAY : NORMAL_DELAY);
        updateGradientClasses(slick);

        $slider.find('.slick-slide').blur();
    });

    // クローンはフォーカスだけ禁止（クリックはOK）
    $slider.on('init reInit afterChange', function () {
        $slider.find('.slick-cloned')
        .attr('tabindex', '-1')
        .attr('aria-hidden', 'true')
        .attr('inert', '');
    });

    // クリックで移動（クローン含めてOK）
    $slider.on('click', '.slick-slide', function () {
        const index = $(this).data('slick-index');
        if (index == null) return;

        clearAuto();
        $slider.slick('slickGoTo', index, false);
        setTimeout(() => {
        scheduleNext(NORMAL_DELAY);
        }, 50);
    });

    // IntersectionObserver：画面内のみ自動再生
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            scheduleNext(NORMAL_DELAY);
        } else {
            clearAuto();
        }
        });
    }, { threshold: 0.1 });

    observer.observe($slider[0]);
    });

    // resize 安定化
    let resizeTimer = null;
    $(window).on('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        $('.results_slider, .logo_slider, .interview_slider').each(function () {
        const $s = $(this);
        if ($s.hasClass('slick-initialized')) {
            $s.slick('setPosition');
        }
        });
    }, 150);
    });
});

// スクロールでアニメーション発火
const staggerBlocks = document.querySelectorAll('.stagger');

const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const block = entry.target;
            const items = block.querySelectorAll('.sa-item');

            items.forEach((item, index) => {
                const delay = index * 0.15;
                item.style.animation = `popUpBounce .9s cubic-bezier(.34,1.56,.64,1) ${delay}s forwards`;
            });

            block.classList.add('is-animated');
        }
    });
}, { threshold: 0.2 });

staggerBlocks.forEach(block => io.observe(block));