/**
 * Created by HenryTam on 2015/5/25.
 */

var Bmob=require('bmob').Bmob;
Bmob.initialize('658f6515b185c5e53d612986bb6f79c6','089c27ec398ea3934dd350ddd3760311');

exports.addADRecord=function(vAder,jsonArr){
    var AdRecord = Bmob.Object.extend("AdShowRecords");
    var adRecord = new AdRecord();
    //var Ader=Bmob.Object.extend("AdUnion");
    //var ader=new Ader();
    //ader.id=vAder.id;

    adRecord.set('ader',vAder);
// 添加数据，第一个入口参数是Json数据
    adRecord.save(jsonArr, {
        success: function(adRecord) {
            // 添加成功
            console.log('添加数据成功，返回的objectId是：' + adRecord.id);
        },
        error: function(adRecord, error) {
            // 添加失败
            console.log('添加数据失败，返回错误信息：' + error.description);
        }
    });
}