/**
 * Created by mavellers on 15/5/25.
 */

var Bmob=require('bmob').Bmob;
Bmob.initialize('658f6515b185c5e53d612986bb6f79c6','089c27ec398ea3934dd350ddd3760311');

exports.newADer=function(jsonArr) {
    var adUnion = Bmob.Object.extend("adUnion");
    var adUnion = new adUnion();
    //adUnion.set("score", 137);
    //adUnion.set("playerName", "bmob");
    //adUnion.set("cheatMode", false);
//������ݣ���һ����ڲ�����null
    adUnion.save(jsonArr, {
        success: function (adUnion) {
            // ��ӳɹ������سɹ�֮���objectId��ע�⣺���ص�����������id������objectId�����㻹������Bmob��Web�����̨������Ӧ������
            console.log('������ݳɹ������ص�objectId�ǣ�' + adUnion.id);
        },
        error: function (adUnion, error) {
            // ���ʧ��
            console.log('�������ʧ�ܣ����ش�����Ϣ��' + error.description);
        }
    });
}