/**
 * Created by wangs on 2016/8/24.
 */

//所有历史退款单
HistoryRefund_list({loginUserId: PLATFORM_LOGIN_USER_ID,type:2,"pageNo":1});
function HistoryRefund_list(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/refundOrder/queryGenerateRefundOrder",
        data:data,
        beforeSend:function(){
            $(".HistoryRefund_List .Img_Load").remove();
            $('.HistoryRefund_List').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code == 1){
                $(".HistoryRefund_List .Img_Load").remove();
                $("#HistoryRefund_Tab").html("");
                var length=res.info.returnRefundOrderVos.length;
                if(length && length>0){
                    $.each(res.info.returnRefundOrderVos,function(i,v){
                        res.info.returnRefundOrderVos[i].createTime=timeFn(res.info.returnRefundOrderVos[i].createTime);
                        res.info.returnRefundOrderVos[i].modifyTime=timeFn(res.info.returnRefundOrderVos[i].modifyTime);
                    });
                    var html=$("#HistoryRefundList_Tmp").render(res.info);
                    $("#HistoryRefund_Tab").html(html);

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

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/refundOrder/queryGenerateRefundOrder",
        data:data,
        beforeSend:function(){
            $("#HistoryRefund_Tab").html("");
            $(".HistoryRefund_List .Img_Load").remove();
            $('.HistoryRefund_List').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code == 1){
                $(".HistoryRefund_List .Img_Load").remove();
                $("#HistoryRefund_Tab").html("");
                var length=res.info.returnRefundOrderVos.length;
                if(length && length>0){
                    $.each(res.info.returnRefundOrderVos,function(i,v){
                        res.info.returnRefundOrderVos[i].modifyTime=timeFn(res.info.returnRefundOrderVos[i].modifyTime);
                        res.info.returnRefundOrderVos[i].createTime=timeFn(res.info.returnRefundOrderVos[i].createTime);
                    });
                    var html=$("#HistoryRefundList_Tmp").render(res.info);
                    $("#HistoryRefund_Tab").html(html);

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
                paramData.type = 2;
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

//筛选历史退款单
$(document).on("click",".RefundOrder_Filter",function(){
   var data= {
       loginUserId: PLATFORM_LOGIN_USER_ID,
       type:2,
       "pageNo":1,
       productName: $("#filter_GodsName").val(),
       refundUser:$("#filter_refundUser").val(),
       name:$("#filter_Name").val(),
       orderNumber:$("#filter_orderNumber").val(),
       returnRefundAttr3:$("#filter_PaymentAccount").val(),
       returnRefundAttr4:$("#filter_Operator").val(),
       modifyStartTime:$("#startApply_Time").val(),
       modifyEndTime:("#endApply_Time").val()
   };
    HistoryRefund_list(data);
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
