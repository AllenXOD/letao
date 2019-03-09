var page = 1;
$(function () {
    updateUser();
    queryUser();
    
    // 用户管理
    function queryUser() {
        $.ajax({
            url: '/user/queryUser',
            data: {
                page: page,
                pageSize: 5,
            },
            success: function (obj) {
                var html = template('userInfo', obj);
                $('.user-info tbody').html(html);
                var totalPage = Math.ceil(obj.total / obj.size);
                initPage(totalPage);
            }
        })
    }

    // 更新用户状态的函数
    function updateUser() {
        $('.user-info tbody').on('click', '.btn-change', function () {
            var isDelete = $(this).data('is-delete');
            var id = $(this).data('id');
            isDelete = isDelete == 0 ? 1 : 0;
            $(this).data('is-delete', isDelete);
            $.ajax({
                type: 'post',
                url: '/user/updateUser',
                data: {
                    id: id,
                    isDelete: isDelete,
                },
                success: function (obj) {
                    if (obj.success) {
                        queryUser();
                    }
                }
            })
        })
    }

    // 分页功能
    function initPage(totalPage) {
        var pages = [];
        for (var i = 1; i <= totalPage; i++) {
            pages.push(i);
        }
        var html = template('pagetpl', { 
            pages: pages ,
            page: page
        });
        $('.pagination').html(html);
        $('.pagination li').on('click',function(){
            // $(this).addClass('active').siblings().removeClass('active');
            page = $(this).data('page');
            queryUser();
        })
    }
})