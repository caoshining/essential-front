/**
 * Created by Morgan on 2016/8/31.
 */

var BusinessList = [];
var BusinessIndex = [];

var timerObj;

//查询店铺
allBusiness(getBussinessParam());
var $Business = $("#Business-conntrol");

$Business.on("click",".business_filter",function(){
    allBusiness(getBussinessParam());
});


function getBussinessParam(){
    var param = {
        "pageIndex":1,
        "name":$("#Business_name").val(),
        "checkStatus":$("#Business_chekc").val(),
        "shopStatus":$("#Shop_status").val(),
        "isPay":$("#Business_promsmoney").val()
    };
    return param;
}

//商家列表
function allBusiness(data) {
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/queryShopList",
        data: data,
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                $("#Business_listTable").html('');
                //shopInforList = res.info.shopInforList;
               /* $.each(shopInforList, function(i,v){
                    res.info.shopInforList[i].orderProductSize = v.orderProducts.length;
                    res.info.shopInforList[i].createTime=timeFn(res.info.orderProductVos[i].createTime);
                });
                //渲染模板*/
                var html = $("#bussineList_Templet").render(res.info);
                $("#Business_listTable").append(html);

                //查看拒绝原因
                alert_refureason(res);

                //店铺启用和禁用
                $("#Business_listTable").on("click",".ShopStatus",function(){
                    var getShopId=$(this).parent().parent().parent().attr("data-shopid");
                    var $that=$(this);
                    if($that.is(".Shop_disable")){
                        if(confirm("确定要禁用该店铺")){
                            ChangeShopStatus({"logenUser":PLATFORM_LOGIN_USER_ID,"shopId":getShopId,"type":1},$that);
                        }
                    }else if($that.is(".Shop_able")){
                        if(confirm("确定要启用该店铺")){
                            ChangeShopStatus({"logenUser":PLATFORM_LOGIN_USER_ID,"shopId":getShopId,"type":0},$that)
                        }
                    }
                });

                //查看商家详情
                Look_shop_detail();

                pagePlus(res.info.pageCount,data,true);

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

function Look_shop_detail(){
    $("#Business_listTable").on("click",".Look_shop_detail",function(){

       var getShopid= $(this).parent().parent().parent().attr("data-shopid");
        $("#Business-conntrol").hide().siblings("#Shop_Content").show();
        $.ajax({
            url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/queryDetialShopInfo",
            data: {shopId:getShopid},
            type: "post",
            success: function (data) {
                if(data.code==1){
                    //店铺信息
                    $("#Shop_Content input[shop-data-name='Shop_Name']").val(data.info.name);
                    $("#Shop_Creattime").html(data.info.createTime);
                    $("#Logo_Img").attr("src",data.info.logoPath);
                    $("#Shop_Content input[shop-data-name='Shop_PhoneNum']").val(data.info.contactPhone);
                    $("#Shop_Content input[data-shop-name='payMoney']").val(data.info.payMoney);

                    //保证金修改功能
                    change_promMoney(getShopid);

                    //退货维权信息
                    $("#Shop_Content input[shop-data-name='ReceiptGods_Name']").val(data.info.contactPerson);
                    $("#Shop_Content input[shop-data-name='ReceiptGods_Phone']").val(data.info.phone);
                    $("#Shop_Content input[shop-data-name='ReceiptGods_Address']").val(data.info.returnAddress);

                    //结算资质
                    $("#Business_shop_detial3 input[shop-data-name='Company_Name']").val(data.info.companyName);
                    $("#Business_shop_detial3 input[shop-data-name='CompanyTax_Num']").val(data.info.taxRegistrationNumber);
                    $("#Business_shop_detial3 input[shop-data-name='Shop_Inm_Addres']").val(data.info.detailAddress);
                    $("#Shop_Inm_PhoneNum1").val(data.info.fixedTelephone.split("-")[0]);
                    $("#Shop_Inm_PhoneNum2").val(data.info.fixedTelephone.split("-")[1]);

                    $("#Business_shop_detial3 img[shop-aptitudes-img='Company_Font']").attr("src",data.info.legalidScan);
                    $("#Business_shop_detial3 img[shop-aptitudes-img='Company_opposite']").attr("src",data.info.legalidBackScan);
                    $("#Business_shop_detial3 img[shop-aptitudes-img='Company_license']").attr("src",data.info.bussinessLicenceScan);
                    $("#Business_shop_detial3 img[shop-aptitudes-img='Company_tax']").attr("src",data.info.taxRegistrationCertificateScan);
                    $("#Business_shop_detial3 img[shop-aptitudes-img='Company_code']").attr("src",data.info.organizationCodeScan);
                    $("#Business_shop_detial3 img[shop-aptitudes-img='Company_permission']").attr("src",data.info.accountOpeningLicenseScan);

                    if(data.info.isSame==1){
                        $("#Business_shop_detial3 input[shop-data-name='BankCount_Name']").val(data.info.openingBankInfomationList[0].openAccount);
                        $("#Business_shop_detial3 input[shop-data-name='BankCount_Num']").val(data.info.openingBankInfomationList[0].theCardNumber);
                        $("#IsOr_same input").eq(0).prop("checked","checked");
                        $(".Shop_Accout_Infm ul li").eq(0).siblings().css("display","none");
                    }else if(data.info.isSame==0){
                        $("#IsOr_same input").eq(1).prop("checked","checked");
                        for(var i=0;i<data.info.openingBankInfomationList.length;i++){
                            if(data.info.openingBankInfomationList[i].type==0){
                                $("#Business_shop_detial3 input[shop-data-name='BankCount_Name']").val(data.info.openingBankInfomationList[i].openAccount);
                                $("#Business_shop_detial3 input[shop-data-name='BankCount_Num']").val(data.info.openingBankInfomationList[i].theCardNumber);
                            }else if(data.info.openingBankInfomationList[i].type==1){
                                $("#Business_shop_detial3 input[shop-data-name='Settle_BankCount_name']").val(data.info.openingBankInfomationList[i].openAccount);
                                $("#Business_shop_detial3 input[shop-data-name='Settle_BankCount_code']").val(data.info.openingBankInfomationList[i].theCardNumber);
                            }
                        }
                    }

                    //对应店铺的所售品牌
                    Shop_List_SaleBrand({shopId:getShopid,pageIndex:1});

                    //时间截取
                    $("time").each(function(i){
                        $(this).html(timeFn($("time").eq(i).html()));
                    });
                }else{
                    alert(data.msg)
                }
            },error:function(){
                alert("网络有问题，请刷新重试");
            }
        });
    });
}


function ChangeShopStatus(res,tag){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/disableOrEnableShop",
        data:res,
        type: "post",
        success:function(data){
            if(data.code==1){
                if(tag.is(".Shop_disable")){
                    tag.removeClass("Shop_disable").addClass("Shop_able");
                    tag.parent().parent().prev().children("p").css("color","red").html("禁用");
                    tag.html("启用")
                }else if(tag.is(".Shop_able")){
                    tag.removeClass("Shop_able").addClass("Shop_disable");
                    tag.parent().parent().prev().children("p").css("color","black").html("正常");
                    tag.html("禁用")
                }
                alert(data.msg);
            }else{
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
        }
    })
}

