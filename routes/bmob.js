/*
bmob.cn
773824503@qq.com
123456
 */
var express = require('express');
var Bmob=require('bmob').Bmob;
Bmob.initialize('658f6515b185c5e53d612986bb6f79c6','089c27ec398ea3934dd350ddd3760311');
var router = express.Router();

var Game = Bmob.Object.extend("Game");
var query = new Bmob.Query(Game);

query.equalTo("source", "innerPintu4");
// 查询所有数据
query.find({
  success: function(results) {
    //alert("共查询到 " + results.length + " 条记录");
    // 循环处理查询到的数据
    //for (var i = 0; i < results.length; i++) {
    //  var object = results[i];
    //  alert(object.id + ' - ' + object.get('playerName'));
    //
    //}
    /* GET home page. */
    router.get('/', function(req, res, next) {
    //  res.render('index', { title: results[0].get('preference') });
      res.send({title:results[0].get('preference')})
    });
  },
  error: function(error) {
    alert("查询失败: " + error.code + " " + error.message);
  }
});



module.exports = router;
