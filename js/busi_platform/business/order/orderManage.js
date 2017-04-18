/**
 * Created by wangs on 2016/7/7.
 */

var orderList = [];
var orderIndex = [];
var paramData = {};
var timerObj,timeObj;
//点击切换获取数据
allOrders({"loginUserId": BUSINESS_LOGIN_USER_ID,"pageNo":1});
var $order = $("#order_Manage");
$order.on("click","#all_order",function(){

    allOrders({
        "loginUserId": BUSINESS_LOGIN_USER_ID,
        "pageNo":1,
        "productName":$(".productName").val(),
        "modifyStartTime":$(".modifyStartTime").val(),
        "modifyEndTime":$(".modifyEndTime").val(),
        "userNickname":$(".userNickname").val(),
        "orderStatus":$(".orderStatus").val(),
        "orderNumber":$(".orderNumber").val(),
        "payType":$("#orderPayType").val(),
        "preDate":$("#queryOrderDiv a.nearlyTime.red").attr("data-value")
    });

}).on('click',"#readyBuyShop",function(){

    allOrders({
        "loginUserId": BUSINESS_LOGIN_USER_ID,
        "orderStatus":1,
        "pageNo":1,
        "productName":$(".productName").val(),
        "modifyStartTime":$(".modifyStartTime").val(),
        "modifyEndTime":$(".modifyEndTime").val(),
        "userNickname":$(".userNickname").val(),
        "orderNumber":$(".orderNumber").val(),
        "payType":$("#orderPayType").val(),
        "preDate":$("#queryOrderDiv a.nearlyTime.red").attr("data-value")
    });

}).on("click","#readySendGoods",function(){

    allOrders({
        "loginUserId": BUSINESS_LOGIN_USER_ID,
        "orderStatus":2,
        "pageNo":1,
        "productName":$(".productName").val(),
        "modifyStartTime":$(".modifyStartTime").val(),
        "modifyEndTime":$(".modifyEndTime").val(),
        "userNickname":$(".userNickname").val(),
        "orderNumber":$(".orderNumber").val(),
        "payType":$("#orderPayType").val(),
        "preDate":$("#queryOrderDiv a.nearlyTime.red").attr("data-value")
    });

}).on("click","#HasSendGoods",function(){

    allOrders({
        "loginUserId": BUSINESS_LOGIN_USER_ID,
        "orderStatus":3,
        "pageNo":1,
        "productName":$(".productName").val(),
        "modifyStartTime":$(".modifyStartTime").val(),
        "modifyEndTime":$(".modifyEndTime").val(),
        "userNickname":$(".userNickname").val(),
        "orderNumber":$(".orderNumber").val(),
        "payType":$("#orderPayType").val(),
        "preDate":$("#queryOrderDiv a.nearlyTime.red").attr("data-value")
    });

}).on("click","#HasOver",function(){

    allOrders({
        "loginUserId": BUSINESS_LOGIN_USER_ID,
        "orderStatus":4,
        "pageNo":1,
        "productName":$(".productName").val(),
        "modifyStartTime":$(".modifyStartTime").val(),
        "modifyEndTime":$(".modifyEndTime").val(),
        "userNickname":$(".userNickname").val(),
        "orderNumber":$(".orderNumber").val(),
        "payType":$("#orderPayType").val(),
        "preDate":$("#queryOrderDiv a.nearlyTime.red").attr("data-value")
    });

}).on("click","#HasClose",function(){

    allOrders({
        "loginUserId": BUSINESS_LOGIN_USER_ID,
        "orderStatus":5,
        "pageNo":1,
        "productName":$(".productName").val(),
        "modifyStartTime":$(".modifyStartTime").val(),
        "modifyEndTime":$(".modifyEndTime").val(),
        "userNickname":$(".userNickname").val(),
        "orderNumber":$(".orderNumber").val(),
        "payType":$("#orderPayType").val(),
        "preDate":$("#queryOrderDiv a.nearlyTime.red").attr("data-value")
    });

}).on("click",".filter",function(){         //筛选订单

    allOrders(getQueryOrderParam());

}).on("click",".CheckDetails",function(){       //加载订单详细信息

    clearTimeout(timerObj); //清除定时器
    clearTimeout(timeObj);

    orderIndex = orderList[$(this).parent().parent().attr("data-index")];
    orderIndex.createTime=timeFn(orderIndex.createTime);
    //时间进度
    $.ajax({
        url:BUSINESS_URL_PRE+"/essential/queryOrderStatus/queryOrderStatus",
        type:"post",
        data:{"orderId":orderIndex.orderId},
        success:function(res){
            if(res.code==1){
                for(var i=0;i<res.info.length;i++){
                    $(".wizard-steps li .title").eq(i).html(timeFn(res.info[i].orderStatusTime));
                }

            }
        }
    });

    //订单关闭倒计时
    if(orderIndex.orderStatus == 1){
        var timeChange=orderIndex.createTime;
        timerObj = setInterval(function(){
            $(".countDown").html("距离订单超时关闭还剩："+countDown(timeChange));
        },1000);
    }
    else if(orderIndex.orderStatus == 3){
        //确认收货倒计时
        var confirmTime_change=orderIndex.modifyTime;
        timeObj= setInterval(function(){
            $(".confirmGods").html("买家还有"+confirmTimes(confirmTime_change)+"来确认收货，超时订单将自动确认收货");
        },1000);
    }

    $("#Orders").load("pages/busi_platform/business/order/order_details.html");

}).on("click","#allOrders .cancelOrders",function(){        //取消订单
    var $this=$(this);

    var params = {'orderId':$(this).parent().attr("data-orderid"),
        "loginUserId":BUSINESS_LOGIN_USER_ID};

    cancelOrders(params,$this);

}).on("click",".Deliver_Goods",function(){      //发货

    orderIndex = orderList[$(this).parent().parent().prev().attr("data-index")];
    if(CheckorderProductsStatus()==0){
        alert("订单中有商品正在售后中，不能发货")
    }else{
        orderIndex.modifyTime=timeFn(orderIndex.modifyTime);
        $("#Orders").load("pages/busi_platform/business/order/deliveryGoods.html");
    }
}).on("click","#queryOrderDiv a.nearlyTime",function(){     //时间筛选订单

    if($(this).hasClass("red")){
        $("#queryOrderDiv a.nearlyTime").removeClass("red");
    }else {
        $("#queryOrderDiv a.nearlyTime").removeClass("red");
        $(this).addClass("red");
    }
    allOrders(getQueryOrderParam());
}).on("click",".afterSale",function(e){
    e.stopImmediatePropagation();
    var $this=$(this);

    SingleProduct($this);
});
//判断订单商品是否有在售后中
function CheckorderProductsStatus(){
    var trueOrfalse=1;
    $.each(orderIndex.orderProducts,function(i,v){
        if(v.returnRefundStatus%10!=0
            &&v.returnRefundStatus%10!=2
            &&v.returnRefundStatus%10!=5
            &&v.returnRefundStatus%10!=6
            &&v.returnRefundStatus%10!=9){
            trueOrfalse = 0;
            return trueOrfalse;
        }
    });
    return trueOrfalse;
}

