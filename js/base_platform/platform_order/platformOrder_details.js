/**
 * Created by wangs on 2016/7/29.
 */
$("#platformDetails_Info").html('');
if(platform_orderIndex!= ''){
    var OrderMessageHtml = $("#platform_OrderMessage_Tmple").render(platform_orderIndex);
    $("#platformDetails_Info").append(OrderMessageHtml);
    TimeChange(platform_orderIndex.orderId);

    if(platform_orderIndex.orderStatus==1){
        //$(".wizard-steps li").eq(0).addClass("complete");
        $(".wizard-steps li").eq(0).find(".wizeard-Top").addClass("active");
        $(".wizard-steps li").eq(0).addClass("active");

        //订单超时关闭时间
        var timeChage=platform_orderIndex.createTime;
        timer=setInterval(function(){
            $(".countDown").html("距离订单超时关闭还剩："+countDown(timeChage));
        },1000);
    }
    else if(platform_orderIndex.orderStatus==2){
        $(".wizard-steps li").eq(1).prevAll().addClass("complete");
        $(".wizard-steps li").eq(1).prevAll().find(".wizeard-Top").addClass("active");
        $(".wizard-steps li").eq(1).addClass("active");
    }
    else if(platform_orderIndex.orderStatus==3){
        $(".wizard-steps li").eq(2).prevAll().addClass("complete");
        $(".wizard-steps li").eq(2).prevAll().find(".wizeard-Top").addClass("active");
        $(".wizard-steps li").eq(2).addClass("active");

        //确认收货倒计时
        var confirmTime=platform_orderIndex.modifyTime;
        Time= setInterval(function(){
            $(".confirmGods").html("买家还有"+Platform_confirmTime(confirmTime)+"来确认收货，超时订单将自动确认收货");
        },1000);
    }
    else if(platform_orderIndex.orderStatus==4){
        $(".wizard-steps li").eq(4).addClass("complete");
        $(".wizard-steps li").eq(4).prevAll().find(".wizeard-Top").addClass("active");
        $(".wizard-steps li").eq(4).prevAll().addClass("complete");
    }
    else if(platform_orderIndex.orderStatus==5){
        $(".wizard-steps li").eq(0).removeClass("active");
    }
}

function TimeChange(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/queryOrderStatus/queryOrderStatus",
        data: {orderId:data},
        type: "post",
        success:function(res){
            if(res.code==1){
                for(var i=0;i<res.info.length;i++){
                    $(".wizard-steps li span.title").eq(i).html(timeFn(res.info[i].orderStatusTime));
                }

            }
        }
    })
}

$(".checkLogistics").on("click",function(e){
    e.stopImmediatePropagation();
    $("#Platform_allOrders").load("pages/base_platform/business/platform_order/platform_checkLogistics.html");
    checkDelivery();
});

function checkDelivery(){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/express/enterPriseQuery",
        data:{"com":platform_orderIndex.logistic,"nu":platform_orderIndex.logisticNumber},
        type:"POST",
        success:function(res){
            if(res.code==1){
                if(res.info && res.info.data){
                    var logisticHtml = $("#platform_logisticTmpl").render(res.info.data);
                    $("#platform_logistic").append(logisticHtml);
                }

            }else{
                alert(res.msg);
            }
        },
        error:function(){
            alert("网络错误")
        }
    })
}

//倒计时
var misTiming=259200000;
function countDown(time){
    var startTime=$.myTime.DateToUnix(time);
    var finalTime=Number(misTiming)+Number(startTime);
    var nowTime=new Date().getTime();
    var cutTime=finalTime-nowTime;

    if(cutTime < 0){
        clearInterval(timer);
    }
    var hour = Math.floor(cutTime / 1000 / 60 / 60);
    var minute = Math.floor(cutTime / 1000 / 60 % 60);
    var second = Math.floor(cutTime / 1000 % 60);
    if(hour<10){
        hour="0"+hour;
    }
    if(minute<10){
        minute="0"+minute;
    }
    if(second<10){
        second="0"+second;
    }
    return hour+":"+minute+":"+second;
}

