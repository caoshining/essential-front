$("#Refund_money_checkOrder_Info").html('');
    if(Refund_monyIndex!= ''){
        var Refund_monyMessageHtml = $("#Refund_OrderMessage_Tmple").render(Refund_monyIndex);
        $("#Refund_money_checkOrder_Info").append(Refund_monyMessageHtml);

        /*$("#Refund_money_checkOrder_Info").on("click","#refundorder_look_img",function(){
            var html="<div id='refund_money_images' style='position:absolute;width:100%;height:100%;top:0;left:0;'></div>";
            $(".index-tab-cont").append(html);
            $("#refund_money_images").load("plugins/show-img/index.html")
        });*/

        get_Times($(".Refund_Mony_order").attr("data-Order"));

        console.log("Refund_monyIndex.returnRefundLatestStatus"+Refund_monyIndex.returnRefundLatestStatus)
        if(Refund_monyIndex.returnRefundLatestStatus==1){
            // console.log(Refund_monyIndex.Refund_monyStatus);
            $(".refund-details li").eq(0).addClass("complete");
            $(".refund-details li").eq(0).find(".wizeard-Top").addClass("active");
            /*$("#Refund_orders .refund-details li").eq(1).addClass("error");*/
        }else if(Refund_monyIndex.returnRefundLatestStatus==2){
            $(".refund-details li").eq(0).addClass("complete");
            $(".refund-details li").eq(1).find(".wizeard-Top").html("商家驳回退款申请");
            $(".refund-details li").eq(1).prevAll().children(".wizeard-Top").addClass("active");
            $(".refund-details li").eq(1).find(".wizeard-Top").addClass("active");
            $(".refund-details li").eq(1).addClass("error");
        }else if(Refund_monyIndex.returnRefundLatestStatus==3){
            $(".refund-details li").eq(1).prevAll().addClass("complete");
            $(".refund-details li").eq(1).addClass("active");
            $(".refund-details li").eq(1).children(".wizeard-Top").addClass("active");
            $(".refund-details li").eq(1).prevAll().children(".wizeard-Top").addClass("active");
        }
        else if(Refund_monyIndex.returnRefundLatestStatus==4){
            $(".refund-details li").eq(2).prevAll().addClass("complete");
            $(".refund-details li").eq(2).addClass("active");
            $(".refund-details li").eq(2).children(".wizeard-Top").addClass("active");
            $(".refund-details li").eq(2).prevAll().children(".wizeard-Top").addClass("active");
        }
        else if(Refund_monyIndex.returnRefundLatestStatus==6){
            $(".refund-details li").eq(3).addClass("complete").prevAll().addClass("complete");
            $(".refund-details li").eq(3).prevAll().children(".wizeard-Top").addClass("active");
            $(".refund-details li").eq(3).children(".wizeard-Top").addClass("active")
        }else if(Refund_monyIndex.returnRefundLatestStatus==5){
            $(".refund-details li").eq(2).prevAll().addClass("complete");
            $(".refund-details li").eq(2).children(".wizeard-Top").addClass("active");
            $(".refund-details li").eq(2).children(".wizeard-Top").html("平台驳回申请退款");
            $(".refund-details li").eq(2).prevAll().children(".wizeard-Top").addClass("active");
            $(".refund-details li").eq(2).addClass("error")
        }

        $("time").each(function(i){
            $(this).html(timeFn($("time").eq(i).html()))
            console.log($(this))
        })
    }


