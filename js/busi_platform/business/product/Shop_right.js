/**
 * Created by Morgan on 2016/7/11.
 */
function Shop_Logo(){
    var logoPath;
    $('#Shop_Right_Img2').diyUpload({
        url:BUSINESS_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=0',
        success:function( data ) {
            $("#Logo_Img").attr("src",data.info[0]);
            $("#Shop_Right_Img2").siblings(".parentFileBox").fadeOut("slow",function(){
                $("#Shop_Right_Img2").siblings(".parentFileBox").remove();
            });

        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '选择图片',
        chunked:true,
        // 分片大小
        chunkSize:512 * 1024,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileNumLimit:1,
        fileSizeLimit:500000 * 1024,
        fileSingleSizeLimit:50000 * 1024,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image"
        }
    });
}
Shop_Logo();

function shop_refresh(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/shopBackstageInfoController/updateShopInfo',
        data:res,
        dataType:"json",
        success:function(data){
            if(data.code==1){
                alert(data.msg);
            }else{
                alert(data.msg);
            }
        }
    })
}

function Shop_getInm(){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/shopBackstageInfoController/queryShopInfo',
        data:{userId:BUSINESS_LOGIN_USER_ID},
        dataType:"json",
        success:function(data){
            if(data.code==1){
                $("#Shop_Creattime").html(data.info.createTime);
                $("input[shop-data-name='Shop_PhoneNum']").val(data.info.contactPhone);
                // $("input[shop-data-name='Shop_PhoneNum']").attr("shop-cont-phoneId",);
                $("input[shop-data-name='Shop_Name']").val(data.info.name);
                console.log("data.info.logoPath"+data.info.logoPath);
                if(data.info.logoPath!=""){
                    $("#Shop_Right_Img2").siblings("img").attr("src",data.info.logoPath);
                }
                if(data.info.isPay==0){
                    $(".Shop_Performance p").text("处理中");
                }
                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()))
                });
                $(".Shop_Infm").attr("data-createTime",data.info.createTime);
                $(".Shop_Infm").attr("data-contactId",data.info.contactId);
                $(".Shop_Infm").attr("data-paymoney",data.info.payMoney);
                $(".Shop_Infm").attr("data-isPay",data.info.isPay);

                $("#shop_left_logo").attr("src",data.info.logoPath);
                $("#shop_left_name").html(data.info.name);
                $("#shop_left_time").html(data.info.createTime);
                $("#shop_left_check").html(data.info.checkT)
            }else {
                alert(data.msg);
            }

        },error:function(){
            alert("网络有问题");
        }
    })
}
Shop_getInm();
/*获取店铺基本信息*/

