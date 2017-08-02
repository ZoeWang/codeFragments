var post = require('../conf/post'); //调取mysql数据库
var  listModel = {
	name:function(req, res, next) {
		post.get("wangxiufang",function(rows){
			console.log("ssdsdsdsdsdsssssssssssss",rows)
			res.json(rows)
		})
	},
	all:function(req, res, next) {
		post.getAll(function(rows){
			console.log("ssdsdsdsdsdsssssssssssss",rows)
			res.json(rows)
		})
	},
	add:function(req, res, next) {
		var _data = {
			"_name":"caojiangtao",
			"age":"33"
		}
       var mydb = new post();
       mydb.add(_data,function(rows){

       		res.json(rows)
       });
	}
}








module.exports  = listModel