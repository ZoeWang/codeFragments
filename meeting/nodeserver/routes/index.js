var express = require('express');
var router = express.Router();
var db = require('../conf/db'); //调取mysql数据库
var listModel = require('../models/listModel'); //调用逻辑模块
var indexModel = require('../models/indexModel')//首页
//链接数据库
db.connect(function(err) {
  if (err) {
    console.error('error connecting(链接服务器错误): ' + err.stack);
    return;
  }
});

router.get('/',indexModel.init);
router.get('/name',listModel.name);
router.get('/all',listModel.all);
router.get('/add', listModel.add);

module.exports = router;