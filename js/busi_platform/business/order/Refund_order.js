var Refund_monyList = [];
var Refund_monyIndex = [];
    //点击切换获取数据
    allRefund({"loginUserId": BUSINESS_LOGIN_USER_ID,"returnRefundType":2});
    var $order = $("#Refund_Manage");
    $order.on("click","#Refund_All",function(){

        allRefund({
            "loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":2});

    }).on('click',"#Business_review",function(){

        allRefund({
            "loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":2,
            "productName":$("#Refund_productName").val(),
            "modifyStartTime":$("#Refund_modifyStartTime").val(),
            "modifyEndTime":$("#Refund_modifyEndTime").val(),
            "userNickname":$("#Refund_userNickname").val(),
            "orderNumber":$("#Refund_orderNumber").val(),
            "payType":$("#RefundOrderPayWay").val(),
            "returnRefundOrderNumber":$("#Refund_returnRefundOrderNumber").val(),
            "returnRefundLatestStatus":1});

    }).on("click","#Business_refusal",function(){

        allRefund({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":2,
            "productName":$("#Refund_productName").val(),
            "modifyStartTime":$("#Refund_modifyStartTime").val(),
            "modifyEndTime":$("#Refund_modifyEndTime").val(),
            "userNickname":$("#Refund_userNickname").val(),
            "orderNumber":$("#Refund_orderNumber").val(),
            "payType":$("#RefundOrderPayWay").val(),
            "returnRefundOrderNumber":$("#Refund_returnRefundOrderNumber").val(),
            "returnRefundLatestStatus":2});

    }).on("click","#Platform_check",function(){

        allRefund({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":2,
            "productName":$("#Refund_productName").val(),
            "modifyStartTime":$("#Refund_modifyStartTime").val(),
            "modifyEndTime":$("#Refund_modifyEndTime").val(),
            "userNickname":$("#Refund_userNickname").val(),
            "orderNumber":$("#Refund_orderNumber").val(),
            "payType":$("#RefundOrderPayWay").val(),
            "returnRefundOrderNumber":$("#Refund_returnRefundOrderNumber").val(),
            "returnRefundLatestStatus":3});

    }).on("click","#Platform_refund",function(){

        allRefund({"loginUserId":BUSINESS_LOGIN_USER_ID,
            "returnRefundType":2,
            "productName":$("#Refund_productName").val(),
            "modifyStartTime":$("#Refund_modifyStartTime").val(),
            "modifyEndTime":$("#Refund_modifyEndTime").val(),
            "userNickname":$("#Refund_userNickname").val(),
            "orderNumber":$("#Refund_orderNumber").val(),
            "payType":$("#RefundOrderPayWay").val(),
            "returnRefundOrderNumber":$("#Refund_returnRefundOrderNumber").val(),
            "returnRefundLatestStatus":4});

    }).on("click","#Platform_refusal",function(){

        allRefund({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":2,
            "productName":$("#Refund_productName").val(),
            "modifyStartTime":$("#Refund_modifyStartTime").val(),
            "modifyEndTime":$("#Refund_modifyEndTime").val(),
            "userNickname":$("#Refund_userNickname").val(),
            "orderNumber":$("#Refund_orderNumber").val(),
            "payType":$("#RefundOrderPayWay").val(),
            "returnRefundOrderNumber":$("#Refund_returnRefundOrderNumber").val(),
            "returnRefundLatestStatus":5});

    }).on("click","#Refund_Complete",function(){

        allRefund({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":2,
            "productName":$("#Refund_productName").val(),
            "modifyStartTime":$("#Refund_modifyStartTime").val(),
            "modifyEndTime":$("#Refund_modifyEndTime").val(),
            "userNickname":$("#Refund_userNickname").val(),
            "orderNumber":$("#Refund_orderNumber").val(),
            "payType":$("#RefundOrderPayWay").val(),
            "returnRefundOrderNumber":$("#Refund_returnRefundOrderNumber").val(),
            "returnRefundLatestStatus":6});

    }).on("click","#Refund_filter",function(){
        //console.log(queryOrderParam);

        allRefund(getQueryOrderParam());

    }).on("click","#queryRefundDiv a.Refud_order_nearlyTime",function(e){     //时间筛选订单
        e.stopImmediatePropagation();
        if($(this).hasClass("red")){
            $("#queryRefundDiv a.Refud_order_nearlyTime").removeClass("red");
        }else {
            $("#queryRefundDiv a.Refud_order_nearlyTime").removeClass("red");
            $(this).addClass("red");
        }
        allRefund(getQueryOrderParam());
    }).on("click",".LookDetail",function(){
        Refund_monyIndex = Refund_monyList[$(this).parent().parent().attr("data-index")];
        $("#Refund_orders").load("pages/busi_platform/business/order/Refund_details.html");
    }).on("click",".RefundGods_cancel",function(e){
        e.stopImmediatePropagation();
        Refund_monyIndex = Refund_monyList[$(this).parent().parent().attr("data-index")];
        $("#Refund_orders").load("pages/busi_platform/business/order/Refund_details.html")
    });

    //日历
    //$('.date_picker').date_input();


