/**
 * Created by mavellers on 15/5/25.
 */

var Bmob=require('bmob').Bmob;
Bmob.initialize('658f6515b185c5e53d612986bb6f79c6','089c27ec398ea3934dd350ddd3760311');

exports.newADer=function(tablename,jsonArr) {
    var Table = Bmob.Object.extend(tablename);
    var table = new Table();

     //adUnion.set("score", 137);
    //adUnion.set("playerName", "bmob");
    //adUnion.set("cheatMode", false);


//������ݣ���һ����ڲ�����null
    table.save(jsonArr, {
        success: function (tablename) {
            // ��ӳɹ������سɹ�֮���objectId��ע�⣺���ص�����������id������objectId�����㻹������Bmob��Web�����̨������Ӧ������
            console.log('������ݳɹ������ص�objectId�ǣ�'  + tablename.id);
        },
        error: function (tablename, error) {
            // ���ʧ��
            console.log('�������ʧ�ܣ����ش�����Ϣ��' + error.description);
        }
    });
}