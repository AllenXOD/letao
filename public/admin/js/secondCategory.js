var page = 1;
$(function () {
    querySecondCategoryPaging();
    addSecondCategory();

    function querySecondCategoryPaging() {
        $.ajax({
            url: '/category/querySecondCategoryPaging',
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
                querySecondCategoryPaging();
            }
        });
    }

    // 添加品牌功能
    function addSecondCategory() {
        // 查询分类
        $('.btn-add').on('click', function () {
            $.ajax({
                url: '/category/queryTopCategory',
                success: function (obj) {
                    var html = '';
                    for (var i = 0; i < obj.rows.length; i++) {
                        html += '<option value="' + obj.rows[i].id + '">' + obj.rows[i].categoryName + '</option>';
                    }
                    $('#select-category').html(html);
                }
            })
        })
        var file = null;
        // 图片预览
        $('.select-logo').on('change', function () {
            if (this.files.length <= 0) return false;
            file = this.files[0];
            var url = window.URL.createObjectURL(file);
            $('.brand-logo').attr('src', url);
        })
        // 实现功能
        $('.btn-save').on('click', function () {
            if (file == null) return false;
            var formData = new FormData();
            formData.append('pic1', file);
            $.ajax({
                url: '/category/addSecondCategoryPic',
                type: 'post',
                data: formData,
                // 禁止ajax默认的数据处理
                processData: false,
                // 禁止请求报文的默认设置
                contentType: false,
                // 取消异步
                async: false,
                // 取消缓存
                cache: false,
                success: function (obj) {
                    if (obj.picAddr) {
                        var categoryId = $('.select-category').val();
                        var brandName = $('.brand-name').val().trim();
                        var brandLogo = obj.picAddr;
                        $.ajax({
                            url: '/category/addSecondCategory',
                            type: 'post',
                            data: {
                                categoryId: categoryId,
                                brandName: brandName,
                                brandLogo: brandLogo,
                                hot: 1
                            },
                            success: function (obj) {
                                if (obj.success) {
                                    querySecondCategoryPaging();
                                }
                            }
                        })
                    }
                }
            })
        })
    }
})