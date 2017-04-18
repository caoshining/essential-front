/**
 * Created by wangs on 2016/8/1.
 */
$("#MyBrand_detailsInfo").html("");
if(BrandIndex!= ""){
    var html = $("#MyBrand_detailsTmpl").render(BrandIndex);
    $("#MyBrand_detailsInfo").append(html);

}
$(".returnBrand").on("click",function(){
    $("#MyBorand").load("pages/busi_platform/business/product/MyBrand.html");
});