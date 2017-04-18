/**
 * Created by Morgan on 2016/9/5.
 */

//搜索待审核店铺
allCheckBusiness(getCheckBussinesName());

var $Business = $("#Business_CheckList");
$Business.on("click","#Business_check_search",function(){
    allCheckBusiness(getCheckBussinesName());
});

function getCheckBussinesName(){
    var param = {
        "pageIndex":1,
        "name":$("#CheckShopNameSearch").val()
    };
    return param;
}

//商家列表
function allCheckBusiness(data) {
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/auditingShopList",
        data: data,
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                $("#BussineCheck_ListTable").html('');
                //渲染模板
                var html = $("#BussineCheck_List_Templet").render(res.info);
                $("#BussineCheck_ListTable").append(html);

                ShopCheckpagePlus(res.info.pageCount,data,true);

                //商家详情数据渲染
                ShopCheck_Look__detail();

                //时间截取
                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()));
                });
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("网络有问题，请刷新重试")
        }
    });
}

//商家详情
function ShopCheck_Look__detail(){
    $("#BussineCheck_ListTable").on("click",".Check_shop",function(){
        var getShopid= $(this).parent().parent().parent().attr("data-shopid");
        $("#Business_CheckList").hide().siblings("#Shop_Check_Content").show();
        //下一步点击事件
        Click_next(getShopid);

        //保存和修改按钮功能实现；
        $(".change_promMoney").each(function(){
            var openOrclose=true;
            $(this).bind("click",function(){
                if(openOrclose){
                    $(this).prev("input").attr("disabled","disabled");
                    $(this).html("修改");
                    openOrclose=false;
                }else{
                    $(this).prev("input").removeAttr("disabled");
                    $(this).html("保存");
                    openOrclose=true;
                }
            });
        });

        $.ajax({
            url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/queryDetialShopInfo",
            data: {shopId:getShopid},
            type: "post",
            success: function (data) {
                if(data.code==1){
                    //店铺信息
                    $("#Shop_Check_Content input[shop-data-name='Shop_Name']").val(data.info.name);
                    $("#Shop_Creattime").html(data.info.createTime);
                    $("#Logo_Img").attr("src",data.info.logoPath);
                    $("#Shop_Check_Content input[shop-data-name='Shop_PhoneNum']").val(data.info.contactPhone);
                    $("#Shop_Check_Content input[data-shop-name='payMoney']").val(data.info.payMoney);

                    //保证金修改功能
                    change_promMoney(getShopid);

                    //退货维权信息
                    $("#Shop_Check_Content input[shop-data-name='ReceiptGods_Name']").val(data.info.contactPerson);
                    $("#Shop_Check_Content input[shop-data-name='ReceiptGods_Phone']").val(data.info.phone);
                    $("#Shop_Check_Content input[shop-data-name='ReceiptGods_Address']").val(data.info.returnAddress);

                    //结算资质
                    $("#BusinessCheck_shop_detial3 input[shop-data-name='Company_Name']").val(data.info.companyName);
                    $("#BusinessCheck_shop_detial3 input[shop-data-name='CompanyTax_Num']").val(data.info.taxRegistrationNumber);
                    $("#BusinessCheck_shop_detial3 input[shop-data-name='Shop_Inm_Addres']").val(data.info.detailAddress);
                    $("#Shop_Inm_PhoneNum1").val(data.info.fixedTelephone.split("-")[0]);
                    $("#Shop_Inm_PhoneNum2").val(data.info.fixedTelephone.split("-")[1]);

                    $("#BusinessCheck_shop_detial3 img[shop-aptitudes-img='Company_Font']").attr("src",data.info.legalidScan);
                    $("#BusinessCheck_shop_detial3 img[shop-aptitudes-img='Company_opposite']").attr("src",data.info.legalidBackScan);
                    $("#BusinessCheck_shop_detial3 img[shop-aptitudes-img='Company_license']").attr("src",data.info.bussinessLicenceScan);
                    $("#BusinessCheck_shop_detial3 img[shop-aptitudes-img='Company_tax']").attr("src",data.info.taxRegistrationCertificateScan);
                    $("#BusinessCheck_shop_detial3 img[shop-aptitudes-img='Company_code']").attr("src",data.info.organizationCodeScan);
                    $("#BusinessCheck_shop_detial3 img[shop-aptitudes-img='Company_permission']").attr("src",data.info.accountOpeningLicenseScan);

                    if(data.info.isSame==1){
                        $("#BusinessCheck_shop_detial3 input[shop-data-name='BankCount_Name']").val(data.info.openingBankInfomationList[0].openAccount);
                        $("#BusinessCheck_shop_detial3 input[shop-data-name='BankCount_Num']").val(data.info.openingBankInfomationList[0].theCardNumber);
                        $("#IsOr_same input").eq(0).prop("checked","checked");
                        $(".Shop_Accout_Infm ul li").eq(0).siblings().css("display","none");
                    }else if(data.info.isSame==0){
                        $("#IsOr_same input").eq(1).prop("checked","checked");
                        for(var i=0;i<data.info.openingBankInfomationList.length;i++){
                            if(data.info.openingBankInfomationList[i].type==0){
                                $("#BusinessCheck_shop_detial3 input[shop-data-name='BankCount_Name']").val(data.info.openingBankInfomationList[i].openAccount);
                                $("#BusinessCheck_shop_detial3 input[shop-data-name='BankCount_Num']").val(data.info.openingBankInfomationList[i].theCardNumber);
                            }else if(data.info.openingBankInfomationList[i].type==1){
                                $("#BusinessCheck_shop_detial3 input[shop-data-name='Settle_BankCount_name']").val(data.info.openingBankInfomationList[i].openAccount);
                                $("#BusinessCheck_shop_detial3 input[shop-data-name='Settle_BankCount_code']").val(data.info.openingBankInfomationList[i].theCardNumber);
                            }
                        }
                    }

                    $("time").each(function(i){
                        $(this).html(timeFn($("time").eq(i).html()));
                    });
                    //对应店铺的所售品牌
                    //Shop_List_SaleBrand({shopId:getShopid,pageIndex:1});
                }else{
                    alert(data.msg)
                }
            },error:function(){
                alert("网络有问题，请刷新重试");
            }
        });
    });
    //时间控件实例化
    $(document).ready(function(){
        var start = {
            dateCell: '#Stock_SaveTime',
            format: 'YYYY-MM-DD hh:mm:ss',
            //minDate: jeDate.now(0), //设定最小日期为当前日期
            isTime:true,
            isinitVal:true,
            festival:true,
            ishmsVal:false,
            ///maxDate: jeDate.now(0), //最大日期
            choosefun: function(elem,datas){
                //end.minDate = datas; //开始日选好后，重置结束日的最小日期
            }
        };
        jeDate(start);
    });
}

