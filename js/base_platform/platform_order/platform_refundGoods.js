/**
 * Created by wangs on 2016/7/29.
 */

var platform_orderList = [];
var platform_orderIndex = [];
//点击切换获取数据
allRefundGods({"loginUserId": PLATFORM_LOGIN_USER_ID,"returnRefundType":1});
var $order = $("#RefundGods_Manage");
$order.on("click","#RefundGods_All",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on('click',"#Business_goods_check",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "returnRefundLatestStatus":1,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on("click","#Business_goods_refuse",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "returnRefundLatestStatus":2,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on("click","#Platform_goods_check",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "returnRefundLatestStatus":3,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on("click","#Platform_goods_refund",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "returnRefundLatestStatus":4,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on("click","#Platform_goods_refuse",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "returnRefundLatestStatus":5,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on("click","#RefundGods_Complete",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "returnRefundLatestStatus":6,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on("click","#Business_goods_send",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "returnRefundLatestStatus":7,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on("click","#Platform_goods_receive",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "returnRefundLatestStatus":8,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on("click","#Business_goods_Godsrefuse",function(){

    allRefundGods({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "returnRefundLatestStatus":9,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    });

}).on("click","#RefundGods_filter",function(){          //筛选

    var queryOrderParam = {
        "loginUserId":PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "returnRefundLatestStatus":$("#RefundGods_orderStatus").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    };

    allRefundGods(queryOrderParam);
}).on("click","a.Refud_gods_nearlyTime",function(e){     //时间筛选订单
    e.stopImmediatePropagation();
    if($(this).hasClass("red")){
        $("a.Refud_gods_nearlyTime").removeClass("red");
    }else {
        $("a.Refud_gods_nearlyTime").removeClass("red");
        $(this).addClass("red");
    }
    var queryOrderParam = {
        "loginUserId":PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "returnRefundLatestStatus":$("#RefundGods_orderStatus").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "preDate":$("a.Refud_gods_nearlyTime.red").attr("data-value"),
        "payType":$("#RefundGods_PayType").val()
    };
    allRefundGods(queryOrderParam);
}).on("click",".LookDetail",function(e){     //查看单个订单详情
    e.stopImmediatePropagation();
    platform_orderIndex = platform_orderList[$(this).parent().parent().attr("data-index")];
    platform_orderIndex.createTime=timeFn(platform_orderIndex.createTime);
    platform_orderIndex.modifyTime=timeFn(platform_orderIndex.modifyTime);

    $("#Platform_RefundGoods").load("pages/base_platform/business/platform_order/platform_refundGoods_details.html");

}).on("click","#allRefundGods .Refund_cancel",function(e){      //平台审核
    e.stopImmediatePropagation();
    platform_orderIndex = platform_orderList[$(this).parent().parent().prev().attr("data-index")];
    $("#Platform_RefundGoods").load("pages/base_platform/business/platform_order/platform_refundGoods_details.html");

}).on("click","#allRefundGods .checkRefundGods_List",function(){    //查看退款单
    platform_orderIndex = platform_orderList[$(this).parent().parent().prev().attr("data-index")];

    $.ajax({
        url: PLATFORM_URL_PRE + "/essential/refundOrder/queryRefundOrderInfo",
        data: {loginUserId: PLATFORM_LOGIN_USER_ID, returnRefundOrderId: platform_orderIndex.returnRefundOrderId},
        success: function (res) {
            if (res.code == 1) {
                var RefundGodsHtml="<div class='create_RefundTmp'></div>";
                var html="<div class='create_RefundList'>" +
                    "<h4>退款订单>查看退款单</h4>" +
                    "<table><tr>" +
                    "<td>订单编号:</td><td>"+platform_orderIndex.orderNumber+"</td>" +
                    "</tr><tr>" +
                    "<td>退款单号:</td><td>"+res.info.returnRefundOrderNumber+"</td></tr>" +
                    "<tr><td>退款单来源:</td><td>退货订单</td></tr>" +
                    "<tr><td>商家名称:</td><td>"+platform_orderIndex.name+"</td></tr>" +
                    "<tr><td>申请退款金额:</td><td>"+res.info.refundTotalMoney+"</td></tr>" +
                    "<tr><td>实退款金额:</td><td>"+res.info.refundFinalMoney+"</td></tr>" +
                    "<tr><td>收款人:</td><td>"+res.info.refundUser+"</td></tr>" +
                    "<tr><td>收款账号:</td><td>"+res.info.refundAccount+"</td></tr>" +
                    "<tr><td>退款渠道:</td><td>"+res.info.attr3+"</td></tr>" +
                    "<tr><td>退款时间:</td><td>"+res.info.attr6+"</td></tr>" +
                    "<tr><td>操作人:</td><td>"+res.info.attr4+"</td></tr>" +
                    "<tr><td>备注:</td><td>"+res.info.attr5+"</td></tr></table>" +
                    "<div class='createRefund'><span class='Return_Refund' style='background: #0b6cbc; color:#fff;'>返回</span></div>" +
                    "</div>";
                $(".index-tab-cont").append(RefundGodsHtml);
                $(".index-tab-cont").append(html);

                $(".Return_Refund").on("click",function(){
                    $(".create_RefundTmp").remove();
                    $(".create_RefundList").remove();
                })
            }
        }
    });

});


//订单商品跳转
function allRefundGods(data) {

    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/refundOrder/queryListByPlatformId",
        data: data,
        type: "post",
        beforeSend:function(){
            $(".RefundGods .Img_Load").remove();
            $('.RefundGods').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            if (res.code == 1) {
                $(".RefundGods .Img_Load").remove();
                $("#allRefundGods").html('');
                platform_orderList = res.info.returnRefundOrderVos;
                $.each(platform_orderList, function(i,v){
                    res.info.returnRefundOrderVos[i].orderProductsSize = v.orderProducts.length;
                    res.info.returnRefundOrderVos[i].createTime=timeFn(res.info.returnRefundOrderVos[i].createTime);
                });

                //渲染模板
                var html = $("#RefundGods_TableTmpl").render(res.info);
                $("#allRefundGods").append(html);
                pagePlus(res.info.totalPageCount,data,true);

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
                platform_RefundForPage(paramData);
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

//分页调数据
function platform_RefundForPage(data) {

    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/refundOrder/queryListByPlatformId",
        data: data,
        type: "post",
        beforeSend:function(){
            $("#allRefundGods").html('');
            $(".RefundGods .Img_Load").remove();
            $('.RefundGods').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            if (res.code == 1) {
                $(".RefundGods .Img_Load").remove();
                $("#allRefundGods").html('');
                platform_orderList = res.info.returnRefundOrderVos;
                $.each(platform_orderList, function(i,v){
                    res.info.returnRefundOrderVos[i].orderProductsSize = v.orderProducts.length;
                });

                //渲染模板
                var html = $("#RefundGods_TableTmpl").render(res.info);
                $("#allRefundGods").append(html);
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("查询订单失败");
        }
    });

}


var RefundGods_Index;

//点击加载订单详情
$(document).on("click",".RefundGods_orderNumber",function(){
    $("#RefundGods_Manage").css("display","none").siblings("#RefundGods_checkOrder_Info").css("display","block");
    Refund_Orders({"loginUserId":PLATFORM_LOGIN_USER_ID,"orderNumber":$(this).find(".GodsNumber").text()})
});

function Refund_Orders(data) {
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/queryOrder/platform/queryOrderByShopId",
        data: data,
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                $("#RefundGods_checkOrder_Info").html('');

                orderList = res.info.orderProductVos;

                $.each(orderList, function(i,v){
                    res.info.orderProductVos[i].orderProductSize = v.orderProducts.length;
                    res.info.orderProductVos[i].modifyTime=timeFn(res.info.orderProductVos[i].modifyTime);
                });

                if(res.info.orderProductVos && res.info.orderProductVos.length>0){
                    //渲染模板
                    var html = $("#RefundGods_OrderMessage_Tmple").render(res.info);
                    $("#RefundGods_checkOrder_Info").append(html);

                    $(".reback_refundGods").click(function(){
                        $("#RefundGods_checkOrder_Info").css("display","none").siblings("#RefundGods_Manage").css("display","block");
                    });

                    Order_action(res.info.orderProductVos[0]);
                    RefundGods_Index=res.info.orderProductVos[0];
                }else{
                    $("#RefundOrder_checkOrder_Info").html("暂未发现该订单信息")
                }


            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            //console.log("查询订单失败");
        }
    });
}

function Order_action(orderIndex){
    $("#checkOrder_Info").html('');
    if(orderIndex!= ''){
        if(orderIndex.orderStatus==1){
            //$(".wizard-steps li").eq(0).addClass("complete");
            $(".wizard-steps li").eq(0).find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(0).addClass("active");
        }
        else if(orderIndex.orderStatus==2){
            $(".wizard-steps li").eq(1).prevAll().addClass("complete");
            $(".wizard-steps li").eq(1).prevAll().find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(1).addClass("active");
        }
        else if(orderIndex.orderStatus==3){
            $(".wizard-steps li").eq(2).prevAll().addClass("complete");
            $(".wizard-steps li").eq(2).prevAll().find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(2).addClass("active");
        }
        else if(orderIndex.orderStatus==4){
            $(".wizard-steps li").eq(4).addClass("complete");
            $(".wizard-steps li").eq(4).prevAll().find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(4).prevAll().addClass("complete");
        }
        else if (orderIndex.orderStatus==0){
            //$(".wizard-steps li").eq(0).addClass("active").css("border-color",'red');
            $(".wizard-steps li").eq(0).addClass("error");
        }

        //查看物流
        $(".checkLogistics").click(function(e){
            e.stopImmediatePropagation();
            $("#Orders").load("pages/busi_platform/business/order/checkLogistics.html");

            $.ajax({
                url:PLATFORM_URL_PRE+"/essential/express/enterPriseQuery",
                data:{"com":orderIndex.logistic,"nu":orderIndex.logisticNumber},
                type:"POST",
                success:function(res){
                    if(res.code==1){
                        if(res.info && res.info.data){
                            var logisticHtml = $("#logisticTmpl").render(res.info.data);
                            $("#logisticDiv").append(logisticHtml);
                        }

                    }else{
                        alert(res.msg);
                    }
                },
                error:function(){
                    alert("网络错误")
                }
            })
        });
    }

}

//申请退货时间筛选
function refundGodsTime(){
    var start = {
        dateCell: '#RefundGods_modifyStartTime',
        format: 'YYYY-MM-DD hh:mm:ss',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        festival:true,
        ishmsVal:false,
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function(elem,datas){
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var end = {
        dateCell: '#RefundGods_modifyEndTime',
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
refundGodsTime();

//备注功能
$("#RefundGods_Manage").on("click",".RefundGodsTotal_Remark",function(e){
    e.stopPropagation();
    $(".Big_Remark").remove();
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
            PostMarkInfom({
                userId:PLATFORM_LOGIN_USER_ID,
                platformRemarks:$("#RefuMony_Inf").val(),
                returnRefundOrderId:getReturnRefundOrderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});
function PostMarkInfom(data){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/refundOrder/platform/remarks",
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
$("#Platform_RefundGoods").on("click",".Order_Remark",function(event){
    event.stopPropagation();
    $(".Big_Remark").remove();
    var OrderId=$(this).attr("data-orderId");
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
            RefundOrderPostMarkInfom({
                userId:PLATFORM_LOGIN_USER_ID,
                platformRemarks:$("#RefuMony_Inf").val(),
                orderId:OrderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});
function RefundOrderPostMarkInfom(data){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/buyOrder/platform/remarks",
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

//导出Excel
$(document).on("click",".RefundGods_Make_excel",function(e){
    e.stopImmediatePropagation();
    var postData={
        "loginUserId":PLATFORM_LOGIN_USER_ID,
        "returnRefundType":1,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "returnRefundLatestStatus":$("#RefundGods_orderStatus").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
        "name":$("#RefundGods_Name").val(),
        "payType":$("#RefundGods_PayType").val()
    };
    var str= $.param(postData);
    window.open(BUSINESS_URL_PRE+"/essential/export/platform/exportReturnRefund?"+str);
});