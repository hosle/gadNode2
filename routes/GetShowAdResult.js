/**
 * Created by mavellers on 15/5/25.
 */
var searchAdUnion=require('../public/javascripts/searchAdUnion');
var async=require('async');
var util=require('../public/javascripts/util');


exports.x=function(req,res,next){
    try{
        async.waterfall([
            function a(callback){
                var uid=req.query.uid;
              searchAdUnion.search4Show(uid,callback);
            }],
            function(err,result) {
                if (result != null) {

                    var aderName = result.get('aderName');
                    var currenttime = util.getCurrentTime();
                }else
                {
                    var aderName = null;
                    var currenttime = null;
                }
                //res.render('resultInfo',{info:aderName});
                res.end(JSON.stringify({info: aderName, applytime: currenttime}));

                //res.json({info:aderName,applytime:currenttime});
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
                    var uid=req.query.uid;
                    var ader=req.query.ader;
                    if(ader!=null)
                        searchAdUnion.search4Click(uid,ader,callback);
                    else
                        callback(null,'未选择具体广告商');
                }],
            function(err,result){

                //res.render('resultInfo',{info:result});
                res.end(result);
            });
    }catch (error)
    {
        console.log(error);
    }
}