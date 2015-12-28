$(function(){
    $("#jdropdown>li>div").Jdropdown({
        delay: 10
    }, function(e) {

    })

    var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        pagination: '.swiper-pagination',
        slidesPerView: 1,
        loop: true,
        paginationClickable: true
    });
});
(function(jQuery) {
    jQuery.fn.Jdropdown = function(d, e) {
        if (!this.length) {
            return
        }
        if (typeof d == "function") {
            e = d;
            d = {}
        }
        var c = jQuery.extend({
            event: "mouseover",
            current: "hover",
            delay: 0,
            fun: "default"
        }, d || {});
        var b = (c.event == "mouseover") ? "mouseout" : "mouseleave";
        jQuery.each(this, function() {
            var h = null,
                g = null,
                f = false;
            jQuery(this).bind(c.event, function() {
                if (f) {
                    clearTimeout(g)
                } else {
                    var j = jQuery(this);
                    // console.log(j);
                    h = setTimeout(function() {
                        if( c.fun == "default" )
                        {
                            var menu_item_wrap =j.find('.menu-item-wrap');
                            var _flag_temp = 0;
                            if(menu_item_wrap.length!=0){
                               var o_menu_in = $(menu_item_wrap.text());
                                j.append(o_menu_in); 
                                menu_item_wrap.remove();
                                _flag_temp =1;
                            }
                            j.addClass(c.current).children(".list-show").show();

                            var _c = j.children(".list-show");
                            var _c_height = _c.height();
                            var _t_height = j.height();
                            var _c_to_top = j.offset().top-$(window).scrollTop()+_c_height;
                            var _j_to_top = j.offset().top-$(window).scrollTop()+_t_height;
                            var _c_to_bottom =$(window).height()-_c_to_top;
                             var tg_top = _c_to_bottom-30;
                            if (_c_to_bottom < 30&&tg_top!=(-1)&&tg_top!=1) {
                               
                                if(($(window).height()-30)<_j_to_top){
                                    var border_height = 2;
                                    _c.css('top','-'+(_c_height-_t_height+border_height)+'px')
                                }else{
                                         _c.css('top',tg_top+'px');
                                }
                                
                            }else{
                                _c.css('top','-1px');
                            }
                        }
  
                        f = true;
                        if (e) {
                            e(j)
                        }
                    }, c.delay)
                }
            }).bind(b, function() {
                if (f) {
                    var j = jQuery(this);
                    g = setTimeout(function() {
                        if( c.fun == "default" )
                        {
                            j.removeClass(c.current).children(".list-show").hide();

                        }    

                        f = false
                    }, c.delay)
                } else {
                    clearTimeout(h)
                }
            })
        })
    }
})(jQuery);