var EVENTDOMAIN = {
	domain: function(url) {
		var durl = /http:\/\/([^\/]+)\//i;
		var hosts = url.match(durl);
		hosts = hosts[1];
		d_arr = hosts.split('.');
		hosts = d_arr[d_arr.length - 2] + '.' + d_arr[d_arr.length - 1];
		return hosts;
	},
	domain_pre: function(url) {
		var durl = /http:\/\/([^\/]+)\//i;
		var hosts = url.match(durl);
		hosts = hosts[1];
		d_arr = hosts.split('.');
		return d_arr[0];
	},
	domain_arr: function(url) {
		var durl = /http:\/\/([^\/]+)\//i;
		var hosts = url.match(durl);
		hosts = hosts[1];
		d_arr = hosts.split('.');
		return d_arr;
	},
	currentUrl: window.location.href
};


var split = document.location.host.split(".");
var _length1 = split.length - 1;
var _length2 = split.length - 2;
var EVENT_HOST_PRE = "." + split[_length2] + "." + split[_length1];

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD (Register as an anonymous module)
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function($) {

	var pluses = /\+/g;

	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}

	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}

	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}

	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}

		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch (e) {}
	}

	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}

	var config = $.cookie = function(key, value, options) {
		// Write
		if (arguments.length > 1 && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires,
					t = options.expires = new Date();
				t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
			}
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}
		// Read
		var result = key ? undefined : {},
			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling $.cookie().
			cookies = document.cookie ? document.cookie.split('; ') : [],
			i = 0,
			l = cookies.length;

		for (; i < l; i++) {
			var parts = cookies[i].split('='),
				name = decode(parts.shift()),
				cookie = parts.join('=');

			if (key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}

			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function(key, options) {
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, {
			expires: -1
		}));
		return !$.cookie(key);
	};

}));

(function($) {
	$.header = function(options) {
		$('body').removeClass('no_header').prepend(CreateHead.CreatHtml(options));
		CreateHead.channel(options); //当前频道变色
		CreateHead.TopSearch(); //绑定搜索事件
		CreateHead.getUserInfo(); //头部用户信息部分判断插入
	};
	$.footer = function(options) {
		$('body').append(CreateHead.creatFooter());
	};
	$(function() {
		$('body').addClass('no_header');
		if ($('link[href$="headerandfooter.min.css"]').length == 0) {
			$('<link rel="stylesheet" href="http://e' + EVENT_HOST_PRE + '/headerandfooter/css/headerandfooter.min.css" />').appendTo('head');
		}
		$.header(CreateHead.headerset);
		$.footer(); //加载尾部
		CreateHead.loadAnimate(); //头部加载动画
		CreateHead.gotop(); //返回顶部及右侧浮层
		CreateHead.loadAD(); // 加载右侧浮层广告
		CreateHead.addScript("http://e" + EVENT_HOST_PRE + "/headerandfooter/js/web_socket.js"); //动态插入js
		CreateHead.addScript("http://e" + EVENT_HOST_PRE + "/headerandfooter/js/websocket.js"); //动态插入js
		CreateHead.addScript("http://e" + EVENT_HOST_PRE + "/headerandfooter/js/banner.min.js"); //个性化弹出广告
		var meiqia = '<script src="//meiqia.com/js/mechat.js?unitid=7594&btn=hide&specifyGr=0" charset="UTF-8" defer="defer"></script>';
		$('body').append(meiqia);
	});

})(jQuery);


var CreateHead = {} || CreateHead;
CreateHead.headerset = {}
	//头部载入动画
