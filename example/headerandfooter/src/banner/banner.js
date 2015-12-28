;
(function(window, undefined) {
	var split = document.location.host.split(".");
	var _length1 = split.length - 1;
	var _length2 = split.length - 2;
	var EVENT_HOST_PRE = "." + split[_length2] + "." + split[_length1];

	var JKbanner = function() {
		this.config = [{
			"img": "http://e" + EVENT_HOST_PRE + "/headerandfooter/images/web-banner.jpg",
			"src": "http://jiuye.jikexueyuan.com/train/web?huodong=jiuye_web_bigbanner",
			"jktag": "0001|0.1|15000402"
		}]
	};
	JKbanner.prototype = {
		gitConfig: function(postion) {
			var $self = this;
			switch (postion) {
				case "1": //web
					return $self.config[0];
					break;
				default:
					break;
			}
		},
		creatWebBanner: function(banner) { //创建弹出广告
			var frag = document.createDocumentFragment();
			//蒙层
			var creatMask = {
				"tage": "div",
				"atrr": [{
					"id": "jkbanner-blacklayer"
				}]
			}
			var mask = ceartElement(creatMask);
			frag.appendChild(mask);
			//div
			var jkbanner = document.createElement("div");
			jkbanner.setAttribute("id", "jkbanner");
			frag.appendChild(jkbanner);

			var createSpan = {
				"tage": "span",
				"atrr": [{
					"class": "login-close"
				}],
				text: "X"
			};
			var close = ceartElement(createSpan);
			close.onclick = function() {
				var blacklayer = document.getElementById("jkbanner-blacklayer");
				var jkbanner = document.getElementById("jkbanner");
				blacklayer.parentNode.removeChild(blacklayer);
				jkbanner.parentNode.removeChild(jkbanner);
				stat.efunc({
					po: 15000403
				})
			}
			jkbanner.appendChild(close)
			var createA = {
				"tage": "a",
				"atrr": [{
					"href": banner.src
				}, {
					"target": "_blank"
				}, {
					"jktag": banner.jktag
				}]
			}
			var imglink = ceartElement(createA);
			jkbanner.appendChild(imglink)
			var createImg = {
				"tage": "img",
				"atrr": [{
					"src": banner.img
				}, {
					"class": "web-banner"
				}]
			}
			var img = ceartElement(createImg);
			imglink.appendChild(img);
			document.body.appendChild(frag);
			//创建节点
			function ceartElement(options) {
				var myele = document.createElement(options.tage);
				if (options.atrr != undefined) {
					for (var i = 0; i < options.atrr.length; i++) {
						for (var key in options.atrr[i]) {
							myele.setAttribute(key, options.atrr[i][key]);
						}
					}
				}
				if (options.text != undefined) {
					var text = document.createTextNode(options.text);
					myele.appendChild(text);
				}
				return myele
			}
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

	function addBanner() {
		var uuid = $.cookie("stat_uuid");
		var bannerswitch = $.cookie("bannerswitch");
		if (bannerswitch == "close") return false;
		$.ajax({
			type: "get",
			dataType: "jsonp",
			url: "http://stat.jikexy.com/Home/ApiCourse/getGradtype?callback=localHandler&uuid=" + uuid + "&sig=827003dd7d76fff0593df3f375e810c6TmbndQiEVxdQ7tK%2FzNioAHkShvUWhSPiL0Ti35zto0jJpgGge2d5DyvY5swRiv6uX%2FgS4xXdT15UC1xp%2BLcuXQ%3D%3D",
			success: function(data) {
				if (data.code == 200 && data.msg == "succ") {
					var type = data.data.type;
					if (document.getElementById("jkbanner")) {} else {
						if ($('link[href$="css/banner.min.css"]').length == 0) {
							$('<link rel="stylesheet" href="http://e' + EVENT_HOST_PRE + '/headerandfooter/css/banner.min.css" />').appendTo('head');
						}
						var mybanner = new JKbanner();
						mybanner.creatWebBanner(mybanner.gitConfig(type));
						var mydate = new Date();
						var year = mydate.getFullYear();
						var moth = mydate.getMonth() + 1;
						var day = mydate.getDate() + 1;
						var newDay = day - 5;
						var hour = mydate.getHours();
						var Minutes = mydate.getMinutes();
						var Seconds = mydate.getSeconds();
						var endTime = moth + "/" + day + "/" + year + " 00:00:00";
						var nowTime = moth + "/" + newDay + "/" + year + " " + hour + ":" + Minutes + ":" + Seconds;
						var mytime = (Date.parse(endTime) - Date.parse(nowTime)) / 1000 / 60 / 60 / 24;
						$.cookie("bannerswitch", "close", {
							expires: mytime,
							path: "/",
							domain: EVENT_HOST_PRE
						});
						stat.efunc({
							po: 15000401
						})
					}
				} else {
					console.log(data.msg)
				}
			},
			error: function() {
				alert("网络错误请刷新重试！")
			}
		});
	}
	window.onload = function() {
		setTimeout(function() {
			addBanner();
		}, 1000)
	}

}(window))