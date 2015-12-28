/* -----------------------------------------/
 * 功能：弹出层显示及居中显示
 * 参数：
 * 返回：
 * 作者：ZhangHaiBin
/ ---------------------------------------- */
(function($) {
    // 弹出层
    $.fn.popup = function(options) {
        var sets = $.extend({
            'popup': null, // 弹出层id
            'url': null, // 要插入的HTML的URL, 如果弹层隐藏在页面中, 则不用设置
            'html': null, // 弹层 html 字符串
            'mask': 'js-mask', // 遮罩[id|class|tag], null不显示遮罩
            'maskclass': null, // 设置遮罩样式的 class
            'position': 'fixed', // 定位类别[fixed|absolute]
            'noscroll': false, // 是否禁止页面滚动[true|false]
            'zindex': 1000, // z-index值
            'opacity': .5, // 遮罩不透明度
            'width': null,  // 宽度
            'height': null, // 高度
            'timer': null,   // 倒计时关闭(正整数,以秒为单位)
            'output': null,   // 倒计时数字输出位置
            'esc': true, // 按 ESC 键关闭弹层
            'jump': null,    // 关闭时跳转URL
            'fn': null, // 弹出调用函数
            'callback': null // 关闭回调
        }, options);

        // 如果popup参数为设置, 则返回
        if (!sets.popup) throw new Error('"popup"参数未定义');

        var popup = $('#' + sets.popup);
        var mask = $('#' + sets.mask);

        var timeout;
        var method = {
            // 关闭其他活动出弹层
            closeActive: function() {
                $('body').find('[popup-status="show"]').attr('popup-status','hide').find('.close').click();
            },
            // 遮罩
            mask: function() {
                var mask = $('#' + sets.mask);
                if (mask.length > 0) {
                    // 如果遮罩以显示, 则返回
                    if (mask.is(':visible')) return true;
                    mask.css({zIndex: sets.zindex}).stop(true, true).fadeIn(300);
                } else {
                    var maskNode = $('<div id="' + sets.mask + '">');
                    maskNode.attr('class', sets.maskclass ? sets.maskclass : 'js-mask');
                    $('body').append(maskNode);
                    // 设置遮罩样式
                    maskNode.hide().css({
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        zIndex: sets.zindex ? sets.zindex : 1000,
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000',
                        opacity: sets.opacity
                    }).stop(true, true).fadeIn(300);
                }
                return false;
            },
            // 禁止页面滚动
            noscroll: function() {
                var html = $('html');
                var origin = html.attr('style');
                html.css({overflow: 'hidden'});
                return origin;
            },
            // 倒计时关闭
            timer: function(time, node) {
                // 参数说明:
                // 1. time是设定的倒计时时间;
                // 2. node是自定义显示倒计时的位置;
                if ((typeof time != 'number') || time <= 1) throw new Error('参数类型错误或小于等于1');
                var _time = Math.ceil(time - 1);
                var popup = $('#' + sets.popup);
                // 显示倒计时
                popup.find(node).text(_time + '秒');
                window.clearTimeout(timeout);
                // 倒计时开始
                timeout = window.setTimeout(function() {
                    if (_time > 1) {
                        // 显示倒计时
                        popup.find(node).text(_time + '秒');
                        return method.timer(_time, node);
                    } else {
                        $('#' + sets.popup + ' .close').click();
                    }
                }, 1000);
            },
            //关闭按钮
            close: function(obj, noscroll) {
                var mask = $('#' + sets.mask);
                if (mask.length) mask.hide();
                window.clearTimeout(timeout);
                // 取消禁止页面滚动
                if (sets.noscroll === true) {
                    if (noscroll == undefined) {
                        $('html').removeAttr('style');
                    } else {
                        $('html').attr('style', noscroll);
                    }
                }
                // 跳转
                if (sets.jump !== null) document.location = sets.jump;
                // 设置弹层属性
                var _popup = obj.parents('#' + sets.popup);
                var _mark = _popup.attr('popup-mark');
                _popup.attr('popup-status', 'hide');
                // 如果popmark属性为own则隐藏，否则删除
                if (_mark == 'own') {
                    _popup.hide();
                } else {
                    _popup.remove();
                }
                // 关闭回调
                if (sets.callback !== null) sets.callback();
            },
            esc: function(popup) {
                $('body').delegate(popup, 'keyup', function(event) {
                    if (event.keyCode == 27) popup.find('.close').click();
                });
            },
            //弹层定位
            position: function(popup, position) {
                var popup = $('#' + popup),
                    win = $(window),
                    winW = win.width(),
                    winH = win.height(),
                    popupW = popup.width(),
                    popupH = popup.height(),
                    scrollT = win.scrollTop(),
                    scrollL = win.scrollLeft();
                if (popupH > winH) {
                    // 如果弹层高度大于视窗高度, popupTop为滚动条Top值
                    var popupTop = scrollT,
                        popupLeft = (winW - popupW) / 2 + scrollL;
                    popup.css({
                        position: 'absolute',
                        top: popupTop,
                        left: popupLeft,
                        margin: 0
                    });
                } else if (position == 'fixed') {
                    var popupTop = (winH - popupH) / 2,
                        popupLeft = (winW - popupW) / 2;
                    popup.css({
                        position: 'fixed',
                        top: popupTop,
                        left: popupLeft,
                        margin: 0
                    });
                } else if (position == 'absolute') {
                    var popupTop = (winH - popupH) / 2 + scrollT,
                        popupLeft = (winW - popupW) / 2 + scrollL;
                    popup.css({
                        position: 'absolute',
                        top: popupTop,
                        left: popupLeft,
                        margin: 0
                    });
                }
            }
        };
        // 弹出层显示
        if (popup.length > 0) {
            var _scroll, mask, zIndex;
            // 如果该弹层已弹出, 则返回
            if (popup.is(':visible')) return;
            // 关闭其他活动出弹层
            method.closeActive();
            // 判断是否启用遮罩
            if (sets.mask) method.mask();
            mask = $('#' + sets.mask);
            // 显示自有弹层并添加属性
            popup.hide().attr({'popup-status': 'show', 'popup-mark': 'own'}).stop(true, true).fadeIn(300);
            // 禁止页面滚动
            if (sets.noscroll === true) _scroll = method.noscroll();
            // 设置样式
            if (sets.width) popup.css('width', sets.width + 'px');
            if (sets.height) popup.css('height', sets.height + 'px');
            if (sets.zindex) {
                popup.css({zIndex: Number(sets.zindex) + 10});
            } else {
                zIndex = mask.css('z-index');
                popup.css({zIndex: Number(zIndex) + 10});
            }
            // 绑定关闭弹层事件
            popup.find('.close').bind('click', function() {
                method.close($(this), _scroll);
            });
            // 弹层定位
            method.position(sets.popup, sets.position);
            // 弹出调用函数
            if (sets.fn) sets.fn(method);
            // 倒计时关闭
            if (sets.timer) method.timer(sets.timer, sets.output);
            if (sets.esc === true) method.esc(popup);
        } else if (sets.html) {
            var popup = $('#' + sets.popup);
            var _scroll, mask, zIndex;
            // 如果该弹层已弹出, 则返回
            if (popup.length) return;
            // 关闭其他已弹出弹层
            method.closeActive();
            // 判断是否启用遮罩
            if (sets.mask) maskstatus = method.mask();
            mask = $('#' + sets.mask);
            $('body').append(sets.html);
            // 禁止页面滚动
            if (sets.noscroll === true) _scroll = method.noscroll();
            popup = $('#' + sets.popup);
            // 添加属性
            popup.hide().attr('popup-status', 'show').stop(true, true).fadeIn(300);
            // 设置样式
            if (sets.width) popup.css('width', sets.width + 'px');
            if (sets.height) popup.css('height', sets.height + 'px');
            if (sets.zindex) {
                popup.css({zIndex: Number(sets.zindex) + 10});
            } else {
                zIndex = mask.css('z-index');
                popup.css({zIndex: Number(zIndex) + 10});
            }
            popup.find('.close').bind('click', function() {
                method.close($(this), _scroll);
            });
            // 弹层定位
            method.position(sets.popup, sets.position);
            // 弹出调用函数
            if (sets.fn) sets.fn(method);
            // 倒计时关闭
            if (sets.timer) method.timer(sets.timer, sets.output);
            if (sets.esc === true) method.esc(popup);
        } else if (sets.url) {
            $.ajax({
                type: 'GET',
                url: sets.url,
                dataType: 'html',
                success: function(res) {
                    var popup = $('#' + sets.popup);
                    var _scroll, mask, zIndex;
                    // 如果该弹层已弹出, 则返回
                    if (popup.length) return;
                    // 关闭其他已弹出弹层
                    method.closeActive();
                    // 判断是否启用遮罩
                    if (sets.mask) maskstatus = method.mask();
                    mask = $('#' + sets.mask);
                    $('body').append(res);
                    // 禁止页面滚动
                    if (sets.noscroll === true) _scroll = method.noscroll();
                    popup = $('#' + sets.popup);
                    // 添加属性
                    popup.hide().attr('popup-status', 'show').stop(true, true).fadeIn(300);
                    // 设置样式
                    if (sets.width) popup.css('width', sets.width + 'px');
                    if (sets.height) popup.css('height', sets.height + 'px');
                    if (sets.zindex) {
                        popup.css({zIndex: Number(sets.zindex) + 10});
                    } else {
                        zIndex = mask.css('z-index');
                        popup.css({zIndex: Number(zIndex) + 10});
                    }
                    popup.find('.close').bind('click', function() {
                        method.close($(this), _scroll);
                    });
                    // 弹层定位
                    method.position(sets.popup, sets.position);
                    // 弹出调用函数
                    if (sets.fn) sets.fn(method);
                    // 倒计时关闭
                    if (sets.timer) method.timer(sets.timer, sets.output);
                    if (sets.esc === true) method.esc(popup);
                }
            });
        } else {
            return false;
        }
        // 窗口调整时重新定位
        $(window).resize(function() {
            method.position(sets.popup, sets.position);
        });
    };
})(jQuery);
