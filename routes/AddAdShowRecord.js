/**
 * Created by mavellers on 15/5/28.
 */
var addR=require('../public/javascripts/addADRecord');
var util=require('../public/javascripts/util');
var Bmob=require('bmob').Bmob;

    /*
     添加某个广告商的show纪录
     */
exports.x=function(req,res,next){
        //req获取ader,jsonArr;

        var currenttime=util.getCurrentTime();
        //var jsonArr={"adType":33,"duringTime":"200","userId":"000001","applyTime":currenttime};

        var jsonArr=JSON.parse(req.body.jsonArrpost);
        var applytime=new Date(req.body.applytime);
        var duringtime=util.diffTime(currenttime,applytime);
         var ader=req.body.adername;

        //添加时间
        jsonArr["applyTime"]=applytime;
        jsonArr["duringTime_sec"]=duringtime;
        //newAd.newADer("AdUnion",ader1);
        var Aders = Bmob.Object.extend('AdUnion');
        var query = new Bmob.Query(Aders);
        query.equalTo('aderName',ader);
        query.find({
                success: function (results) {
                    console.log(results[0].id+"");
                    //adrecord1.ader=results[0];
                    addR.addADRecord(results[0],jsonArr);
                    //adrecord.addADRecord(ader1,adrecord2);
                    //res.render('resultInfo',{info:'addnewRecord sucess'});
                    res.end("show success");
                },
                error: function (error) {
                    console.log(error);

                }
            }
        );

}
