/**
 * Created by mavellers on 15/5/25.
 */
var newAd=require('../public/javascripts/newADer');
var adrecord=require('../public/javascripts/addADRecord');

var ader1={'aderName':'baidu','ratio':3,'timeGap':20,'fanxianCount':50};
var adrecord1={'aderName':'baidu','adType':0,'userId':'000000','applyTime':'','duringTime':''};

exports.x=function(req,res,next){
    newAd.newADer("AdUnion",ader1);
    adrecord.addADRecord(adrecord1);
    res.render('resultInfo',{info:'sucess'});
}


