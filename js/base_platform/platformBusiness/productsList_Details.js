/**
 * Created by wangs on 2016/8/29.
 */

$(document).on("click",".GodsContain ul li",function(){         //tab切换
    $(this).addClass("active").siblings().removeClass("active");

    var $index=$(this).index();
    $(".GodsContain div").eq($index).show().siblings(".GodsDescribe").hide();
    return false;
}).on("click",".returnPrevList",function(){         //点击返回商品列表
    $("#platform_GoodsList").load("pages/base_platform/business/platform_product/productsList.html");
    return false;
});

$(function(){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/productPlatform/queryProductDetaileInfo",
        data:{productId:shopIndex.productId},
        success:function(res){
            if (res.code==1){
                $("#productDetails_layout").html("");
                res.info.SkuSize = res.info.productSkuList[0].productSkuRelationList;
                var html=$("#GodsMessage_Tmp").render(res.info);
                $("#productDetails_layout").append(html);

                if(res.info.SkuSize.length > 1){
                    $.each(res.info.SkuSize,function (i,v){
                        if(res.info.SkuSize.length == 3){
                            if(i == 0) {
                                var $tdList0 = $("#platformProductInfoTbody tr td:nth-child("+(i+1)+")");
                                var length0 = 0;
                                var tdListLength0 = $("#platformProductInfoTbody tr td:nth-child("+(i+1)+")").length;

                                buildTd(i, length0, tdListLength0, $tdList0);
                            }else if(i == 1){
                                var $tdList1 = $("#platformProductInfoTbody tr td:nth-child(2)");
                                var length1 = 0;
                                var tdListLength1 = $("#platformProductInfoTbody tr td:nth-child(2)").length;

                                buildTd1(length1, tdListLength1, $tdList1);
                            }
                        }else{
                            if(i == 0) {
                                var $tdList0 = $("#platformProductInfoTbody tr td:nth-child(1)");
                                var length0 = 0;
                                var tdListLength0 = $("#platformProductInfoTbody tr td:nth-child(1)").length;

                                buildTd(i, length0, tdListLength0, $tdList0);
                            }
                        }

                    });
                }
            }
            else{
                alert(res.msg);
            }

        },
        error:function(){
            alert("网络请求超时");
        }
    });
function buildTd(i,length,tdListLength,$tdList){
    console.log("i======================="+i);
    var tdId = $tdList.eq(length).data("id");
    var tdLength = $("#platformProductInfoTbody tr td:nth-child("+(i+1)+")[data-id="+tdId+"]").length;
    length += tdLength;
    $("#platformProductInfoTbody tr td:nth-child("+(i+1)+")[data-id="+tdId+"]:not(:first)")
        .remove();
    $("#platformProductInfoTbody tr td:nth-child("+(i+1)+")[data-id="+tdId+"]:first")
        .attr("rowspan",tdLength);
    if(length < tdListLength){
        buildTd(i,length,tdListLength,$tdList);
    }
}

    function buildTd1(length1,tdListLength1,$tdList1){
        var tdId1 = $tdList1.eq(length1).data("id");
        var tdLength1 = $("#platformProductInfoTbody tr td:nth-child(2)[data-id="+tdId1+"]").length;
        length1 += tdLength1;
        $("#platformProductInfoTbody tr td:nth-child(2)[data-id="+tdId1+"]:not(:first)")
            .remove();
        $("#platformProductInfoTbody tr td:nth-child(2)[data-id="+tdId1+"]:first")
            .attr("rowspan",tdLength1);
        if(length1 < tdListLength1){
            buildTd1(length1,tdListLength1,$tdList1);
        }
    }
});
