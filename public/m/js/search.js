$(function () {
    // 搜索框交互
    $('.search-form input').on('focus', function () {
        $('.search-form input').attr('placeholder', '');
    }).on('blur', function () {
        $('.search-form input').attr('placeholder', '请输入你想要搜索的商品');
    })

    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
    scoll();
    toProductList();

    // 添加记录
    function addHistory() {
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
    // 查询函数
    function queryHistory() {
        var searchHistory = localStorage.getItem('searchHistory');
        if (searchHistory) {
            searchHistory = JSON.parse(searchHistory);
        } else {
            searchHistory = []
        }
        var html = template('search-history', {
            list: searchHistory
        });
        $('.search-history ul').html(html);
    }
    // 开关思想, 实现点击删除时不进行页面跳转
    var clickDelete = false;
    // 删除记录
    function deleteHistory() {
        // e = e || window.event;
        $('.close-box').on('tap', 'li span', function () {
            var searchHistory = localStorage.getItem('searchHistory');
            searchHistory = JSON.parse(searchHistory);
            $(this).parent().remove();
            searchHistory.splice($(this).parent().data('index'), 1);
            searchHistory = JSON.stringify(searchHistory);
            localStorage.setItem('searchHistory', searchHistory);
            queryHistory();
            // e.preventDefault();
            // e.stopPropagation();
            clickDelete = true;
        });
    }
    // 清空记录
    function clearHistory() {
        $('.btn-clear').on('tap', function () {
            // var searchHistory = [];
            // localStorage.setItem('searchHistory', searchHistory);
            localStorage.removeItem('searchHistory');
            queryHistory();
        });
    }

    function scoll() {
        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
        });
    }

    // 点击历史记录跳转
    function toProductList() {
        $('.close-box').on('tap', 'li', function () {
            if (clickDelete) {
                clickDelete = false;
                return false;
            }
            var search = $(this).data('search');
            location = 'productlist.html?search=' + search + '&time=' + new Date().getTime();
        })
    }
})

