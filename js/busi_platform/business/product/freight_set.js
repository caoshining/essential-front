/**
 * Created by Morgan on 2017/1/9.
 */

InquireFreight();
function InquireFreight(){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/freeShipping/query",
        data:{shopId:BUSINESS_LOGIN_SHOP_ID},
        dataType:'json',
        success:function(data){
            if(data.code==1){
                if(data.info!=''){

                    $('.Freight_name').val(data.info[0].activityName);
                    $('.Freight_totalprice').val(data.info[0].amount);
                    $('.Freight_tag').val(data.info[0].tag);
                    $('.save_set').attr('data-id',data.info[0].id);
                    $('.Makelose_btn').attr('data-flag',data.info[0].isDelete);
                    $('.Makelose_btn').html(data.info[0].isDelete==1?'生效':'使失效');
                    $('.Freight_status_p').html(data.info[0].isDelete==1?'失效':'正常');

                    data.info[0].isDelete==1?$('.Makelose_btn').css('background','red'):'';

                    $(".Freight_statusDiv").show();

                    $(".Makelose_btn").on('click',function(e){
                        e.stopImmediatePropagation();
                        MakeItLose();
                    });
                    $(".save_set").on('click',function(e){
                        e.stopImmediatePropagation();
                        EditFreeFreight();
                    });
                }else{

                    $(".Freight_statusDiv").hide();

                    $(".save_set").on('click',function(e){
                        e.stopImmediatePropagation();
                        MakeNewFreeFreight();
                    });

                }
                $(".cancel_btn").on('click',function(e){
                    e.stopImmediatePropagation();
                    $("a[href='#ApplyMarket']").click();
                });
            }else{
                alert(data.msg);
            }
        },error:function(err){
            alert('网络有问题，请刷新重试');
        }
    })
}

function MakeNewFreeFreight(){
    if($('.Freight_tag').val()==''||$('.Freight_name').val()==''||$('.Freight_totalprice').val()==''){
        alert('输入得不能为空')
    }else {
        $.ajax({
            type: 'post',
            url: BUSINESS_URL_PRE + "/essential/freeShipping/add",
            data: {
                shopId: BUSINESS_LOGIN_SHOP_ID,
                tag: $('.Freight_tag').val(),
                activityName: $('.Freight_name').val(),
                amount: $('.Freight_totalprice').val(),
                createUser: BUSINESS_LOGIN_USER_ID
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 1) {
                    if (data.info) {
                        $('.Freight_name').val();
                        $('.Freight_totalprice').val();
                        $('.Freight_tag').val();
                        $("a[href='#freight_set']").click();
                    } else {

                    }
                } else {
                    alert(data.msg);
                }
            }, error: function (err) {
                alert('网络有问题，请刷新重试');
            }
        })
    }
}
function MakeItLose(){
    $.ajax({
        type: 'post',
        url: BUSINESS_URL_PRE + "/essential/freeShipping/effectiveSetting",
        data: {
            id: $('.save_set').attr('data-id'),
            flag: $('.Makelose_btn').attr('data-flag')==1?0:1,
            userId: BUSINESS_LOGIN_USER_ID
        },
        dataType: 'json',
        success: function (data) {
            if (data.code == 1) {
                $("a[href='#freight_set']").click();
            } else {
                alert(data.msg);
            }
        }, error: function (err) {
            alert('网络有问题，请刷新重试');
        }
    })
}

function EditFreeFreight(){
    if($('.Freight_tag').val()==''||$('.Freight_name').val()==''||$('.Freight_totalprice').val()==''){
        alert('输入得不能为空')
    }else {
        $.ajax({
            type: 'post',
            url: BUSINESS_URL_PRE + "/essential/freeShipping/update",
            data: {
                shopId: BUSINESS_LOGIN_SHOP_ID,
                tag: $('.Freight_tag').val(),
                id: $('.save_set').attr('data-id'),
                activityName: $('.Freight_name').val(),
                amount: $('.Freight_totalprice').val(),
                modifyUser: BUSINESS_LOGIN_USER_ID
            },
            dataType: 'json',
            success: function (data) {
                if (data.code == 1) {
                    alert('邮费设置成功');
                    $("a[href='#freight_set']").click();
                } else {
                    alert(data.msg);
                }
            }, error: function (err) {
                alert('网络有问题，请刷新重试');
            }
        })
    }
}
