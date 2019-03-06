$(function () {

    queryProductDetail();
    addCart();

    function initSlide() {
        // 初始化轮播
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval: 1000 // 自动轮播时间
        });
    }

    // 查询商品详情
    function queryProductDetail() {
        var id = zeQueryString('id');
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetail',
            data: { id: id },
            dataType: 'json',
            success: function (obj) {
                // console.log(obj);
                var arr = obj.size.split('-'); // 40,50
                var size = [];
                for (var i = +arr[0]; i <= arr[1] - 0; i++) {
                    size.push(i);
                }
                // console.log(size); // 40 41 42 ... 50
                obj.size = size;
                var html = template('detailTpl', obj);
                $('#detail').html(html);
                initSlide();
                // 初始化区域滚动
                mui('.mui-scroll-wrapper').scroll({
                    deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
                });
                // 初始化数量框
                mui('.mui-numbox').numbox();
                $('.product-size').on('tap', 'button', function () {
                    $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
                })
            }
        })
    }
    function zeQueryString(key) {
        // 正则匹配 key = value
        var reg = new RegExp("[^\?&]?" + encodeURI(key) + "=[^&]+");
        // 将正则匹配的值存入数组
        var arr = location.search.match(reg);
        if (arr != null) {
            // 截取 = 号 取出后面的值
            return decodeURI(arr[0].substring(arr[0].search("=") + 1));
        }
        return "";
    }

    // 加入购物车功能
    function addCart() {
        $('.add-cart').on('tap', function () {
            var id = zeQueryString('id');
            var size = $('.mui-btn.mui-btn-warning').data('size');
            // 获取数量
            var num = mui('.mui-numbox').numbox().getValue();
            $.ajax({
                type: 'post',
                url: '/cart/addCart',
                data: {
                    productId: id,
                    size: size,
                    num: num,
                },
                dataType: 'json',
                success: function (obj) {
                    if (obj.error) {
                        location = 'login.html?returnurl=' + location.href;
                    } else { 
                        // 参数1,2 可以传文字和代码
                        mui.confirm('<strong>加入成功,是否进入购物车查看!</strong>', '温馨提示', ['yes', 'no'], function (e) {
                            if(e.index == 1){
                                mui.toast('哼,你继续!',{
                                    duration: 'long',
                                    type: 'div'
                                })
                            }else {
                                location = 'cart.html';
                            }
                        });
                    }
                }
            })
        });
    }
})