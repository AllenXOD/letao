$(function () {

    // 搜索框交互
    $('.search-form input').on('focus', function () {
        $('.search-form input').attr('placeholder', '');
    }).on('blur', function () {
        $('.search-form input').attr('placeholder', '请输入你想要搜索的商品');
    })

    // console.log(getQueryString('search'));
    // console.log(zeQueryString('time'));
    searchProduct();
    queryProduct();
    sortProduct();
    pullRefresh();
    toDetail();

    var search = '';
    // 查询商品列表的函数
    function queryProduct() {
        search = zeQueryString('search');
        $.ajax({
            type: 'get',
            url: 'http://localhost:3000/product/queryProduct',
            data: {
                proName: search,
                page: 1,
                pageSize: 4,
            },
            datatype: 'json',
            success: function (obj) {
                // console.log(obj);
                var html = template('productList', obj)
                // console.log(html);
                $('.product-list .mui-row').html(html);
            }
        })
    }

    function searchProduct() {
        // 移动端使用了zepto插件, 则click事件都是用tap
        $('.btn-search').on('tap', function () {
            // trim 取出前后空格
            var searchStr = $('.input-search').val().trim();
            if (searchStr == '') {
                // mui 消息框组件
                mui.toast('请输入搜索内容', {
                    duration: 'long',
                    type: 'div'
                })
                return false;
            }
            // 设置本地存储
            var searchHistory = localStorage.getItem('searchHistory');
            if (searchHistory) {
                // 取出的值为字符串 需要转成数组
                searchHistory = JSON.parse(searchHistory);
            } else {
                searchHistory = []
            }
            // 搜索内容去重
            for (var i = 0; i < searchHistory.length; i++) {
                if (searchHistory[i].key == searchStr) {
                    // 删除相关下标的数组
                    searchHistory.splice(i, 1);
                    // 数组元素删除后, 数组长度减少, 则需要减去一个i
                    i--;
                }
            }
            // 往前加搜索内容
            searchHistory.unshift({
                key: searchStr,
                time: new Date().getTime()
            })
            // localStorage只能存储简单类型数据, 所以需要转成字符串
            var searchHistory = JSON.stringify(searchHistory);
            localStorage.setItem('searchHistory', searchHistory);

            // encodeURI 加密数据<默认方式,可以不加> 解决url乱码
            // escape 加密  unescape解密
            window.location.href = 'productlist.html?search=' + encodeURI(searchStr) + '&time=' + new Date().getTime();

            // 搜索时添加记录
            queryHistory();
            $('.input-search').val('');
        })
    }

    // 商品排序
    function sortProduct() {
        $('.product-list .mui-card-header a').on('tap', function () {
            $(this).addClass('active').siblings().removeClass('active');
            var sort = $(this).data('sort');
            if (sort == 2) {
                sort = 1;
                $(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
            } else {
                sort = 2;
                $(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            }
            $(this).data('sort', sort);
            $(this).siblings().data('sort', 2).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
            var type = $(this).data('type');
            search = zeQueryString('search');
            var obj = {
                proName: search,
                page: 1,
                pageSize: 4,
            };
            obj[type] = sort;
            // console.log(obj);
            $.ajax({
                type: 'get',
                url: 'http://localhost:3000/product/queryProduct',
                data: obj,
                datatype: 'json',
                success: function (obj) {
                    var html = template('productList', obj)
                    $('.product-list .mui-row').html(html);
                }
            })
        });
    }

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
                // 4. 调用查询函数重新查询刷新页面
                queryProduct();
                // 5. 刷新完成要调用结束转圈圈的函数 函数代码一定不要写错 官网文档有错
                // mui('#pullrefresh').pullRefresh().endPulldown();
                // 使用官方demo文档里面新版代码结束转圈圈
                mui('#pullrefresh').pullRefresh().endPulldownToRefresh();
            }, 1000);
        }
        var page = 1;

        // 3. 上拉加载的具体业务函数
        function pullupRefresh() {
            search = zeQueryString('search');
            // 如果想要请求慢一点转久一点 加一个定时器延迟请求
            setTimeout(function () {
                //   proName = getQueryString('search')
                // 6. 重新请求更多数据 请求下一页数据
                $.ajax({
                    url: '/product/queryProduct',
                    data: {
                        proName: search,
                        // 定义一个变量page存储了当前页码数 请求下一页让page进行++ 要自增
                        page: ++page,
                        pageSize: 4,
                    },
                    success: function (res) {
                        // console.log(res);
                        // 8. 判断如果数据已经没有长度 表示没有数据 不需要调用模板和追加 直接提示没有数据了
                        if (res.data.length > 0) {
                            // 6.1 调用模板生成商品列表结构
                            var html = template('productList', res);
                            // console.log(html);
                            // 6.2 请求了更多数据下一页 追加到页面 append函数
                            $('.product-list .mui-row').append(html);
                            // 7. 数据追加完毕要结束转圈圈 注意这个函数是up不是down
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh();
                        } else {
                            // 9. 没有数据 结束转圈圈 并且提示没有数据了
                            mui('#pullrefresh').pullRefresh().endPullupToRefresh(true);
                        }
                    }
                })
            }, 1000)
        }
    }

    // 商品详情页跳转
    function toDetail() {
        $('.product-list').on('tap', '.product-buy', function () {
            var id = $(this).data('id');
            location = 'detail.html?id=' + id;
        })
    }
})