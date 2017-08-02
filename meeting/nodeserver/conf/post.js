
    //按照字段获取数据
	var db = require('../conf/db');
    var Post = function(){};

	Post.get = function(name,callback){	
		if(typeof arguments[0] != "string" ){
			var warning = {"warning":"查询条件不能为空！"};
			return arguments[0](warning);
		}

		db.query('SELECT * FROM `user` WHERE name = "'+name+'"', function(err, rows, fields) {
		  if (err) {
		  	console.log(err)
			return callback(err);
			db.end();
		  }else{
		  	    var data ={
		  	    	code:"200",
		  	    	msg:"获取数据成功",
		  	    	data:rows
		  	    };
		  		callback(data);
		  	  
		  }	  	

		});
	},
	//获取全部数据
	Post.getAll= function(callback){
		db.query('SELECT * FROM `user`', function(err, rows, fields) {
		  if (err) {
		  	console.log(err)
			return callback(err);
			db.end();
			
		  }else{
		  	 var data ={
		  	    	code:"200",

		  	    	msg:"获取数据成功",
		  	    	data:rows
		  	    };
		  	  callback(data);
		  }

		});
	};
	//插入数据
	Post.prototype.add = function(data,callback){
		if(typeof arguments[0] != "object" ){
			var warning = {"warning":"查询条件不能为空！"};
			return arguments[0](warning);
		}
	   var date = new Date();
	   var time = {
	        date: date,
	        year: date.getFullYear(),
	        month: date.getFullYear() + "-" + (date.getMonth() + 1),
	        day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
	        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
	        date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	    };
	    var minute = time.minute;

		var updata = 'INSERT INTO user (name,age,time) VALUES ("'+data._name+'","'+data.age+'","'+minute+'")';

		db.query(updata, function(err, rows, fields) {
		  if (err) {
		  	console.log(err)
			return callback(err);
			db.end();
		  }else{
		  	    var data ={
		  	    	code:"200",
		  	    	msg:"添加数据成功",
		  	    	data:rows
		  	    };
		  		callback(data);
		  	  
		  }
		}); 
	};


	module.exports = Post;