function RefndMy_Click(){
    //备注功能
    $(".Refundorder_Remark").on("click",function(event){
        event.stopPropagation();
        $(".Big_Remark").remove();
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
                    returnRefundOrderId:$(".Refund_Mony_order").attr("data-Order")
                });
            }else{
                alert("备注信息不能为空。")
            }
        });
    });
    //-----------

    $("#Plat_MonyCheck_pass").bind("click",function(){
        var status=0;
        if (confirm("确认通过？")){
            Post_RigthtOrRefus({loginUserId:BUSINESS_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_Mony_order").attr("data-Order"),returnRefundType:2,returnRefundLatestStatus:3},status);
        }
    });
    $("#Plat_MonyCheck_refuse").on("click",function(){
        var status=1;
        var html="<div class='Big_RefuseInput' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
            "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
            "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
            "<div style='position:relative;left:40%;top:35%;width:35%;'>" +
            "<label for='RefuMony_Inf' style='color: white;'>请输入驳回理由:</label>" +
            "<textarea id='RefuMony_Inf' type='text' col='9' rows='3' cols='20'></textarea>" +
            "<a href='###' class='Refund_Rigth_btn' style='display:block;position:absolute;left:20%;font-size: 15px;bottom: -25px;'>确定</a>" +
            "<a href='###' class='Refund_cancle_btn' style='display:block;position:absolute;right:43%;font-size: 15px;bottom: -25px;'>取消</a>"+
            "</div></div></div>";
        $(".index-tab-cont").append(html);

        $(".Refund_cancle_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

        $(".Refund_Rigth_btn").on("click",function(){
            Post_RigthtOrRefus({loginUserId:BUSINESS_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_Mony_order").attr("data-Order"),returnRefundRejectReason:$("#RefuMony_Inf").val(),returnRefundType:2,returnRefundLatestStatus:2},status)
        });

    });

    $("#Busic_MonCheck_pass").on("click",function(){
        var status=2;
        if (confirm("确认通过？")){
            Post_RigthtOrRefus({loginUserId:BUSINESS_LOGIN_USER_ID,returnRefundOrderId:$(".Refund_Mony_order").attr("data-Order"),returnRefundType:2,returnRefundLatestStatus:4},status);
        }
    });

    $("#Busic_MonCheck_refuse").on("click",function(){
        var status=3;
        var html="<div class='Big_RefuseInput' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
            "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
            "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
            "<div style='position:relative;left:40%;top:35%;width:35%;'>" +
            "<label for='RefuMony_Inf' style='color: white;'>请输入驳回理由:</label>" +
            "<textarea id='RefuMony_Inf' type='text' col='9' rows='3' cols='20'></textarea>" +
            "<a href='###' class='Refund_Rigth_btn' style='display:block;position:absolute;left:20%;font-size: 15px;bottom: -25px;'>确定</a>" +
            "<a href='###' class='Refund_cancle_btn' style='display:block;position:absolute;right:43%;font-size: 15px;bottom: -25px;'>取消</a>"+
            "</div></div></div>";
        $(".index-tab-cont").append(html);
        $(".Refund_cancle_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

        $(".Refund_Rigth_btn").on("click",function() {
            Post_RigthtOrRefus({
                loginUserId: BUSINESS_LOGIN_USER_ID,
                returnRefundOrderId: $(".Refund_Mony_order").attr("data-Order"),
                returnRefundRejectReason: $("#RefuMony_Inf").val(),
                returnRefundType: 2,
                returnRefundLatestStatus: 5
            },status)
        })
    });
}
RefndMy_Click();

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

function Post_RigthtOrRefus(data,status){
    $.ajax({
        url:BUSINESS_URL_PRE+"/essential/refundOrder/bussiness/update",
        data: data,
        type: "post",
        success:function(res){
            if(res.code==1){
                if(status==0){
                    $("#Plat_MonyCheck_pass").css({"background":"#333"},{"color":"white"});
                    $("#Plat_MonyCheck_pass").text("已通过");

                    $("#Plat_MonyCheck_pass").unbind("click");
                    $("#Plat_MonyCheck_refuse").unbind("click");
                    alert(res.msg);
                }else if(status==1){
                    $("#Plat_MonyCheck_refuse").unbind("click");
                    $("#Plat_MonyCheck_pass").unbind("click");

                    $(".Refund_cancle_btn").trigger("click");

                    $("#Plat_MonyCheck_refuse").css({"background":"#333"},{"color":"white"});
                    $("#Plat_MonyCheck_refuse").text("已驳回");
                    alert("驳回成功");
                }else if(status==2){
                    $("#Busic_MonCheck_pass").unbind("click");
                    $("#Busic_MonCheck_refuse").unbind("click");

                    $("#Busic_MonCheck_pass").css({"background":"#333"},{"color":"white"});
                    $("#Busic_MonCheck_pass").text("正在审核中");
                    alert(res.msg);

                }else if(status==3){
                    $("#Busic_MonCheck_refuse").unbind("click");
                    $("#Busic_MonCheck_pass").unbind("click");

                    $("#Busic_MonCheck_refuse").css({"background":"#333"},{"color":"white"});
                    $("#Busic_MonCheck_refuse").text("已驳回");
                    alert(res.msg);
                }



            }else if(res.code==0){
                alert(res.msg);
            }
        },error:function(){
            alert("网络延时，请重试");
        }
    })

}
/*function ChangeTime(tm){
    var tt=new Date(parseInt(tm)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    return tt;
}*/

/*时间戳转变*/
function Make_money_note(data){
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
                    $(".refund-details li time").eq(i).html(timeFn(res.info[i].returnRefundStatusTime));
                }

            }
        }
    })
}