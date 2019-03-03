$(function () {
    // 搜索框交互
    $('#header input').on('focus',function () {
        $('#header input').attr('placeholder', '');
    }).on('blur',function () {
        $('#header input').attr('placeholder', '请输入你想要搜索的商品');
    })

    // 左侧导航栏ajax请求
    $.ajax({
        type: 'get',
        url: 'http://localhost:3000/category/queryTopCategory',
        dataType: 'json',
        success: function (obj) {
            var html = template('leftnav', obj);
            $('.mui-table-view').html(html);
            // 左侧导航栏点击事件
            // var num = 1;
            // rightnav(num);
            // $('#main .left li').on('click',function () {
            //     $(this).addClass('active').siblings().removeClass('active');
            //     num = $(this).children('a').attr('data-index');
            //     rightnav(num);
            // });
        }
    });

    // 左侧滚动导航条初始化
    var swiper = new Swiper('.left>.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    var oldId = 0;
    rightnav(1);
    // 事件委托, 通过父元素捕捉真正触发事件的子元素
    $('#main .left ul').on('tap','li',function () { 
        $(this).addClass('active').siblings().removeClass('active');

        if(oldId == id) return false;
        // 原生js获取自定义属属性
        // var id = this.dataset['index'];
        // zeport获取自定义属性 <出了取值,还做了类型转换>
        var id = $(this).data('index');
        rightnav(id);
        oldId = id;
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

    function rightnav(id) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/category/querySecondCategory',
            data: { id: id },
            dataType: 'json',
            success: function (obj) {
                var html = template('rightnav', obj);
                $('.right .mui-row').html(html);
            }
        })
    }
});