CreateHead.loadAnimate = function() {
	var le = $('.loading-length');
	le.animate({
		width: $(window).width()
	}, 300);
	$(window).resize(function() {
		le.css("width", $(window).width())
	});
};
//创建头部
CreateHead.CreatHtml = function(banner) {
	var header = '<div id="jshdeader" class="common-hf"><div id="header" class="w-1000">';
	header += '<div class="wrap">';
	header += '<a href="http://www' + EVENT_HOST_PRE + '/">';
	header += '<h2><img src="http://e.jikexueyuan.com/headerandfooter/images/logo.png" class="logo" alt="极客学院" jktag="&amp;posGP=101001&amp;posArea=9001&amp;posOper=900028"></h2></a>';
	if (banner.search != false) {
		var channel = banner.channel,
			type = String(channel), //转为小写字符串
			keyword = (banner.keyword == undefined) ? '' : banner.keyword,
			type = (banner.searchType == undefined) ? 'course' : banner.searchType;
		header += '<div class="search-section">';
		header += '<div class="headsearch" id="headsearch">';
		header += '<input name="t" type="hidden" value="course">';
		header += '<input class="search-text" type="text" name="q" autocomplete="off" id="web_search_header" placeholder="搜索课程、问答或 Wiki" value="' + keyword + '" style="padding-right: 55px;" data-type="' + type + '">';
		header += '<input type="submit" class="search-btn" value="" jktag="&amp;posGP=102001&amp;posArea=9001&amp;posOper=900004">';
		header += '<div class="hot-words" style="display: block;">';
		header += '<a href="http://search' + EVENT_HOST_PRE + '/' + type + '?q=Android" jktag="&amp;posGP=102001&amp;posArea=9001&amp;posOper=900030&amp;aSS=Android">Android</a>';
		header += '<a href="http://search' + EVENT_HOST_PRE + '/' + type + '?q=iOS" jktag="&amp;posGP=102001&amp;posArea=9001&amp;posOper=900030&amp;aSS=iOS">iOS</a>';
		header += '<a href="http://search' + EVENT_HOST_PRE + '/' + type + '?q=HTML5" jktag="&amp;posGP=102001&amp;posArea=9001&amp;posOper=900030&amp;aSS=HTML5">HTML5</a> </div>';
		header += '<div id="J_keywordList" class="keyword-list">';
		header += '<ul class="result-list"></ul></div></div></div>';
	}
	header += '<div style="width: 130px;height:50px;float: left; margin-left: 20px; position: relative;"></div>';

	header += '<div class="loginbox" id="header-loginbox"></div>';
	header += '</div></div>';
	header += '<div id="loading"><div class="loading-length"></div></div>';
	header += '<div class="navpositon">';
	header += '<div id="navbox">';
	header += '<div class="nav w-1000">';
	header += '<div class="navbox">';
	header += '<a href="http://www' + EVENT_HOST_PRE + '/" jktag="&amp;posGP=100001&amp;posArea=9004&amp;posOper=900016">首页</a>';
	header += '<a href="http://www' + EVENT_HOST_PRE + '/course/" class="" jktag="&amp;posGP=101001&amp;posArea=9004&amp;posOper=900017">职业课程库</a>';
	header += '<a href="http://www' + EVENT_HOST_PRE + '/path/" class="" jktag="&amp;posGP=1001003&amp;posArea=9004&amp;posOper=900018">知识体系图</a>';
	header += '<a href="http://ke' + EVENT_HOST_PRE + '/zhiye/" class="" jktag="&amp;posGP=101004&amp;posArea=9004&amp;posOper=900019">职业路径图</a>';
	header += '<a href="http://wenda' + EVENT_HOST_PRE + '/" class="" jktag="&amp;posGP=104002&amp;posArea=9004&amp;posOper=900020">技术问答</a>';
	header += '<a href="http://wiki' + EVENT_HOST_PRE + '/" class="" style="position: relative;">Wiki<img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/hoticon.png" id="prize"/></a>';
	header += '</div><div class="user-need">';
	header += '<a href="http://www' + EVENT_HOST_PRE + '/vip/" jktag="&amp;posGP=114001&amp;posArea=9004&amp;posOper=900021">';
	header += '<span><img src="http://e.jikexueyuan.com/headerandfooter/images/vip-icon.png">VIP会员</span></a>';
	header += '<a href="http://press' + EVENT_HOST_PRE + '/topic/" target="_blank" jktag="&amp;posArea=9004&amp;posOper=900022">';
	header += '<span><img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/star-icon.png">求课程</span></a>';
	header += '<a href="http://www' + EVENT_HOST_PRE + '/app/" target="_blank" jktag="&amp;posGP=116001&amp;posArea=9004&amp;posOper=900023"><span><img src="http://e.jikexueyuan.com/headerandfooter/images/dl-icon.png">客户端</span></a>';
	header += '</div></div></div></div></div>';
	return header;

};
//创建未登录
CreateHead.nologinbox = function() {
	var nologin = '<span class="my-massage2" id="messagebox"><i class="unread-num">&nbsp;</i></span><em style="padding: 0px 10px;">|</em><a href="http://passport' + EVENT_HOST_PRE + '/connect/qq" style="text-decoration:none;color:#333;" rel="nofollow" jktag="&amp;posGP=112001&amp;posOper=900003"><span>QQ登录</span></a>';
	nologin += '<em style="padding: 0px 10px">|</em><span><a href="http://passport' + EVENT_HOST_PRE + '/sso/login" postion="index_index_header" rel="nofollow" jktag="&amp;posGP=112001&amp;posOper=900002">登录</a></span>';
	nologin += '<em style="padding: 0px 10px">|</em><span><a href="http://passport' + EVENT_HOST_PRE + '/sso/reg_phone" postion="index_index_header" rel="nofollow" jktag="&amp;posGP=112001&amp;posOper=900001">注册</a></span>';
	return nologin;
};
//创建登录部分
CreateHead.loginbox = function() {
	//已登录
	var login = '<span class="my-massage2" id="messagebox"><i class="unread-num">&nbsp;</i>';
	login += '<div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div>';
	login += '<div id="this-news" style="display: none;">';
	login += '<img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/topicon.gif" class="topic"/>';
	login += '<h3>消息通知<span class="gray">(<i class="unread-num">0</i>未读)</span><em class="set-read" titl="设置为已读"></em></h3>';
	login += '<div class="nonews" style="display: none;"><img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/nonews.gif" /></div>';
	login += '<div class="news-list"></div>'
	login += '<div class="all-news"><a href="http://www' + EVENT_HOST_PRE + '/member/notifications/">查看全部</a></div></div>';
	login += '</span><em>|</em>';
	login += '<span><a href="http://www' + EVENT_HOST_PRE + '/member/mycourse.html" postion="index_index_header" class="" jktag="&amp;posGP=115007&amp;posArea=9003&amp;posOper=900006">我的课程</a></span><em>|</em>';
	login += '<a href="http://www' + EVENT_HOST_PRE + '/member/" target="_blank" class="vip-icon" jktag="&amp;posGP=114002&amp;posArea=9003&amp;posOper=900007&amp;aMPType=years">';
	var is_expire = $.cookie('is_expire'),
		level_id = $.cookie('level_id'),
		uname = $.cookie('uname'),
		domain = $.cookie('domain'),
		uuid = $.cookie('uuid');

	if (is_expire == 0) {
		if (level_id == 1) {
			login += '<img class="header-vip" src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/vip-month.png" alt="vip"></a>';
		}
		if (level_id == 2) {
			login += '<img class="header-vip" src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/vip-year.png" alt="vip"></a>';
		}
		if (level_id == 3) {
			login += '<img class="header-vip" src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/vip-tiyan.png" alt="vip"></a>';
		}
	} else {
		login += '<img class="header-vip" src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/vip-lost.png" alt="vip"></a>';
	}
	login += '<div class="userMenu"><a href="http://www' + EVENT_HOST_PRE + '/member/" rel="nofollow">' + uname + '<i class="arrow"></i></a>';
	login += '<div class="userMenu-menu"><i class="arrow"></i>';
	login += '<ul>';
	if (domain) {
		login += '<li><a href="http://my' + EVENT_HOST_PRE + '/' + domain + '">个人主页</a></li>';
	} else {
		login += '<li><a href="http://my' + EVENT_HOST_PRE + '/' + uuid + '">个人主页</a></li>';
	}
	login += '<li><a href="http://www' + EVENT_HOST_PRE + '/member/" jktag="&amp;posGP=115001&amp;posArea=9003&amp;posOper=900009">个人中心</a></li>';
	login += '<li><a href="http://www' + EVENT_HOST_PRE + '/member/mycourse.html" jktag="&amp;posGP=115007&amp;posArea=9003&amp;posOper=900010">我的课程</a></li>';
	login += '<li><a href="http://jiuye' + EVENT_HOST_PRE + '/myclass" >我的就业班</a></li>';
	login += '<li><a href="http://www' + EVENT_HOST_PRE + '/member/freevip.html" jktag="&amp;posGP=115002&amp;posArea=9003&amp;posOper=900011">免费VIP</a></li>';
	login += '<li><a href="http://www' + EVENT_HOST_PRE + '/member/mycode.html" jktag="&amp;posGP=115003&amp;posArea=9003&amp;posOper=900012">我的F码</a></li>';
	login += '<li><a href="http://www' + EVENT_HOST_PRE + '/member/setting.html" jktag="&amp;posGP=115005&amp;posArea=9003&amp;posOper=900013">账号设置</a></li>';
	login += '<li><a href="http://www' + EVENT_HOST_PRE + '/member/connect.html" jktag="&amp;posGP=115006&amp;posArea=9003&amp;posOper=900014">一键绑定</a></li>';
	login += '<li><a href="http://passport' + EVENT_HOST_PRE + '/submit/logout" jktag="&amp;posArea=9003&amp;posOper=900015">退出</a></li></ul></div></div>';
	return login;
};
// 获取用户信息
CreateHead.getUserInfo = function() {
	var _data = {
		uid: $.cookie('uid')
	};
	if (_data.uid != undefined && _data.uid != '') {
		$('#header-loginbox').html(CreateHead.loginbox());
	} else {
		$('#header-loginbox').html(CreateHead.nologinbox());
	}
};
//creatFooter
CreateHead.creatFooter = function() {
	var footer = '<div id="jsfooter" class="common-hf"><div id="footer" class="mar-t50">';
	footer += '<div class=" jkinfor-block">';
	footer += '<div class="jkinfor cf">';
	footer += '<dl>';
	footer += '<dt><a target="_blank" href="http://www' + EVENT_HOST_PRE + '/course/" jktag="&amp;posGP=101001&amp;posArea=9005&amp;posOper=900027">极客学院</a></dt>';
	footer += '<dd>·<a target="_blank" href="http://www' + EVENT_HOST_PRE + '/course/" jktag="&amp;posGP=101001&amp;posArea=9005&amp;posOper=900027">职业课程库</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/path/" jktag="&amp;posGP=101003&amp;posArea=9005&amp;posOper=900027">知识体系图</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://ke' + EVENT_HOST_PRE + '/zhiye/" jktag="&amp;posGP=101004&amp;posArea=9005&amp;posOper=900027">职业路径图</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/partner/" jktag="107001&amp;posGP=&amp;posArea=9005&amp;posOper=900027">企业课程</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/resources/" jktag="&amp;posGP=108001&amp;posArea=9005&amp;posOper=900027">资源下载</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/tag/" jktag="&amp;posGP=105002&amp;posArea=9005&amp;posOper=900027">课程标签</a></dd>';
	footer += '</dl>';
	footer += '<dl>';
	footer += '<dt><a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/member/freevip.html" jktag="&amp;posGP=115002&amp;posArea=9005&amp;posOper=900027">网站服务</a></dt>';
	footer += '<dd>·<a target="_blank" href=" http://press' + EVENT_HOST_PRE + '/topic/" jktag="&amp;posArea=9005&amp;posOper=900027">课程需求</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/member/freevip.html" jktag="&amp;posGP=115002&amp;posArea=9005&amp;posOper=900027">免费体验VIP</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/blog/" jktag="&amp;posGP=109001&amp;posArea=9005&amp;posOper=900027">黑板报</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/sitemap.html" jktag="&amp;posGP=116001&amp;posArea=9005&amp;posOper=900027">网站地图</a></dd>';
	footer += '</dl><dl>';
	footer += '<dt><a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/question/" jktag="&amp;posGP=104002&amp;posArea=9005&amp;posOper=900027">帮助中心</a></dt>';
	footer += '<dd>·<a target="_blank" href="http://wenda' + EVENT_HOST_PRE + '/" jktag="&amp;posGP=104002&amp;posArea=9005&amp;posOper=900027">技术问答</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/vip/" jktag="&amp;posGP=114001&amp;posArea=9005&amp;posOper=900027">VIP权益</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/help/faq.html" jktag="&amp;posGP=110001&amp;posArea=9005&amp;posOper=900027">常见问题</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/help/service.html" jktag="&amp;posGP=110001&amp;posArea=9005&amp;posOper=900027">服务条款</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/help/copyright.html" jktag="&amp;posGP=110001&amp;posArea=9005&amp;posOper=900027">版权声明</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/help/disclaimer.html" jktag="&amp;posGP=110001&amp;posArea=9005&amp;posOper=900027">免责声明</a></dd>';
	footer += '</dl>';
	footer += '<dl>';
	footer += '<dt><a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/help/about.html" jktag="&amp;posGP=110001&amp;posArea=9005&amp;posOper=900027">交流合作</a></dt>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/help/about.html" jktag="&amp;posGP=110001&amp;posArea=9005&amp;posOper=900027">关于我们</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/help/contact.html" jktag="&amp;posGP=110001&amp;posArea=9005&amp;posOper=900027">联系我们</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/help/join.html" jktag="&amp;posGP=110001&amp;posArea=9005&amp;posOper=900027">社会招聘</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://press' + EVENT_HOST_PRE + '/evangelist/apply.html" jktag="&amp;posArea=9005&amp;posOper=900027">布道师招募</a></dd>';
	footer += '<dd>·<a target="_blank" href="mailto:hey@jikexueyuan.com?subject=业务咨询合作" rel="nofollow" jktag="&amp;posArea=9005&amp;posOper=900027">合作咨询</a></dd>';
	footer += '<dd>·<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/friendlink.html" jktag="&amp;posGP=113003&amp;posArea=9005&amp;posOper=900027">友情链接</a></dd>';
	footer += '</dl>';
	footer += '<div class="search-share">';
	footer += '<strong class="jktxt">极客学院，编程是一种信仰！</strong>';
	footer += '<div class="app-download">';
	footer += '<a target="_blank" href=" http://www' + EVENT_HOST_PRE + '/app/" jktag="&amp;posGP=116001&amp;posArea=9005&amp;posOper=900024">';
	footer += '<img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/iphone.png" width="21">';
	footer += '<div>';
	footer += ' <strong>手机客户端</strong>';
	footer += '<p>离线缓存  随时学习</p>';
	footer += ' </div>';
	footer += '</a>';
	footer += ' </div>';
	footer += '<div class="share">';
	footer += ' <a href="http://weibo.com/jikexueyuan" class="sina-icon" rel="nofollow" target="_blank" jktag="&amp;posArea=9005&amp;posOper=900025"></a>';
	footer += ' <a href="http://tieba.baidu.com/f?kw=%BC%AB%BF%CD%D1%A7%D4%BA&amp;fr=index" title="极客学院官方百度贴吧" class="tieba-icon" rel="nofollow" target="_blank" jktag="&amp;posArea=9005&amp;posOper=900026"></a>';
	footer += ' <a href="javascript:void(0);" class="qq-icon" rel="nofollow" jktag="&amp;posArea=9005&amp;posOper=900030">';
	footer += ' <img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/weixin-pop.png" class="weinxinpop">';
	footer += '</a>';
	footer += '</div>';
	footer += '<div class="kefu-online">';
	footer += '<a href="http://meiqia.com/chat/7594?specifyGr=0" target="_blank" jktag="&amp;posArea=9005&amp;posOper=900031" rel="nofollow">';
	footer += '<div class="kefu-icon online"></div><h5>联系我们</h5><p>工作日9:00-21:00在线</p></a>';
	footer += ' </div>';
	footer += '</div>';
	footer += '</div>';


	footer += '</div>';
	footer += '<div class="w-1000 copyright">';
	footer += ' Copyright © 2013-2015&nbsp;<a href="http://www' + EVENT_HOST_PRE + '/" target="_blank">极客学院</a>&nbsp;<a href="http://www' + EVENT_HOST_PRE + '/" target="_blank">jikexueyuan.com</a> All Rights Reversed. 京ICP备11018032号-8 京公网安备11010802013056';
	footer += '</div>';
	footer += '</div></div>';
	return footer;
};

