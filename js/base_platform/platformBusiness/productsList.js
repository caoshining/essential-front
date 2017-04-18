/**
 * Created by wangs on 2016/8/22.
 */

var shopLists=[];
function shopList(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/productPlatform/queryProductPlatform",
        type:"POST",
        data:data,
        beforeSend:function(){
            $(".productLists .Img_Load").remove();
            $('.productLists').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code==1){
                $(".productLists .Img_Load").remove();
                $("#shopList_Tab").html("");
                shopLists=res.info.productPlatformList;
                $.each(res.info.productPlatformList,function(i,v){
                    res.info.productPlatformList[i].createTime=timeFn(res.info.productPlatformList[i].createTime);
                });
                var shopHtml=$("#shopList_Tmp").render(res.info);
                $("#shopList_Tab").append(shopHtml);
                pagePlus(res.info.pageCount,data,true);

            }else{
                $("#shopList_Tab").html("列表无商品");
            }
        },
        error:function(){
            $("#shopList_Tab").html("查询商品列表失败！");
        }
    })
}
shopList({"pageIndex":1,"type":3,"pageSize":10});

//筛选
$(".shopFilter").click(function(){
    var params={
        "type":3,
        "pageIndex":1,
        "pageSize":10,
        "articleNumber":$("#articleNumber").val(),
        "brandId":$(".AllBrands").val(),
        "categoryId":$(".allCategory").val(),
        "productName":$("#productsName").val(),
        "shopName":$("#AllShops").val(),
        "linkFrom":$("#IfSelf").val(),
        "firstPrice":$("#firstPrice").val(),
        "secondPrice":$("#secondPrice").val()
    };
    shopList(params);
});

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/productPlatform/queryProductPlatform",
        type:"POST",
        data:data,
        beforeSend:function(){
            $("#shopList_Tab").html("");
            $(".productLists .Img_Load").remove();
            $('.productLists').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code==1){
                $(".productLists .Img_Load").remove();
                $("#shopList_Tab").html("");
                forceShelvesList=res.info.productPlatformList;
                shopLists=res.info.productPlatformList;
                $.each(res.info.productPlatformList,function(i,v){
                    res.info.productPlatformList[i].createTime=timeFn(res.info.productPlatformList[i].createTime);
                });

                var shopHtml=$("#shopList_Tmp").render(res.info);
                $("#shopList_Tab").append(shopHtml);
            }
        },
        error:function(){
            alert("服务太忙！");
        }
    })
}

//分页
function pagePlus(totalPageCount,data,flag){
    var count=10;
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: count,
        onSelect: function(page) {
            if(!flag){
                data.pageIndex = page;
                queryOrderListForPage(data);
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

//商品列表的所有分类
function allClassify(){
    $.ajax({
        url: PLATFORM_URL_PRE + "/essential/productCategory/query",
        type: "post",
        success: function (res) {
            if (res.code == 1) {

                //渲染模板
                var CategoryHtml = $("#shopCategory_Tmp").render(res);
                $(".allCategory").append(CategoryHtml);

            } else {
                //alert(res.msg);
            }
        },
        error:function(){
            alert("查询失败")
        }
    });
}

//商品列表中的所有品牌渲染
function allBrands(){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/bussinessBrand/queryTotalBrandNoPage",
        type:"POST",
        success:function(res){

            if(res.code == 1){
                var html = $("#shop_BrandsTmp").render(res.info);
                $(".AllBrands").append(html);
            }else{
                alert(res.msg);
            }
        },
        error:function(){
            alert("查询品牌失败")
        }
    });
}

//商品列表所有商家渲染
function allShops(){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/querySomeList/queryShopList",
        type:"POST",
        success:function(res){
            if(res.code == 1){
                if (res.info!=null){
                    var shopHtml = $("#shopName_Tmp").render(res);
                    $("#AllShops").append(shopHtml);
                }

            }else{
                alert(res.msg);
            }
        },
        error:function(){
            alert("无商家")
        }
    });
}
allClassify();
allBrands();
allShops();

//点击强制下架
var shopIndex={};
$(document).on("click",".forceShelvesBtn",function(e){
    var $this=$(this);
    shopIndex=shopLists[$(this).parent().parent().attr("data-index")];
    e.stopImmediatePropagation();
    if(confirm("确定强制下架吗?")){
        var forceShelvesHtml="<div class='forceShelves'></div>";
        var forceShelvesReason="<div class='ShelvesReason'>" +
            "<label>请输入下架原因:<textarea cols='15' rows='3' id='rejectReason'></textarea></label><br/>" +
            "<span class='forceEnsure'>确定</span><span class='forceCancel'>取消</span></div>";
        $(".index-tab-cont").append(forceShelvesHtml);
        $(".index-tab-cont").append(forceShelvesReason);

        //强制下架
        $(".forceEnsure").on("click",function(){
            if($("#rejectReason").val() ==""){
                alert("强制下架原因不能为空！");
            }else{
                $.ajax({
                    url:PLATFORM_URL_PRE+"/essential/productPlatform/forceOrRevokeProductPlatform",
                    data:{
                        productId:shopIndex.productId,
                        type:1,
                        logenUserId:PLATFORM_LOGIN_USER_ID,
                        rejectReasonContent:$("#rejectReason").val()
                    },
                    success:function(){
                        alert("下架成功！");
                        $(".forceShelves").remove();
                        $(".ShelvesReason").remove();
                        $this.parent().siblings(".productStatusName").text("强制下架");
                        $(".forceShelvesBtn").unbind("click");
                    }
                })
            }

        });

        $(".forceCancel").on("click",function(){
            $(".forceShelves").remove();
            $(".ShelvesReason").remove();
        })

    }

}).on("click",".setProprietary",function(e){        //是否设为自营
    var $this=$(this);
    e.stopImmediatePropagation();
    shopIndex=shopLists[$(this).parent().parent().attr("data-index")];

    var data={};
    if(shopIndex.selfName == "否"){
        if(confirm("确定设为自营?")){
            data.productId=shopIndex.productId;
            data.type=1;
        }else {
            return false;
        }
    }
    else if(shopIndex.selfName == "是"){
        if(confirm("确定取消自营?")){
            data.productId=shopIndex.productId;
            data.type=0;

        }else{
            return false;
        }
    }

    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/productPlatform/selfProductPlatform",
        data:data,
        success:function(res){
            if (res.code == 1){
                if(data.type == 0){
                    data.type=0;
                    shopIndex.selfName="否";
                    $this.html("设为自营");
                    $this.parent().prev().html("否")
                }
                else if(data.type == 1){
                    data.type=1;
                    shopIndex.selfName="是";
                    $this.html("取消自营");
                    $this.parent().prev().html("是")
                }
            }else{
                alert(res.msg);
            }
        },
        error:function(){
            alert("设置失败");
        }
    });


}).on("click",".checkGodsDetails",function(e){
    e.stopImmediatePropagation();
    shopIndex=shopLists[$(this).parent().parent().attr("data-index")];
    $("#platform_GoodsList").load("pages/base_platform/business/platform_product/productsList_Details.html");

});


function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}