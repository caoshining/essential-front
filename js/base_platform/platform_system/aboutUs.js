/**
 * Created by chenM on 2016/8/4.
 */



/*得到userId的值*/
var userId = PLATFORM_LOGIN_USER_ID

//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }else{
        return null;
    }
}

/*得到富文本的内容*/

function  getContent() {
    var constr = '';
    constr=UE.getEditor('editor2').getContent();
    return constr;
};

/*上传富文本框内容*/

function uploadcontent(){

    var con = getContent();


    var parmaData = {
        content:con,
        createUser:userId
    };
    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/aboutAutoController/addAbout',
        dataType: 'json',
        data:parmaData,
        success:function (res){

            if(res.code == 1){
                alert(res.msg);
            }else{
                alert(res.msg);
            };
        },
        error:function (res){
            alert('网络连接失败，请稍后重试~');
        }
    });
};
