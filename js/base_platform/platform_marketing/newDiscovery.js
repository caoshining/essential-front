/**
 * Created by wangs on 2016/8/4.
 */


/*得到富文本的内容*/
function  getContent() {
    var arr = [];
    arr.push(UE.getEditor('editor1').getContent());
    return arr;
}

//专栏渲染
columnShow();
function columnShow(){
    //var ue1 = UE.getEditor('editor');
    //ue1.addListener("ready", function (){
        $.ajax({
            type: "POST",
            url:PLATFORM_URL_PRE+"/essential/articleGroup/queryGroupList",
            dataType: "text",
            timeout: 20000,
            cache: false,
            success: function (data) {
                var json = eval("(" + data+ ")");
                if(json.code==1)
                {
					$("#column").html("");
                    for(var i=0;i<json.info.length;i++)
                    {
                        $("#column").append("<option value="+json.info[i].articleGroupId+">" +
                            ""+json.info[i].groupName+"</option>")
                    }
                }
            }
        });
    //});

}

/*新建发现*/
function addDiscovery() {
    //商品id数组
    var urlStr=PLATFORM_URL_PRE+"/essential/article/addArticle";
    /*标题*/
    var title=$("#title").val();
    /*专栏*/
    var special=$("#column").find("option:selected").val();
    /*专蓝logo*/
    var specialLogo=article_logo;
    /*作者*/
    var author=$("#author").val();
    /*  主图*/
    var mainPic=article_picPath;
    /*  文章摘要*/
    var articelSummary=$("#articelSummary").val();
    /*富文本*/
    var rich=getContent();

    /*是否为外联*/
    var dataJson=new Object();
    dataJson.articleName=title;             //标题
    dataJson.articleGroupId=special;        //专栏
    dataJson.thumbnailPath=specialLogo;     //专栏logo
    dataJson.author=author;                 //作者
    dataJson.mainPath=mainPic;               //添加主图
    dataJson.articleAbstract=articelSummary;        //文章摘要

    dataJson.attr1=$(".NewarticlekeyWords").val(); //文章关键字
    dataJson.articleContent=rich.toString();        //富文本内容
    dataJson.createUserId=PLATFORM_LOGIN_USER_ID;
    dataJson.authorIcon=specialLogo;

    var dataPara= $.param(dataJson);

    //遍历数组
    var articleProductAutoListStr="";
    $("#DiscoveryShop tbody tr[data-productid]").each(function(i,v){
        articleProductAutoListStr = articleProductAutoListStr.concat("&articleProductAutoList","["+i+"].productId="+$(v).data("productid"));
        articleProductAutoListStr = articleProductAutoListStr.concat("&articleProductAutoList","["+i+"].isLinkProduct="+$(v).data("islinkproduct"));
    });

    dataPara+=articleProductAutoListStr;
    $.ajax({
        type:'post',
        url:urlStr,
        dataType:'json',
        data:dataPara,
        success: function (data) {
            if(data.code==1){
                alert("提交成功！");
                $("#Market_Promotion .tab-pane").removeClass('active');
                $("#columnList").addClass('active');
                $("#columnList").load("pages/base_platform/business/platform_marketing/columnLists.html");
            }else{
                alert(data.msg);
            }
        },
        error:function(){
            alert("网络错误，请重试");
        }
    });

}

//保存外联商品
var dataJson={};
function saveExternalProduct() {
    var url= PLATFORM_URL_PRE+"/essential/linkProduct/saveLinkProduct";

    //来源平台
    dataJson.linkFrom=$("#linkPlatform").val();

    //商品名称
    dataJson.productName=$("#productName").val();

    //品牌名称
    dataJson.brandName=$("#brandName").val();

    //图片路径
    dataJson.path=shop_picPath;

    //市场价
    dataJson.marketPrice=$("#marketPrice").val();

    //链接地址
    dataJson.linkUrl=$("#linkUrl").val();

    $.ajax({
        type:"post",
        url:url,
        dataType:"json",
        data:dataJson,
        success: function (res) {
            if(res.code == 1){
                alert("添加外联商品成功");
                var outHtml="<table>" +
                    "<thead><th>外部商品信息</th>" +
                    "<th>价格</th>" +
                    "<th>商品品牌</th>" +
                    "<th>渠道</th>" +
                    "<th>链接地址</th>" +
                    "<th>操作</th></thead><tbody>" +
                    "<tr data-productid='"+res.info.productId+"' data-islinkproduct='1'>" +
                    "<td class='EsProductInfo'><img src=' "+dataJson.path+"' style='width: 80px;height: 80px;'/>" +
                    "<span>"+dataJson.productName+"</span></td>" +
                    "<td>"+dataJson.marketPrice+"</td>" +
                    "<td>"+dataJson.brandName+"</td>" +
                    "<td>"+dataJson.linkFrom+"</td>" +
                    "<td class='outLinkUrl'><a href='javascript:void(0);'>"+dataJson.linkUrl+"</a></td>" +
                    "<td><a href='javascript:;' class='delProduct'>删除</a></td></tr>" +
                    "</tbody></table>";

                $("#DiscoveryShop").append(outHtml);
                $(".linkShop").show();
                $("#outProducts").hide();

                $(".Essential").hide();
                $(".saveArticle").show();
                $(".NextTab").hide();
                $("#DiscoveryShop").show();

                isUploads=false;
            }else{
                alert(res.msg);
            }

        },
        error: function (res) {
            alert("网络异常，添加外联商品失败");

        }
    });
}

