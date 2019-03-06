$(function () {

    login();

    // 登录功能
    function login() {
        $('.btn-login').on('tap', function () {
            console.log('1');
            var username = $('.username').val().trim();
            var password = $('.password').val().trim();
            if (username == '') {
                mui.toast('请输入用户名', {
                    duration: 'long',
                    type: 'div'
                });
                return false;
            } else if (password == '') {
                mui.toast('请输入密码', {
                    duration: 'long',
                    type: 'div'
                });
                return false;
            }
            $.ajax({
                type: 'post',
                url: '/user/login',
                data: {
                    username: username,
                    password: password,
                },
                dataType: 'json',
                success: function (obj) {
                    if (obj.error) {
                        mui.toast(obj.message, {
                            duration: 'long',
                            type: 'div'
                        });
                    } else {
                        location =  zeQueryString('returnurl')
                    }
                }
            })
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
})