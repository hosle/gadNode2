/**
 * Created by mavellers on 15/5/28.
 */
var addR=require('../public/javascripts/addADRecord');


exports.x=function(req,res,next){
    //req获取ader,jsonArr;
    var ader;
    var jsonArr;

    //addR.addADRecord();
    res.render('resultInfo',{info:'addnewRecord success'});
}