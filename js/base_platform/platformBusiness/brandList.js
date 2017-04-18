/**
 * Created by wangs on 2016/7/21.
 */

//加载品牌列表
var time;
var BrandParamData = {};
var BrandLists=[];
var BrandIndex=[];


//品牌列表
$(function(){

    BrandList({"pageNo":1});
$(document).on("click",".checkBrand_details",function(){          //品牌详情
    BrandIndex = BrandLists[$(this).parent().parent().attr("data-index")];

    $("#Brand_Lists").load("pages/base_platform/business/platform_product/Brand_Details.html");
}).on("click",".editBrand_details",function(){              //编辑品牌

    BrandIndex = BrandLists[$(this).parent().parent().attr("data-index")];
    $("#Brand_Lists").load("pages/base_platform/business/platform_product/Brand_edit.html");
}).on("click",".brand_search",function(){              //查询品牌

    BrandList({"brandName":$("#searchBrand").val()});
});

});

function BrandList(data){
    $.ajax({
        "type":'post',
        "data":data,
        "url": PLATFORM_URL_PRE+"/essential/bussinessBrand/queryTotalBrand",
        beforeSend:function(){
            $(".platform_BrandList .Img_Load").remove();
            $('.platform_BrandList').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code == 1){
                $(".platform_BrandList .Img_Load").remove();
                $("#BrandBody").html('');
                BrandLists = res.info.brandVoList;

                $.each(res.info.brandVoList,function(i,v){
                    res.info.brandVoList[i].modifyTime=timeFn(res.info.brandVoList[i].modifyTime);
                });

                var html = $("#Brand_ListTmpl").render(res.info);
                $("#BrandBody").append(html);

                pagePlus(res.info.totalPageCount,data,true);
            }else{
                alert(res.msg);
            }
        },
        error:function(res){
            alert("网络错误，请稍后重试！");
        }
    })
}

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/bussinessBrand/queryTotalBrand",
        data: data,
        type: "post",
        beforeSend:function(){
            $("#BrandBody").html('');
            $(".platform_BrandList .Img_Load").remove();
            $('.platform_BrandList').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            if (res.code == 1) {
                $(".platform_BrandList .Img_Load").remove();
                $("#BrandBody").html('');
                BrandLists = res.info.brandVoList;
                //orderList = res.info.orderProductVos;
                $.each(res.info.brandVoList,function(i,v){
                    res.info.brandVoList[i].modifyTime=timeFn(res.info.brandVoList[i].modifyTime);
                });

                //渲染模板
                var html = $("#Brand_ListTmpl").render(res.info);
                $("#BrandBody").append(html);
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("服务器错误");
        }
    });
}

//分页
function pagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            if(!flag){
                BrandParamData.pageNo = page;
                queryOrderListForPage(BrandParamData);
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

//时间转换
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}