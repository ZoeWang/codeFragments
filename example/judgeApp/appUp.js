/**
 * 虽然在Js中可以启动某个app，但是并不能判断该app是否安装；
 * 启动app需要的时间较长，js中断时间长，如果没安装，js瞬间就执行完毕
 */


if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    testApp('jikexueyuan://category','https://itunes.apple.com/us/app/ji-ke-xue-yuan-zhong-guo-zui/id888244849?l=zh&ls=1&mt=8');


} else if (navigator.userAgent.match(/android/i)) {
    testApp('jikexueyuan://category','http://android.myapp.com/myapp/detail.htm?apkName=com.jikexueyuan.geekacademy');
}

function testApp(app,url){
	var timeout, t = 1000, hasApp = true;
    setTimeout(function(){
    	if(!hasApp){
    		// 未安装app 跳转店铺下载
    		window.location = url;
    	}
    	document.body.removeChild(ifr);
    },2000)

    var t1 = Date.now();
    var ifr = document.createElement('iframe');
    ifr.setAttribute('src',app);
    ifr.setAttribute('style', 'display:none');  
	    document.body.appendChild(ifr);  
	    timeout = setTimeout(function () {  
	         var t2 = Date.now();  
	         if (!t1 || t2 - t1 < t + 100) {  
	             hasApp = false;  
	         }  
	    }, t);  
}

// 判断设备
// if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
//     var loadDateTime = new Date();
//     window.setTimeout(function() {
//          var timeOutDateTime = new Date();
//          if (timeOutDateTime - loadDateTime < 5000) {
//          window.location = "https://itunes.apple.com/us/app/ji-ke-xue-yuan-zhong-guo-zui/id888244849?l=zh&ls=1&mt=8";
//          } else {
//          window.close();
//          }
//     },
//     2000);

//     var ifrSrc = 'jikexueyuan://category';
//  var ifr = document.createElement('iframe');
//  ifr.src = ifrSrc;
//  ifr.style.display = 'none';
//  document.body.appendChild(ifr);
//  setTimeout(function() {
//      document.body.removeChild(ifr);
//  },1000);

// } else if (navigator.userAgent.match(/android/i)) {
//     var loadDateTime = new Date();
//     window.setTimeout(function() {
//          var timeOutDateTime = new Date();
//          if (timeOutDateTime - loadDateTime < 5000) {
//          window.location = "http://android.myapp.com/myapp/detail.htm?apkName=com.jikexueyuan.geekacademy ";
//          } else {
//              window.close();
//          }
//     },
//     2000);

//     var ifrSrc = 'jikexueyuan://category';
//  var ifr = document.createElement('iframe');
//  ifr.src = ifrSrc;
//  ifr.style.display = 'none';
//  document.body.appendChild(ifr);
//  setTimeout(function() {
//      document.body.removeChild(ifr);
//  },1000);
// }