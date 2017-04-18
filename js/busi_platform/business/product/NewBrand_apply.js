/**
 * Created by wangs on 2016/8/1.
 */

/*
    $("#Apply_Audit").click(function(){
        if(!checkBrandName($('.BrandName').val())){
            return false;
        }
        if(BandLogo == ''){
            alert("必须上传一张logo图片");
            return false;
        }
        if(!checkDec($("#oneWords").val())){
            return false;
        }

        if(!bandDetails($("#bandDetails").val())){
            return false;
        }
        else{
           alert(1);
        }
    });

    //品牌logo上传
var BandLogo="";
function Brand_bg(){
    $('#BrandApply_logoPath').diyUpload({
        url:BUSINESS_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {
            $("#BrandApply_logoPath").siblings("img").attr({"src":data.info[0]});
            $("#BrandApply_logoPath").siblings("p").css("display","none");
            $("#BrandApply_logoPath").siblings(".parentFileBox").fadeOut("slow",function(){
                $("#BrandApply_logoPath").remove();
            });
            BandLogo = data.info[0];
        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '上传图片',
        fileNumLimit:1,
        chunked:true,
        // 分片大小
        chunkSize:512 * 1024,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileSizeLimit:1024 * 1024,
        fileSingleSizeLimit:1024* 1024,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image"
        }
    });
}
Brand_bg();

//一句话描述
$("#oneWords").blur(function(){
    checkDec($("#oneWords").val());
});

//详细描述
$("#bandDetails").blur(function(){
    bandDetails($("#bandDetails").val());
});

//品牌名称
$(".BrandName").blur(function(){
    checkBrandName($('.BrandName').val());
});

function checkDec(pageDesc){

    if (pageDesc== ''){
        $(".dec_error").css("display","block");
        $(".dec_error").html("*描述不能为空");
        return false;
    }
    else if(pageDesc.length>10){
        $(".dec_error").css("display","block");
        $(".dec_error").html("*字数不得超过10字");
        return false;
    }
    else{
        $(".dec_error").css("display","none");
    }
    return true;
}

function bandDetails(bandDetails){
    if (bandDetails== ''){
        $(".bandDetails_error").css("display","block");
        $(".bandDetails_error").html("*描述不能为空");
        return false;
    }
    else if(bandDetails.length>300){
        $(".bandDetails_error").css("display","block");
        $(".bandDetails_error").html("*字数不得超过300字");
        return false;
    }
    else{
        $(".bandDetails_error").css("display","none");
    }
    return true;
}
var str=true
function checkBrandName(brandName){
    if(brandName == ''){
        $(".BrandName_error").css("display","block");
        $(".BrandName_error").html("*品牌名称不能为空");
        str = false;
    }
    else{
        $(".BrandName_error").css("display","none");
        str = true;
    }
    return str
}

function PostInfom(){
    $.ajax({
        url:BUSINESS_URL_PRE+"/essential/bussinessBrand/shop/addBrandApply",
        data:{/!*"shopId":BUSINESS_LOGIN_SHOP_ID,"userId":BUSINESS_LOGIN_USER_ID,*!/
            "brandId":$("#selectBrand").val()},
        success:function(res){
            if(res.code==1){
                alert("申请审核已提交");
                $("a[href='#MyBorand']").click();
                //$(".applyAudit").find("span").unbind("click");
            }
        }
    })
}*/

/**
 * Created by wangs on 2016/7/21.
 */

$('#brand_save').click(function(){
    checkBrand();
});

$("#brand_cancel").click(function(){
    $("a[href='#Brand_Apply']").click();
    $('#brand_save').unbind("click");
});

function checkBrand(){
    var brandName=$("#brandName").val();
    var pageDesc=$("#wordDesc").val();
    var detailDesc=$("#detailDesc").val();
    var webAddress=$("#webAddress").val();
    var bool=true;
    //alert(checkBrandName(brandName))
    if(!checkBrandName(brandName)){
        bool=false;
        return false;
    }

    if(!chooseBox()){
        bool=false;
        return false;
    }

    if(logoPath == ""){
        bool=false;
        alert("品牌logo不能为空！");
        return false;
    }
    if(picPath == ""){
        bool=false;
        alert("至少上传一张背景图片！");
        return false;
    }
    if(!checkDec(pageDesc)){
        bool=false;
        return false;
    }
    if(!DetailsDec(detailDesc)){
        bool=false;
        return false;
    }
    if (!checkWebAddress(webAddress)){
        bool=false;
        return false;
    }

    $.ajax({
        type:"POST",
        url:BUSINESS_URL_PRE+"/essential/bussinessBrand/shop/addBrandApply",
        data:{
            "brandName":brandName,
            "categoryIds":categoryIds.toString(),
            "logoPath":logoPath,
            "picPath":picPath,
            "pageDesc":pageDesc,
            "detailedDesc":detailDesc,
            "remark1":webAddress},
        dataType:"json",
        success:function(res){

            if (res.code == 1){
                alert("保存成功");
                $("a[href='#Brand_Apply']").click();
                $('#brand_save').unbind("click");
                bool=true;
            }else{
                alert("保存失败");
                bool=false;
            }
        },
        error:function(){
            alert("失败");
            bool=false;
        }
    });
    return bool;
}

