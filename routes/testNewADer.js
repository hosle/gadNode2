/**
 * Created by mavellers on 15/5/25.
 */
var newAd=require('../public/js/newADer');

var ader1={'aderName':'baidu','ratio':3,'timeGap':20,'fanxianCount':50};


exports.x=function(req,res,next){
    newAd.newADer(ader1);
    res.render('index',{title:'sucess'});
}


