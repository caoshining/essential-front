function Retund_Gods_checkDetails() {
    $("#RefundGods_checkOrder_Info").html('');
    if (Refund_GodsIndex != '') {

        var OrderMessageHtml = $("#RefundGods_OrderMessage_Tmple").render(Refund_GodsIndex);
        $("#RefundGods_checkOrder_Info").append(OrderMessageHtml);

        get_Times($(".Refund_God_order").attr("data-Order"));
        if (Refund_GodsIndex.returnRefundLatestStatus == 1) {
            $(".refundgoods-detail li").eq(0).addClass("complete");
            $(".refundgoods-detail li").eq(0).find(".wizeard-Top").addClass("active");
            /* $("#Refund_Goods .refundgoods-detail li").eq(1).addClass("active");*/
        } else if (Refund_GodsIndex.returnRefundLatestStatus == 2) {
            $(".refundgoods-detail li").eq(0).addClass("complete");
            $(".refundgoods-detail li").eq(0).find(".wizeard-Top").addClass("active");
            $(".refundgoods-detail li").eq(1).find(".wizeard-Top").html("商家驳回");
            $(".refundgoods-detail li").eq(1).addClass("error");
        } else if (Refund_GodsIndex.returnRefundLatestStatus == 8) {
            $(".refundgoods-detail li").eq(2).prevAll().addClass("complete");
            $(".refundgoods-detail li").eq(2).addClass("active");
            $(".refundgoods-detail li").eq(2).children(".wizeard-Top").addClass("active");
            $(".refundgoods-detail li").eq(2).prevAll().children(".wizeard-Top").addClass("active");
        } else if (Refund_GodsIndex.returnRefundLatestStatus == 3) {
            $(".refundgoods-detail li").eq(2).prevAll().addClass("complete");
            $(".refundgoods-detail li").eq(2).addClass("active");
            $(".refundgoods-detail li").eq(2).children(".wizeard-Top").addClass("active");
            $(".refundgoods-detail li").eq(2).prevAll().children(".wizeard-Top").addClass("active");
        } else if (Refund_GodsIndex.returnRefundLatestStatus == 4) {
            console.log(Refund_GodsIndex.returnRefundLatestStatus);
            $(".refundgoods-detail li").eq(4).addClass("active").prevAll().addClass("complete");
            $(".refundgoods-detail li").eq(4).addClass("active");
            $(".refundgoods-detail li").eq(4).children(".wizeard-Top").addClass("active");
            $(".refundgoods-detail li").eq(4).prevAll().children(".wizeard-Top").addClass("active");
        }
        else if (Refund_GodsIndex.returnRefundLatestStatus == 6) {
            $(".refundgoods-detail li").eq(5).addClass("complete").prevAll().addClass("complete");
            $(".refundgoods-detail li").eq(5).prevAll().children(".wizeard-Top").addClass("active");
            $(".refundgoods-detail li").eq(5).children(".wizeard-Top").addClass("active");
        } else if (Refund_GodsIndex.returnRefundLatestStatus == 9) {
            $(".refundgoods-detail li").eq(3).prevAll().addClass("complete");
            $(".refundgoods-detail li").eq(3).prevAll().children(".wizeard-Top").addClass("active");
            $(".refundgoods-detail li").eq(3).find(".wizeard-Top").html("货品驳回");
            $(".refundgoods-detail li").eq(3).addClass("error");

        } else if (Refund_GodsIndex.returnRefundLatestStatus == 5) {
            $(".refundgoods-detail li").eq(4).prevAll().addClass("complete");
            $(".refundgoods-detail li").eq(4).prevAll().children(".wizeard-Top").addClass("active");
            $(".refundgoods-detail li").eq(4).find(".wizeard-Top").html("平台驳回 ");
            $(".refundgoods-detail li").eq(4).addClass("error");
        }
        $("time").each(function (i) {
            $(this).html(timeFn($("time").eq(i).html()))
        })
    }
}
Retund_Gods_checkDetails()
/*上边进度条样式变化*/

