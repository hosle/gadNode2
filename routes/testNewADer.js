/**
 * Created by mavellers on 15/5/25.
 */
var newAd=require('../public/javascripts/newADer');
var adrecord=require('../public/javascripts/addADRecord');
var util=require('../public/javascripts/util');
var Bmob=require('bmob').Bmob;
Bmob.initialize('658f6515b185c5e53d612986bb6f79c6','089c27ec398ea3934dd350ddd3760311');

var ader1={'aderName':'baidu','ratio':3,'timeGap':20,'totalShowLowerLimit':50,'personalShowUpLimit':100};
var ader2={'aderName':'ali','ratio':4,'timeGap':30,'totalShowLowerLimit':50,'personalShowUpLimit':50};
var currenttime=util.getCurrentTime();
var adrecord1={'adType':33,'userId':'000000','duringTime_sec':'10'};
var adrecord2={'adType':34,'userId':'000008','duringTime_sec':'10'};
adrecord2.applyTime=currenttime;
adrecord1.applyTime=currenttime;
/*
添加某个广告商的show纪录
 */
exports.x=function(req,res,next){
    //newAd.newADer("AdUnion",ader1);
    var Aders = Bmob.Object.extend('AdUnion');
    var query = new Bmob.Query(Aders);
    query.equalTo('aderName','gdt');
    query.find({
            success: function (results) {
                console.log(results[0].id+"");
                //adrecord1.ader=results[0];
                adrecord.addADRecord(results[0],adrecord2);
                //adrecord.addADRecord(ader1,adrecord2);
                res.render('resultInfo',{info:'sucess'});
            },
            error: function (error) {
                console.log(error);

            }
        }
    );

}


