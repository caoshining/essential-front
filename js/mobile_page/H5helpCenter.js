/**
 * Created by chenM on 2016/8/10.
 */
helpCenter();
function helpCenter(){


    $.ajax({
        type: "post",
        url: BUSINESS_URL_PRE+'/essential/helpAutoController/queryHelp',
        dataType: 'json',

        success:function (res){
            if(res.code == 1){
                $('.aboutUs_con').html(res.info.helpContent);
            }else{
                alert(res.msg)
            }


        },
        error:function(res){
            alert('网络连接失败，请稍后重试');
        }
    });
};