//确认收货时间
var confirmTimes=864000000;
function Platform_confirmTime(time){

    var startTime=$.myTime.DateToUnix(time);
    var finalTime=Number(confirmTimes)+Number(startTime);
    var nowTime=new Date().getTime();
    var cutTime=finalTime-nowTime;

    if(cutTime < 0){
        clearInterval(Time);
    }
    else{
        var day=Math.floor(cutTime / 1000/3600 / 24);
        var hour = Math.floor(cutTime / 1000 /3600/10);
        var minute = Math.floor(cutTime / 1000 / 60 % 60);
        var second = Math.floor(cutTime / 1000 % 60);

        if(hour<10){
            hour="0"+hour;
        }
        if(minute<10){
            minute="0"+minute;
        }
        if(second<10){
            second="0"+second;
        }
        return day+" 天 "+hour+" 时 "+minute+" 分 "+second+" 秒 ";
    }

}

//时间转化插件
(function($) {
    $.extend({
        myTime: {
            CurTime: function(){
                return Date.parse(new Date())/1000;
            },
            DateToUnix: function(string) {

                var f = string.split(' ', 2);

                var d = (f[0] ? f[0] : '').split('-', 3);

                var t = (f[1] ? f[1] : '').split(':', 3);
                var time=(new Date(parseInt(d[0], 10) || null,(parseInt(d[1], 10) || 1) - 1,parseInt(d[2], 10) || null,

                    parseInt(t[0], 10) || null,

                    parseInt(t[1], 10) || null,

                    parseInt(t[2], 10) || null

                )).getTime();

                return  time;

            },

            UnixToDate: function(unixTime, isFull, timeZone) {
                if (typeof (timeZone) == 'number')

                {
                    unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;

                }
                var time = new Date(unixTime * 1000);

                var ymdhis = "";

                ymdhis += time.getUTCFullYear() + "-";

                ymdhis += (time.getUTCMonth()+1) + "-";

                ymdhis += time.getUTCDate();

                if (isFull === true)

                {

                    ymdhis += " " + time.getUTCHours() + ":";

                    ymdhis += time.getUTCMinutes() + ":";

                    ymdhis += time.getUTCSeconds();

                }
                return ymdhis;
            }
        }
    });

})(jQuery);

//备注功能
$("#Platform_allOrders").on("click","#Order_detail_note",function(event){
    $(".Big_Remark").remove();
    event.stopPropagation();
    var orderId=$(this).attr("data-orderId");
    var html="<div class='Big_Remark' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
        "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
        "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
        "<div style='position:fixed;left:40%;top:25%;width:35%;'>" +
        "<label for='RefuMony_Inf' style='color: white;'>请输入备注内容:</label>" +
        "<textarea id='RefuMony_Inf' type='text' col='9' rows='3' cols='20'></textarea>"+
        "<a href='###' class='Remark_Rigth_btn' style='display:block;position:absolute;left:20%;font-size: 15px;bottom: -25px;'>确定</a>" +
        "<a href='###' class='Remark_cancle_btn' style='display:block;position:absolute;right:43%;font-size: 15px;bottom: -25px;'>取消</a>"+
        "</div></div></div>";
    $(".index-tab-cont").append(html);
    $(".Remark_cancle_btn").on("click",function(){
        $(".Big_Remark").remove();
    });

    $(".Remark_Rigth_btn").on("click",function(){
        if ($("#RefuMony_Inf").val()!=""){
            OrderPostMarkInfom({
                userId:PLATFORM_LOGIN_USER_ID,
                platformRemarks:$("#RefuMony_Inf").val(),
                orderId:orderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});

function OrderPostMarkInfom(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/buyOrder/platform/remarks",
        data: data,
        type: "post",
        success: function (res) {
            if(res.code==1){
                alert("备注成功");
                $(".Big_Remark").remove();
            }else{
                alert(res.msg);
            }
        },error: function (res) {
            alert("网络有问题，请刷新重试")
        }
    })
}