function ShopLi_Change_Tab(){
    var $getLis=$(".ShopLi_Change_Tab li");
    $getLis.on("click",function(){
        var getIndex=$(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $(".Shop_Btmbtn a").attr("Next-Step",getIndex);
        $(".Shop_Change_Tab>div").eq(getIndex).css("display","block").siblings().css("display","none");
        if(getIndex==1){
            $(".Shop_Btmbtn a").html("保存");
        } else if(getIndex==3){
            $(".Shop_Btmbtn a").html("保存并提交");
        }else{
            $(".Shop_Btmbtn a").html("下一步");
        }
    })
}
ShopLi_Change_Tab();
/*Nav点击切换*/
var Step=parseInt($(".Shop_Btmbtn a").attr("Next-Step"));
function Shop_Next_Btn(){

    $(".Shop_Btmbtn a").on("click",function(){
      Step=parseInt($(".Shop_Btmbtn a").attr("Next-Step"));
        if(Step<3){
            if(Step==0){
                shop_refresh({shopId:BUSINESS_LOGIN_SHOP_ID,
                    name:$("input[shop-data-name='Shop_Name']").val(),
                    createTime:$(".Shop_Infm").attr("data-createTime"),
                    logoPath:$("#Logo_Img").attr("src"),
                    contactId:$(".Shop_Infm").attr("data-contactId"),
                    contactPhone:$("input[shop-data-name='Shop_PhoneNum']").val(),
                    payMoney:$(".Shop_Infm").attr("data-paymoney")});
                $(".ShopLi_Change_Tab li:eq(1)").addClass("active").siblings().removeClass("active");
            }
             if(Step==1) {
                if ($(".Refund_Set1 input[shop-data-name='ReceiptGods_Name']").val() != "" && $(".Refund_Set1 input[shop-data-name='ReceiptGods_Phone']").val() != "" && $(".Refund_Set1 input[shop-data-name='ReceiptGods_Address']").val() != "") {
                    AddRect_Address();
                }
            }
            Step+=1;
            if(Step==2){
                AddReceive_Address();
            }
            if(Step==3){
                Shop_Corporate_ImgChange("#Shop_Corporate_front2","#Shop_Corporate_front1");/*法人正面照等*/
                Shop_Corporate_ImgChange("#Shop_Corporate_contrary2","#Shop_Corporate_contrary1");
                Shop_Corporate_ImgChange("#Shop_business_license2","#Shop_business_license1");
                Shop_Corporate_ImgChange("#Shop_business_tax2","#Shop_business_tax1");
                Shop_Corporate_ImgChange("#Shop_Organ_code2","#Shop_Organ_code1");
                Shop_Corporate_ImgChange("#Shop_Permission_open2","#Shop_Permission_open1");
                Seltte_And_Qulat();
                $(".ShopLi_Change_Tab li:eq(2)").addClass("active").siblings().removeClass("active");
            }

            $(".Shop_Change_Tab>div").eq(Step).css("display","block").siblings().css("display","none");

            $(".Shop_Btmbtn a").attr("Next-Step",Step);
            console.log($(".Shop_Btmbtn a").attr("Next-Step"));
            if(Step==1){
                $(".Shop_Btmbtn a").html("保存");
            } else if(Step==3){
                $(".Shop_Btmbtn a").html("保存并提交");
                $(".Shop_Btmbtn a").one("click",function(){
                    SeltteAndQulat_Post();
                });
            }else{
                $(".Shop_Btmbtn a").html("下一步");
            }
        }else{
            $(".Shop_Btmbtn a").attr("Next-Step",0)
        }
    })
}
Shop_Next_Btn();
/*下一步*/
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }

}
/*时间戳转变*/

function AddRect_Address(){
    var InputValues={
        contactPerson:$(".Refund_Set1 input[shop-data-name='ReceiptGods_Name']").val(),
        createUser:BUSINESS_LOGIN_USER_ID,
        phone:$(".Refund_Set1 input[shop-data-name='ReceiptGods_Phone']").val(),
        returnAddress:$(".Refund_Set1 input[shop-data-name='ReceiptGods_Address']").val(),
        shopId:BUSINESS_LOGIN_SHOP_ID
    };
    if($(".Refund_Set1 input[shop-data-name='ReceiptGods_Name']").val()==""){
        alert("请输入联系人");
        return false;
    }else if($(".Refund_Set1 input[shop-data-name='ReceiptGods_Address']").val()==""){
        alert("请输入退货地址");
        return false;
    }else if($(".Refund_Set1 input[shop-data-name='ReceiptGods_Phone']").val()==""){
        alert("请输入联系人手机号");
        return false;
    }else if($(".Refund_Set1 input[shop-data-name='ReceiptGods_Name']").val()!=""&&
        $(".Refund_Set1 input[shop-data-name='ReceiptGods_Address']").val()!=""&&
        $(".Refund_Set1 input[shop-data-name='ReceiptGods_Phone']").val()!=""){
        $.ajax({
            type:'post',
            url:BUSINESS_URL_PRE+'/essential/returnRightsAddressController/addReturnRightsAddress',
            data:InputValues,
            dataType:"json",
            success:function(data){
                if(data.code==1){
                    alert(data.msg);
                }else{
                    alert(data.msg);
                }
            },error:function(){
                alert("网络有问题-请重试");
            }
        })
    }
    //Shopid记得更改,createUser记得更改.
}
/*添加新地址之保存*/