//订单商品跳转
function allRefund(data) {

    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/refundOrder/queryListByShopId",
        data: data,
        type: "post",
        beforeSend:function(){
            $(".Refund .Img_Load").remove();
            $('.Refund').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            if (res.code == 1) {
                $(".Img_Load").remove();
                $("#allRefund").html('');
                Refund_monyList = res.info.returnRefundOrderVos;
                $.each(Refund_monyList, function(i,v){
                    res.info.returnRefundOrderVos[i].orderProductsSize = v.orderProducts.length;
                });
                //渲染模板
                var html = $("#Refund_TableTmpl").render(res.info);
                $("#allRefund").append(html);

                pagePlus(res.info.totalPageCount,data,true);



                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()))
                });

            } else{
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("查询订单失败");
        }
    });

}
//分页调数据
function allRefundForPage(data) {

    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/refundOrder/queryListByShopId",
        data: data,
        type: "post",
        beforeSend:function(){
            $(".Refund .Img_Load").remove();
            $('.Refund').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            if (res.code == 1) {
                $(".Img_Load").remove();
                $("#allRefund").html('');
                Refund_monyList = res.info.returnRefundOrderVos;
                $.each(Refund_monyList, function(i,v){
                    res.info.returnRefundOrderVos[i].orderProductsSize = v.orderProducts.length;
                });
                //渲染模板
                var html = $("#Refund_TableTmpl").render(res.info);
                $("#allRefund").append(html);

                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()))
                });

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
                //console.log(paramData);
                paramData.pageNo = page;
                allRefundForPage(paramData);
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

//请求参数
function getQueryOrderParam(){
    var queryOrderParam = {
        "loginUserId":BUSINESS_LOGIN_USER_ID,
        "returnRefundType":2,
        "productName":$("#Refund_productName").val(),
        "modifyStartTime":$("#Refund_modifyStartTime").val(),
        "modifyEndTime":$("#Refund_modifyEndTime").val(),
        "userNickname":$("#Refund_userNickname").val(),
        "returnRefundLatestStatus":$("#Refund_orderStatus").val(),
        "orderNumber":$("#Refund_orderNumber").val(),
        "payType":$("#RefundOrderPayWay").val(),
        "preDate":$("#queryRefundDiv a.Refud_order_nearlyTime.red").attr("data-value"),
        "returnRefundOrderNumber":$("#Refund_returnRefundOrderNumber").val()
    };
    return queryOrderParam;
}


/*
function ChangeTime(tm){
    var tt=new Date(parseInt(tm)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    return tt;
}
*/

