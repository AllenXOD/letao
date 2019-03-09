var page = 1;
$(function () {
    queryTopCategory();
    addFirstCategory();

    function queryTopCategory() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: 5,
            },
            success: function (obj) {
                var html = template('categorytpl', obj);
                $('.user-info tbody').html(html);
                var totalPage = Math.ceil(obj.total / obj.size);
                initPage(totalPage);
            }
        })
    }

    // 分页功能
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
                queryTopCategory();
            }
        });
    }

    // 添加一级分类功能
    function addFirstCategory() {
        $('.btn-save').on('click', function () {
            var categoryName = $('.category-name').val().trim();
            if (categoryName == '' || categoryName.length > 3) {
                alert('分类名不合法!!');
                return false;
            }
            $.ajax({
                url: '/category/addTopCategory',
                type: 'post',
                data: {
                    categoryName: categoryName,
                },
                success: function (obj) {
                    console.log(obj);
                    if(obj.success) {
                        queryTopCategory();
                    }
                }
            });
            $('.category-name').val('');
        })
    }
})