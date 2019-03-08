$(function () {
    queryCart();
    pullRefresh();
    deleteCart();
    editCart();


    // 下拉刷新和上拉加载更多的功能 函数
    function pullRefresh() {
        // 初始化下拉刷新
        mui.init({
            pullRefresh: {
                // 指定当前下拉刷新的父容器 建议使用id选择器给区域滚动添加一个 pullrefresh id
                container: '#pullrefresh',
                // 初始化下拉刷新
                down: {
                    // 下拉刷新的回调函数 用真正的刷新数据 发送请求真实刷新数据和页面
                    callback: pulldownRefresh
                },
                // 初始化上拉加载更多
                up: {
                    // 上拉加载的回调函数 用来真正请求更多数据 追加到页面上
                    callback: pullupRefresh
                }
            }
        });
        // 2. 下拉刷新的具体业务函数
        function pulldownRefresh() {
            // 如果想要请求慢一点转久一点 加一个定时器延迟请求
            setTimeout(function () {
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            }, 1000);
        }
        // 3. 上拉加载的具体业务函数
        function pullupRefresh() {
            // 如果想要请求慢一点转久一点 加一个定时器延迟请求
            setTimeout(function () {
                mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
            }, 1000)
        }
    }

    // 查询购物车功能
    function queryCart() {
        $.ajax({
            type: 'get',
            url: '/cart/queryCart',
            dataType: 'json',
            success: function (obj) {
                if (obj.error) {
                    location = 'login.html?returnurl=' + location.href;
                } else {
                    var html = template('carttpl', { 'list': obj });
                    $('.cart-list').html(html);
                    getCount();
                    $('.mui-checkbox input').on('change', function () {
                        getCount();
                    })
                }
            }
        })
    }

    // 删除功能
    function deleteCart() {
        $('.cart-list').on('tap', '.btn-delete', function () {
            var li = this.parentNode.parentNode;
            var id = $(this).data('id');
            // 需要DOM对象, 要把zepot对象转成DOM对象
            // var li = $(this).parent().parent()[0];
            mui.confirm('是否删除该产品', '温馨提示', ['确定', '取消'], function (e) {
                if (e.index === 1) {
                    mui.swipeoutClose(li);
                } else {
                    $.ajax({
                        type: 'get',
                        url: '/cart/deleteCart',
                        data: { id: id },
                        dataType: 'json',
                        success: function (obj) {
                            if (obj.success) {
                                mui.toast('删除成功', {
                                    duration: 1000,
                                    type: 'div'
                                });
                                queryCart();
                            }
                        }
                    })
                }
            })
        })
    }

    // 编辑功能
    function editCart() {
        $('.cart-list').on('tap', '.btn-edit', function () {
            var li = this.parentNode.parentNode;
            var product = $(this).data('product');
            var proSize = [];
            var min = product.productSize.split('-')[0] - 0;
            var max = product.productSize.split('-')[1] - 0;
            for (var i = min; i <= max; i++) {
                proSize.push(i);
            }
            product.productSize = proSize;
            // console.log(product);
            var html = template('edittpl', product);
            html = html.replace(/[\r\n]/g, '');
            mui.confirm(html, '商品编辑', ['保存', '取消'], function (e) {
                if (e.index == 1) {
                    mui.swipeoutClose(li);
                } else {
                    var size = $('.mui-btn.mui-btn-warning').data('size');
                    var num = mui('.mui-numbox').numbox().getValue();
                    $.ajax({
                        type: 'post',
                        url: '/cart/updateCart',
                        data: {
                            id: product.id,
                            size: size,
                            num: num
                        },
                        dataType: 'json',
                        success: function (obj) {
                            if (obj.success) {
                                queryCart();
                            }
                        }
                    })
                }
            });
            mui('.mui-numbox').numbox();
            $('.product-size').on('tap', 'button', function () {
                $(this).addClass('mui-btn-warning').siblings().removeClass('mui-btn-warning');
            })
        })
    }

    // 计算总金额
    function getCount() {
        var count = 0;
        var checkeds = $('.mui-checkbox input:checked');
        checkeds.each(function (index, ele) {
            var price = $(this).data('price');
            var num = $(this).data('num');
            var singeCount = price * num;
            count += singeCount;
        })
        // 四舍五入,保留2位小数
        // count = count.toFixed(2);
        count = parseInt(count * 100) / 100;
        $('.order-count span').html(count);
    }

})