function Busice_Click_pass(){
    //备注功能
    $(".RefundGods_Remark").on("click",function(event){
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
                PostMarkInfom({
                    userId:BUSINESS_LOGIN_USER_ID,
                    bussinessRemarks:$("#RefuMony_Inf").val(),
                    returnRefundOrderId:$(".Refund_God_order").attr("data-Order")
                });
            }else{
                alert("备注信息不能为空。")
            }
        });
    });
    //-----------
    $("#Plat_Check_pass").on("click",function(){
        var status=0;
        if (confirm("确认通过？")){
            Post_PasAndRefus({loginUserId:BUSINESS_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_God_order").attr("data-Order"),returnRefundType:1,returnRefundLatestStatus:7},status);
        }
    });
    $("#Plat_Check_refuse").on("click",function(){
        var status=1;
        var html="<div class='Big_RefuseInput' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
            "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
            "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
            "<div style='position:relative;left:40%;top:35%;width:35%;'>" +
            "<label for='RefuMony_Inf' style='color: white;'>请输入驳回理由:</label>" +
            "<textarea id='RefuMony_Inf' type='text' col='9' rows='3' cols='20'></textarea>"+
            "<a href='###' class='Refund_Rigth_btn' style='display:block;position:absolute;left:20%;font-size: 15px;bottom: -25px;'>确定</a>" +
            "<a href='###' class='Refund_cancle_btn' style='display:block;position:absolute;right:43%;font-size: 15px;bottom: -25px;'>取消</a>"+
            "</div></div></div>";

        $(".index-tab-cont").append(html);

        $(".Refund_cancle_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

        $(".Refund_Rigth_btn").on("click",function(){
            Post_PasAndRefus({loginUserId:BUSINESS_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_God_order").attr("data-Order"),returnRefundRejectReason:$("#RefuMony_Inf").val(),returnRefundType:1,returnRefundLatestStatus:2},status)
            $(".Refund_cancle_btn").click();
        });

    });
    $("#Busic_Check_pass").on("click",function(){
        var status=2;
        if (confirm("确认收货？")){
            Post_PasAndRefus({loginUserId:BUSINESS_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_God_order").attr("data-Order"),returnRefundType:1,returnRefundLatestStatus:3},status);
        }
    });

    $("#Busic_Check_refuse").on("click",function(){
        var status=3;
        var html="<div class='Big_RefuseInput' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
            "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
            "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
            "<div style='position:relative;left:40%;top:35%;width:35%;'>" +
            "<label for='RefuMony_Inf' style='color: white;'>请输入驳回理由:</label>" +
            "<textarea id='RefuMony_Inf' type='text' col='9' rows='3' cols='20'></textarea>"+
            "<a href='###' class='Refund_Rigth_btn' style='display:block;position:absolute;left:20%;font-size: 15px;bottom: -25px;'>确定</a>" +
            "<a href='###' class='Refund_cancle_btn' style='display:block;position:absolute;right:43%;font-size: 15px;bottom: -25px;'>取消</a>"+
            "</div></div></div>";

        $(".index-tab-cont").append(html);

        $(".Refund_cancle_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

        $(".Refund_Rigth_btn").on("click",function(){
            Post_PasAndRefus({loginUserId:BUSINESS_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_God_order").attr("data-Order"),returnRefundRejectReason:$("#RefuMony_Inf").val(),returnRefundType:1,returnRefundLatestStatus:9},status);
        });

    });
}
Busice_Click_pass();

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

function Post_PasAndRefus(data,status){
    $.ajax({
        url:BUSINESS_URL_PRE+"/essential/refundOrder/bussiness/update",
        data: data,
        type: "post",
        success:function(res){
            if(res.code==1){
                if(status==0){
                    $("#Plat_Check_pass").css({"background":"#333"},{"color":"white"});
                    $("#Plat_Check_pass").text("已通过");
                    $(".Refund_cancle_btn").click();

                    $("#Plat_Check_refuse").unbind("click");
                    $("#Plat_Check_pass").unbind("click");
                    alert(res.msg);
                }else if(status==1){

                    $(".Refund_cancle_btn").trigger("click");

                    $("#Plat_Check_refuse").css({"background":"#333"},{"color":"white"});
                    $("#Plat_Check_refuse").text("已驳回");

                    $("#Plat_Check_refuse").unbind("click");
                    $("#Plat_Check_pass").unbind("click");
                    alert("驳回成功");

                }else if(status==2){

                    $("#Busic_Check_refuse").unbind("click");
                    $("#Busic_Check_pass").unbind("click");

                    $("#Busic_Check_pass").css({"background":"#333"},{"color":"white"});
                    $("#Busic_Check_pass").text("已确认收货");
                    alert(res.msg);

                }else if(status==3){
                    $("#Busic_Check_refuse").unbind("click");
                    $("#Busic_Check_pass").unbind("click");
                    $(".Refund_cancle_btn").click();

                    $("#Busic_Check_refuse").css({"background":"#333"},{"color":"white"});
                    $("#Busic_Check_refuse").text("已驳回");
                    alert(res.msg);
                }



                //Retund_Gods_checkDetails();// 渲染进度条进度

            }else if(res.code==0){
                alert(res.msg);
            }
        },error:function(){
            alert("网络延时，请重试")
        }
    })
}
/*商家点击通过或者驳回*/

/*
function ChangeTime(tm){
    var tt=new Date(parseInt(tm)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    return tt;
}
*/

/*时间戳转变*/

function Make_note(data){
    $.ajax({
        url: BUSINESS_URL_PRE + "/essential/refundOrder/bussiness/update",
        data: data,
        type: "post",
        success: function (res) {
            if(res.code==1){
                $(".Remark_cancle_btn").click();
            }else{
                alert(res.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
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

function get_Times(data){
    $.ajax({
        url:BUSINESS_URL_PRE+"/essential/queryOrderStatus/queryReturnRefundStatus",
        data: {returnRefundOrderId:data},
        type: "post",
        success:function(res){
            if(res.code==1){
                for(var i=0;i<res.info.length;i++){
                    $(".refundgoods-detail li time").eq(i).html(timeFn(res.info[i].returnRefundStatusTime));
                }

            }
        }
    })
}