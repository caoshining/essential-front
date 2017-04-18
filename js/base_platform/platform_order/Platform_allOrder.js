/**
 * Created by wangs on 2016/7/29.
 */

var platform_orderList = [];
var platform_orderIndex = [];
var paramData = {};
var timer,Time;
//点击切换获取数据
allOrders({"loginUserId": PLATFORM_LOGIN_USER_ID,"pageNo":1});
var $order = $("#platformOrder_Manage");
$order.on("click","#all_order",function(){

    allOrders({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "pageNo":1,
        "productName":$(".productName").val(),
        "userNickname":$(".userNickname").val(),
        "payType":$(".payType").val(),
        "name":$(".merchantsName").val(),
        "orderNumber":$(".orderNumber").val()
    });

}).on('click',"#readyBuyShop",function(){

    allOrders({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "orderStatus":1,
        "pageNo":1,
        "productName":$(".productName").val(),
        "userNickname":$(".userNickname").val(),
        "payType":$(".payType").val(),
        "name":$(".merchantsName").val(),
        "orderNumber":$(".orderNumber").val()
    });

}).on("click","#readySendGoods",function(){

    allOrders({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "orderStatus":2,
        "pageNo":1,
        "productName":$(".productName").val(),
        "userNickname":$(".userNickname").val(),
        "payType":$(".payType").val(),
        "name":$(".merchantsName").val(),
        "orderNumber":$(".orderNumber").val()
    });

}).on("click","#HasSendGoods",function(){

    allOrders({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "orderStatus":3,
        "pageNo":1,
        "productName":$(".productName").val(),
        "userNickname":$(".userNickname").val(),
        "payType":$(".payType").val(),
        "name":$(".merchantsName").val(),
        "orderNumber":$(".orderNumber").val()
    });

}).on("click","#HasOver",function(){

    allOrders({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "orderStatus":4,
        "pageNo":1,
        "productName":$(".productName").val(),
        "userNickname":$(".userNickname").val(),
        "payType":$(".payType").val(),
        "name":$(".merchantsName").val(),
        "orderNumber":$(".orderNumber").val()
    });

}).on("click","#HasClose",function(){

    allOrders({
        "loginUserId": PLATFORM_LOGIN_USER_ID,
        "orderStatus":5,
        "pageNo":1,
        "productName":$(".productName").val(),
        "userNickname":$(".userNickname").val(),
        "payType":$(".payType").val(),
        "name":$(".merchantsName").val(),
        "orderNumber":$(".orderNumber").val()
    });

}).on("click",".filter",function(){         //筛选订单

    var queryOrderParam = {
        "loginUserId":PLATFORM_LOGIN_USER_ID,
        "pageNo":1,
        "productName":$(".productName").val(),
        "userNickname":$(".userNickname").val(),
        "orderStatus":$(".orderStatus").val(),
        "payType":$(".payType").val(),
        "name":$(".merchantsName").val(),
        "orderNumber":$(".orderNumber").val()
    };

    allOrders(queryOrderParam);
}).on("click",".CheckDetails",function(){       //加载订单详细信息
    clearTimeout(timer);
    clearTimeout(Time);
    platform_orderIndex = platform_orderList[$(this).parent().parent().attr("data-index")];
    platform_orderIndex.createTime=timeFn(platform_orderIndex.createTime);

    $("#Platform_allOrders").load("pages/base_platform/business/platform_order/platformOrder_details.html");
    return false;
}).on("click",".returnRefundStatus",function(e){
    e.stopImmediatePropagation();
    var $this=$(this);

    singleProduct($this);
});


