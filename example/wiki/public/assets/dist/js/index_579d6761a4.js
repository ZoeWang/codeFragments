webpackJsonp([0,2],[function(e,n,t){$(function(){$("#jdropdown>li>div").Jdropdown({delay:10},function(e){});new Swiper(".swiper-container",{nextButton:".swiper-button-next",prevButton:".swiper-button-prev",pagination:".swiper-pagination",slidesPerView:1,loop:!0,paginationClickable:!0})}),function(e){e.fn.Jdropdown=function(n,t){if(this.length){"function"==typeof n&&(t=n,n={});var i=e.extend({event:"mouseover",current:"hover",delay:0,fun:"default"},n||{}),o="mouseover"==i.event?"mouseout":"mouseleave";e.each(this,function(){var n=null,s=null,r=!1;e(this).bind(i.event,function(){if(r)clearTimeout(s);else{var o=e(this);n=setTimeout(function(){if("default"==i.fun){var e=o.find(".menu-item-wrap"),n=0;if(0!=e.length){var s=$(e.text());o.append(s),e.remove(),n=1}o.addClass(i.current).children(".list-show").show();var l=o.children(".list-show"),u=l.height(),a=o.height(),f=o.offset().top-$(window).scrollTop()+u,d=o.offset().top-$(window).scrollTop()+a,p=$(window).height()-f,c=p-30;if(30>p&&-1!=c&&1!=c)if($(window).height()-30<d){var h=2;l.css("top","-"+(u-a+h)+"px")}else l.css("top",c+"px");else l.css("top","-1px")}r=!0,t&&t(o)},i.delay)}}).bind(o,function(){if(r){var t=e(this);s=setTimeout(function(){"default"==i.fun&&t.removeClass(i.current).children(".list-show").hide(),r=!1},i.delay)}else clearTimeout(n)})})}}}(jQuery)}]);
/*
//@ sourceMappingURL=index.js.map
*/