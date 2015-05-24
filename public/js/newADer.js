/**
 * Created by mavellers on 15/5/25.
 */

var Bmob=require('bmob').Bmob;
Bmob.initialize('658f6515b185c5e53d612986bb6f79c6','089c27ec398ea3934dd350ddd3760311');

exports.newADer=function(jsonArr) {
    var adUnion = Bmob.Object.extend("adUnion");
    var adUnion = new adUnion();
    //adUnion.set("score", 137);
    //adUnion.set("playerName", "bmob");
    //adUnion.set("cheatMode", false);
//添加数据，第一个入口参数是null
    adUnion.save(jsonArr, {
        success: function (adUnion) {
            // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
            console.log('添加数据成功，返回的objectId是：' + adUnion.id);
        },
        error: function (adUnion, error) {
            // 添加失败
            console.log('添加数据失败，返回错误信息：' + error.description);
        }
    });
}