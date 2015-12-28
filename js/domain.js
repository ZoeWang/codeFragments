/**
 * [domain 返回域名]
 * @type {Object}
 */
var domain = {
	domain : function(url){
			var durl=/http:\/\/([^\/]+)\//i;
		var hosts = url.match(durl);
		hosts = hosts[1];
		d_arr = hosts.split('.');
		hosts = d_arr[d_arr.length - 2] + '.' + d_arr[d_arr.length - 1];
		return hosts;
	},
	domain_pre : function(url){
		var durl=/http:\/\/([^\/]+)\//i;
		var hosts = url.match(durl);
		hosts = hosts[1];
		d_arr = hosts.split('.');
		return d_arr[0];
	},
	domain_arr :function(url){
		var durl=/http:\/\/([^\/]+)\//i;
		var hosts = url.match(durl);
		hosts = hosts[1];
		d_arr = hosts.split('.');
		return d_arr;
	},
	currentUrl:window.location.href
};
var host_arr = domain.domain_arr(window.location.href);
var baseUrl = host_arr[1] + '.' + host_arr[2];
// 变换三级域名
var passportUrl= "http://passport." + baseUrl;
var wwwUrl = "http://www."  + baseUrl;

/**
 * 判断是否登录 获取cookie 里面的值
 */
var uname,
	code,
    uid,
    reg= new RegExp("(^| )uname=([^;]*)(;|$)");
    if (document.cookie.match(reg) && document.cookie.match(reg)[2]) {
        uname = decodeURI(document.cookie.match(reg)[2]);
    }
    reg= new RegExp("(^| )code=([^;]*)(;|$)");
    if (document.cookie.match(reg) && document.cookie.match(reg)[2]) {
        code = decodeURI(document.cookie.match(reg)[2]);
    }
    reg= new RegExp("(^| )uid=([^;]*)(;|$)");
    if (document.cookie.match(reg) && document.cookie.match(reg)[2]) {
        uid = document.cookie.match(reg)[2]
    }
    
var isLogin = uname ? true : false;

/**
 * 从地址栏中获取指定参数 base64
 * @param  {[type]} strParamName [description]
 * @param  {[type]} url          [description]
 * @return {[type]}              [description]
 */
function getURLParam(strParamName, url) {
    var strReturn = "";
    
    var strHref = url;//.toLowerCase();
    if (strHref.indexOf("?") > -1) {
        var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
        if(strQueryString.indexOf("#")  != -1 )strQueryString = strQueryString.substr(0,strQueryString.indexOf("#") );
        strQueryString = base64_decode(strQueryString);
        var aQueryString = strQueryString.split("&");

        for (var iParam = 0; iParam < aQueryString.length; iParam++) {
            if (aQueryString[iParam].indexOf(strParamName + "=") > -1) {
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                break;
            }
        }
    }
    
    return strReturn;
}
/**
 * 从地址栏中获取指定参数 未 加密
 * @param  {[type]} strParamName [description]
 * @param  {[type]} url          [description]
 * @return {[type]}              [description]
 *
 * getURLParamByInvite('channel', currentUrl);
 */
function getURLParamByInvite(strParamName, url) {
    var strReturn = "";
    
    var strHref = url;//.toLowerCase();
    if (strHref.indexOf("?") > -1) {
        var strQueryString = strHref.substr(strHref.indexOf("?") + 1);
        if(strQueryString.indexOf("#")  != -1 )strQueryString = strQueryString.substr(0,strQueryString.indexOf("#") );
        var aQueryString = strQueryString.split("&");

        for (var iParam = 0; iParam < aQueryString.length; iParam++) {
            if (aQueryString[iParam].indexOf(strParamName + "=") > -1) {
                var aParam = aQueryString[iParam].split("=");
                strReturn = aParam[1];
                break;
            }
        }
    }
    
    return strReturn;
}

/**
 * [getQuery 当前网址获取？号后面指定参数]
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 *
 * getQuery('invite') == 're';
 */
function getQuery (name) {
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
}

/**
 * [getCurrPage 获取以 html 结尾的页面名称]
 * @return {[type]} [description]
 */
function getCurrPage(){
	var currentUrl = window.location.href;
    var courseCategory = currentUrl.match(/\/\w+\.html/);
    courseCategory = courseCategory[0].replace(/\.html/,'');
    courseCategory = courseCategory.substr(1);

    console.log(courseCategory)
    return courseCategory;
}

/**
 * 判端打开浏览器端口 pc or m
 * @param  {[type]} currentPage [description]
 * @return {[type]}             [description]
 */
(function (currentPage) {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        // 如果是手机打开，当前网址不变 ，否则变成手机网址
        if (location.href.indexOf('/invite-m/') > -1) {
            return;
        }
        window.location.href = window.location.href.replace('/invite/', '/invite-m/');
    } else {
        if (location.href.indexOf('/invite/') > -1) {
            return;
        }
        window.location.href = window.location.href.replace('/invite-m/', '/invite/');
    }
})();