//下一步点击事件
function Click_next(shopid){
    $("#Next_Step").click(function(){
        var $getindex=$("#Shop_CheckContent>div.active").index();
        if($getindex<2){
            $("#Shop_CheckContent>div.active").removeClass("active");
            $(".ShopCheck_Change_Tab li.active").removeClass("active");
            $("#Shop_CheckContent>div").eq($getindex+1).addClass("active");
            $(".ShopCheck_Change_Tab li").eq($getindex+1).addClass("active");
            $("#Refuse_ShopAdd").css("display","none");
        }else if($getindex==2){
            $("#Next_Step").addClass("ShopPass");
            $(".ShopPass").bind("click",shopid,ShopCheckPass(shopid));
        }
        if($getindex==1){
            $("#Next_Step").text("通过");
            $("#Refuse_ShopAdd").css("display","inline-block");
            $("#Refuse_ShopAdd").bind("click",function(shopid){
                ShopCheck_rejectreson(shopid);
            });
        }

    });
    $(".ShopCheck_Change_Tab li").click(function(){
       if($(this).index()!=2){
           $("#Next_Step").text("下一步");
           $("#Refuse_ShopAdd").css("display","none");
       }
    });
}
function ShopCheckPass(shopid){
    var tag=0;
    if($("#Shop_payMoney").val()==""){
        alert("店铺保证金不能为空");
    }else if($("#shopServiceMoney").val()==""){
        alert("店铺服务费不能为空");
    }else if($("#Stock_SaveTime").val()==""){
        alert("店铺保证金缴纳时间不能为空");
    }else if($("#Shop_payMoney").val()!=""&&$("#shopServiceMoney").val()!=""&&$("#Stock_SaveTime").val()!=""){
        updateShopPayMoney({"shopId":shopid,
            "payMoney":$("#Shop_payMoney").val(),
            "shopServiceMoney":$("#shopServiceMoney").val(),
            "ispaytime":$("#Stock_SaveTime").val()
        });
        ShopCheckPassOrRefuse({"shopId":shopid,"type":0,"logenUser":PLATFORM_LOGIN_USER_ID},tag);
    }
}

