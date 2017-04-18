/**
 * Created by wangs on 2016/8/24.
 */

//所有未生成退款单
var RefundList=[];
Not_RefundList({loginUserId: PLATFORM_LOGIN_USER_ID,type:1,"pageNo":1});
function Not_RefundList(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/refundOrder/queryGenerateRefundOrder",
        data:data,
        beforeSend:function(){
            $(".NotGenerate_List .Img_Load").remove();
            $('.NotGenerate_List').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code == 1){
                $(".NotGenerate_List .Img_Load").remove();
                $("#NotGenerate_Tab").html("");
                var length=res.info.returnRefundOrderVos.length;
                if(length && length>0){
                    RefundList=res.info.returnRefundOrderVos;
                    $.each(res.info.returnRefundOrderVos,function(i,v){
                        res.info.returnRefundOrderVos[i].createTime=timeFn(res.info.returnRefundOrderVos[i].createTime);
                    });
                    var html=$("#NotGenerateList_Tmp").render(res.info);
                    $("#NotGenerate_Tab").html(html);

                    pagePlus(res.info.totalPageCount,data,true);
                }else{
                    $("#NotGenerate_Tab").html("没有未生成的退款订单");
                }
            }else{
                alert(res.msg);
            }
        }
    });
}

//筛选未生成的退款单
$(document).on("click",".RefundOrder_Filter",function(){
    var data={
        loginUserId: PLATFORM_LOGIN_USER_ID,
        type:1,
        pageNo:1,
        productName:$("#filter_shopName").val(),
        userNickname:$("#filter_userName").val(),
        returnRefundOrderNumber:$("#filter_RefundNumber").val(),
        orderNumber:$("#filter_orderNumber").val(),
        payType:$("#filter_payMethod").val(),
        name:$("#filter_GodsName").val(),
        modifyStartTime:$("#startApply_Time").val(),
        modifyEndTime:("#endApply_Time").val()
    };
    Not_RefundList(data);
});

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/refundOrder/queryGenerateRefundOrder",
        data:data,
        beforeSend:function(){
            $("#NotGenerate_Tab").html("");
            $(".NotGenerate_List .Img_Load").remove();
            $('.NotGenerate_List').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code == 1){
                $(".NotGenerate_List .Img_Load").remove();
                $("#NotGenerate_Tab").html("");
                var length=res.info.returnRefundOrderVos.length;
                if(length && length>0){
                    $.each(res.info.returnRefundOrderVos,function(i,v){
                        res.info.returnRefundOrderVos[i].createTime=timeFn(res.info.returnRefundOrderVos[i].createTime);
                    });
                    var html=$("#NotGenerateList_Tmp").render(res.info);
                    $("#NotGenerate_Tab").html(html);

                }else{
                    $("#NotGenerate_Tab").html("没有未生成的退款订单");
                }
            }else{
                alert(res.msg);
            }
        }
    });
}

//分页
function pagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            var paramData = data;
            if(!flag){
                paramData.pageNo = page;
                paramData.type = 1;
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

//点击生成退款单
$(document).on("click",".createRefund_List",function(e){
    e.stopImmediatePropagation();
    var index=RefundList[$(this).parent().parent().prev().attr("data-index")];
    var RefundHtml="<div class='create_RefundTmp'></div>";
    var html="<div class='create_RefundList'>" +
        "<h4>退款订单>生成退款单</h4>" +
        "<table><tr>" +
        "<td>订单编号:</td><td>"+index.orderNumber+"</td>" +
        "</tr><tr>" +
        "<td>退款单号:</td><td>"+index.returnRefundOrderNumber+"</td></tr>" +
        "<tr><td>退款单来源:</td><td>退货订单</td></tr>" +
        "<tr><td>商家名称:</td><td>"+index.name+"</td></tr>" +
        "<tr><td>申请退款金额:</td><td>"+index.refundTotalMoney+"</td></tr>" +
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
    $(".createRefund_pass").on("click",function(e){
        e.stopImmediatePropagation();
        var money=index.refundTotalMoney;
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
        }
        var data={
            loginUserId:PLATFORM_LOGIN_USER_ID,
            returnRefundOrderId:index.returnRefundOrderId,
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
});
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

var NotRefundIndex={};
$(document).on("click",".checkRefund_Details",function(e){
    e.stopImmediatePropagation();
    NotRefundIndex=RefundList[$(this).parent().parent().attr("data-index")];
    $("#NotGenerate_Refund").load("pages/base_platform/business/platform_order/NotGenerate_RefundListDetails.html");
});


//时间筛选初始化
HistoryRefundTime();
function HistoryRefundTime(){
    var start = {
        dateCell: '#startApply_Time',
        format: 'YYYY-MM-DD hh:mm:ss',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        isinitVal:true,
        festival:true,
        ishmsVal:false,
        maxDate: jeDate.now(0), //最大日期
        choosefun: function(elem,datas){
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var end = {
        dateCell: '#endApply_Time',
        format: 'YYYY-MM-DD hh:mm:ss',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        festival:true,
        ishmsVal:false,
        maxDate: jeDate.now(0), //最大日期
        choosefun: function(elem,datas){
            start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
        }
    };
    jeDate(end);
    jeDate(start);

}