//失去焦点验证
$("#brandName").blur(function(){
    checkBrandName($("#brandName").val());
});
$("#wordDesc").blur(function(){
    checkDec($("#wordDesc").val());
});
$("#detailDesc").blur(function(){
    DetailsDec($("#detailDesc").val());
});
$("#webAddress").blur(function(){
    checkWebAddress($("#webAddress").val());
});
var flag=true;
//核对品牌名称
function checkBrandName(brandName){


    if(brandName == ''){

        $(".addBrand_error").css("display","block");
        $(".addBrand_error").html("*品牌名称不能为空");
        return false;
    }else{
        $.ajax({
            type:"POST",
            url:BUSINESS_URL_PRE+"/essential/bussinessBrand/queryTotalBrand",
            dataType:"json",
            success:function(res){
                if(res.code==1){
                    var brandNameArr = [];
                    $.each(res.info.brandVoList,function (i,v){
                        brandNameArr.push(v.brandName);
                    });

                    if($.inArray(brandName,brandNameArr)!= -1){

                        $(".addBrand_error").css("display","block");
                        $(".addBrand_error").html("*此品牌已存在");
                        flag=false;
                    }
                    else{
                        $(".addBrand_error").css("display","none");
                        flag=true;
                    }
                }
                else{
                    alert(res.msg);
                }

            },
            error:function(res){
                alert("品牌不在啊");
            }
        });
    }
    return flag;
}

//一句话描述
function checkDec(pageDesc){
    if (pageDesc== ''){
        $(".dec_error").css("display","block");
        $(".dec_error").html("*描述不能为空");
        return false;
    }
    else if(pageDesc.length>10){
        $(".dec_error").css("display","block");
        $(".dec_error").html("*字数不得超过10字");
        return false;
    }
    else{
        $(".dec_error").css("display","none");
    }
    return true;
}

//详细描述
function DetailsDec(detailDesc){
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
function checkWebAddress(webAddress){
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
var logoPath="";
function Brand_Logo(){

    $('#Brand_logoPath').diyUpload({
        url:BUSINESS_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {

            $("#Brand_logoPath").siblings("img").attr({"src":data.info[0]});
            $("#Brand_logoPath").siblings("p").css("display","none");
            $("#Brand_logoPath").siblings(".parentFileBox").fadeOut("slow",function(){
                $("#Brand_logoPath").remove();
            });
            logoPath = data.info[0];
        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '上传图片',
        fileNumLimit:1,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image"
        }
    });
}
Brand_Logo();

//品牌背景图片上传
var picPath="";
function Brand_bg(){
    $('#Brand_BgPath').diyUpload({
        url:BUSINESS_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {
            $("#Brand_BgPath").siblings("img").attr({"src":data.info[0]});
            $("#Brand_BgPath").siblings("p").css("display","none");
            $("#Brand_BgPath").siblings(".parentFileBox").fadeOut("slow",function(){
                $("#Brand_BgPath").remove();
            });
            picPath = data.info[0];
        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '上传图片',
        fileNumLimit:1,
        chunked:true,
        // 分片大小
        chunkSize:512 * 1024,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileSizeLimit:1024 * 1024,
        fileSingleSizeLimit:1024* 1024,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image"
        }
    });
}
Brand_bg();


//判断复选框选中
var categoryIds=[];
function chooseBox(){
    categoryIds=[];
    var checkBoxs=$(".check_class:checked");
    if(checkBoxs.length > 0){
        checkBoxs.each(function(i,v){
            categoryIds.push(v.id);
        });
        $(".aboutClass").css("display","none");
        return true;
    }else{
        $(".aboutClass").css("display","block");
        $(".aboutClass").html("*至少选择一个品类");
    }
    return false;
}

//复选框渲染
var CheckBoxmsg=[];
checkBox();
function checkBox(){
    $.ajax({
        url: BUSINESS_URL_PRE + "/essential/productCategory/query",
        type: "post",
        beforeSend:function(){
            $(".check_class .Img_Load").remove();
            $('.check_class').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            //console.log(res);
            if (res.code == 1) {
                $(".check_class .Img_Load").remove();
                for(var i=0;i<res.info.length;i++){
                    CheckBoxmsg.push({"nameId":res.info[i].categoryId,"name":res.info[i].categoryName});
                }
                //渲染模板
                var html = $("#check_classTmpl").render(res);
                $(".check_class").append(html);
                chooseBox();

                var size= $(".aboutLength input").length;
                $('.aboutLength input').click(function(){
                    for(var i=0;i<size;i++){
                        if ($(".aboutLength input").eq(i).prop('checked')){

                            $('.aboutClass').hide();
                            break;
                        }else{
                            $('.aboutClass').show();
                        }
                    }
                })

            } else {
                //alert(res.msg);
            }
        }
    });
}