//通过或者驳回
function ShopCheckPassOrRefuse(data,tag){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/auditingShop",
        data: data,
        type: "post",
        success: function (res) {
            if(res.code==1){
                alert(res.msg);
                if(tag==0){
                    $("a[href='#business_check']").trigger("click");
                }else if (tag==1){
                    $(".Refund_cancle_btn").trigger("click");
                    $("a[href='#business_check']").trigger("click");
                }
            }else{
                alert(res.msg)
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
        }
    })
}

//保证金，服务费保存提交
function updateShopPayMoney(data) {
    $.ajax({
        url: PLATFORM_URL_PRE + "/essential/shopManagePlatform/updateShopPayMoney",
        data: data,
        type: "post",
        success: function (res) {
            if(res.code==1){
                alert(res.msg);
            }else if(res.code==0){
                alert(res.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
        }
    })
}
//驳回点击生成理由
function ShopCheck_rejectreson(shopid){
        var html="<div class='Big_RefuseInput' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
            "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
            "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
            "<div style='position:relative;left:40%;top:35%;width:35%;'>" +
            "<label for='RefuMony_Inf' style='color: white;'>请输入驳回理由:</label>" +
            "<input id='RefuMony_Inf' type='text' col='9' rows='3' cols='20'/>"+
            "<a href='#' class='Refund_Rigth_btn' style='display:block;position:absolute;left:20%;font-size: 15px;bottom: -25px;'>确定</a>" +
            "<a href='#' class='Refund_cancle_btn' style='display:block;position:absolute;right:43%;font-size: 15px;bottom: -25px;'>取消</a>"+
            "</div></div></div>";

        $(".index-tab-cont").append(html);
        $(".Refund_cancle_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

        $(".Refund_Rigth_btn").on("click",function(){
            if($("#RefuMony_Inf").val()!=""){
                var tag =1;
                ShopCheckPassOrRefuse({"shopId":shopid,"type":1,"logenUser":PLATFORM_LOGIN_USER_ID,"rejectReason":$("#RefuMony_Inf").val()},tag)
            }else{
                alert("驳回理由不能为空")
            }
        });

}

//商家列表分页调用
function allCheckBusinessPage(data) {
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/auditingShopList",
        data: data,
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                $("#BussineCheck_ListTable").html('');
                //shopInforList = res.info.shopInforList;
                /* $.each(shopInforList, function(i,v){
                 res.info.shopInforList[i].orderProductSize = v.orderProducts.length;
                 res.info.shopInforList[i].createTime=timeFn(res.info.orderProductVos[i].createTime);
                 });
                 //渲染模板*/
                var html = $("#BussineCheck_List_Templet").render(res.info);
                $("#BussineCheck_ListTable").append(html);

                //商家详情数据渲染
                ShopCheck_Look__detail();

                //时间截取
                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()));
                });
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("网络有问题，请刷新重试")
        }
    });
}

//商家审核详情分页
function ShopCheckpagePlus(totalPageCount,data,flag){
    var ShopCheckParamData={};
    $("#BussineCheckpage").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            ShopCheckParamData = data;
            if(!flag){
                ShopCheckParamData.pageIndex = page;
                allCheckBusinessPage(ShopCheckParamData);
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

