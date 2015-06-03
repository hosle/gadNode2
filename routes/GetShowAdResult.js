/**
 * Created by mavellers on 15/5/25.
 */
var searchAdUnion=require('../public/javascripts/searchAdUnion');
var async=require('async');


exports.x=function(req,res,next){
    try{
        async.waterfall([
            function a(callback){
              searchAdUnion.search4Show(callback);
            }],
            function(err,result){
                var aderName=result.get('aderName');
                res.render('resultInfo',{info:aderName});
        });
    }catch (error)
    {
        console.log(error);
    }

    //res.render('resultInfo',{info:aderName});
}
exports.y=function(req,res,next){
    searchAdUnion.search4Show1();
    res.render('resultInfo',{info:'search4Show1'});
}

exports.z=function(req,res,next){
    try{
        async.waterfall([
                function a(callback){
                    var ader=req.query.ader;
                    if(ader!=null)
                        searchAdUnion.search4Click(ader,callback);
                    else
                        callback(null,'未选择具体广告商');
                }],
            function(err,result){

                res.render('resultInfo',{info:result});
            });
    }catch (error)
    {
        console.log(error);
    }
}