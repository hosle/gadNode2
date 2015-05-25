/**
 * Created by HenryTam on 2015/5/25.
 */

var Bmob=require('bmob').Bmob;
Bmob.initialize('658f6515b185c5e53d612986bb6f79c6','089c27ec398ea3934dd350ddd3760311');
//A6
var personalShowUpLimit;
var jiangetime;
/*

function search4Show
STEP1:搜索该用户展示上限未超过次数的广告商
 ΣB3<A6

 1.1该用户所有广告商的展示次数
 1.2从上面结果筛选出未超过上限的广告商集合
 */

/*
STEP2:该用户上一次展示时间大于时间间隔的广告商
nowtime-B4max>A3

2.1 获得申请时间（全局），计算间隔时间
2.2 从上面结果筛选大于时间间隔的广告商集合
 */

/*
STEP3:根据展示比重，确定可展示的广告商
B1[]*(A2/ΣA2)-->B1[]max

3.1 计算有权重的随机数
3.2 从上面结果确定最终展示的广告商
 */
var search4Show1=function(userId,ader,nowtime){
    var AdRecord=Bmob.Object.extend("AdShowRecords");
    var query=new Bmob.Query(AdRecord);
    query.equalTo("userId",userId);
    query.equalTo("aderName",ader);
    query.descending("applyTime");
    query.find({
            success: function(results) {
                // 查询成功，返回记录数量
                console("共有 " + results.length + " 条记录");
                var gaptime=nowtime-results[0].get('applyTime');
                if(results.length<personalShowUpLimit&&gaptime>=jiangetime)
                    return true;

            },
            error: function(error) {
                // 查询失败
            }
        }
    );
}

/*
function isClickable
STEP1:判断当前广告商，该用户展示累计次数是否达到要求
 ΣB3>=A4

STEP2:当前广告商，统一展示累计次数是否达到要求
 ΣB1>=A5


 */