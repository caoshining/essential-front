/**
 * Created by wangs on 2016/8/25.
 */

var forceShelvesList=[];
function forceShelves_List(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/productPlatform/queryProductPlatform",
        type:"POST",
        data:data,
        beforeSend:function(){
            $(".forceShelves_Lists .Img_Load").remove();
            $('.forceShelves_Lists').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            //console.log(res);
            if(res.code==1){
                $(".forceShelves_Lists .Img_Load").remove();
                $("#forceShelves_Tab").html("");
                forceShelvesList=res.info.productPlatformList;

                $.each(res.info.productPlatformList,function(i,v){
                    res.info.productPlatformList[i].createTime=timeFn(res.info.productPlatformList[i].createTime);
                });
                var forceShelvesHtml=$("#forceShelves_Tmp").render(res.info);
                $("#forceShelves_Tab").append(forceShelvesHtml);
                pagePlus(res.info.pageCount,data,true);
            }
        },
        error:function(){
            alert("服务太忙！");
        }
    })
}
forceShelves_List({"pageIndex":1,"type":1});

//筛选
$(".forceShelves_Filter").click(function(){
    var params={
        "type":1,
        "pageIndex":1,
        "articleNumber":$("#articleNumber").val(),
        "brandId":$(".AllBrands").val(),
        "categoryId":$(".AllCategory").val(),
        "productName":$("#productName").val()
    };
    forceShelves_List(params);
});

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/productPlatform/queryProductPlatform",
        type:"POST",
        data:data,
        success:function(res){
            //console.log(res);
            if(res.code==1){
                $("#forceShelves_Tab").html("");
                forceShelvesList=res.info.productPlatformList;
                $.each(res.info.productPlatformList,function(i,v){
                    res.info.productPlatformList[i].createTime=timeFn(res.info.productPlatformList[i].createTime);
                });
                var forceShelvesHtml=$("#forceShelves_Tmp").render(res.info);
                $("#forceShelves_Tab").append(forceShelvesHtml);
                //pagePlus(res.info.pageCount,data,true);
            }
        },
        error:function(){
            alert("服务太忙！");
        }
    })
}

//分页

function pagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            if(!flag){
                var shopListData={};
                shopListData.pageIndex = page;
                shopListData.type=1;
                queryOrderListForPage(shopListData);
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

allClassify();
allBrands();

var forceShelvesIndex={};
$(document).on("click",".revocation",function(e){
    var $this=$(this);
    forceShelvesIndex=forceShelvesList[$(this).parent().parent().attr("data-index")];
    e.stopImmediatePropagation();
    if(confirm("确定撤销吗?")){
        $.ajax({
            url:PLATFORM_URL_PRE+"/essential/productPlatform/forceOrRevokeProductPlatform",
            data:{
                productId:forceShelvesIndex.productId,
                type:0
            },
            success:function(){
                alert("撤销成功！");
                $this.parent().parent().remove();
            }
        })
    }
});