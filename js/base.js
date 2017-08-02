function stopDefault(e) {
	//如果提供了事件对象，则这是一个非IE浏览器  
	if(e && e.preventDefault) {    
    　　//阻止默认浏览器动作(W3C)    
    　　e.preventDefault();    
    } else {    
    　　//IE中阻止函数器默认动作的方式     
    　　window.event.returnValue = false;     
    }    
    return false;    
}

function stopBubble(e) {
	//如果提供了事件对象，则这是一个非IE浏览器
	if(e && e.stopPropagation) {
		//因此它支持W3C的stopPropagation()方法 
		e.stopPropagation(); 
	}else{
		//否则，我们需要使用IE的方式来取消事件冒泡 
		window.event.cancelBubble = true; 
	}
	return false;  
}

function preventDefault(event) {
    var e = event || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}

// 语言增强
function isType(type) {
    return function(obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']';
    };
}

// 扩展Array.prototype.indexOf  Array在javascript1.6版本已经支持Array.indexOf()\
//  ie8 及以下不支持

Array.prototype.indexOf = function(item) {
    for(var i=0; i<this.length; i++) {
        if(this[i] == item) 
            return i;
    }

    return -1;
}

var arr = [1,2,3,4,5];
var index = arr.indexOf(1);

var a=["张飞","关羽","刘备","吕布"]; 
for(var p in a){ 
    if(a.hasOwnProperty(p)){ 
        document.write(p+"="+a[p]+"<br/>"); 
    } 
}