function AddReceive_Address(){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/returnRightsAddressController/queryReturnRightsAddress',
        data:{shopId:BUSINESS_LOGIN_SHOP_ID},
        dataType:"json",
        beforeSend:function(){
            $('.Shop-TbodyDiv').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if(data.code==1){
                $(".Shop-TbodyDiv").children().remove();
                var html="<table><thead>" +
                    "<th>地址 </th>" +
                    "<th>联系人 </th>" +
                    "<th>电话 </th>" +
                    "</thead> <tbody class='Shop-Tbody'>";
                for(var i=0;i<data.info.length;i++){
                    html+='<tr shop-data-DelID='+data.info[i].returnaddressId+'><td colspan="5">' +
                        '<div style="width:100%;" class="Shop_Tabe_action col-sm-12">' +
                        '<time class="fl col-sm-8">'+data.info[i].createTime+'</time> ' +
                    '<p class="fr col-sm-3" shop-data-DelID='+data.info[i].returnaddressId+'><a href="###" shop-data-action="delect">删除</a>-' +
                    '<a href="###" shop-data-action="edit">编辑</a>-' +
                    '<a href="###" shop-data-action="default" shop-data-status='+data.info[i].status+'>设为默认</a></p></div>' +
                    '<div style="width:100%;" class="Shop_Tabe_conten col-sm-12"> ' +
                    '<p class="col-sm-5">'+data.info[i].returnAddress+'</p> ' +
                    '<p class="col-sm-4">'+data.info[i].contactPerson+'</p>' +
                    '<p class="col-sm-3">'+data.info[i].phone+'</p></div></td></tr>'
                }
                html+="</tbody></table>";
                $(".Shop-TbodyDiv").append(html);
                $("a[shop-data-status='1']").html("默认地址").css("color","#333");
                Shop_Addres_Action();
            }else{
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题-请重试");
        }
    })
}
/*退货维权设置-其地址添加*/

function Shop_Addres_Action(){
    $("a[shop-data-action='delect']").on("click",function(){
        var $getreturnaddressId=$(this).parent().attr("shop-data-DelID");
        $.ajax({
            type:'post',
            url:BUSINESS_URL_PRE+'/essential/returnRightsAddressController/deleteReturnRightsAddress',
            data:{"returnaddressId":$getreturnaddressId},
            dataType:"json",
            success:function(data){
                if(data.code==1){
                    $("tr[shop-data-DelID="+$getreturnaddressId+"]").remove();
                    alert(data.msg);
                }else{
                    alert(data.msg)
                }
            },error:function(){
                alert("网络有问题-请重试");
            }
        })
    });/*收货地址删除功能*/

    $("a[shop-data-action='default']").on("click",function(){
        var $saveThis=$(this);
        console.log($saveThis)
        var $getreturnaddressId=$(this).parent().attr("shop-data-DelID");
        var dataJson={"returnaddressId":$getreturnaddressId,"shopId":BUSINESS_LOGIN_SHOP_ID};
        $.ajax({
            type:'post',
            url:BUSINESS_URL_PRE+'/essential/returnRightsAddressController/defaultAddress',
            data:dataJson,
            dataType:"json",
            success:function(data){
                if(data.code==1){
                    $("a[shop-data-action='default']").html("设为默认");
                    $("a[shop-data-action='default']").css("color","#0c65f3")
                    $saveThis.html("默认地址");
                    $saveThis.css("color","#333");
                    alert(data.msg);
                }else {
                    alert(data.msg);
                }
            },error:function(){
                alert("网络有问题-请重试");
            }
        })
    });/*收货地址默认功能*/

    Shop_Address_Edit();/*收货地址更改*/
}

