
goBack();
// 返回上一页
function goBack() {
    $('#header .left .fa-arrow-left').on('tap', function () {
        history.back();
    })
}

// 通过url 来查询对应键传输的值
function getQueryString(key) {
    // 字符串截取 从第一个开始, 截取一个 然后通过 &符号 分割
    var search = location.search.substr(1).split('&');
    // console.log(search);
    for (var i = 0; i < search.length; i++) {
        // console.log(search[i].split('='));
        if (search[i].split('=')[0] == key) {
            // decodeURI 解密 url乱码
            return decodeURI(search[i].split('=')[1]);
        }
    }
    return "";
}
// 正则方式获取
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