//得到商品列表
var product=[];
var shopIndex=[];
function getProductList(data) {
    var url= PLATFORM_URL_PRE+"/essential/productPlatform/queryProductPlatform";

    $.ajax({
        type:'post',
        url:url,
        dataType:'json',
        data:data,
        success:function(res) {
            if(res.code==1) {
                $("#Essential_Lists").html("");

                product=res.info.productPlatformList;
                $.each(product,function(i,v){
                    product[i].createTime=timeFn(product[i].createTime);
                });

                var html=$("#EssentialTmp").render(res.info);
                $("#Essential_Lists").append(html);

                pagePlus(res.info.pageCount,data,true);
            }
        },
        error:function(data){
            alert(data.msg);
        }
    });


}

//筛选
$(".FilterProduct").on("click",function(){

    var params={
        "type":0,
        "pageIndex":1,
        "pageSize":10,
        "brandId":$("#sAllBrand").val(),
        "categoryId":$("#allCategory").val(),
        "productName":$("#sProductName").val(),
        "articleNumber":$("#nCommodityCode").val(),
        "linkFrom":$("#selfName").val()
    };

    getProductList(params);
});

//得到发现富文本内容
function getDiscoveryInformation(articleId)
{
    var dataJson=new Object();
    dataJson.articleId=articleId;
    dataParameter= $.param(dataJson);

    var url=PLATFORM_URL_PRE+"/essential/article/queryArticleContent";
    var dataParameter;
    $.ajax({
        type:'post',
        url:url,
        dataType:'json',
        data:dataParameter,
        success:function(data) {
            alert("成功");
            var json = eval(data);
            if(json.code==1) {
                $("#richContent").append(json.info);

            }
        }
    });
}

//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }

    return null;

}


var tabBNum = 0;
$('.tabUl li').removeClass('selected');

$('.tabUl li').eq(tabBNum).addClass('selected');
if(tabBNum==0){
    $("#prevSpan").css("display","none");
}

//点击下一步
$("#Next1").click(function () {
    tabBNum ++;
    
    if(tabBNum==2){
        $(".Essential").hide();
        $(".saveArticle").show();
        $(".NextTab").hide();
        $('.tabUl li').removeClass('selected');
        $('.tabUl li').eq(tabBNum).addClass('selected');
        $('.discoveryDiv').hide();
        $('.discoveryDiv').eq(tabBNum).show();
    }else if(tabBNum<2){

        $("#prevSpan").css("display","inline-block");
        $('.tabUl li').removeClass('selected');

        $('.tabUl li').eq(tabBNum).addClass('selected');
        $('.discoveryDiv').hide();
        $('.discoveryDiv').eq(tabBNum).show();
    }else{
        tabBNum=0;

    }
});

//点击上一步
$("#prevSpan").click(function(){
    tabBNum --;
    if(tabBNum>=0){

        $('.tabUl li').removeClass('selected');

        $('.tabUl li').eq(tabBNum).addClass('selected');
        $('.discoveryDiv').hide();
        $('.discoveryDiv').eq(tabBNum).show();
    }else if(tabBNum==1){
        $("#prevSpan").css("display","none");
    }else{
        tabBNum=0;
    }

});


//上传基本信息logo图
var article_logo="";
function column_logo(){
    $('#columnLogo').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {
            $("#columnLogo").siblings("img").attr({"src":data.info[0]});
            $("#columnLogo").siblings("img").css("display","block");
            $("#columnLogo").siblings("p").css("display","none");

            $(".parentFileBox").remove();
            article_logo = data.info[0];
        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '上传图片',
        chunked:true,
        fileNumLimit:1,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileSizeLimit:500000 * 1024,
        fileSingleSizeLimit:1024* 1024,
        accept:{
            title:"Images",
            extensions:"jpg,jpeg,bmp,png",
            mimeTypes:"image/jpg,image/jpeg,image/bmp,image/png"
        }
    });
}
column_logo();