//订单商品跳转
function allOrders(data) {

    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/queryOrder/platform/queryOrderByShopId",
        data: data,
        type: "post",
        beforeSend:function(){
            $(".orders .Img_Load").remove();
            $('.orders').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {

            if (res.code == 1) {
                $("#allOrders").html('');
                $(".orders .Img_Load").remove();
                platform_orderList = res.info.orderProductVos;
                $.each(platform_orderList, function(i,v){
                    res.info.orderProductVos[i].orderProductSize = v.orderProducts.length;
                    res.info.orderProductVos[i].modifyTime=timeFn(res.info.orderProductVos[i].modifyTime);
                });
                //渲染模板
                var html = $("#orderTableTmpl").render(res.info);
                $("#allOrders").append(html);

                pagePlus(res.info.totalPageCount,data,true);
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            //console.log("查询订单失败");
        }
    });
}

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/queryOrder/platform/queryOrderByShopId",
        data: data,
        type: "post",
        beforeSend:function(){
            $("#allOrders").html('');
            $(".orders .Img_Load").remove();
            $('.orders').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            firstFlag = false;
            if (res.code == 1) {
                $(".orders .Img_Load").remove();
                $("#allOrders").html('');
                platform_orderList = res.info.orderProductVos;
                $.each(platform_orderList, function(i,v){
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

function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}

//单个商品跳转
function singleProduct($this){
    if($this.data("returnrefundstatus") >= 10
        && $this.data("returnrefundstatus") <= 90){
        $("#platformOrder_Manage").css("display","none").siblings("#checkProduct_Info").css("display","block");
        $.ajax({
            url:PLATFORM_URL_PRE+"/essential/refundOrder/platform/queryByOrderProductId",
            data:{
                "orderProductId":$this.data("orderproductid"),
                "loginUserId":PLATFORM_LOGIN_USER_ID},
            success:function(res){
                if(res.code==1){
                    $("#checkProduct_Info").html('');
                    if(res.info.length &&res.info.length>0){
                        $.each(res.info,function(i,v){
                            res.info[i].createTime=timeFn(res.info[i].createTime);
                            res.info[i].modifyTime=timeFn(res.info[i].modifyTime);
                        });
                        //渲染模板
                        if (res.info[0].returnRefundType ==2){
                            var RefundHtml = $("#checkProduct_Tmp").render(res.info);
                            $("#checkProduct_Info").append(RefundHtml);
                            RefundOrder_action(res.info[0]);

                        }else if(res.info[0].returnRefundType ==1){
                            var RefundGodsHtml = $("#checkRefundGods_details_Tmp").render(res.info);
                            $("#checkProduct_Info").append(RefundGodsHtml);
                            RefundGods_action(res.info[0]);
                        }


                        $(".reback_refundOrder").on("click",function(){
                            $("#platformOrder_Manage").css("display","block").siblings("#checkProduct_Info").css("display","none");
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
function RefundOrder_action(orderIndex){
    $("#checkOrder_Info").html('');

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
            $(".wizard-steps li").eq(2).addClass("complete");
            $(".wizard-steps li").eq(2).prevAll().find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(2).prevAll().addClass("complete");
        }
        else if (orderIndex.returnRefundLatestStatus==6){
            $(".wizard-steps li").eq(3).prevAll().addClass("complete");
            $(".wizard-steps li").eq(3).prevAll().find(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(3).addClass("complete");
            $(".wizard-steps li").eq(3).find(".wizeard-Top").addClass("active");
        }

        $("#checkProduct_Info").on("click","#GoodsMessage_Lists .checkRefund_Lists",function(e) {
            e.stopImmediatePropagation();
            checkRefundList(orderIndex);
        });
        //退款申请驳回与同意
        RefundMy_Click(orderIndex);
    }


}

//退货订单流程
function RefundGods_action(RefundGosIndex){

    if(RefundGosIndex !=''){
        TimeChange($(".RefundGods_order").attr("data-Order"));
        //console.log(RefundGosIndex.returnRefundLatestStatus);
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


//时间进度
function TimeChange(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/queryOrderStatus/queryReturnRefundStatus",
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

//查看退款单
function checkRefundList(orderIndex){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/refundOrder/queryRefundOrderInfo",
        data:{loginUserId:PLATFORM_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_order").attr("data-Order")},
        success:function(res){
            if (res.code==1){
                //console.log(res);
                var index=res.info;
                var RefundHtml="<div class='create_RefundTmp'></div>";
                var html="<div class='create_RefundList'>" +
                    "<h4>退款订单>查看退款单</h4>" +
                    "<table><tr>" +
                    "<td>订单编号:</td><td>"+orderIndex.orderNumber+"</td>" +
                    "</tr><tr>" +
                    "<td>退款单号:</td><td>"+index.returnRefundOrderNumber+"</td></tr>" +
                    "<tr><td>退款单来源:</td><td>退款订单</td></tr>" +
                    "<tr><td>商家名称:</td><td>"+orderIndex.name+"</td></tr>" +
                    "<tr><td>申请退款金额:</td><td>"+index.refundTotalMoney+"</td></tr>" +
                    "<tr><td>实退款金额:</td><td>"+index.refundFinalMoney+"</td></tr>" +
                    "<tr><td>收款人:</td><td>"+index.refundUser+"</td></tr>" +
                    "<tr><td>收款账号:</td><td>"+index.refundAccount+"</td></tr>" +
                    "<tr><td>退款渠道:</td><td>"+index.attr3+"</td></tr>" +
                    "<tr><td>退款时间:</td><td>"+index.attr6+"</td></tr>" +
                    "<tr><td>操作人:</td><td>"+index.attr4+"</td></tr>" +
                    "<tr><td>备注:</td><td>"+index.attr5+"</td></tr></table>" +
                    "<div class='createRefund'><span class='Return_Refund' style='background: #0b6cbc; color:#fff;'>返回</span></div>" +
                    "</div>";
                $(".index-tab-cont").append(RefundHtml);
                $(".index-tab-cont").append(html);

                $(".Return_Refund").on("click",function(){
                    $(".create_RefundTmp").remove();
                    $(".create_RefundList").remove();
                })
            }
            else{
                alert(res.msg);
            }
        },
        error:function(){

        }
    });
}

//生成退款单
function createRefundList(data){
    if (confirm("确定生成退款单")){
        $.ajax({
            url:PLATFORM_URL_PRE+"/essential/refundOrder/platform/update",
            data:data,
            type:"POST",
            success:function(res){
                if(res.code==1){
                    alert("生成退款单成功");
                    $(".create_RefundTmp").remove();
                    $(".create_RefundList").remove();
                    $("#create_RefundList").unbind("click");
                }else{
                    alert(res.msg);
                }

            },
            error:function(res){
                alert("网络延时，请重试");
            }
        })
    }
}

//退款申请驳回与同意
function RefundMy_Click(platformRefundIndex){

    //平台审核同意
    $("#platform_pass").bind("click",function(){
        var $this=$(this);
        if(confirm("确定同意?")){
            $this.css({"background":"#333"},{"color":"white"});
            platform_PostRefuse({"loginUserId":PLATFORM_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_order").attr("data-Order"),returnRefundType:2,returnRefundLatestStatus:4});
            $this.text("已通过");
        }
    });

    //平台审核驳回
    $("#platform_refuse").on("click",function(){
        var html="<div class='Big_RefuseInput' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
            "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
            "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
            "<div style='position:relative;left:35%;top:35%;width:35%;'>" +
            "<label for='RefuMony_Inf'>请输入驳回理由:</label><input id='RefuMony_Inf' type='text'>" +
            "<a href='###' class='Refund_Rigth_btn' style='display:block;position:absolute;left:10%;bottom:-20px;'>确定</a>" +
            "<a href='###' class='Refund_cancle_btn' style='display:block;position:absolute;right:10%;bottom:-20px;'>取消</a>"+
            "</div></div></div>";

        $(".index-tab-cont").append(html);

        //点击确定发送请求
        $(".Refund_Rigth_btn").on("click",function(){
            if($("#RefuMony_Inf").val() ==""){
                alert("请输入驳回理由!");
                return false;
            }else{
                Post_RigthtOrRefus({
                    loginUserId:PLATFORM_LOGIN_USER_ID,
                    returnRefundOrderId:$(".Refund_order").attr("data-Order"),
                    returnRefundRejectReason:$("#RefuMony_Inf").val(),
                    returnRefundType:2,returnRefundLatestStatus:5
                })
            }
        });
        $(".Refund_cancle_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

    });

    //生成退款单
    $("#createRefund_List").on("click",function(e){
        e.stopImmediatePropagation();
        var RefundHtml="<div class='create_RefundTmp'></div>";
        var html="<div class='create_RefundList'>" +
            "<h4>退款订单>生成退款单</h4>" +
            "<table><tr>" +
            "<td>订单编号:</td><td>"+platformRefundIndex.orderNumber+"</td>" +
            "</tr><tr>" +
            "<td>退款单号:</td><td>"+platformRefundIndex.returnRefundOrderNumber+"</td></tr>" +
            "<tr><td>退款单来源:</td><td>退款订单</td></tr>" +
            "<tr><td>商家名称:</td><td>"+platformRefundIndex.name+"</td></tr>" +
            "<tr><td>申请退款金额:</td><td>"+platformRefundIndex.refundTotalMoney+"</td></tr>" +
            "<tr><td>实退款金额:</td><td><input type='text' id='realRefundMoney'/></td></tr>" +
            "<tr><td>收款人:</td><td><input type='text' id='Receiver'/></td></tr>" +
            "<tr><td>收款账号:</td><td><input type='text' id='PaymentAccount'/></td></tr>" +
            "<tr><td>退款渠道:</td><td><input type='text' id='RefundChannels'/></td></tr>" +
            "<tr><td>退款时间:</td><td><input type='text' id='RefundTime'/></td></tr>" +
            "<tr><td>操作人:</td><td><input type='text' id='Operator'/></td></tr>" +
            "<tr><td>备注:</td><td><input type='text' id='refundMarks'/></td></tr></table>" +
            "<div class='createRefund'><span class='createRefund_pass'>确定</span><span class='createRefund_cancel'>取消</span></div>" +
            "</div>";
        $(".index-tab-cont").append(RefundHtml);
        $(".index-tab-cont").append(html);

        $(".create_RefundList").ready(function(){
            var start = {
                dateCell: '#RefundTime',
                format: 'YYYY-MM-DD hh:mm:ss',
                //minDate: jeDate.now(0), //设定最小日期为当前日期
                isTime:true,
                isinitVal:true,
                festival:true,
                ishmsVal:false,
                maxDate: jeDate.now(0), //最大日期
                choosefun: function(elem,datas){
                    //end.minDate = datas; //开始日选好后，重置结束日的最小日期
                }
            };
            jeDate(start);
        });

        $(".createRefund_cancel").on("click",function(){
            $(".create_RefundTmp").remove();
            $(".create_RefundList").remove();
        });

        //点击确定生成退款单
        $(".createRefund_pass").on("click",function(e){
            e.stopImmediatePropagation();
            var money=platformRefundIndex.refundTotalMoney;
            if($("#realRefundMoney").val()>money ||$("#realRefundMoney").val() == ''){
                alert("退款金额不能为空或超出退款金额");
                return false;
            }if($("#Receiver").val()==''){
                alert("收款人不能为空");
                return false;
            }
            if($("#PaymentAccount").val() == ""){
                alert("退款账号不能为空");
                return false;
            }
            if($("#RefundChannels").val() ==''){
                alert("退款渠道不能为空");
                return false;
            }
            if($("#RefundTime").val() ==''){
                alert("退款时间不能为空");
                return false;
            }
            if($("#Operator").val() ==''){
                alert("操作人不能为空");
                return false;
            }else{
                var data={
                    loginUserId:PLATFORM_LOGIN_USER_ID,
                    returnRefundOrderId:$(".Refund_order").attr("data-Order"),
                    returnRefundType:2,
                    returnRefundLatestStatus:6,
                    refundFinalMoney:$("#realRefundMoney").val(),
                    refundUser:$("#Receiver").val(),
                    refundAccount:$("#PaymentAccount").val(),
                    attr3:$("#RefundChannels").val(),
                    attr6:$("#RefundTime").val(),
                    attr4:$("#Operator").val(),
                    attr5:$("#refundMarks").val()
                };

                createRefundList(data);
            }


        })
    })
}

//平台驳回发出请求
function platform_PostRefuse(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/refundOrder/platform/update",
        data: data,
        type: "post",
        success:function(res){
            if(res.code==1){
                alert("Success");
            }else if(res.code==0){
                alert(res.msg);
            }
        },
        error:function(){
            alert("网络延时，请重试");
        }
    })

}
//备注功能
$("#Platform_allOrders").on("click",".orderNote",function(event){
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

//备注功能
$("#Platform_allOrders").on("click",".RefundOrderTotal_Remark",function(event){
    $(".Big_Remark").remove();
    event.stopPropagation();
    var returnRefundOrderId=$(this).attr("data-returnRefundOrderId");
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
                returnRefundOrderId:returnRefundOrderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});

function RefundOrderPostMarkInfom(data){
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
//导出Excel
$(document).on("click",".Order_Make_excel",function(e){
    e.stopImmediatePropagation();
    var postData={
        "loginUserId":PLATFORM_LOGIN_USER_ID,
        "pageNo":'',
        "productName":$(".productName").val(),
        "userNickname":$(".userNickname").val(),
        "orderStatus":$(".orderStatus").val(),
        "payType":$(".payType").val(),
        "name":$(".merchantsName").val(),
        "orderNumber":$(".orderNumber").val()
    };
    var str= $.param(postData);
    window.open(BUSINESS_URL_PRE+"/essential/export/platform/exportOrderByShopId?"+str);
});