function Shop_Address_Edit(){
    console.log("Have-ClickThisEdit");
    $("a[shop-data-action='edit']").bind("click",function(){
        var $getreturnaddressId=$(this).parent().attr("shop-data-DelID");
        var $getReturnAddress=$("tr[shop-data-DelID="+$getreturnaddressId+"] td div.Shop_Tabe_conten p").eq(0).html();
        var $getContactPerson=$("tr[shop-data-DelID="+$getreturnaddressId+"] td div.Shop_Tabe_conten p").eq(1).html();
        var $getReturnPhone=$("tr[shop-data-DelID="+$getreturnaddressId+"] td div.Shop_Tabe_conten p").eq(2).html();
        $(".ShopLi_Change_Tab li").eq(1).trigger("click");
        function Add_InputsValu(a,b,c){
            $(".Refund_Set1 input[shop-data-name='ReceiptGods_Address']").val(a);
            $(".Refund_Set1 input[shop-data-name='ReceiptGods_Name']").val(b);
            $(".Refund_Set1 input[shop-data-name='ReceiptGods_Phone']").val(c);
            $(".Shop_Btmbtn a").attr("next-step","").bind("click",function(){
                if($(".Refund_Set1 input[shop-data-name='ReceiptGods_Name']").val()!=""&&$(".Refund_Set1 input[shop-data-name='ReceiptGods_Phone']").val()!=""&&$(".Refund_Set1 input[shop-data-name='ReceiptGods_Address']").val()!=""){
                    var postData={
                        contactPerson:$(".Refund_Set1 input[shop-data-name='ReceiptGods_Name']").val(),
                        modifyUser:BUSINESS_LOGIN_USER_ID,
                        phone:$(".Refund_Set1 input[shop-data-name='ReceiptGods_Phone']").val(),
                        returnAddress:$(".Refund_Set1 input[shop-data-name='ReceiptGods_Address']").val(),
                        returnaddressId:$getreturnaddressId,
                        shopId:BUSINESS_LOGIN_SHOP_ID
                    };
                    Shop_Adres_Edit_Post(postData);
                    $(".Refund_Set2").css("display","block").siblings("display")
                }else{
                    alert("请将必填项填全");
                }
            });
        }
        Add_InputsValu($getReturnAddress,$getContactPerson,$getReturnPhone);

    });
}

function Shop_Adres_Edit_Post(posInf){
        $.ajax({
         type:'post',
         url:BUSINESS_URL_PRE+'/essential/returnRightsAddressController/updateReturnRightsAddress',
         data:posInf,
         dataType:"json",
         success:function(data){
             alert(data.msg);
         },error:function(){
            alert("网络有问题-请重试");
           }
        })
}
/*收货地址编辑*/
function Shop_Add_Address(){
    $(".Shop_Add_Address").on("click",function(){
        $(".ShopLi_Change_Tab li").eq(1).trigger("click");
        $(".Shop_Btmbtn a").attr("Next-Step","1");
    })
}
Shop_Add_Address();





function Shop_Corporate_ImgChange(Img,RemoveObject){
    var logoPath;
    $(Img).diyUpload({
        url:BUSINESS_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=0',
        success:function( data ) {
            $(RemoveObject).children("img").attr("src",data.info[0]);
            $(Img).siblings(".parentFileBox").fadeOut("slow",function(){
                $(Img).siblings(".parentFileBox").remove();
            });
        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '选择图片',
        chunked:true,
        // 分片大小
        chunkSize:512 * 1024,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileNumLimit:1,
        fileSizeLimit:512 * 1024,
        fileSingleSizeLimit:512 * 1024,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image"
        }
    });
}



