/**
 * Created by wangs on 2016/8/1.
 */

$(document).on("click",".NewBrand",function(e){
    e.stopImmediatePropagation();
    $("#Brand_Apply").load("pages/busi_platform/business/product/NewBrand_apply.html");
});
$(".applyAudit").find("span").click(function(){
    $.ajax({
        url:BUSINESS_URL_PRE+"/essential/bussinessBrand/brandApply",
        type: "post",
        data:{/*"shopId":BUSINESS_LOGIN_SHOP_ID,"userId":BUSINESS_LOGIN_USER_ID,*/
            "brandId":$("#selectBrand").val()},
        success:function(res){
           if(res.code==1){
               alert("申请审核已提交");
               $("a[href='#MyBorand']").click();
               //$(".applyAudit").find("span").unbind("click");
           }
        }
    })
});