//上传基本信息主图
var article_picPath="";
function Master_pic(){
    $('#AddMasterPic').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {
            $("#AddMasterPic").siblings("img").attr({"src":data.info[0]});
            $("#AddMasterPic").siblings("img").css("display","block");
            $("#AddMasterPic").siblings("p").css("display","none");

            $(".parentFileBox").remove();
            article_picPath = data.info[0];
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
            extensions:"jpg,jpeg,bmp,png",
            mimeTypes:"image/jpg,image/jpeg,image/bmp,image/png"
        }
    });
}
Master_pic();

//上传外部商品的主图
var shop_picPath="";
var isUploads=false;
function outProduct_bg(){
    $('#product_MasterPic').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {

            $("#product_MasterPic").siblings("img").attr({"src":data.info[0]});
            $("#product_MasterPic").siblings("img").css("display","block");
            $("#product_MasterPic").siblings("p").css("display","none");

            $(".parentFileBox").remove();
            shop_picPath = data.info[0];
            isUploads=true;
        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '上传图片',
        chunked:true,
        // 分片大小
        chunkSize:1024*1024,
        fileNumLimit:1,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileSizeLimit:1024 * 1024,
        fileSingleSizeLimit:1024* 1024,
        accept:{
            title:"Images",
            extensions:"jpg,jpeg,bmp,png",
            mimeTypes:"image/jpg,image/jpeg,image/bmp,image/png"
        }
    });
}


//添加奕赏商品
$("#addEssential_shop").on("click",function(){

    $(".linkShop").hide();
    $("#DiscoveryShop").hide();
    $("#relationProductList").show(function(){
        $(".nextNew span").hide();

        $(".Essential").show();
        getProductList({"pageIndex":1,"type":0,"pageSize":10});

        //点击取消返回
        $(".returnPrev").on("click",function(e){
            e.stopImmediatePropagation()
            $(".linkShop").show();
            $("#relationProductList").hide();

            $(".Essential").css("display","none");
            $(".saveArticle").css("display","inline-block");
            $(".NextTab").css("display","none");
            $("#DiscoveryShop").css("display","block");
        });
        //点击确定返回
        //$(".add_shop").on("click",function(e){
        //    e.stopImmediatePropagation();
        //    $(".linkShop").show();
        //    $("#EditRelationProductList").hide();
        //
        //    $(".EditEssential").css("display","none");
        //    $(".EditSaveArticle").css("display","inline-block");
        //    $(".EditNextTab").css("display","none");
        //    $("#DiscoveryShop").css("display","block");
        //});

        //添加奕赏商品
        $(document).on("click","#Essential_Lists .addEssentialGods",function(e){
            e.stopImmediatePropagation();
            if(confirm("确定添加?")) {
                shopIndex = product[$(this).parent().parent().attr("data-index")];

                var EssentialHtml = "<table>" +
                    "<thead><tr><th style='display: none;'>商品id</th>" +
                    "<th>奕赏商品信息</th>" +
                    "<th>商品品牌</th>" +
                    "<th>分类</th>" +
                    "<th>商家</th>" +
                    "<th>库存</th>" +
                    "<th>销量</th>" +
                    "<th>创建时间</th>" +
                    "<th>商品状态</th>" +
                    "<th>是否自营</th>" +
                    "<th>操作</th></tr></thead>" +
                    "<tbody><tr data-productid='"+shopIndex.productId+"' data-islinkproduct='0'>" +
                    "<td style='display: none;'>"+shopIndex.shopId+"</td>" +
                    "<td class='EsProductInfo'><img src=" + shopIndex.path + ">" +
                    "<span>"+shopIndex.productName+"</span>" +
                    "<span>￥"+shopIndex.price+"</span></td>" +
                    "<td>" + shopIndex.brandName + "</td>" +
                    "<td>" + shopIndex.categoryName + "</td>" +
                    "<td>" + shopIndex.shopName + "</td>" +
                    "<td>" + shopIndex.stock + "</td>" +
                    "<td>" + shopIndex.saleNum + "</td>" +
                    "<td style='width:120px;'>" + shopIndex.createTime + "</td>" +
                    "<td>" + shopIndex.productStatusName + "</td>" +
                    "<td>" + shopIndex.selfName + "</td>" +
                    "<td><a href='javascript:;'>查看</a><br>" +
                    "<a  href='javascript:;' class='delProduct'>删除</a></td>" +
                    "</tr></tbody></table>";

                $("#DiscoveryShop").append(EssentialHtml);
                alert("添加成功");
                $(this).text("已添加");
                $(this).removeClass("addEssentialGods");
                $(this).css("color","#666");

            }
        });
    });

});