//订单商品跳转
function allOrders(data) {

    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/queryOrder/bussiness/queryOrderByShopId",
        data: data,
        type: "post",
        beforeSend:function(){
            $(".orders .Img_Load").remove();
            $('.orders').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {

            if (res.code == 1) {
                $(".Img_Load").remove();
                $("#allOrders").html('');
                orderList = res.info.orderProductVos;
                $.each(orderList, function(i,v){
                    res.info.orderProductVos[i].orderProductSize = v.orderProducts.length;
                    res.info.orderProductVos[i].modifyTime=timeFn(res.info.orderProductVos[i].modifyTime);
                    res.info.orderProductVos[i].createTime=timeFn(res.info.orderProductVos[i].createTime);

                });
                //渲染模板
                var html = $("#orderTableTmpl").render(res.info);
                $("#allOrders").append(html);
                pagePlus(res.info.totalPageCount,data,true);
            } else {
                alert(res.msg);
            }
        },
        error: function () {
            $('.orders').html("查询订单失败");
        }
    });
}

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/queryOrder/bussiness/queryOrderByShopId",
        data: data,
        type: "post",
        success: function (res) {
            firstFlag = false;
            if (res.code == 1) {
                $("#allOrders").html('');
                orderList = res.info.orderProductVos;
                $.each(orderList, function(i,v){
                    res.info.orderProductVos[i].orderProductSize = v.orderProducts.length;
                    res.info.orderProductVos[i].modifyTime=timeFn(res.info.orderProductVos[i].modifyTime);
                });
                //渲染模板
                var html = $("#orderTableTmpl").render(res.info);
                $("#allOrders").append(html);
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("查询订单失败");
        }
    });
}