//商家分页列表
function allPageBusiness(data) {
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/queryShopList",
        data: data,
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                $("#Business_listTable").html('');
                //shopInforList = res.info.shopInforList;
                /* $.each(shopInforList, function(i,v){
                 res.info.shopInforList[i].orderProductSize = v.orderProducts.length;
                 res.info.shopInforList[i].createTime=timeFn(res.info.orderProductVos[i].createTime);
                 });
                 //渲染模板*/
                var html = $("#bussineList_Templet").render(res.info);
                $("#Business_listTable").append(html);

                //查看拒绝原因
                alert_refureason(res);


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

function alert_refureason(res){
    $("#Business_listTable").on("click",".Look_refus_reason",function(){
        var getIndex=$(this).parent().parent().parent().index();
        var getshopId=$(this).parent().parent().parent().attr("data-shopid");
        console.log("getIndex"+getIndex)
        $(res.info.shopInforList).each(function(i){
            if(res.info.shopInforList[i].shopId==getshopId){
                alert(res.info.shopInforList[i].rejectReason)
            }
        });
    })
}

//修改保证金
function change_promMoney(shopid){
    $("#Business_shop_detial1").on("click",".change_promMoney",function(){
        var html="<div class='Big_RefuseInput' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
            "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
            "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
            "<div style='position:relative;left:40%;top:35%;width:35%;'>" +
            "<label for='RefuMony_Inf' style='color: white;'>请输入保证金额:</label>" +
            "<input id='RefuMony_Inf' type='text' col='9' rows='3' cols='20'/>"+
            "<a href='#' class='Refund_Rigth_btn' style='display:block;position:absolute;left:20%;font-size: 15px;bottom: -25px;'>确定</a>" +
            "<a href='#' class='Refund_cancle_btn' style='display:block;position:absolute;right:43%;font-size: 15px;bottom: -25px;'>取消</a>"+
            "</div></div></div>";

        $(".index-tab-cont").append(html);
        $(".Refund_cancle_btn").on("click",function(){
            $(".Big_RefuseInput").remove();
        });

        $(".Refund_Rigth_btn").on("click",function(){
            if(/^[0-9]*$/.test($("#RefuMony_Inf").val())){
                Revamp_margin({shopId:shopid,logenUser:PLATFORM_LOGIN_USER_ID,payMoney:$("#RefuMony_Inf").val()});
            }else{
                alert("请输入数字")
            }
        });
    })
}
function Revamp_margin(data){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/updateShopPayMoney",
        data: data,
        type: "post",
        success: function (res) {
            if(res.code==1){
                $("#Shop_Content input[data-shop-name='payMoney']").val($("#RefuMony_Inf").val());

                $(".Refund_cancle_btn").trigger("click");

                alert(res.msg);
            }else{
                alert(res.msg)
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
        }
    })
}



