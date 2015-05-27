/**
 * Created by mavellers on 15/5/27.
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