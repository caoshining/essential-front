/**
 * Created by Morgan on 2016/7/8.
 */
function Tab_Descript(){
    var $getlis=$('.GodAndDes li');
    $getlis.click(function(){
        var $Index=$(this).index();
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        if($Index==0){
            $('#EditGodsDesc').css('display','block').siblings().css('display','none');
        }else if($Index==1){
            $('#EditReturnDesc').css('display','block').siblings().css('display','none');
        }
    })
}
Tab_Descript();

function save_Gods(){
    var getPathlist=[];
    $("#MakeInfm_img div img").each(function(i){getPathlist[i]=$(this).attr("src")});
    var DataJson= getSkuVal();
    DataJson.brandId = $("#Select_brand li.active").attr("data-brand_id");
    DataJson.categoryId=$("#Select_pin ul li.active").attr("data-categoryid");
    DataJson.productTypeId=$("#Select_class ul li.active").attr("data-producttypeid");
    DataJson.shopId=BUSINESS_LOGIN_SHOP_ID;
    DataJson.saleStatus=0;
    DataJson.productName=$("#Make_productName").val();
    DataJson.salesName=$("#Make_productName").val();
    DataJson.costPrice=$("#Make_productPrice").val();
    DataJson.price=$("#Make_productPrice").val();
    DataJson.productDescribe=UE.getEditor('editor').getContent();
    DataJson.returnProductExplain=UE.getEditor('editor1').getContent();
    DataJson.articleNumber=$("#articleNumber").val();
    DataJson.words=$("#Edit_oneword").val();
    DataJson.freightType=freightType;
    DataJson.freightPrice=$("#freightPrice").val();
    DataJson.freightGroupId=$("#youfeiMB").find("option:selected").val();
    DataJson.loginUser=BUSINESS_LOGIN_USER_ID;
    DataJson.totalStoreNum=$(".total-repertory").html();
    DataJson.picturePathList=getPathlist.toString();
    DataJson.productSku=$.param(getSkuVal());
    DataJson.productKeyWords= $("#Make_keywords").val();//商品关键字
    console.log(DataJson);
    if(DataJson.picturePathList==""){
        alert("商品主图不能为空")
    }else if(DataJson.freightType===""){
        alert("运费不能为空")
        console.log(DataJson.freightType)
    }else if(DataJson.words==""){
        alert("一句话描述不能为空")
    }else if(DataJson.articleNumber==""){
        alert("商品代码不能为空")
    }else if(DataJson.productName==""){
        alert("商品名称不能为空")
    }else if(DataJson.returnProductExplain==""){
        alert("退货说明不能为空")
    }else if(DataJson.productDescribe==""){
        alert("商品详情说明不能为空")
    }else if(DataJson.productSku==""){
        alert("商品规格不能为空")
    }else if(DataJson.picturePathList!=""
        && DataJson.freightType!==""
        && DataJson.words!=""
        && DataJson.articleNumber!=""
        && DataJson.returnProductExplain!=""
        && DataJson.productDescribe!=""
        && DataJson.productName!=""
        && DataJson.productSku!=""){
        console.log("jinlaile")
        PutSaveAway($.param(DataJson));
    }

}
//保存商品

function Gods_Saved(){
    var getPathlist=[];
    $("#MakeInfm_img div img").each(function(i){getPathlist[i]=$(this).attr("src")});
    var DataJson= getSkuVal();
    DataJson.brandId = $("#Select_brand li.active").attr("data-brand_id");
    DataJson.categoryId=$("#Select_pin ul li.active").attr("data-categoryid");
    DataJson.productTypeId=$("#Select_class ul li.active").attr("data-producttypeid");
    DataJson.shopId=BUSINESS_LOGIN_SHOP_ID;
    DataJson.saleStatus=1;
    DataJson.productName=$("#Make_productName").val();
    DataJson.salesName=$("#Make_productName").val();

    DataJson.costPrice=$("#Make_productPrice").val();
    DataJson.price=$("#Make_productPrice").val();
    DataJson.productDescribe=UE.getEditor('editor').getContent();
    DataJson.returnProductExplain=UE.getEditor('editor1').getContent();
    DataJson.articleNumber=$("#articleNumber").val();
    DataJson.words=$("#Edit_oneword").val();
    DataJson.freightType=freightType;
    DataJson.freightPrice=$("#freightPrice").val();
    DataJson.freightGroupId=$("#youfeiMB").find("option:selected").val();
    DataJson.loginUser=BUSINESS_LOGIN_USER_ID;
    DataJson.totalStoreNum=$(".total-repertory").html();
    DataJson.picturePathList=getPathlist.toString();
    DataJson.productSku=$.param(getSkuVal());

    DataJson.twoDimensionPath= $("#Make_keywords").val();//商品关键字
    console.log(DataJson);
    if(DataJson.picturePathList==""){
        alert("商品主图不能为空")
    }else if(DataJson.freightType===""){
        alert("运费不能为空");
        console.log(DataJson.freightType)
    }else if(DataJson.words==""){
        alert("一句话描述不能为空")
    }else if(DataJson.articleNumber==""){
        alert("商品代码不能为空")
    }else if(DataJson.productName==""){
        alert("商品名称不能为空")
    }else if(DataJson.returnProductExplain==""){
        alert("退货说明不能为空")
    }else if(DataJson.productDescribe==""){
        alert("商品详情说明不能为空")
    }else if(DataJson.productSku==""){
        alert("商品规格不能为空")
    }else if(DataJson.picturePathList!=""
        && DataJson.freightType!==""
        && DataJson.words!=""
        && DataJson.articleNumber!=""
        && DataJson.returnProductExplain!=""
        && DataJson.productDescribe!=""
        && DataJson.productName!=""
        && DataJson.productSku!=""){
        console.log("jinlaile")
        PutAway($.param(DataJson));
    }

}
//上架商品

/* function addMake_gods(){
 var $editGods=$('#EditGodsDesc');
 $.ajax({
 type:"post",
 url:"ueditor/relationProductList.html",
 async:true,
 /!*beforeSend:function(){
 $body.css("background","url(img/1.jpg)");
 },*!/
 //未发送成功时显示的效果
 success:function(msg){
 $editGods.append(msg);
 }
 });
 }
 addMake_gods();*/