CreateHead.TopSearch = function() { //头部搜索
	$("input[name='q']").bind("focus", function() {
		$(".search-btn").addClass("search-btn2"), $(".hot-words").hide(), $(this).css({
			paddingRight: "55px"
		});
	});
	$("input[name='q']").bind("focusout", function() {
		$(".search-btn").removeClass("search-btn2"), $(".hot-words").show()
	});
	$("input[name='q']").bind("keyup", function(e) {
		if (e.keyCode == 13) {
			searchKeyWord();
		} else {
			CreateHead.searchSuggest();
		}
	});
	$("#J_keywordList .result-list").delegate(".current", "click", function() {
		var e = $(this).text();
		$("input[name='q']").val(e)
	});
	$('.search-btn').bind("click", function() {
		searchKeyWord();
	});
};
CreateHead.channel = function(options) { //导航变色
	var navbox_a = $('.navbox a');
	navbox_a.removeClass("current");
	switch (options.channel) {
		case 'index':
			navbox_a.eq(0).addClass("current");
			break;
		case 'course':
			navbox_a.eq(1).addClass("current");
			break;
		case 'path':
			navbox_a.eq(2).addClass("current");
			break;
		case 'zhiye':
			navbox_a.eq(3).addClass("current");
			break;
		case 'wenda':
			navbox_a.eq(4).addClass("current");
			break;
		case 'wiki':
			navbox_a.eq(5).addClass("current");
			break;

	}
}

