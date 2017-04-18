/**
 * Created by wangs on 2016/7/30.
 */

function Platform_RefundGods_checkDetails(){
    $("#platformRefundGods_details_Info").html('');

    if(platform_orderIndex != ''){
        var OrderMessageHtml = $("#platformRefundGods_details_Tmple").render(platform_orderIndex);
        $("#platformRefundGods_details_Info").append(OrderMessageHtml);
        TimeChange($(".Refund_God_order").attr("data-Order"));
        //console.log(platform_orderIndex);
        if(platform_orderIndex.returnRefundLatestStatus==1){        //商家审核

            $(".wizard-steps li").eq(0).addClass("complete");
            $(".wizard-steps li").eq(0).find(".wizeard-Top").addClass("active");

        }
        else if(platform_orderIndex.returnRefundLatestStatus==2){       //商家驳回
            $(".wizard-steps li").eq(1).prevAll().addClass("complete");
            $(".wizard-steps li").eq(1).addClass("error");
            $(".wizard-steps li").eq(1).children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(1).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(1).children(".wizeard-Top").html("商家驳回退款申请");
        }
        else if(platform_orderIndex.returnRefundLatestStatus==3){       //平台审核中

            $(".wizard-steps li").eq(3).addClass("active").prevAll().addClass("complete");
            $(".wizard-steps li").eq(3).children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(3).prevAll().children(".wizeard-Top").addClass("active");

        }
        else if(platform_orderIndex.returnRefundLatestStatus==4){           //平台处理中

            $(".wizard-steps li").eq(4).addClass("active").prevAll().addClass("complete");
            $(".wizard-steps li").eq(4).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(4).children(".wizeard-Top").addClass("active");
        }
        else if(platform_orderIndex.returnRefundLatestStatus==5){           //平台驳回

            $(".wizard-steps li").eq(4).addClass("error").prevAll().addClass("complete");
            $(".wizard-steps li").eq(4).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(4).children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(4).children(".wizeard-Top").html("平台驳回");
        }
        else if(platform_orderIndex.returnRefundLatestStatus==6){           //退款完成

            $(".wizard-steps li").eq(5).addClass("complete").prevAll().addClass("complete");
            $(".wizard-steps li").eq(5).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(5).children(".wizeard-Top").addClass("active");
        }
        else if(platform_orderIndex.returnRefundLatestStatus==7){           //待买家发货

            $(".wizard-steps li").eq(1).addClass("active").prevAll().addClass("complete");
            $(".wizard-steps li").eq(1).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(1).children(".wizeard-Top").addClass("active");
        }
        else if(platform_orderIndex.returnRefundLatestStatus==8){           //待商家收货

            $(".wizard-steps li").eq(2).addClass("active").prevAll().addClass("complete");
            $(".wizard-steps li").eq(2).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(2).children(".wizeard-Top").addClass("active");
        }
        else if(platform_orderIndex.returnRefundLatestStatus==9){           //货品驳回

            $(".wizard-steps li").eq(3).addClass("error").prevAll().addClass("complete");

            $(".wizard-steps li").eq(3).prevAll().children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(3).children(".wizeard-Top").addClass("active");
            $(".wizard-steps li").eq(3).children(".wizeard-Top").html("商家驳回货品");
        }

    }
}
Platform_RefundGods_checkDetails();
/*上边进度条样式变化*/

function Busice_Click_pass(){
    $("#Plat_Check_pass").on("click",function(){
        Post_PasAndRefus({returnRefundOrderId:$(".Refund_God_order").attr("data-order"),returnRefundType:1,returnRefundLatestStatus:7});
        $("#Plat_Check_pass").css({"background":"#333"},{"color":"white"});
        $("#Plat_Check_pass").text("已通过");
        Platform_RefundGods_checkDetails();
    });
    $("#Plat_Check_refuse").on("click",function(){
        var html="<div style='position:absolute;width:100%;height:100%;'>" +
            "<label for='Refu_Inf'>请输入驳回理由</label><input id='Refu_Inf' type='text'>" +
            "</div>"
        $("#RefundGods_checkOrder_Info").append(html);
        Post_PasAndRefus({returnRefundOrderId:$(".Refund_God_order").attr("data-order"),returnRefundRejectReason:$("#Refu_Inf").val(),returnRefundType:1,returnRefundLatestStatus:2})
        Platform_RefundGods_checkDetails();
    });
    $("#Busic_Check_pass").on("click",function(){
        Post_PasAndRefus({returnRefundOrderId:$(".Refund_God_order").attr("data-order"),returnRefundType:1,returnRefundLatestStatus:3});
        $("#Busic_Check_pass").css({"background":"#333"},{"color":"white"});
        $("#Busic_Check_pass").text("已确认收货");
        Platform_RefundGods_checkDetails();
    });
    $("#Busic_Check_refuse").on("click",function(){
        var html="<div style='position:absolute;width:100%;height:100%;'>" +
            "<label for='RefuGods_Inf'>请输入驳回理由</label><input id='RefuGods_Inf' type='text'>" +
            "</div>";
        $("#Busic_Check_refuse").append(html);
        Platform_RefundGods_checkDetails();
        Post_PasAndRefus({returnRefundOrderId:$(".Refund_God_order").attr("data-Order"),returnRefundRejectReason:$("#RefuGods_Inf").val(),returnRefundType:1,returnRefundLatestStatus:9})
    });
}
Busice_Click_pass();