//分页
function pagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            paramData = data;
            if(!flag){

                paramData.pageNo = page;
                queryOrderListForPage(paramData);
            }
            flag = false;
        },
        "onFormat": function(type) {	// callback for every format element

            /** EXAMPLE ****/

            switch (type) {

                case 'block':

                    if (!this.active)
                        return '<span class="disabled">' + this.value + '</span>';
                    else if (this.value != this.page)
                        return '<em><a href="#' + this.value + '" class="pages">' + this.value + '</a></em>';
                    return '<span class="current">' + this.value + '</span>';

                case 'right':
                case 'left':

                    if (!this.active) {
                        return "";
                    }
                    return '<a href="#' + this.value + '" class="pages">' + this.value + '</a>';

                case 'next':

                    if (this.active) {
                        return '<a href="#' + this.value + '" class="next" class="pages">&gt;</a>';
                    }
                    return '<span class="disabled">&gt;</span>';

                case 'prev':

                    if (this.active) {
                        return '<a href="#' + this.value + '" class="prev pages">&lt;</a>';
                    }
                    return '<span class="disabled">&lt;</span>';

                case 'first':

                    if (this.active) {
                        return '<a href="#' + this.value + '" class="first pages">|&lt;</a>';
                    }
                    return '<span class="disabled">|&lt;</span>';

                case 'last':

                    if (this.active) {
                        return '<a href="#' + this.value + '" class="prev pages">&gt;|</a>';
                    }
                    return '<span class="disabled">&gt;|</span>';

                case 'fill':
                    if (this.active) {
                        return "...";
                    }
            }
            return ""; // return nothing for missing branches


        }
    })
}
//备注功能
$("#ordersList").on("click",".order_Remark",function(event){
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
                userId:BUSINESS_LOGIN_USER_ID,
                bussinessRemarks:$("#RefuMony_Inf").val(),
                orderId:orderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});

