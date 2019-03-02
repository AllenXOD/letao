$(function () {
    document.onreadystatechange = function () {
        // 判断资源是否加载完毕
        if (document.readyState == "complete") {
            $('#loading').hide();
            $('#main').show();
            // 初始化swiper 的轮播图
            var swiper = new Swiper('.slide .swiper-container', {
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 1500,
                    disableOnInteraction: false
                }
            });

            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });

            var swiper = new Swiper('#main>.swiper-container', {
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                scrollbar: {
                    el: '.swiper-scrollbar',
                },
                mousewheel: true,
            });
        }
    }
});