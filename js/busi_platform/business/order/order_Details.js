
$("#checkOrder_Info").html('');
if(orderIndex!= ''){
    var OrderMessageHtml = $("#OrderMessage_Tmple").render(orderIndex);
    $("#checkOrder_Info").append(OrderMessageHtml);
    TimeChange($(".ordersNumber").attr("data-Order"));
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

        $("#Orders").load("pages/busi_platform/business/order/deliveryGoods.html");

    });

    //查看物流
    $(".checkLogistics").click(function(e){
        e.stopImmediatePropagation();
        $("#Orders").load("pages/busi_platform/business/order/checkLogistics.html");
        checkDelivery();
    });
}

//取消订单
$("#checkOrder_Info .cancelOrders").click(function(){
    var $this=$(this);

    var params = {'orderId':orderIndex.orderId,'orderStatus':orderIndex.orderStatus};
    cancelOrders(params,$this);
});

//物流
function checkDelivery(){
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
}

//时间进度
function TimeChange(data){
    $.ajax({
        url:BUSINESS_URL_PRE+"/essential/queryOrderStatus/queryOrderStatus",
        data: {orderId:data},
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
//备注功能
$(".Order_Remark").on("click",function(event){
    $(".Big_Remark").remove();
    event.stopPropagation();
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
                orderId:orderIndex.orderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});

function OrderPostMarkInfom(data){
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/buyOrder/ bussiness/remarks",
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


