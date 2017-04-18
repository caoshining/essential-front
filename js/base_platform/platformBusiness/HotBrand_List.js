/**
 * Created by wangs on 2016/7/26.
 */

var HotBrandList=[];
var HotBrandIndex=[];
var HotBrandParamData = {};
var time;

$(function(){
    HotBrand_List({"pageNo":1});
    initHotBrand();
    var HotBrand='';

    $(document).on("click","#HotBrand_table tbody .IfChoose",function(e){    //是否选择热门品牌
        e.stopImmediatePropagation();

        var that = $(this);
        var params = {};
        HotBrandIndex=HotBrandList[$(this).parent().parent().attr("data-index")];

        var length=$(".HotBrand_List ul li").length;

        if (HotBrandIndex.action == 1) {
            if (confirm("确定取消么")) {
                params.brandId = HotBrandIndex.brandId;
                params.action = 2;
            } else {
                return false;
            }
        }
        else{
            if(length>=8){
                alert("只能选择8个热门品牌");
                return false;
            }
            else if(confirm("确定选择吗?")){
                params.brandId = HotBrandIndex.brandId;
                params.action = 1;
            }else{
                return false;
            }
        }

        $.ajax({            //改变热门品牌选择状态
            type:"POST",
            url:PLATFORM_URL_PRE+"/essential/bussinessBrand/updateHotBrand",
            data:params,
            success:function(res){
                if(res.code == 1){

                    if(params.action == 1){
                        HotBrandIndex.action = 1;

                        that.html("取消选择");
                        HotBrand="<li data-brandid='"+HotBrandIndex.brandId+"'>" +
                            "<img src="+HotBrandIndex.logoPath+">" +
                            "<span>"+HotBrandIndex.brandName+"</span>" +
                            "<span>取消选择</span></li>";
                        $(".HotBrand_List ul").append(HotBrand);

                    }
                    else if(params.action == 2){
                       HotBrandIndex.action = 2;
                        that.html("选择");

                        $(".HotBrand_List ul li").each(function(i,v){
                            if($(v).attr("data-brandid") == HotBrandIndex.brandId){
                                $(v).remove();
                            }
                        });
                    }
                }else{
                    alert(res.msg);
                }
            },
            error:function(res){
                alert("");
            }
        });
    }).on('mouseover','.HotBrand_List ul li',function (){   //添加热门品牌
        $(this).find("span").eq(1).css("display","block");

    }).on("mouseout",".HotBrand_List ul li",function(){
        $(this).find("span").eq(1).css("display","none");

    }).on("click","#WhetherIf li",function(){
        var $this = $(this);
        var brandId = $this.attr("data-brandid");
        if(confirm("确定取消吗?")){
            $.ajax({
                url: PLATFORM_URL_PRE+"/essential/bussinessBrand/updateHotBrand",
                data:{"brandId":brandId,"action":2},
                success:function(res){
                    if(res.code == 1){
                        $this.remove();
                        $("#HotBrand_table tbody tr").each(function(i,v){
                            if(HotBrandList[i].brandId == brandId){
                                $(v).find("span").last().html("选择");
                                HotBrandList[i].action=2;
                            }
                        })
                    }
                },
                error:function(res){
                    alert('网络连接失败，请稍后重试~');
                }
            });
        }
    }).on("click","#HotBrand_table tbody .checkHotBrand_details",function(){    //查看热门品牌详情

        HotBrandIndex=HotBrandList[$(this).parent().parent().attr("data-index")];
        var htmlTmp = $("#HotBrand_details_Tmple").render(HotBrandIndex);
        $("#HotBrand_details").html(htmlTmp);

    }).on("click",".HotBrand_search",function(){
        
        HotBrand_List({"pageNo":1,"brandName":$("#searchHotBrand").val()});
    })
});

//品牌列表
function HotBrand_List(data){

    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/bussinessBrand/queryTotalBrand",
        data:data,
        type:"POST",
        beforeSend:function(){
            $(".platform_BrandList .Img_Load").remove();
            $('.platform_BrandList').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if (res.code == 1){
                $(".platform_BrandList .Img_Load").remove();
                $("#BrandTab").html('');
                HotBrandList=res.info.brandVoList;
                $.each(HotBrandList,function(i,v){
                    res.info.brandVoList[i].modifyTime=timeFn(res.info.brandVoList[i].modifyTime);
                });

                var BrandHtml=$("#HotBrand_List_Tmp").render(res.info);
                $("#BrandTab").append(BrandHtml);

                pagePlus(res.info.totalPageCount,data,true);

            }else{
                alert(res.msg);
            }
        },
        error:function(){

        }
    });
}

//热门品牌
function initHotBrand(){
    $.ajax({
        "url": PLATFORM_URL_PRE+"/essential/bussinessBrand/queryTotalBrand",
        "data": {"action":1},
        beforeSend:function(){
            $(".WhetherIf .Img_Load").remove();
            $('.WhetherIf').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code ==1){
                if(res.info.brandVoList){
                    $(".WhetherIf .Img_Load").remove();
                    var HotBrandHtml = $("#HotBrand_Tmple").render(res.info);
                    $("#WhetherIf").append(HotBrandHtml);
                }
            }
            else{
                alert(res.msg);
            }
        },
        error:function(res){
            alert('网络连接失败，请稍后重试~');
        }
    });
}

//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/bussinessBrand/queryTotalBrand",
        data: data,
        type: "post",
        beforeSend:function(){
            $("#BrandTab").html('');
            $(".platform_BrandList .Img_Load").remove();
            $('.platform_BrandList').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            if (res.code == 1) {
                $(".platform_BrandList .Img_Load").remove();
                $("#BrandTab").html('');
                HotBrandList = res.info.brandVoList;
                $.each(res.info.brandVoList,function(i,v){
                    res.info.brandVoList[i].modifyTime=timeFn(res.info.brandVoList[i].modifyTime);
                });

                //渲染模板
                var html = $("#HotBrand_List_Tmp").render(res.info);
                $("#BrandTab").append(html);
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
                HotBrandParamData.pageNo = page;
                queryOrderListForPage(HotBrandParamData);
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

function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}