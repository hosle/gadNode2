/**
 * Created by HenryTam on 2015/7/3.
 */

var Bmob=require('bmob').Bmob;
var delR=require('../public/javascripts/delADRecord');

exports.x=function(req,res,next){

    var ader=req.query.ader;
    var uid=req.query.uid;

    var Aders = Bmob.Object.extend('AdUnion');
    var query = new Bmob.Query(Aders);
    query.equalTo('aderName',ader);
    query.find({
            success: function (results) {
                console.log(ader+"的id："+results[0].id);
                console.log("当前用户id:"+uid);

                delR.delADRecord(results[0],uid);

                //res.render('resultInfo',{info:'addnewRecord sucess'});
                res.end("clear record success");
            },
            error: function (error) {
                console.log(error);

            }
        }
    );

}