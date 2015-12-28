;
(function(window, undefined) {
	var split = document.location.host.split(".");
	var _length1 = split.length - 1;
	var _length2 = split.length - 2;
	var EVENT_HOST_PRE = "." + split[_length2] + "." + split[_length1];

	var guidel = {
		run: function() {
			var $self = this;
			var isNewUser = $.cookie("stat_isNew");
			var opened = $.cookie("opened");
			if (isNewUser == 1 && opened != "yes") {
				if (document.getElementById("guide-login")) {} else {
					$self.addLinkCss();
					$self.creatPop();
					var mydate = new Date();
					var year = mydate.getFullYear();
					var moth = mydate.getMonth() + 1;
					var day = mydate.getDate() + 1;
					var newDay = day - 1;
					var hour = mydate.getHours();
					var Minutes = mydate.getMinutes();
					var Seconds = mydate.getSeconds();
					var endTime = moth + "/" + day + "/" + year + " 00:00:00";
					var nowTime = moth + "/" + newDay + "/" + year + " " + hour + ":" + Minutes + ":" + Seconds;
					var mytime = (Date.parse(endTime) - Date.parse(nowTime)) / 1000 / 60 / 60 / 24;
					$.cookie("opened", "yes", {
						expires: mytime,
						path:"/",
						domain:EVENT_HOST_PRE
					});
					stat.efunc({
						po: 91100
					})
				}
			}
		},
		initConfig: {
			nowAdd: "现在加入<span class='jkvip'> 送10天VIP </span>免费学2000门课程",
			ONETXT: "极客学院－最棒的在线教育平台",
			TOWTXT: "拥有200W注册用户，最前沿的技术问答，最纯粹的技术切磋。"
		},
		addLinkCss: function() {
			if ($('link[href$="../css/poplogin.min.css"]').length == 0) {
				$('<link rel="stylesheet" href="http://e' + EVENT_HOST_PRE + '/headerandfooter/css/poplogin.min.css" />').appendTo('head');
			}
		},
		creatPop: function() {
			var pop = '<div id="guide-blacklayer"></div>';
			pop += '<div id="guide-login">';
			pop += '<span class="login-close">x</span>';
			pop += '<img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/logo.png" height="42" class="logo" />';
			pop += '<div class="login-centent">';
			pop += '<h2>' + this.initConfig.nowAdd + '</h2>';
			pop += '<div class="free-zhuce"><span>免注册，一键登录</span></div>';
			pop += '<div class="loginicon-box">';
			pop += '<a  href="http://passport' + EVENT_HOST_PRE + '/connect/qq"  id="pop-qq"  ><img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/qq-icon.png" width="50" /></a>';
			pop += '<a href="http://passport' + EVENT_HOST_PRE + '/connect/weixin" id="pop-weixin" ><img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/wx-icon.png" width="50" /></a>';
			pop += '<a href="http://passport' + EVENT_HOST_PRE + '/connect/weibo" id="pop-weibo" ><img src="http://e' + EVENT_HOST_PRE + '/headerandfooter/images/sina-icon.png" width="50" /></a>';
			pop += '</div>';
			pop += '<strong>' + this.initConfig.ONETXT + '</strong>';
			pop += '<strong>' + this.initConfig.TOWTXT + '</strong>';
			pop += '<div class="loginlink">';
			pop += '<a href="http://passport' + EVENT_HOST_PRE + '/sso/reg_phone" id="popnew">注册新账号</a>｜ <a href="http://passport' + EVENT_HOST_PRE + '/sso/login" class="blue" id="popold" >老用户登录</a>';
			pop += '</div>';
			$('body').append(pop);
			if ($(document).height() > $(window).height()) {
				$('#guide-blacklayer').height($(document).height())
			}

			$('#popnew').bind("click", function() {
				stat.efunc({
					po: 91104
				});
			});

			$('#popold').bind("click", function() {
				stat.efunc({
					po: 91105
				});
			});

			$('#pop-qq').bind("click", function() {
				stat.efunc({
					po: 91101
				});
			});
			$('#pop-weixin').bind("click", function() {
				stat.efunc({
					po: 91102
				});
			})
			$('#pop-weibo').bind("click", function() {
				stat.efunc({
					po: 91103
				});
			})
			$('.login-close').bind("click", function() {
				$('#guide-blacklayer').remove();
				$('#guide-login').remove();
				stat.efunc({
					po: 91106
				});
			})

		}
	}

	//操作cookie

	;
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
	setTimeout(function() {
		guidel.run();
	}, 1000)


}(window))