function OrderPostMarkInfom(data){
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/buyOrder/bussiness/remarks",
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

//备注功能
$("#Orders").on("click",".RefundGods_Remark",function(event){
    $(".Big_Remark").remove();
    event.stopPropagation();
    var getReturnRefundOrderId=$(this).attr("data-returnRefundOrderId");
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
            PostMarkInfomOnOrder({
                userId:BUSINESS_LOGIN_USER_ID,
                bussinessRemarks:$("#RefuMony_Inf").val(),
                returnRefundOrderId:getReturnRefundOrderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});
function PostMarkInfomOnOrder(data){
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/refundOrder/bussiness/remarks",
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

//发货
function DeliverGoods(data){
    if(confirm("确定发货吗?")){
        $.ajax({
            url:BUSINESS_URL_PRE+"/essential/buyOrder/delivery",
            type:"post",
            data:data,
            success:function(res){
                if(res.code==1){
                    alert("发货成功");
                    $(".Deliver_Goods").unbind("click");
                    $(".Deliver_Goods").css("background","#ddd");

                    $("#Orders").load("pages/busi_platform/business/order/order.html");

                }
                else{
                    $(".Deliver_Goods").bind("click");
                    alert(res.msg);
                }
            }
        })
    }

}

//取消订单
function cancelOrders(params,$this){
    if (confirm("确定取消订单吗?")){
        $.ajax({
            url:BUSINESS_URL_PRE+"/essential/buyOrder/bussiness/cancel",
            type:"post",
            data:params,
            success:function(res){
                if(res.code==1) {
                    $order.off("click", $this, function () {
                        $("#checkOrder_Info .cancelOrders").css({"background": "#ddd", "color": "#666"});
                        $("#allOrders .cancelOrders").css({"color": "#999", "text-decoration": "none"});

                    });
                    if($this.prev().hasClass("cancelPrevSpan")){
                        orderList[$this.parent().parent().prev().attr("data-index")].orderStatus = 5;

                        $this.prev().text("订单关闭");
                        $this.remove();
                    }
                }

                else{
                    $order.on("click",$this);
                    alert(res.msg);
                }
            },
            error:function(res){
                alert("取消订单失败");
            }
        })
    }
}


//倒计时
var misTiming=259200000;
var confirmTime=864000000;
//取消订单倒计时
function countDown(time){

    var startTime=$.myTime.DateToUnix(time);
    var finalTime=Number(misTiming)+Number(startTime);
    var nowTime=new Date().getTime();
    var cutTime=finalTime-nowTime;

    if(cutTime < 0){
        clearInterval(timerObj);
        $.ajax({
            url:BUSINESS_URL_PRE+"/essential/buyOrder/bussiness/cancel",
            type:"post",
            data:{"loginUserId":BUSINESS_LOGIN_USER_ID,"orderId":orderIndex.orderId},
            success:function(res){
                if(res.code==1) {
                    $(".countDown").html("订单关闭");
                }
                else{
                    alert(res.msg);
                }
            }
        })
    }
    else{
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

}

//确认收货时间
function confirmTimes(time){

    var startTime=$.myTime.DateToUnix(time);
    var finalTime=Number(confirmTime)+Number(startTime);
    var nowTime=new Date().getTime();
    var cutTime=finalTime-nowTime;

    if(cutTime < 0){
        clearInterval(timeObj);
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

//请求参数
function getQueryOrderParam(){
    var param = {
        "loginUserId":BUSINESS_LOGIN_USER_ID,
        "pageNo":1,
        "productName":$(".productName").val(),
        "modifyStartTime":$(".modifyStartTime").val(),
        "modifyEndTime":$(".modifyEndTime").val(),
        "userNickname":$(".userNickname").val(),
        "orderStatus":$(".orderStatus").val(),
        "orderNumber":$(".orderNumber").val(),
        "payType":$("#orderPayType").val(),
        "preDate":$("#queryOrderDiv a.nearlyTime.red").attr("data-value")
    };
    return param;
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

function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }

}

//时间筛选
function deliveryTime(){
    var start = {
        dateCell: '#modifyStartTime',
        format: 'YYYY-MM-DD hh:mm:ss',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        festival:true,
        isinitVal:false,
        ishmsVal:false,
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function(elem,datas){
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var end = {
     dateCell: '#modifyEndTime',
     format: 'YYYY-MM-DD hh:mm:ss',
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
deliveryTime();

//单个商品跳转
function SingleProduct($this){
    if($this.data("returnrefundstatus") >= 10
        && $this.data("returnrefundstatus") <= 90){
        $("#order_Manage").css("display","none").siblings("#afterSales").css("display","block");
        $.ajax({
            url:BUSINESS_URL_PRE+"/essential/refundOrder/business/queryByOrderProductId",
            data:{
                "orderProductId":$this.data("orderproductid"),
                "loginUserId":BUSINESS_LOGIN_USER_ID},
            success:function(res){
                if(res.code==1){
                    $("#afterSales").html('');
                    if(res.info.length &&res.info.length>0){
                        $.each(res.info,function(i,v){
                            res.info[i].createTime=timeFn(res.info[i].createTime);
                            res.info[i].modifyTime=timeFn(res.info[i].modifyTime);
                        });
                        //渲染模板
                        //退款单
                        if (res.info[0].returnRefundType ==2){
                            var RefundHtml = $("#checkRefund_Tmp").render(res.info);
                            $("#afterSales").append(RefundHtml);

                            Refund_action(res.info[0]);

                        //退货单
                        }else if(res.info[0].returnRefundType ==1){
                            var RefundGodsHtml = $("#checkRefundGoods_details_Tmp").render(res.info);
                            $("#afterSales").append(RefundGodsHtml);
                            RefundGoods_action(res.info[0]);
                        }


                        $(".reback_refundOrder").on("click",function(){
                            $("#order_Manage").css("display","block").siblings("#afterSales").css("display","none");
                            return false;
                        })
                    }
                }else{
                    alert(res.msg);
                }
            },
            error:function(){
                alert("网络请求超时");
            }
        });
    }
}

//退款订单流程
function Refund_action(orderIndex){
    if(orderIndex!= ''){

        TimeChange($(".Refund_order").attr("data-Order"));
        if(orderIndex.returnRefundLatestStatus==1){
            //$(".wizard-steps li").eq(0).addClass("complete");
            $(".wizard-steps li").eq(0).find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(0).addClass("active");
        }
        else if(orderIndex.returnRefundLatestStatus==2){
            $(".wizard-steps li").eq(1).prevAll().addClass("complete");
            $(".wizard-steps li").eq(1).prevAll().find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(1).addClass("error");
            $(".wizard-steps li").eq(1).find(".wizeard-Top").html("商家驳回退款申请")
        }
        else if(orderIndex.returnRefundLatestStatus==3){
            $(".wizard-steps li").eq(2).prevAll().addClass("complete");
            $(".wizard-steps li").eq(2).prevAll().find(".wizeard-Top").addClass("active");
            //$(".wizard-steps li").eq(1).addClass("active");
        }
        else if(orderIndex.returnRefundLatestStatus==5){
            $(".wizard-steps li").eq(2).prevAll().addClass("complete");
            $(".wizard-steps li").eq(2).find(".wizeard-Top").html("平台驳回申请付款");
            $(".wizard-steps li").eq(2).addClass("error");
        }
        else if(orderIndex.returnRefundLatestStatus==4){
            $(".wizard-steps li").eq(4).addClass("complete");
            $(".wizard-steps li").eq(4).prevAll().find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(4).prevAll().addClass("complete");
        }
        else if (orderIndex.returnRefundLatestStatus==6){
            $(".wizard-steps li").eq(3).prevAll().addClass("complete");
            $(".wizard-steps li").eq(3).prevAll().find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(3).addClass("complete");
            $(".wizard-steps li").eq(3).find(".wizeard-Top").addClass("active");
        }
        Refund_Click();
    }
}

//退货订单流程
function RefundGoods_action(RefundGosIndex){

    if(RefundGosIndex != ''){
        TimeChange($(".RefundGods_order").attr("data-Order"));

        if(RefundGosIndex.returnRefundLatestStatus==1){        //商家审核

            $(".wizard-steps li").eq(0).addClass("complete");
            $(".wizard-steps li").eq(0).find(".wizeard-Top").addClass("active");

        }
        else if(RefundGosIndex.returnRefundLatestStatus==2){       //商家驳回
            $(".wizard-steps li").eq(1).prevAll().addClass("complete");
            $(".wizard-steps li").eq(1).addClass("error");
            $(".wizard-steps li").eq(1).children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(1).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(1).children(".wizeard-Top").html("商家驳回退款申请");
        }
        else if(RefundGosIndex.returnRefundLatestStatus==3){       //平台审核中

            $(".wizard-steps li").eq(3).addClass("active").prevAll().addClass("complete");
            $(".wizard-steps li").eq(3).children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(3).prevAll().children(".wizeard-Top").addClass("active");

        }
        else if(RefundGosIndex.returnRefundLatestStatus==4){           //平台处理中

            $(".wizard-steps li").eq(4).addClass("active").prevAll().addClass("complete");
            $(".wizard-steps li").eq(4).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(4).children(".wizeard-Top").addClass("active");
        }
        else if(RefundGosIndex.returnRefundLatestStatus==5){           //平台驳回

            $(".wizard-steps li").eq(4).addClass("error").prevAll().addClass("complete");
            $(".wizard-steps li").eq(4).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(4).children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(4).children(".wizeard-Top").html("平台驳回");
        }
        else if(RefundGosIndex.returnRefundLatestStatus==6){           //退款完成

            $(".wizard-steps li").eq(5).addClass("complete").prevAll().addClass("complete");
            $(".wizard-steps li").eq(5).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(5).children(".wizeard-Top").addClass("active");
        }
        else if(RefundGosIndex.returnRefundLatestStatus==7){           //待买家发货

            $(".wizard-steps li").eq(1).addClass("active").prevAll().addClass("complete");
            $(".wizard-steps li").eq(1).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(1).children(".wizeard-Top").addClass("active");
        }
        else if(RefundGosIndex.returnRefundLatestStatus==8){           //待商家收货

            $(".wizard-steps li").eq(2).addClass("active").prevAll().addClass("complete");
            $(".wizard-steps li").eq(2).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(2).children(".wizeard-Top").addClass("active");
        }
        else if(RefundGosIndex.returnRefundLatestStatus==9){           //货品驳回

            $(".wizard-steps li").eq(3).addClass("error").prevAll().addClass("complete");

            $(".wizard-steps li").eq(3).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(3).children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(3).children(".wizeard-Top").html("商家驳回货品");
        }

    }
}

//商家同意与驳回
function Refund_Click(){

    $("#Refund_CheckPass").on("click",function(){
        var status=0;
        if (confirm("确认通过？")){
            Post_RightOrRefuse({
                loginUserId:BUSINESS_LOGIN_USER_ID,
                returnRefundOrderId:$(".Refund_orderNum").attr("data-Order"),
                returnRefundType:2,
                returnRefundLatestStatus:3},
                status);
        }
    });
    $("#Refund_CheckRefuse").on("click",function(){
        var status=1;
        var html="<div class='Big_RefuseInput' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
            "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
            "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
            "<div style='position:relative;left:40%;top:35%;width:35%;'>" +
            "<label for='RefundMoney_Inf' style='color: white;'>请输入驳回理由:</label>" +
            "<textarea id='RefundMoney_Inf' type='text' rows='3' cols='20'></textarea>" +
            "<a href='###' class='Refund_Right_btn' style='display:block;position:absolute;left:20%;font-size: 15px;bottom: -25px;'>确定</a>" +
            "<a href='###' class='Refund_cancel_btn' style='display:block;position:absolute;right:43%;font-size: 15px;bottom: -25px;'>取消</a>"+
            "</div></div></div>";
        $(".index-tab-cont").append(html);

        $(".Refund_cancel_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

        $(".Refund_Right_btn").on("click",function(){
            if($("#RefundMoney_Inf").val() ==""){
                alert("驳回理由不能为空！");
                return false;
            }else{
                Post_RightOrRefuse({
                        loginUserId:BUSINESS_LOGIN_USER_ID,
                        returnRefundOrderId:$(".Refund_orderNum").attr("data-Order"),
                        returnRefundRejectReason:$("#RefundMoney_Inf").val(),
                        returnRefundType:2,
                        returnRefundLatestStatus:2},
                    status)}
            }
        );
    });

}

function Post_RightOrRefuse(data,status){
    $.ajax({
        url:BUSINESS_URL_PRE+"/essential/refundOrder/bussiness/update",
        data: data,
        type: "post",
        success:function(res){
            if(res.code==1){
                if(status==0){
                    $("#Refund_CheckPass").css({"background":"#333"},{"color":"white"});
                    $("#Refund_CheckPass").text("已通过");

                    $("#Refund_CheckPass").unbind("click");
                    $("#Refund_CheckRefuse").unbind("click");
                    alert(res.msg);
                }else if(status==1){
                    $(".Refund_cancel_btn").trigger("click");

                    $("#Refund_CheckRefuse").css({"background":"#333"},{"color":"white"});
                    $("#Refund_CheckRefuse").text("已驳回");

                    $("#Refund_CheckPass").unbind("click");
                    $("#Refund_CheckRefuse").unbind("click");
                    alert("驳回成功");
                }
            }
            else if(res.code==0){
                alert(res.msg);
            }
        },
        error:function(){
            alert("网络延时，请重试");
        }
    })

}

//时间进度
function TimeChange(data){
    $.ajax({
        url:BUSINESS_URL_PRE+"/essential/queryOrderStatus/queryReturnRefundStatus",
        data: {returnRefundOrderId:data},
        type: "post",
        success:function(res){
            if(res.code==1){
                for(var i=0;i<res.info.length;i++){
                    $(".wizard-steps li span.title").eq(i).html(timeFn(res.info[i].returnRefundStatusTime));
                }

            }
        }
    })
}

//导出Excel
$(document).on("click",".Order_Make_excel",function(e){
    e.stopImmediatePropagation();
    var postData={
        "loginUserId":BUSINESS_LOGIN_USER_ID,
        "pageNo":'',
        "productName":$(".productName").val(),
        "modifyStartTime":$(".modifyStartTime").val(),
        "modifyEndTime":$(".modifyEndTime").val(),
        "userNickname":$(".userNickname").val(),
        "orderStatus":$(".orderStatus").val(),
        "orderNumber":$(".orderNumber").val(),
        "payType":$("#orderPayType").val(),
        "preDate":$("#queryOrderDiv a.nearlyTime.red").attr("data-value")
    };
    var str= $.param(postData);
    window.open(BUSINESS_URL_PRE+"/essential/export/bussiness/exportOrderByShopId?"+str);
   // $.ajax({
   //     url:BUSINESS_URL_PRE+"/essential/bussiness/exportOrderByShopId",
   //     data:postData,
   //     type:"post",
   //     success:function(res){
   //         if(res.code==1){
   //            console.log(res)
   //         }else{
   //             alert(res.msg);
   //         }
   //     },
   //     error:function(){
   //         alert("网络错误")
   //     }
   // })
});