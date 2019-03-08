$(function () {
    queryUserMessage();
    exit();

    // 查询用户信息功能
    function queryUserMessage() {
        $.ajax({
            type: 'get',
            url: '/user/queryUserMessage',
            dataType: 'json',
            success: function (obj) {
                if (obj.error) {
                    location = "login.html?returnurl=" + location.href;
                } else {
                    $('.userName').html(obj.username);
                    $('.mobile').html(obj.mobile);
                }
            }
        })
    }

    // 退出登录
    function exit() {
        $('.btn-exit').on('tap', function () {
            $.ajax({
                type: 'get',
                url: '/user/logout',
                dataType: 'json',
                success: function (obj) {
                    if (obj.success) {
                        location = "login.html?returnurl=" + location.href;
                    }
                }
            })
        })
    }
})