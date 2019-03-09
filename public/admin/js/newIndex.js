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

    function initPage(totalPage) {
        $("#page").bootstrapPaginator({
            bootstrapMajorVersion: 3, //对应的bootstrap版本
            currentPage: page, //当前页数
            numberOfPages: 5, //每次显示页数
            totalPages: totalPage, //总页数
            shouldShowPage: true,//是否显示该按钮
            useBootstrapTooltip: true,
            //点击事件
            onPageClicked: function (event, originalEvent, type, newPage) {
                page = newPage;
                queryUser();
            }
        });
    }


})