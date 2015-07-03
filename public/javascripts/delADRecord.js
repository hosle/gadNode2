/**
 * Created by HenryTam on 2015/7/3.
 */


var Bmob=require('bmob').Bmob;
Bmob.initialize('658f6515b185c5e53d612986bb6f79c6','089c27ec398ea3934dd350ddd3760311');

exports.delADRecord=function(vAder,vUid){
    var AdRecord = Bmob.Object.extend("AdShowRecords");
    var query = new Bmob.Query(AdRecord);

    query.equalTo('userId',vUid);
    query.equalTo('ader',vAder);

    query.find({
        success: function(results) {
            // 查找成功
            results.forEach(function(item){
                item.destroy({
                    success:function(myObject){
                        console.log('删除成功记录成功');
                    },
                    error:function(myObject,error){
                        console.log('删除成功记录失败：'+error.description);

                    }
                });
            });

        },
        error: function(myObject, error) {
            // 查找失败
            console.log('查找数据失败，返回错误信息：' + error.description);
        }
    });
}