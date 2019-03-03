$(function () {
    //首先获取所有的Img对象
    var img = $("img");
    var imgnum = $('img').size();
    //定义一个变量，赋值给b标签用
    var num = 0;
    //遍历获取到的所有img
    img.each(function (i) {
        //new一个新对象
        var oImg = new Image();
        //使用onload方法，在加载完成后执行
        oImg.onload = function () {
            //首先清除掉缓存
            oImg.onload = null;
            //每次加载的过程中num++，即执行次数
            num++;
            //改变b标签的内容，用num除以img的个数，再乘以100，再取整，这就是加载的百分数
            $("#loading b").html(parseInt(num / $("img").size() * 100) + "%");
            if (num == imgnum) {
                //当num的值大于等于个数时隐藏
                $("#loading").hide();
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
        //预加载，先指定一个img.src，当onload成功以后可以将数据指定到某一个元素或者图片上，或者返回一个结果
        oImg.src = img[i].src;
    })

    // document.onreadystatechange = function () {
    //     // 判断资源是否加载完毕
    //     if (document.readyState == "complete") {
    //         $('#loading').hide();
    //     }
    // }

});