CreateHead.searchSuggest = function() {
	var keyword = $('#web_search_header').val();
	if (!keyword) {
		var a = $("#J_keywordList ul");
		$("#J_keywordList").hide(), a.empty();
		return;
	}
	var type = $('#web_search_header').data('type');

	$.ajax({
		type: "get",
		url: "http://search.jikexueyuan.com/search/suggest",
		dataType: "jsonp",
		data: {
			keyword: keyword,
			type: type
		},
		success: function(data) {
			if (data.data.suggest.length) {
				var a = $("#J_keywordList ul");
				$("#J_keywordList").hide(), a.empty();
				for (var n = 0, t = data.data.suggest.length; t > n; n++) {
					$("#J_keywordList ul").append('<li class="current"><a href = "http://search.jikexueyuan.com/' + type + '?q=' + data.data.suggest[n] + '">' + data.data.suggest[n] + "</a></li>");
				}
				$("#J_keywordList").show();
			}
		}
	});
};

CreateHead.gotop = function() { //返回头部
	//var lock = $.cookie("pewm");
	var html = "<div class='gotop' id='gototop'>";
	var ewmImg = 'http://e' + EVENT_HOST_PRE + '/headerandfooter/images/erwma.png';
	//var ewapImg = 'http://e'+EVENT_HOST_PRE+'/headerandfooter/images/ewap.jpg';
	var appewm = 'http://e' + EVENT_HOST_PRE + '/headerandfooter/images/appewm.png';
	//var baiwanImg = 'http://static-jkxy.qiniudn.com/invite2.png';
	html += "<span class='top'></span>";
	html += "<span class='erwma' style='display:none'><img src=" + ewmImg + "> </span>";
	html += "<a href='http://www" + EVENT_HOST_PRE + "/app/' alt='极客学院应用' target='_blank'><span class='jk-app'><img src=" + appewm + " class='appewm'/></span></a>"
	html += "<a href='http://meiqia.com/chat/7594?specifyGr=0' target='_blank' class='qq-online qq-online1' rel='nofollow'>";
	html += "<span class='kefu'>在线客服<br/>  工作日9:00-21:00在线<i></i></span></a>";
	//if (lock != "none") {
	//	var pewm_display = $('#bannerbox').length <= 0 ? '' : 'style="display:none;"';
	//	html += "<img src=" + ewapImg + " class='pewm' id='pewm' />";
	//}
	html += "<div class='pewm2' ><i class='close'></i><div id='float_1'></div></div>";
	html += "<div class='pewm3' ><i class='close'></i><div id='float_2'></div></div>";
	//html += "<div class='pewm2' ><i class='close'></i><a href='http://e.jikexueyuan.com/invite/invite.html' target='_blank' jktag='9000|0.0|67015'><img src=" + baiwanImg + " class='pewm2' id='pewm2' /></a></div>";
	html += "</div>";

	//获取返回顶部元素对象
	// var version=" <div class='text' id='ie-test'>您的浏览器版本太低，为了获得更好的浏览体验！<br/>我们建议您升级浏览器或者使用Chrome、Firefox、Safari浏览器</div>";
	function showPop(id) {
		if ($(window).height() < 490 + 340 && $(window).scrollTop() <= 490) {
			$(id).fadeOut();
		} else {
			$(id).fadeIn();
		}
	}
	var pewmDisplay = function() {
		var lock = $.cookie("pewm");
		if (lock == "none") {
			$('.erwma').show();
		}
		if (lock != "none" && $('#bannerbox').length > 0) {
			showPop('#pewm');
		}
	};

	if ($('#gototop').length == 0) {
		$('body').append(html);
		var html = $('#gototop');
		pewmDisplay();
	} else {
		var html = $('#gototop');
	}
	//绑定返回顶部事件
	$('.pewm2').find(".close").on("click", function() {
		$('.pewm2').fadeOut().remove();
	});
	$('.pewm3').find(".close").on("click", function() {
		$('.pewm3').fadeOut().remove();
	});
	$('#pewm').on("click", function() {
		$(this).fadeOut();
		$.cookie("pewm", "none", {
			expires: 1,
			path: '/'
		});
		$('.erwma').fadeIn();
	});
	//		if ($(window).scrollTop() <= 0) {
	//			$('#gototop>.top').hide();
	//		}
	html.find('.top').bind('click', function() {
		if ($(window).scrollTop() <= 0) return false;
		$('body,html').animate({
			scrollTop: 0
		}, 200);
		return false;
	});
	html.find('.erwma').bind("mouseover", function() {
		$('.erwma>img').fadeIn();
		$('.jk-app img').hide();
		stopEventBubble();
	});
	html.find('.jk-app').bind("mouseover", function() {
		$('.jk-app img').fadeIn();
		$('.erwma>img').hide();
		stopEventBubble();
	});
	$(document).bind("mouseover", function() {
		$('.erwma>img').stop(true, true);
		$('.jk-app img').stop(true, true);
		$('.jk-app img').fadeOut();
		$('.erwma>img').fadeOut();
	});
	$(window).scroll(function() {
		if ($(window).scrollTop() > 0) {
			$('#gototop>.top').fadeIn();
		} else {
			$('#gototop>.top').fadeOut();
		}
		pewmDisplay();
	});

	$('.close-img').bind("click", function() {
		$(this).parent().remove();
	})
};

