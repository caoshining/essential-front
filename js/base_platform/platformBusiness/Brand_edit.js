/**
 * Created by wangs on 2016/7/27.
 */


$(function(){
    $.ajax({
        url: PLATFORM_URL_PRE + "/essential/productCategory/query",
        type: "post",
        success: function (res) {
            if (res.code == 1) {

                $("#Brand_Edit").html("");
                var resBrandInfo = new Object();
                resBrandInfo = JSON.parse(JSON.stringify(BrandIndex));

                $.each(res.info,function(i1,v1){
                    res.info[i1].checked = false;
                    $.each(resBrandInfo.brandCategoryVoList,function(i2,v2){
                        if(v1.categoryId == v2.categoryId){
                            res.info[i1].checked = true;
                        }
                    });
                });
                resBrandInfo.brandCategoryVoList =  res.info;
                var html = $("#Brand_edit_Tmple").render(resBrandInfo);
                $("#Brand_Edit").append(html);
                Edit_Brand_Logo();
                Edit_Brand_bg()
            } else {
                alert(res.msg);
            }
        }
    });

    $(document).on("click","#brandEdit_save",function(e){
        e.stopImmediatePropagation();
        Edit_Brand();
    });

    $(document).on("click","#brandEdit_cancel",function(e){
        e.stopImmediatePropagation();
        $("#Brand_Lists").load("pages/base_platform/business/platform_product/brand.html");
    });
});

//编辑品牌信息
function Edit_Brand(){
    var bool=true;

    if(!Edit_checkBrandName($("#Edit_brandName").val())){
        bool=false;
        return false;
    }
    if(!Edit_chooseBox()){
        bool=false;
        return false;
    }
    if(Edit_logoPath == ""){
        bool=false;
        alert("品牌logo不能为空！");
        return false;
    }
    if(Edit_picPath == ""){
        bool=false;
        alert("至少上传一张背景图片！");
        return false;
    }
    if(!Edit_checkDec($("#Edit_wordDesc").val())){
        bool=false;
        return false;
    }
    if(!Edit_DetailsDec($("#Edit_detailDesc").val())){
        bool=false;
        return false;
    }
    if (!Edit_checkWebAddress($("#Edit_webAddress").val())){
        bool=false;
        return false;
    }
    var Edit_categoryIds = [];
    $(".check_class:checked").each(function(i,v){
        Edit_categoryIds.push(v.id)
    });

    $.ajax({
        type:"POST",
        url:PLATFORM_URL_PRE+"/essential/bussinessBrand/update",
        data:{"brandId":$("#Edit_brandId").val(),
            "brandName":$("#Edit_brandName").val(),
            "categoryIds":Edit_categoryIds.toString(),
            "logoPath":$(".BrandLogo").attr("src"),
            "picPath":$(".BrandPic").attr("src"),
            "pageDesc":$("#Edit_wordDesc").val(),
            "detailedDesc":$("#Edit_detailDesc").val(),
            "remark1":$("#Edit_webAddress").val()},
        dataType:"json",
        success:function(res){
            if (res.code == 1){
                alert("保存成功");
                $("#Brand_Lists").load("pages/base_platform/business/platform_product/brand.html");
            }
            return bool;
        },
        error:function(){
            alert("失败");
        }
    });
    return bool;
}

//品牌名称
function Edit_checkBrandName(brandName){

    if(brandName==''){
        $(".addBrand_error").css("display","block");
        $(".addBrand_error").html("*品牌名称不能为空");
        return false;
    }else{
        $(".addBrand_error").css("display","none");
    }
    return true;
}

//一句话描述
function Edit_checkDec(pageDesc){

    if (pageDesc== ''){
        $(".dec_error").css("display","block");
        $(".dec_error").html("*描述不能为空");
        return false;
    }else{
        $(".dec_error").css("display","none");
    }
    return true;
}

//详细描述
function Edit_DetailsDec(detailDesc){
    if (detailDesc== ''){
        $(".detailDesc").css("display","block");
        $(".detailDesc").html("*详细描述不能为空");
        return false;
    }else{
        $(".detailDesc").css("display","none");
    }
    return true;
}

//官网地址
function Edit_checkWebAddress(webAddress){
    var reg = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (webAddress== ''){
        $(".webAddress").css("display","block");
        $(".webAddress").html("*官网地址不能为空");
        return false;
    }else if(!reg.test(webAddress)){
        $(".webAddress").css("display","block");
        $(".webAddress").html("*官网地址格式不正确");
        return false;
    }
    else{
        $(".webAddress").css("display","none");
    }
    return true;
}

//品牌logo图片上传
var Edit_logoPath;
function Edit_Brand_Logo(){

    $('#BrandEdit_logoPath').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {

            Edit_logoPath = data.info[0];

            $("#BrandEdit_logoPath").siblings("img").attr({"src":data.info[0]});
            $("#BrandEdit_logoPath").siblings("p").css("display","none");
            $("#BrandEdit_logoPath").siblings(".parentFileBox").fadeOut("slow",function(){
                $("#BrandEdit_logoPath").remove();
            });

        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '上传图片',
        fileNumLimit:1,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image/*"
        }
    });
}
Edit_Brand_Logo();

//品牌背景图片上传
var Edit_picPath;
function Edit_Brand_bg(){
    $('#BrandEdit_BgPath').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {
            $("#BrandEdit_BgPath").siblings("img").attr({"src":data.info[0]});
            $("#BrandEdit_BgPath").siblings("p").css("display","none");

            $("#BrandEdit_BgPath").siblings(".parentFileBox").fadeOut("slow",function(){
                $("#BrandEdit_BgPath").remove();
            });
            Edit_picPath = data.info[0];
        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '上传图片',
        chunked:true,
        // 分片大小
        fileNumLimit:1,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileSizeLimit:500000 * 1024,
        fileSingleSizeLimit:1024* 1024,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image/*"
        }
    });
}
Edit_Brand_bg();

//判断复选框选中
function Edit_chooseBox(){
    if($(".check_class:checked").length > 0){
        $(".aboutClass").css("display","none");
        return true;
    }else{
        $(".aboutClass").css("display","block");
        $(".aboutClass").html("*至少选择一个品类");
    }
    return false;
}