function Seltte_And_Qulat(){
    $("#IsOr_same input").click(function(){
        $(this).attr("checked","checked");
        if($(this).val()==0){
            $(".Shop_Accout_Infm ul li").eq(0).siblings().fadeIn("slow");
        }else if($(this).val()==1){
            $(".Shop_Accout_Infm ul li").eq(0).siblings().fadeOut("slow");
        }
    });
    var dataJson={shopId:BUSINESS_LOGIN_SHOP_ID};
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/shopQualificationCartificateController/queryShopQualificationCartificate',
        data:dataJson,
        dataType:"json",
        success:function(res){
            if(res.code==1){
                $("input[shop-data-name='Company_Name']").val(res.info.companyName);
                $("input[shop-data-name='CompanyTax_Num']").val(res.info.taxRegistrationNumber);

                $("input[shop-data-name='Shop_Inm_Addres']").val(res.info.detailAddress);
                if(res.info.fixedTelephone!=""){
                    var getTelNum=res.info.fixedTelephone;
                    /*console.log("getTelNum"+getTelNum)*/
                    var spltNum=getTelNum.split("-");
                    $("input[shop-data-name='Shop_Inm_PhoneNum1']").val(spltNum[0]);
                    $("input[shop-data-name='Shop_Inm_PhoneNum2']").val(spltNum[1]);
                }
                if(res.info.isSame==0){
                    $(".Shop_Accout_Infm div input[value='0']").attr("checked","checked");
                    $(".Shop_Accout_Infm ul li").eq(0).siblings().css("display","block");
                    for(var i=0;i<res.info.openingBankInfomation.length;i++){
                        if(res.info.openingBankInfomation[i].type==0){
                            var a=i;
                            $("input[shop-data-name='BankCount_Name']").attr("BankCount_Id",res.info.openingBankInfomation[a].id);
                            $("input[shop-data-name='BankCount_Name']").val(res.info.openingBankInfomation[a].openAccount);
                            $("input[shop-data-name='BankCount_Num']").val(res.info.openingBankInfomation[a].theCardNumber);
                        }else if(res.info.openingBankInfomation[i].type==1){
                            var b=i;
                            $("input[shop-data-name='Settle_BankCount_name']").attr("Settle_Id",res.info.openingBankInfomation[b].id);
                            $("input[shop-data-name='Settle_BankCount_name']").val(res.info.openingBankInfomation[b].openAccount);
                            $("input[shop-data-name='Settle_BankCount_code']").val(res.info.openingBankInfomation[b].theCardNumber);
                        }
                    }
                }else if(res.info.isSame==1){
                    $(".Shop_Accout_Infm div input[value='1']").attr("checked","checked");
                    $(".Shop_Accout_Infm ul li").eq(0).siblings().css("display","none");
                    $("input[shop-data-name='BankCount_Name']").attr("BankCount_Id",res.info.openingBankInfomation[0].id);
                    $("input[shop-data-name='BankCount_Name']").val(res.info.openingBankInfomation[0].openAccount);
                    $("input[shop-data-name='BankCount_Num']").val(res.info.openingBankInfomation[0].theCardNumber);
                }
                $("input[shop-data-name='Shop_Inm_Addres']").val(res.info.detailAddress);
                $(".Shop_Accout_Img img[shop-aptitudes-img='Company_Font']").attr("src",res.info.legalidScan);
                $(".Shop_Accout_Img img[shop-aptitudes-img='Company_opposite']").attr("src",res.info.legalidBackScan);
                $(".Shop_Accout_Img img[shop-aptitudes-img='Company_license']").attr("src",res.info.bussinessLicenceScan);
                $(".Shop_Accout_Img img[shop-aptitudes-img='Company_tax']").attr("src",res.info.taxRegistrationCertificateScan);
                $(".Shop_Accout_Img img[shop-aptitudes-img='Company_code']").attr("src",res.info.organizationCodeScan);
                $(".Shop_Accout_Img img[shop-aptitudes-img='Company_permission']").attr("src",res.info.accountOpeningLicenseScan);
            }else{
                alert(res.msg);
            }

        },
        error:function(){
            alert("网络错误，请重试");
        }
    })
}
/*结算/资质查询并渲染*/

