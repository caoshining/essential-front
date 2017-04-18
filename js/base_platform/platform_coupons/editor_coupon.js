/**
 * Created by chenM on 2016/10/21.
 */
/*当前登录用户Id*/
var userId = PLATFORM_LOGIN_USER_ID;


var isDisplay;
var couponType;
var scopes;
var sourceType = 1;
$('.conversion_code').attr('disabled','true');

/*获取该优惠券信息*/
getThisCouponData()
function getThisCouponData(){
    $.ajax({
        type:'post',
        url:PLATFORM_URL_PRE+'/essential/coupon/editCoupon',
        dataType: 'json',
        data:{
            couponId:window.couponid,
        },
        success:function (res){
           if(res.code == 1){
               isDisplay = res.info.couponIsDisplay;
               couponType = res.info.couponType;
               scopes = res.info.issuingScope;
               $('input[name = show]').eq(isDisplay).attr('checked','true');
               $('input[name = coupon_type]').eq(couponType-1).attr('checked','true');
               $('input[name = scope]').eq(scopes - 1).attr('checked','true');

               if(couponType == 1){

                    $('.meet').removeAttr('disabled');
                    $('.meet').val(res.info.minimumAmount);
                }else if(couponType == 2){
                    $('.meet').attr('disabled','true');
                    $('.meet').val('');
                }
                if(scopes == 1||scopes == 2){
                    $('.conversion_code').attr('disabled','true');
                    $('.conversion_code').val('');
                }else if(scopes == 3){
                    $('.conversion_code').removeAttr('disabled');
                    $('.conversion_code').val(res.info.redeemCode);
                }

               $('.coupon_name').val(res.info.couponName);
               $('.time_f').val(res.info.startTime);
               $('.time_t').val(res.info.endTime);
               $('.amount').val(res.info.couponAmount);

           }else{
               alert(res.msg)
           }
        },
        error:function (){
            alert('网络连接失败，请稍后重试');
        }
    });
};
/*是否显示*/
$('input[name = show]').on('click',function(){
    isDisplay = $(this).val();
});
/*类型*/
$('input[name = coupon_type]').on('click',function(){
    couponType = $(this).val();
    if(couponType == 2){
        $('.meet').attr('disabled','true');
        $('.meet').val('');
    }else if(couponType == 1){
        $('.meet').removeAttr('disabled');
    }

});
/*范围*/
$('input[name = scope]').on('click',function(){
    scopes = $(this).val();
    if(scopes == 1||scopes == 2){
        $('.conversion_code').attr('disabled','true');
        $('.conversion_code').val('');
    }else if(scopes == 3){
        $('.conversion_code').removeAttr('disabled');
    }
});

var onoff = true;
/*点击保存*/

$('.save_coupon').on('click',function (){
    var couponName = $('.coupon_name').val();
    var startTime = $('.time_f').val()+' 00:00:00';
    var endTime = $('.time_t').val()+' 23:59:59';
    var minimumAmount = $('.meet').val();
    var couponAmount = $('.amount').val();
    var redeemCode = $('.conversion_code').val();

    if(couponName == ''){
        alert('请输入优惠券名称');
    }else if(startTime == ''){
        alert('请输入优惠券起始时间');
    }else if(endTime == ''){
        alert('请输入优惠券结束时间');
    }else if(couponType == 1&&minimumAmount == ''){
        alert('请输入满减金额');
    }else if(couponAmount == ''){
        alert('请输入优惠金额');
    }else if(scopes == 3&&redeemCode == ''){
        alert('请输入兑换码');
    }else{
        if(onoff == false){
            return;
        }
        onoff = false;
        var parmaData = {
            couponId:window.couponid,
            couponName:couponName,
            couponIsDisplay:isDisplay,
            startTime:startTime,
            endTime:endTime,
            couponType:couponType,
            minimumAmount:minimumAmount,
            couponAmount:couponAmount,
            issuingScope:scopes,
            redeemCode:redeemCode,
            loginUser:userId
        }
        $.ajax({
            type:"post",
            url:PLATFORM_URL_PRE+'/essential/coupon/updateCoupon',
            dataType: 'json',
            data:parmaData,
            success:function (res){
                onoff = true;
                if(res.code == 1){

                    $("#coupons_manage").html('');
                    $("#coupons_manage").load("pages/base_platform/business/platform_coupons/make_coupons.html");
                    $('#Market_Promotion .tab-pane').removeClass("active");
                    $("#coupons_manage").addClass("active");
                }
                alert(res.msg);
            },
            error:function (){
                onoff = true;
                alert('网络连接失败，请稍后重试');
            }
        });
    }

});

/*点击取消*/
$('.cancel_coupon').on('click',function (){
    $("#coupons_manage").html('');
    $("#coupons_manage").load("pages/base_platform/business/platform_coupons/make_coupons.html");
    $('#Market_Promotion .tab-pane').removeClass("active");
    $("#coupons_manage").addClass("active");
});

/*时间*/

function timeControl(){
    var start = {
        dateCell: '#Refund_modifyStartTime',
        format: 'YYYY-MM-DD',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        maxDate: '2099-06-30', //最大日期
        choosefun: function(elem,datas){
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var end = {
        dateCell: '#Refund_modifyEndTime',
        format: 'YYYY-MM-DD',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        festival:true,
        ishmsVal:false,
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function(elem,datas){
            start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
        }
    };
    jeDate(start);
    jeDate(end);
}
timeControl();










//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }else{
        return null;
    }
};