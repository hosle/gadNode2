/**
 * Created by HenryTam on 2015/5/25.
 */

var Bmob = require('bmob').Bmob;
Bmob.initialize('658f6515b185c5e53d612986bb6f79c6', '089c27ec398ea3934dd350ddd3760311');

var async = require('async');
var async2 = require('async');

var util = require('./util');

//A6
var personalShowUpLimit;
var jiangetime;

//B4max 最后一次申请de时间
var time_latestShow={'ctrip':''};

//符合条件的广告商集合
var adersCollection;

var userId = '000000';

/*
 对每一个广告商进行查询，找到该用户每个广告商的展示次数
 */
var countRecords_eachAder = function (aderslist, callback) {
    async2.map(aderslist, function (item, callback) {
        var AdRecord = Bmob.Object.extend("AdShowRecords");
        var query = new Bmob.Query(AdRecord);
        query.equalTo("userId", userId);
        query.equalTo("ader", item);
        query.descending("applyTime");
        query.find({
                success: function (results) {
                    // 查询成功，返回记录数量
                    //if(results.length<personalShowUpLimit)
                    if (results.length > 0) {
                        var itemName=item.get('aderName');
                        console.log(itemName + "共有 " + results.length + " 条记录");
                        //adersCollection2.push(results[0].get('ader'));
                        //console.log(results[0].get('adType'));
                        time_latestShow[itemName] =results[0].get('applyTimes');

                        //time_latestShow.itemName=results[0].get('applyTimes');
                        callback(null, results[0]);
                    } else
                        callback(null, '');
                },
                error: function (error) {
                    // 查询失败
                    callback(error, null);
                }
            }
        );
    }, function (err, results) {
        if (err) {
            console.error("error: " + err);
            return;
        }
        console.log("map,results:" + results.length + "个" + results);
        var i = 0;
        results.forEach(function (item) {
            i++;
            console.log(i + "-" + item);
        });
        //countResult= results;
        callback(err, results);
    });
}

/*
 反向获取广告商详细列表

 */
var getAderlist_detail = function (aderArr, callback) {
    async2.map(aderArr, function (item, callback) {
        var query = item.get('ader');
        //var user=item.get('ader');
        query.fetch({
            success: function (ader) {
                console.log("详细信息之" + ader.get('aderName'));
                callback(null, ader);
            }
        });
    }, function (err, results) {
        if (err) {
            console.error('error:' + err);
            return;
        }
        callback(err, results);
    });
}

exports.search4Show = function () {
    try {
        async.waterfall([
            //获得所有广告商
            function getAdCollection(callback) {
                var Aders = Bmob.Object.extend('AdUnion');
                var query = new Bmob.Query(Aders);
                query.find({
                        success: function (results) {
                            adersCollection = results;
                            console.log("所有广告商查询成功");
                            //console.log(results.length);
                            callback();
                        },
                        error: function (error) {
                            callback(error);
                        }
                    }
                );
            },
            function searchAllAder(callback) {
                console.log('adersCollection length:' + adersCollection.length);
                // var adersCollection2=[];
                console.log('userId:' + userId);

                countRecords_eachAder(adersCollection, callback);

            },
            function getAderlist(list, callback) {
                var newlist = util.delEmptyEle(list);
                console.log('去掉空值');

                var i = 0;
                newlist.forEach(function (item) {
                    i++;
                    console.log(i + ":" + item.get('ader'));
                });
                getAderlist_detail(newlist, callback);

            },
            function countGapTime(list,callback){

                var curTime=util.getCurrentTime();
                var newlist=[];
                for(var i=0;i<list.length;i++){
                    var itemName=list[i].get('aderName');
                    if(util.diffTime(curTime,time_latestShow[itemName])>list[i].get('timeGap')) {
                        newlist.push(list[i]);
                        console.log('diffTime'+util.diffTime(curTime,time_latestShow[itemName]));
                        console.log(list[i].get('aderName'));
                        //console.log('timeGap:'+list[i].get('timeGap'));}
                    }
                }
                callback(null,newlist);
            }

        ], function (err, result) {
            if (err)throw err;
            if (result != null)
                //console.log("最终结果" + result[0].get('aderName'));
            result.forEach(function(a){
             console.log("最终新筛选广告商数组"+ a.get('aderName'));
             });
            //console.log(result);
        });

    } catch (err) {
        console.log(err);
    }
}
/*

 function search4Show
 STEP1:搜索该用户展示上限未超过次数的广告商
 ΣB3<A6

 1.1获得所有广告商名单
 1.2该用户每个广告商的展示次数
 1.3从上面结果筛选出未超过上限的广告商集合
 1.4反向获取广告商详细列表
 1.5输出广告商集合
 */

/*
 STEP2:该用户上一次展示时间大于时间间隔的广告商
 nowtime-B4max>A3

 2.1 计算间隔时间
 2.2 从上面结果筛选大于时间间隔的广告商集合
 */

/*
 STEP3:根据展示比重，确定可展示的广告商
 B1[]*(A2/ΣA2)-->B1[]max

 3.1 计算有权重的随机数
 3.2 从上面结果确定最终展示的广告商
 */

/*
 ----------------test function-------------------
 */
//获得所有广告商
function getAdCollection1() {
    var Aders = Bmob.Object.extend('AdUnion');
    var query = new Bmob.Query(Aders);
    query.find({
            success: function (results) {
                adersCollection = results;
                console.log("所有广告商查询成功");
                console.log(results.length);

            },
            error: function (error) {

            }
        }
    );
};

/*

 访问数据库是一个耗时的过程，
 不采取异步方式，读取数据库的过程会报错。
 */
function searchAllAder1() {
    console.log('adersCollection length:' + adersCollection.length);
    var adersCollection2 = [];
    console.log('userId:' + userId);

    adersCollection.forEach(function (ader) {

        var AdRecord = Bmob.Object.extend("AdShowRecords");
        var query = new Bmob.Query(AdRecord);

        query.equalTo("userId", userId);
        query.equalTo("ader", ader);
        //query.descending("applyTime");
        query.find({
                success: function (results) {
                    // 查询成功，返回记录数量
                    console.log(ader.get('aderName') + "共有 " + results.length + " 条记录");
                    //if(results.length<personalShowUpLimit)
                    if (results.length > 0)
                        adersCollection2.push(results[0].get('ader'));


                },
                error: function (error) {
                    // 查询失败

                }
            }
        );


    });

}
exports.search4Show1 = function () {
    getAdCollection1();
    searchAllAder1();
}

/*
 function isClickable
 STEP1:判断当前广告商，该用户展示累计次数是否达到要求
 ΣB3>=A4

 STEP2:当前广告商，统一展示累计次数是否达到要求
 ΣB1>=A5


 */