function Post_PasAndRefus(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/refundOrder/update",
        data: data,
        type: "post",
        success:function(res){
            if(res.code==1){
                alert("Success");
            }else if(res.code==0){
                alert(res.msg);
            }
        },error:function(){
            alert("网络延时，请重试")
        }
    })
}
/*商家点击通过或者驳回*/

function RefndMy_Click(){

    //平台审核同意
    $("#platform_MonCheck_pass").bind("click",function(){
        if(confirm("确定同意?")){
            $(this).css({"background":"#333"},{"color":"white"});
            Post_RigthtOrRefus({"loginUserId":PLATFORM_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_God_order").attr("data-Order"),returnRefundType:1,returnRefundLatestStatus:4});
            $(this).text("已通过");
        }

    });

    //平台审核驳回
    $("#platform_MonCheck_refuse").on("click",function(){
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
            Post_RigthtOrRefus({loginUserId:PLATFORM_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_God_order").attr("data-Order"),returnRefundRejectReason:$("#RefuMony_Inf").val(),returnRefundType:1,returnRefundLatestStatus:5})
        });
        $(".Refund_cancle_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

    });

    //生成退款单
    $("#create_RefundGodsList").on("click",function(){

        var RefundHtml="<div class='create_RefundTmp'></div>";
        var html="<div class='create_RefundList'>" +
            "<h4>退款订单>生成退款单</h4>" +
            "<table><tr>" +
            "<td>订单编号:</td><td>"+platform_orderIndex.orderNumber+"</td>" +
            "</tr><tr>" +
            "<td>退款单号:</td><td>"+platform_orderIndex.returnRefundOrderNumber+"</td></tr>" +
            "<tr><td>退款单来源:</td><td>退货订单</td></tr>" +
            "<tr><td>商家名称:</td><td>"+platform_orderIndex.name+"</td></tr>" +
            "<tr><td>申请退款金额:</td><td>"+platform_orderIndex.refundTotalMoney+"</td></tr>" +
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

        //退款时间
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
        $(".createRefund_pass").on("click",function(){
            var data={
                loginUserId:PLATFORM_LOGIN_USER_ID,
                returnRefundOrderId:$(".Refund_God_order").attr("data-Order"),
                returnRefundType:1,
                returnRefundLatestStatus:6,
                refundFinalMoney:$("#realRefundMoney").val(),
                refundUser:$("#Receiver").val(),
                refundAccount:$("#PaymentAccount").val(),
                attr3:$("#RefundChannels").val(),
                attr6:$("#RefundTime").val(),
                attr4:$("#Operator").val(),
                attr5:$("#refundMarks").val()
            };

            createRefund(data);
        })
    })
}
RefndMy_Click();

//驳回发出请求
function Post_RigthtOrRefus(data){
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

//生成退款单
function createRefund(data){
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

//查看退款单
$(".checkRefund_List").click(function(e){
    e.stopImmediatePropagation();
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/refundOrder/queryRefundOrderInfo",
        data:{loginUserId:PLATFORM_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_God_order").attr("data-Order")},
        success:function(res){
            if (res.code==1){

                var index=res.info;
                var RefundHtml="<div class='create_RefundTmp'></div>";
                var html="<div class='create_RefundList'>" +
                    "<h4>退款订单>查看退货单</h4>" +
                    "<table><tr>" +
                    "<td>订单编号:</td><td>"+platform_orderIndex.orderNumber+"</td>" +
                    "</tr><tr>" +
                    "<td>退款单号:</td><td>"+index.returnRefundOrderNumber+"</td></tr>" +
                    "<tr><td>退款单来源:</td><td>退货订单</td></tr>" +
                    "<tr><td>商家名称:</td><td>"+platform_orderIndex.name+"</td></tr>" +
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
            alert('查看退款单失败')
        }
    });
});


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

//备注功能
$("#Platform_RefundGoods").on("click",".RefundGodsdetail_Remark",function(e){
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
            RefundGodsDetailMarkInfom({
                userId:PLATFORM_LOGIN_USER_ID,
                platformRemarks:$("#RefuMony_Inf").val(),
                returnRefundOrderId:getReturnRefundOrderId
            });
        }else{
            alert("备注信息不能为空。")
        }
    });
});
function RefundGodsDetailMarkInfom(data){
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