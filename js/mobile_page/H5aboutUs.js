/**
 * Created by chenM on 2016/8/10.
 */


/*var h = $(window).height()

$('img').css('height',h+'px');*/


aboutUs();
function aboutUs(){

    $.ajax({
        type: "post",
        url: BUSINESS_URL_PRE+'/essential/aboutAutoController/queryAbout',
        dataType: 'json',

        success:function (res){
          //  console.log(res);
            if(res.code == 1){
                $('.aboutUs_con').html(res.info.content);
            }

        },
        error:function(res){
            alert('网络连接失败，请稍后重试');
        }
    });
};