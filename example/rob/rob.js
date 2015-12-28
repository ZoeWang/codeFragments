var autoFreshTime = setInterval(function () {
    query_ticket.click();
}, 2000);

var autoCheckTime = setInterval(function () {


    // 票数的那个dom的id 按照像买的票的优先级顺序写
    var arr = [
        '#YW_2400000K510X', 
        '#YW_24000K190109',
        '#YZ_24000K190109'
    ];

    var ticket = {};

    arr.forEach(function (x) {
        var flag = ($(x).text() != '无' && $(x).text() != '');

        if (flag) {
            clearInterval(autoFreshTime);
            clearInterval(autoCheckTime);
            alert('有票！！！！');
            $(x).closest('tr').find('.btn72').click();
            return;
        }
    })

},1000)