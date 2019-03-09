$(function () {

    login();

    // 登录功能
    function login() {
        $('.btn-login').on('click', function () {
            console.log('1');
            var username = $('#inputEmail3').val().trim();
            var password = $('#inputPassword3').val().trim();
            if (username == '') {
                alert('请输入用户名');
                return false;
            } else if (password == '') {
                alert('请输入密码')
                return false;
            }
            $.ajax({
                type: 'post',
                url: '/employee/employeeLogin',
                data: {
                    username: username,
                    password: password,
                },
                dataType: 'json',
                success: function (obj) {
                    if (obj.error) {
                        alert(obj.message);
                    } else {
                        location = 'index.html'
                    }
                }
            })
        })
    }

})