function SeltteAndQulat_Post(){
    var openingBankInfomation=[];
    var dataAcout="openingBankInfomation[0].openAccount";
    var dataCardNumber="openingBankInfomation[0].theCardNumber";
    var dataType="openingBankInfomation[0].type";
    var dataCountId="openingBankInfomation[0].id";

    var dataAcout1="openingBankInfomation[1].openAccount";
    var dataCardNumber1="openingBankInfomation[1].theCardNumber";
    var dataType1="openingBankInfomation[1].type";
    var dataCountIdTwo="openingBankInfomation[1].id";

    var dataJson={
        shopId:BUSINESS_LOGIN_SHOP_ID,
        accountOpeningLicenseScan:$(".Shop_Accout_Img img[shop-aptitudes-img='Company_permission']").attr("src"),
        bussinessLicenceScan:$(".Shop_Accout_Img img[shop-aptitudes-img='Company_license']").attr("src"),
        companyName:$("input[shop-data-name='Company_Name']").val(),
        detailAddress:$("input[shop-data-name='Shop_Inm_Addres']").val(),
        fixedTelephone:$("input[shop-data-name='Shop_Inm_PhoneNum1']").val()+"-"+$("input[shop-data-name='Shop_Inm_PhoneNum2']").val(),
        legalidBackScan:$(".Shop_Accout_Img img[shop-aptitudes-img='Company_opposite']").attr("src"),
        legalidScan:$(".Shop_Accout_Img img[shop-aptitudes-img='Company_Font']").attr("src"),
        loginUser:BUSINESS_LOGIN_USER_ID,
        organizationCodeScan:$(".Shop_Accout_Img img[shop-aptitudes-img='Company_code']").attr("src"),
        taxRegistrationCertificateScan:$(".Shop_Accout_Img img[shop-aptitudes-img='Company_tax']").attr("src"),
        taxRegistrationNumber:$("input[shop-data-name='CompanyTax_Num']").val(),
        isSame:0
    };

    if($("#IsOr_same input:checked").val()==1){
        dataJson.isSame=1;
        dataJson[dataCountId]=$("input[shop-data-name='BankCount_Name']").attr("BankCount_Id");
        dataJson[dataAcout]=$("input[shop-data-name='BankCount_Name']").val();
        dataJson[dataCardNumber]=$("input[shop-data-name='BankCount_Num']").val();
        dataJson[dataType]=0;
    }else if($("#IsOr_same input:checked").val()==0){
        dataJson.isSame=0;
        dataJson[dataCountId]=$("input[shop-data-name='BankCount_Name']").attr("BankCount_Id");
        dataJson[dataAcout]=$("input[shop-data-name='BankCount_Name']").val();
        dataJson[dataCardNumber]=$("input[shop-data-name='BankCount_Num']").val();
        dataJson[dataType]=0;

        dataJson[dataCountIdTwo]=$("input[shop-data-name='Settle_BankCount_name']").attr("Settle_Id");
        dataJson[dataAcout1]=$("input[shop-data-name='Settle_BankCount_name']").val();
        dataJson[dataCardNumber1]=$("input[shop-data-name='Settle_BankCount_code']").val();
        dataJson[dataType1]=1;
    }

    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/shopQualificationCartificateController/updateShopQualificationCartificate',
        data:dataJson,
        dataType:"json",
        success:function(res){
            if(res.code==1){
                alert("店铺资质信息保存提交成功");
                $("#navbar-container a[href='#Shop']").click();
                //页面自刷新;
            }else if(res.code==0){
                if($(".Shop_Btmbtn a").attr("Next-Step")==3){
                    $(".Shop_Btmbtn a").one("click",function(){
                        SeltteAndQulat_Post();
                    });
                    alert(res.msg);
                }
            }
        },
        error:function(){
            alert("网络错误，请重试");
            if($(".Shop_Btmbtn a").attr("Next-Step")==3){
                $(".Shop_Btmbtn a").one("click",function(){
                    SeltteAndQulat_Post();
                });
            }
        }
    })
}