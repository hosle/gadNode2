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

    //index
    app.use('/',index);

    //bmob
    app.use('/bmob', bmob);

    //users
    app.use('/users',users);

    //testNewADer
    app.get('/new',newer.x);

}

module.exports=router;