//备注功能
$("#Refund_Manage").on("click",".RefundOrderTotal_Remark",function(event){
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
            PostMarkInfom({
                userId:BUSINESS_LOGIN_USER_ID,
                bussinessRemarks:$("#RefuMony_Inf").val(),
                returnRefundOrderId:getReturnRefundOrderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});

function PostMarkInfom(data){
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

//备注功能
$("#Refund_orders").on("click",".Order_Remark",function(event){
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
            OrderPostMarkInfom({
                userId:BUSINESS_LOGIN_USER_ID,
                bussinessRemarks:$("#RefuMony_Inf").val(),
                orderId:OrderId
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

function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }

}
/*时间戳转变*/

function timeControl(){
    var start = {
        dateCell: '#Refund_modifyStartTime',
        format: 'YYYY-MM-DD hh:mm:ss',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        maxDate: '2099-06-30 23:59:59', //最大日期
        choosefun: function(elem,datas){
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var end = {
        dateCell: '#Refund_modifyEndTime',
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
timeControl();

var orderIndex;
function Refund_Orders(data) {
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/queryOrder/bussiness/queryOrderByShopId",
        data: data,
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                $("#Refund_checkOrder_Info").html('');

                orderList = res.info.orderProductVos;

                $.each(orderList, function(i,v){
                    res.info.orderProductVos[i].orderProductSize = v.orderProducts.length;
                    res.info.orderProductVos[i].modifyTime=timeFn(res.info.orderProductVos[i].modifyTime);
                });

                if(res.info.orderProductVos && res.info.orderProductVos.length>0){
                    //渲染模板
                    var html = $("#Refund_OrderMessage_Tmple").render(res.info);
                    $("#Refund_checkOrder_Info").append(html);

                    $("#reback_refundOrder").click(function(){
                        $("#Refund_checkOrder_Info").css("display","none").siblings("#Refund_Manage").css("display","block");
                    });

                    Order_action(res.info.orderProductVos[0]);
                    orderIndex=res.info.orderProductVos[0];
                }else{
                    $("#Refund_checkOrder_Info").html("暂未发现该订单信息")
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
        //发货
        $(".Deliver_Goods").click(function(){

            $("#Refund_checkOrder_Info").load("pages/busi_platform/business/order/deliveryGoods.html");

        });

        //查看物流
        $(".checkLogistics").click(function(e){
            e.stopImmediatePropagation();
            $("#Orders").load("pages/busi_platform/business/order/checkLogistics.html");

            $.ajax({
                url:BUSINESS_URL_PRE+"/essential/express/enterPriseQuery",
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

//取消订单
    $("#checkOrder_Info .cancelOrders").click(function(){
        var $this=$(this);
        var params = {'orderId':orderIndex.orderId,'orderStatus':orderIndex.orderStatus};
        cancelOrders(params,$this);
    });

}

$(document).on("click",".Refund_order_number",function(){
    $("#Refund_Manage").css("display","none").siblings("#Refund_checkOrder_Info").css("display","block");
    Refund_Orders({"loginUserId":BUSINESS_LOGIN_USER_ID,"orderNumber":$(this).find("a:eq(1)").text()})
});



//导出Excel
$(document).on("click",".Refundorder_Make_excel",function(e){
    e.stopImmediatePropagation();
    var postData={
        "loginUserId":BUSINESS_LOGIN_USER_ID,
        "returnRefundType":2,
        "productName":$("#Refund_productName").val(),
        "modifyStartTime":$("#Refund_modifyStartTime").val(),
        "modifyEndTime":$("#Refund_modifyEndTime").val(),
        "userNickname":$("#Refund_userNickname").val(),
        "returnRefundLatestStatus":$("#Refund_orderStatus").val(),
        "orderNumber":$("#Refund_orderNumber").val(),
        "payType":$("#RefundOrderPayWay").val(),
        "preDate":$("#queryRefundDiv a.Refud_order_nearlyTime.red").attr("data-value"),
        "returnRefundOrderNumber":$("#Refund_returnRefundOrderNumber").val()
    };
    var str= $.param(postData);
    window.open(BUSINESS_URL_PRE+"/essential/export/bussiness/exportReturnRefund?"+str);
});