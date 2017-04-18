/*Created by chenM on 2016/7/21.*/



var addstandardfn = function (){

    var add_keyId ;
    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/specification/selectSpecificationList',
        dataType: 'json',
        success: function(res) {
            if(res.code == 0){
                alert(res.msg);
                return;
            }
            var html = '';
            var html1 = '';
            for (var i = 0; i < res.info.length; i++) {
                html += '<li class="item" keyId = '+res.info[i].id+'>' + res.info[i].name + '</li>';
            }
            $('.first-class').html(html);

            /* 默认选中第一个*/
            $('.first-class .item').eq(0).addClass('selected');
            add_keyId = $('.first-class .item').eq(0).attr('keyId');

            /*切换一级分类*/
            $('.first-class .item').on('click',function (){
                $('.first-class .item').removeClass('selected');
                $(this).addClass('selected');
                add_keyId = $(this).attr('keyId');

            });

            /*点击确定*/
            $('.confirm').on('click',function (){
                if($('.standard-msg').val() == ''){
                    alert('请输入规格！！！');
                }else if($('.import-value').val() == ''){
                    alert('请输入数值！！！');
                }else{
                    var parmaData = {
                        categoryId:add_keyId,
                        keyName:$('.standard-msg').val(),
                        value:$('.import-value').val()
                    };
                    $('.standard-msg').val('');
                    $('.import-value').val('');
                    $.ajax({
                        type: "post",
                        url: PLATFORM_URL_PRE+'/essential/specification/addKey',
                        dataType: 'json',
                        data:parmaData,
                        success:function (res){
                            if(res.code == 1){
                                alert(res.msg);
                                if(window.state1){
                                    standardlist();
                                }
                            }
                        }
                    });
                };
            })
        },
        error: function (res)//服务器响应失败处理函数
        {
            alert('网络连接失败，请稍后重试~');
        }
    });
};
addstandardfn();