//动态引入js
CreateHead.addScript = function(a) {
	var oHead = document.getElementsByTagName('HEAD').item(0);

	var oScript = document.createElement("script");

	oScript.type = "text/javascript";

	oScript.src = a;

	oHead.appendChild(oScript);
}

CreateHead.loadAD = function() { //加载百度广告，为了及早加载出来，增加了一个轮询
	var du = document.createElement('script');
	du.type = 'text/javascript';
	du.src = 'http://cbjs.baidu.com/js/m.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(du, s);

	var timeId = false;
	var initAD = function() {
		if (typeof(BAIDU_CLB_fillSlotAsync) == 'function') {
			timeId && window.clearInterval(timeId);
			BAIDU_CLB_fillSlotAsync('1126628', 'float_1');
			BAIDU_CLB_fillSlotAsync('1127554', 'float_2');
		}
	};
	window.clearInterval(timeId);
	timeId = window.setInterval(initAD, 10);
};

function stopEventBubble() { //阻止冒泡事件
	function getEvent() {
		if (window.event) {
			return window.event;
		}
		func = getEvent.caller;
		while (func != null) {
			var arg0 = func.arguments[0];
			if (arg0) {
				if ((arg0.constructor == Event || arg0.constructor == MouseEvent || arg0.constructor == KeyboardEvent) || (typeof(arg0) == "object" && arg0.preventDefault && arg0.stopPropagation)) {
					return arg0;
				}
			}
			func = func.caller;
		}
		return null;
	}
	var e = getEvent();
	if (window.event) {
		e.cancelBubble = true; //阻止冒泡
	} else if (e.preventDefault) {
		e.stopPropagation(); //阻止冒泡
	}
}

function searchKeyWord() {
	var keyword = $('#web_search_header').val();
	if (!keyword) {
		//		alert('关键词不能为空！');
		return;
	}
	var type = $('#web_search_header').data('type');

	var _url = 'http://search.jikexueyuan.com/' + type + '?q=' + encodeURIComponent(keyword);
	location.href = _url;
}

