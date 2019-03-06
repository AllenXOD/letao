$(function () {
    pullRefresh();

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
})