//添加外链商品
$("#addOutChains").on("click",function(e){
    e.stopImmediatePropagation();
    $("#linkPlatform").val("");
    $("#productName").val("");
    $("#brandName").val("");
    $("#marketPrice").val("");
    $("#linkUrl").val("");
    $("#outProductPic").attr("src","");
    outProduct_bg();


    $("#outProducts").siblings().hide();

    $("#outProducts").show(function(){

        $(".nextNew span").hide();
        $(".Essential").show();

        $(document).on("click",".returnPrev",function(){         //点击返回相关商品

            $(".linkShop").show();
            $("#outProducts").hide();

            $(".Essential").hide();
            $(".saveArticle").show();
            $(".NextTab").hide();
            $("#DiscoveryShop").show();

        });

        $(".add_shop").on("click",function(e){       //点击确定添加外链商品
            e.stopImmediatePropagation();
            var regNumber=/^[\d]+$/g;
            var reg =new RegExp("[a-zA-z]+://[^s]*");
            if($("#productName").val() ==''){
                alert("商品名称不能为空");
                return false;
            }
            if($("#marketPrice").val() ==""){
                alert("商品价格不能为空");
                return false;
            }else if(!regNumber.test($("#marketPrice").val())){
                alert("请输入正确的商品价格");
                return false;
            }
            if($("#brandName").val() == ""){
                alert("商品品牌不能为空");
                return false;
            }
            if(!isUploads){
                alert("商品主图不能为空");
                return false;
            }
            if($("#linkPlatform").val()==""){
                alert("渠道不能为空");
                return false;
            }
            if($("#linkUrl").val() ==""){
                alert("链接地址不能为空");
                return false;
            }
            if(!reg.test($("#linkUrl").val())){
                alert("请输入正确的链接地址");
                return false;
            }
            else{
                if (confirm("确定添加吗?")){
                    saveExternalProduct();
                }
            }
        })

    })

});


$(document).on("click",".delProduct",function(e){
    e.stopImmediatePropagation();
    if (confirm("确定删除?")){
        $(this).parent().parent().parent().parent().remove();
    }
});


//时间转换
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}

//点击发布文章商品
$("#release").on("click",function(){
    if(confirm("确定发布?")){
        addDiscovery();
    }

});

//分页调数据
function queryBrandListForPage(data){
    var url= PLATFORM_URL_PRE+"/essential/productPlatform/queryProductPlatform";

    $.ajax({
        type:'post',
        url:url,
        dataType:'json',
        data:data,
        success:function(res) {
            if(res.code==1) {
                $("#Essential_Lists").html("");
                product=res.info.productPlatformList;
                $.each(product,function(i,v){
                    product[i].createTime=timeFn(product[i].createTime);
                });

                var html=$("#EssentialTmp").render(res.info);
                $("#Essential_Lists").append(html);

            }
        },
        error:function(data){
            alert(data.msg);
        }
    });
}

//分页
function pagePlus(PageCount,data,flag){
    var m=10;
    $(".pagination").paging(PageCount, {
        format: '[< ncnnn >]',
        perpage: m,
        onSelect: function(page) {
            if(!flag){
                data.pageIndex = page;
                data.pageSize=m;
                queryBrandListForPage(data);
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
allClassify();
function allClassify(){
    $.ajax({
        url: PLATFORM_URL_PRE + "/essential/productCategory/query",
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                $("#allCategory").html("");
                //渲染模板
                var CategoryHtml = $("#EsCategoryTmp").render(res);
                $("#allCategory").append(CategoryHtml);

            } else {
                //alert(res.msg);
            }
        }
    });
}

//商品列表中的所有品牌渲染
allBrands();
function allBrands(){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/bussinessBrand/queryTotalBrandNoPage",
        type:"POST",
        success:function(res){

            if(res.code == 1){
                $("#sAllBrand").html();
                var html = $("#EsBrandsTmp").render(res.info);
                $("#sAllBrand").append(html);
            }else{
                alert(res.msg)
            }
        },
        error:function(){
            alert("查询店铺品牌失败")
        }
    });
}

//商品列表中所有商家渲染
AllShops();
function AllShops(){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/querySomeList/queryShopList",
        type:"POST",
        success:function(res){
            if(res.code == 1){
                $("#AllShopName").html("");
                var shopHtml = $("#EsShopTmp").render(res);
                $("#AllShopName").append(shopHtml);
            }else{
                alert(res.msg);
            }
        },
        error:function(){
            alert("无商家")
        }
    });
}

//商品关键字输入
$("#newDiscovery").on("keyup",".NewarticlekeyWords",function(){
    var getValueLength=this.value;
    $("#Make_keywords_Lastcount").text(100-getValueLength.length);
    this.value=this.value.replace("，",",");
});