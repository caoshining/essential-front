/**
 * Created by wangs on 2016/7/30.
 */

var BrandIndex=[];
var BrandList=[];
var paramDatas= {};
MyBrand({"shopId":BUSINESS_LOGIN_SHOP_ID,"pageIndex":1});

var $MyBrand = $("#MyBrands");
$MyBrand.on("click",".confirmBrand",function(){   //筛选品牌
    var queryBrandParam={
        "shopId":BUSINESS_LOGIN_SHOP_ID,
        "pageIndex":1,
        "brandName":$(".MyBrand_Name").val(),
        "checked":$(".BrandChecked").val()
    };

    MyBrand(queryBrandParam);
}).on("click",".check_MyBrand",function(){      //查看品牌信息

    BrandIndex = BrandList[$(this).parent().parent().attr("data-index")];
    $("#MyBorand").load("pages/busi_platform/business/product/MyBrand_details.html");
});


function MyBrand(data){

    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/bussinessBrand/shop",
        data:data,
        type: "post",
        success: function (res) {

            if (res.code == 1) {
                $("#MyBrand_tabs").html("");
                BrandList=res.info.brandList;

                $.each(BrandList, function(i,v){
                    res.info.brandList[i].modify_time=timeFn(res.info.brandList[i].modify_time);

                });
                //渲染模板
                var html = $("#MyBrand_Tmpl").render(res.info);
                $("#MyBrand_tabs").append(html);
                pagePlus(res.info.pageCount,data,true);

            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            //console.log("查询订单失败");
        }
    });
}

//分页
function pagePlus(totalPageCount,data,flag){
    $("#MyBorand .pagination").paging(totalPageCount*10, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            paramDatas = data;
            //console.log(paramDatas.pageIndex);
            if(!flag){
                //console.log(paramData);
                paramDatas.pageIndex = page;
                queryOrderListForPage(paramDatas);
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

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/bussinessBrand/shop",
        data: data,
        type: "post",
        success: function (res) {

            if (res.code == 1) {
                $("#MyBrand_tabs").html('');
                BrandList=res.info.brandList;
                $.each(BrandList, function(i,v){

                    res.info.brandList[i].modify_time=timeFn(res.info.brandList[i].modify_time);

                });
                //渲染模板
                var html = $("#MyBrand_Tmpl").render(res.info);
                $("#MyBrand_tabs").append(html);
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("查询订单失败");
        }
    });
}

function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}