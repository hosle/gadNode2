/**
 * Created by mavellers on 15/5/24.
 */
var express = require('express');
var router = express.Router();

router.mapRoute=function(app){

    var index = require('./');
    var users = require('./users');
    var bmob=require('./bmob');
    var newer=require('./testNewADer');
    var searchresult=require('./GetShowAdResult')

    //index
    app.use('/',index);

    //bmob
    app.use('/bmob', bmob);

    //users
    app.use('/users',users);

    //testNewADer
    app.get('/new',newer.x);

    //getResult
    app.get('/search',searchresult.x);
    //getResult 不采取异步的方式
    app.get('/search1',searchresult.y);

}

module.exports=router;