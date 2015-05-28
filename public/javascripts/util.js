/**
 * Created by mavellers on 15/5/27.
 */

/*
删除数组中的空元素
 */
exports.delEmptyEle=function(arr){
for(var i = 0 ;i<arr.length;i++)
{
    if(arr[i] == "" || typeof(arr[i]) == "undefined")
    {
        arr.splice(i,1);
        i= i-1;
    }

}
    return arr;
}

/*
获取当前时间
 */
exports.getCurrentTime=function(){
    var d=new Date();
    var str= d.getFullYear()+'-'+ (d.getMonth()+1)+'-'+ d.getDate()+' '+ d.getHours()+'-'+ d.getMinutes()+'-'+ d.getSeconds();

    return d;
}

/*
计算时间差
 */
exports.diffTime=function(dt1,dt2){
    var dt2s=new Date(dt2);
    try
    {
        //alert(dt2.getTime() - dt1.getTime());
        //alert(eval_r('objInterval.'+interval));
        //alert((dt2.getTime() - dt1.getTime()) / eval_r('objInterval.'+interval));
        return Math.round((dt1.getTime() - dt2s.getTime()) / 1000);
    }
    catch (e)
    {
        return e.message;
    }
}