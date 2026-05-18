// cloud
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    const speedCenter = 0.8;
    const speedCenter2 = 0.7;
    const speedLeft = 0.41;
    const speedRight = 0.41;
    const speedCenter3 = 0.4;

    document.querySelector('.cloud-center').style.transform =
        `translate(-50%, ${-scrollY * speedCenter}px)`;

    document.querySelector('.cloud-center2').style.transform =
        `translate(-50%, ${-scrollY * speedCenter2}px)`;

    document.querySelector('.cloud-left').style.transform =
        `translateY(${-scrollY * speedLeft}px)`;

    document.querySelector('.cloud-right').style.transform =
        `translateY(${-scrollY * speedRight}px)`;

    document.querySelector('.cloud-center3').style.transform =
    `translate(-50%, ${-scrollY * speedCenter3}px)`;
});


// スクロールするとロゴの色変更
$(function () {
    $(window).on("scroll", function () {
        const sliderHeight = $("header").height();
        if (sliderHeight - 30 < $(this).scrollTop()) {
        $(".header_bg").addClass("headerColorScroll");
        } else {
        $(".header_bg").removeClass("headerColorScroll");
        }
    });
});