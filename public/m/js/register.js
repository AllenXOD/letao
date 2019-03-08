$(function () {
    register();
    getVcode();

    var vCode = '';

    // 注册功能
    function register() {
        var isChecked = true;
        $('.btn-register').on('tap', function () {
            // 判断非空
            var input = $('.mui-input-row input');
            input.each(function () {
                if (this.value.trim() == '') {
                    mui.toast(this.placeholder, {
                        duration: 'long',
                        type: 'div'
                    })
                    isChecked = false;
                    return false;
                }
            });
            if (isChecked) {
                var mobile = $('.mobile').val().trim();
                if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(mobile)) {
                    mui.toast('请输入合法的手机号', {
                        duration: 'long',
                        type: 'div'
                    })
                    return false;
                }
                var username = $('.username').val().trim();
                if (!/^[0-9a-zA-Z]{6,12}$/.test(username)) {
                    mui.toast('请输入合法的用户名', {
                        duration: 'long',
                        type: 'div'
                    })
                    return false;
                }
                var password1 = $('.password1').val().trim();
                var password2 = $('.password2').val().trim();
                if (password1 != password2) {
                    mui.toast('密码不一致', {
                        duration: 'long',
                        type: 'div'
                    })
                    return false;
                }
                var vcode = $('.vcode').val().trim();
                if (vCode != vcode) {
                    mui.toast('验证码错误', {
                        duration: 'long',
                        type: 'div'
                    })
                    return false;
                }
                $.ajax({
                    url: '/user/register',
                    type: 'post',
                    data: {
                        username: username,
                        mobile: mobile,
                        password: password1,
                        vCode: vcode
                    },
                    success: function (obj) {
                        if (obj.error) {
                            mui.toast(obj.message, {
                                duration: 'long',
                                type: 'div'
                            })
                        } else {
                            location = 'login.html?returnurl=index.html';
                        }
                    }
                })
            }
        })
    }

    // 获取验证码功能
    function getVcode() {
        $('.btn-get-vcode').on('tap', function () {
            $.ajax({
                type: 'get',
                url: '/user/vCode',
                dataType: 'json',
                success: function (obj) {
                    vCode = obj.vCode;
                    mui.toast(obj.vCode, {
                        duration: 'long',
                        type: 'div'
                    })
                }
            })
        })
    }
})