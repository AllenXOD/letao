$(function () {
    // 搜索框交互
    $('#header input').focus(function () {
        $('#header input').attr('placeholder', '');
    }).blur(function () {
        $('#header input').attr('placeholder', '请输入你想要搜索的商品');
    })

    // 左侧滚动导航条初始化
    var swiper = new Swiper('.left>.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });
    // 右侧滚动导航条初始化
    var swiper = new Swiper('.right>.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    // 左侧导航栏点击事件
    $('.left li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    })
});