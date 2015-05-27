/**
 * Created by mavellers on 15/5/25.
 */
var searchAdUnion=require('../public/javascripts/searchAdUnion');


exports.x=function(req,res,next){
    searchAdUnion.search4Show();
    res.render('resultInfo',{info:'sucess'});
}
exports.y=function(req,res,next){
    searchAdUnion.search4Show1();
    res.render('resultInfo',{info:'search4Show1'});
}