//店铺详情下对应的所售品牌
function Shop_List_SaleBrand(res){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/shopBrand",
        data: res,
        type: "post",
        success:function(data){
            if(data.code==1){
                $("#Business_BrandBody").html('');
                var html = $("#Business_Brand_ListTmpl").render(data.info);
                $("#Business_BrandBody").append(html);

                BrandpagePlus(data.info.pageCount,res,true);

                //点击查看详情
                Brand_detail(data)
            }else{
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试")
        }
    })
}

function Brand_detail(data){
    $("#Business_BrandBody").on("click",".checkBrand_details",data,function(){
       var getIndex =  parseInt($(this).parent().parent().attr("data-index"));
        console.log(data);
       var MakeDom  =$("#Business_BrandDetails_Tmple").render(data.info.shopBrandList[getIndex]);
        $("#Shop_Content").after(MakeDom);
        $("#Look_addBrand").siblings().hide();
    })
}

//商品详情分页调用Ajax
function Shop_page_SaleBrand(res){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/shopManagePlatform/shopBrand",
        data: res,
        type: "post",
        success:function(data){
            if(data.code==1){
                $("#Business_BrandBody").html('');
                var html = $("#Business_Brand_ListTmpl").render(data.info);
                $("#Business_BrandBody").append(html);
                //点击查看详情
                Brand_detail(data)
            }else{
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试")
        }
    })
}

//商品详情分页
function pagePlus(totalPageCount,data,flag){
    var ShopDetailParamData = {};
    $("#Business-conntrol .pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            ShopDetailParamData = data;
            if(!flag){
                ShopDetailParamData.pageIndex = page;
                allPageBusiness(ShopDetailParamData);
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

//品牌列表分页
function BrandpagePlus(totalPageCount,data,flag){
    var BrandListParamData={};
    $("#Business_pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            BrandListParamData = data;
            if(!flag){
                BrandListParamData.pageIndex = page;
                Shop_page_SaleBrand(BrandListParamData);
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

//时间截取
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}

