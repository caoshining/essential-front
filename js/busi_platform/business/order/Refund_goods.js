/**
 * Created by wangs on 2016/7/7.
 */
var Refund_GodsList = [];
var Refund_GodsIndex = [];
var paramData = {};
var timer=null;
    //点击切换获取数据
    allRefundGods({"loginUserId": BUSINESS_LOGIN_USER_ID,"returnRefundType":1,"pageNo":1});
    var $order = $("#RefundGods_Manage");
    $order.on("click","#RefundGods_All",function(){

        allRefundGods({
            "loginUserId": BUSINESS_LOGIN_USER_ID,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "returnRefundLatestStatus":$("#RefundGods_orderStatus").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundType":1});

    }).on('click',"#Business_goods_check",function(){

        allRefundGods({
            "loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":1,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundLatestStatus":1});

    }).on("click","#Business_goods_refuse",function(){

        allRefundGods({
            "loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":1,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundLatestStatus":2});

    }).on("click","#Platform_goods_check",function(){

        allRefundGods({"loginUserId":BUSINESS_LOGIN_USER_ID,
            "returnRefundType":1,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundLatestStatus":3});

    }).on("click","#Platform_goods_refund",function(){

        allRefundGods({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":1,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundLatestStatus":4});

    }).on("click","#Platform_goods_refuse",function(){

        allRefundGods({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":1,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundLatestStatus":5});

    }).on("click","#RefundGods_Complete",function(){

        allRefundGods({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":1,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundLatestStatus":6});

    }).on("click","#Business_goods_send",function(){

        allRefundGods({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":1,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundLatestStatus":7});

    }).on("click","#Platform_goods_receive",function(){

        allRefundGods({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":1,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundLatestStatus":8});

    }).on("click","#Business_goods_Godsrefuse",function(){

        allRefundGods({"loginUserId": BUSINESS_LOGIN_USER_ID,
            "returnRefundType":1,
            "productName":$("#RefundGods_productName").val(),
            "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
            "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
            "userNickname":$("#RefundGods_userNickname").val(),
            "orderNumber":$("#RefundGods_orderNumber").val(),
            "payType":$("#RefundGods_PayType").val(),
            "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val(),
            "returnRefundLatestStatus":9});

    }).on("click","#RefundGods_filter",function(){
        //console.log(queryOrderParam);

        allRefundGods(getQueryOrderParam());

    }).on("click","#queryRefundGodsDiv a.Refud_gods_nearlyTime",function(e){     //时间筛选订单
        e.stopImmediatePropagation();
        if($(this).hasClass("red")){
            $("#queryRefundGodsDiv a.Refud_gods_nearlyTime").removeClass("red");
        }else {
            $("#queryRefundGodsDiv a.Refud_gods_nearlyTime").removeClass("red");
            $(this).addClass("red");
        }
        allRefundGods(getQueryOrderParam());
    }).on("click",".LookDetail",function(e){ //加载订单详细信息
        e.stopImmediatePropagation();
        Refund_GodsIndex = Refund_GodsList[$(this).parent().parent().attr("data-index")];
        $("#Refund_Goods").load("pages/busi_platform/business/order/Refund_goods_details.html");

    }).on("click",".RefundGods_cancel",function(e){
        e.stopImmediatePropagation();
        Refund_GodsIndex = Refund_GodsList[$(this).parent().parent().attr("data-index")];
        $("#Refund_Goods").load("pages/busi_platform/business/order/Refund_goods_details.html");

    });


//订单商品跳转
function allRefundGods(data) {

    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/refundOrder/queryListByShopId",
        data: data,
        type: "post",
        beforeSend:function(){
            $(".RefundGods .Img_Load").remove();
            $('.RefundGods').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            if (res.code == 1) {
                $(".Img_Load").remove();
                $("#allRefundGods").html('');
                Refund_GodsList = res.info.returnRefundOrderVos;
                $.each(Refund_GodsList, function(i,v){
                    res.info.returnRefundOrderVos[i].orderProductsSize = v.orderProducts.length;

                });

                //渲染模板
                var html = $("#RefundGods_TableTmpl").render(res.info);
                $("#allRefundGods").append(html);

                pagePlus(res.info.totalPageCount,data,true);

                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()))
                })

            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("查询订单失败");
        }
    });
}

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/refundOrder/queryListByShopId",
        data: data,
        type: "post",
        beforeSend:function(){
            $(".RefundGods .Img_Load").remove();

            $('.RefundGods').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            firstFlag = false;
            if (res.code == 1) {

                $(".Img_Load").remove();
                $("#allRefundGods").html('');

                Refund_GodsList = res.info.returnRefundOrderVos;
                $.each(Refund_GodsList, function(i,v){
                    res.info.returnRefundOrderVos[i].orderProductsSize = v.orderProducts.length;

                });
                //渲染模板
                var html = $("#RefundGods_TableTmpl").render(res.info);
                $("#allRefundGods").append(html);

                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()))
                })
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

//请求参数
function getQueryOrderParam(){
    var queryOrderParam = {
        "loginUserId":BUSINESS_LOGIN_USER_ID,
        "returnRefundType":1,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "returnRefundLatestStatus":$("#RefundGods_orderStatus").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "payType":$("#RefundGods_PayType").val(),
        "preDate":$("#queryRefundGodsDiv a.Refud_gods_nearlyTime.red").attr("data-value"),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val()
    };
    return queryOrderParam;
}

/*function ChangeTime(tm){
    var tt=new Date(parseInt(tm)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    return tt;
}*/
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
$("#Refund_Goods").on("click",".Order_Remark",function(event){
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
                userId:BUSINESS_LOGIN_USER_ID,
                bussinessRemarks:$("#RefuMony_Inf").val(),
                orderId:OrderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});
function RefundOrderPostMarkInfom(data){
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

function timeControl(){
    var start = {
        dateCell: '#RefundGods_modifyStartTime',
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
timeControl();


var orderIndex;
function Refund_Orders(data) {
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/queryOrder/bussiness/queryOrderByShopId",
        data: data,
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                $("#RefundOrder_checkOrder_Info").html('');

                orderList = res.info.orderProductVos;

                $.each(orderList, function(i,v){
                    res.info.orderProductVos[i].orderProductSize = v.orderProducts.length;
                    res.info.orderProductVos[i].modifyTime=timeFn(res.info.orderProductVos[i].modifyTime);
                });

                if(res.info.orderProductVos && res.info.orderProductVos.length>0){
                    //渲染模板
                    var html = $("#RefundOrder_OrderMessage_Tmple").render(res.info);
                    $("#RefundOrder_checkOrder_Info").append(html);

                    $("#reback_refundGods").click(function(){
                        $("#RefundOrder_checkOrder_Info").css("display","none").siblings("#RefundGods_Manage").css("display","block");
                    });

                    Order_action(res.info.orderProductVos[0]);
                    orderIndex=res.info.orderProductVos[0];
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
        //发货
        $(".Deliver_Goods").click(function(){

            $("#RefundOrder_checkOrder_Info").load("pages/busi_platform/business/order/deliveryGoods.html");

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

$(document).on("click",".Refund_Godsorder_number",function(){
    $("#RefundGods_Manage").css("display","none").siblings("#RefundOrder_checkOrder_Info").css("display","block");
    Refund_Orders({"loginUserId":BUSINESS_LOGIN_USER_ID,"orderNumber":$(this).find("a:eq(1)").text()})
});


//导出Excel
$(document).on("click",".RefundGods_Make_excel",function(e){
    e.stopImmediatePropagation();
    var postData={
        "loginUserId":BUSINESS_LOGIN_USER_ID,
        "returnRefundType":1,
        "productName":$("#RefundGods_productName").val(),
        "modifyStartTime":$("#RefundGods_modifyStartTime").val(),
        "modifyEndTime":$("#RefundGods_modifyEndTime").val(),
        "userNickname":$("#RefundGods_userNickname").val(),
        "returnRefundLatestStatus":$("#RefundGods_orderStatus").val(),
        "orderNumber":$("#RefundGods_orderNumber").val(),
        "payType":$("#RefundGods_PayType").val(),
        "preDate":$("#queryRefundGodsDiv a.Refud_gods_nearlyTime.red").attr("data-value"),
        "returnRefundOrderNumber":$("#RefundGods_RefundorderNumber").val()
    };
    var str= $.param(postData);
    window.open(BUSINESS_URL_PRE+"/essential/export/bussiness/exportReturnRefund?"+str);
});