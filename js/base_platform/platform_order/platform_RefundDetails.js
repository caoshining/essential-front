$("#platform_RefundDetails_Info").html('');
if(platform_RefundIndex!= ''){
    var Refund_monyMessageHtml = $("#platform_RefundDetails_Tmple").render(platform_RefundIndex);
    $("#platform_RefundDetails_Info").append(Refund_monyMessageHtml);
    TimeChange($(".Refund_Mony_order").attr("data-Order"));
    if(platform_RefundIndex.returnRefundLatestStatus==1){

        $("#platform_Refund .wizard-steps li").eq(0).addClass("complete");
        $("#platform_Refund .wizard-steps li").eq(0).find(".wizeard-Top").addClass("active");
        /*$("#platform_Refund .wizard-steps li").eq(1).addClass("error");*/
    }else if(platform_RefundIndex.returnRefundLatestStatus==2){
        $("#platform_Refund .wizard-steps li").eq(0).addClass("complete");
        $("#platform_Refund .wizard-steps li").eq(1).find(".wizeard-Top").html("商家驳回退款申请");
        $("#platform_Refund .wizard-steps li").eq(1).prevAll().children(".wizeard-Top").addClass("active");
        $("#platform_Refund .wizard-steps li").eq(1).find(".wizeard-Top").addClass("active");
        $("#platform_Refund .wizard-steps li").eq(1).addClass("error");

    }else if(platform_RefundIndex.returnRefundLatestStatus==3){

        $("#platform_Refund .wizard-steps li").eq(0).addClass("complete");
        $("#platform_Refund .wizard-steps li").eq(1).prevAll().children(".wizeard-Top").addClass("active");
        $("#platform_Refund .wizard-steps li").eq(1).find(".wizeard-Top").addClass("active");
        $("#platform_Refund .wizard-steps li").eq(1).addClass("active");
    }
    else if(platform_RefundIndex.returnRefundLatestStatus==4){
        $("#platform_Refund .wizard-steps li").eq(2).prevAll().addClass("complete");
        $("#platform_Refund .wizard-steps li").eq(2).addClass("active");
        $("#platform_Refund .wizard-steps li").eq(2).children(".wizeard-Top").addClass("active");
        $("#platform_Refund .wizard-steps li").eq(2).prevAll().children(".wizeard-Top").addClass("active");
    }
    else if(platform_RefundIndex.returnRefundLatestStatus==5){

        $("#platform_Refund .wizard-steps li").eq(2).addClass("error").prevAll().addClass("complete");
        $("#platform_Refund .wizard-steps li").eq(2).children(".wizeard-Top").addClass("active");
        $("#platform_Refund .wizard-steps li").eq(2).children(".wizeard-Top").html("平台驳回申请退款");
        $("#platform_Refund .wizard-steps li").eq(2).prevAll().children(".wizeard-Top").addClass("active");
    }
    else if(platform_RefundIndex.returnRefundLatestStatus==6){
        $("#platform_Refund .wizard-steps li").eq(3).addClass("complete").prevAll().addClass("complete");
        $("#platform_Refund .wizard-steps li").eq(3).prevAll().children(".wizeard-Top").addClass("active");
        $("#platform_Refund .wizard-steps li").eq(3).children(".wizeard-Top").addClass("active")
    }

}


function RefndMy_Click(){

    //平台审核同意
    $("#platform_MonCheck_pass").bind("click",function(){
        if(confirm("确定同意?")){
            $(this).css({"background":"#333"},{"color":"white"});
            Post_RigthtOrRefus({"loginUserId":PLATFORM_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_Mony_order").attr("data-Order"),returnRefundType:2,returnRefundLatestStatus:4});
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
            Post_RigthtOrRefus({loginUserId:PLATFORM_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_Mony_order").attr("data-Order"),returnRefundRejectReason:$("#RefuMony_Inf").val(),returnRefundType:2,returnRefundLatestStatus:5})
        });
        $(".Refund_cancle_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

    });

    //生成退款单
    $("#create_RefundList").on("click",function(e){
        e.stopImmediatePropagation();
        var RefundHtml="<div class='create_RefundTmp'></div>";
        var html="<div class='create_RefundList'>" +
            "<h4>退款订单>生成退款单</h4>" +
            "<table><tr>" +
            "<td>订单编号:</td><td>"+platform_RefundIndex.orderNumber+"</td>" +
            "</tr><tr>" +
            "<td>退款单号:</td><td>"+platform_RefundIndex.returnRefundOrderNumber+"</td></tr>" +
            "<tr><td>退款单来源:</td><td>退款订单</td></tr>" +
            "<tr><td>商家名称:</td><td>"+platform_RefundIndex.name+"</td></tr>" +
            "<tr><td>申请退款金额:</td><td>"+platform_RefundIndex.refundTotalMoney+"</td></tr>" +
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
            var money=platform_RefundIndex.refundTotalMoney;
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
                    returnRefundOrderId:$(".Refund_Mony_order").attr("data-Order"),
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

                createRefund(data);
            }

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

//查看退款单
$("#GoodsMessage_List .checkRefund_List").click(function(e){
    e.stopImmediatePropagation();
    $.ajax({
       url: PLATFORM_URL_PRE+"/essential/refundOrder/queryRefundOrderInfo",
        data:{loginUserId:PLATFORM_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_Mony_order").attr("data-Order")},
        success:function(res){
            if (res.code==1){
                //console.log(res);
                var index=res.info;
                var RefundHtml="<div class='create_RefundTmp'></div>";
                var html="<div class='create_RefundList'>" +
                    "<h4>退款订单>查看退款单</h4>" +
                    "<table><tr>" +
                    "<td>订单编号:</td><td>"+platform_RefundIndex.orderNumber+"</td>" +
                    "</tr><tr>" +
                    "<td>退款单号:</td><td>"+index.returnRefundOrderNumber+"</td></tr>" +
                    "<tr><td>退款单来源:</td><td>退款订单</td></tr>" +
                    "<tr><td>商家名称:</td><td>"+platform_RefundIndex.name+"</td></tr>" +
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

//时间筛选
function RefundTime(){
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
}
//RefundTime();
//备注功能
$("#Platform_RefundOrders").on("click",".Refundorderdetail_Remark",function(e){
    e.stopPropagation();
    $(".Big_Remark").remove();
    var getReturnRefundOrderId=$(this).attr("data-returnRefundOrderId");
    var html="<div class='Big_Remark' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
        "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
        "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;le" +
        "ft:0;'>" +
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


