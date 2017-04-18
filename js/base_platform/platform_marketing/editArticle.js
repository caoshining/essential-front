/**
 * Created by wangs on 2016/8/11.
 */

$(document).ready(function () {
    UE.delEditor("editor2");

    var ue1 = UE.getEditor('editor2');

    //渲染数据
    ue1.addListener("ready", function () {

        $.ajax({
            url: PLATFORM_URL_PRE + "/essential/article/queryArticleDetailAndRelationInfoById",
            type: "POST",
            data: {"articleId": articleId},
            success: function (res) {
                if (res.code == 1) {
                    $(".content1").html("");
                    ue1.setContent(res.info.articleContent);

                    var articleHtml = $("#baseMessage_Tmp").render(res.info);
                    $(".content1").append(articleHtml);

                    initColumnSelect({"articleGroupId": res.info.articleGroupId});
                    initAboutGoods(res.info.productInfoOrLinkProductInfoVos);

                    Edit_columnLogo();
                    EditMaster_pic();
                }
            }

        })
    })
});

//初始化分栏
function initColumnSelect(params){
    $.ajax({
        type: "POST",
        url:PLATFORM_URL_PRE+"/essential/articleGroup/queryGroupList",
        success: function (data) {
            if(data.code==1)
            {
                $.each(data.info,function(i,v){
                    if(params.articleGroupId==v.articleGroupId){
                        $("#EditColumn").append("<option value='"+v.articleGroupId+"' selected>"
                            +v.groupName+"</option>");
                    }else{
                        $("#EditColumn").append("<option value='"+v.articleGroupId+"'>"
                            +v.groupName+"</option>");
                    }
                });
            }else{
                alert(data.msg)
            }
        }
    });
}

//初始化相关商品
function initAboutGoods(goodsList){
    $("#DiscoveryShop").html("");
    $("#DiscoveryShop").show();
    $.each(goodsList,function(i,v){
        console.log(v)
        if(v.isLinkProduct == 0){//奕赏商品
            goodsList[i].createTime=timeFn(goodsList[i].createTime);
            var esGoodsHtml = $("#esGoodsTmp").render(v);
            $("#DiscoveryShop").append(esGoodsHtml);
        }else{//外链
            var outGoodsHtml = $("#outGoodsTmp").render(v);
            $("#DiscoveryShop").append(outGoodsHtml);
            //console.log(v.productId);
        }
    });
}


/*得到富文本的内容*/
function  getContent() {
    var arr = [];
    arr.push(UE.getEditor('editor2').getContent());
    return arr;
}

/*新建发现*/
function editDiscovery() {
    //商品id数组
    var urlStr=PLATFORM_URL_PRE+"/essential/article/updateArticle";
    /*专栏*/
    var special=$("#EditColumn").find("option:selected").val();

    /*是否为外联*/
    var dataJson=new Object();
    dataJson.articleId=articleId;
    dataJson.articleName=$(".EditTitle").val();     //标题
    dataJson.articleGroupId=special;                //专栏
    dataJson.thumbnailPath=$(".columnLogo").attr("src");        //专栏logo
    dataJson.author=$(".author").val();             //作者
    dataJson.mainPath=$(".mainPic").attr("src");                      //添加主图
    dataJson.articleAbstract=$(".articleSummary").val();        //文章摘要

    dataJson.attr1=$(".articlekeyWords").val();//文章关键字
    dataJson.articleContent=getContent().toString();            //富文本内容
    dataJson.createUserId=PLATFORM_LOGIN_USER_ID;
    dataJson.authorIcon=$(".columnLogo").attr("src");

    var dataPara= $.param(dataJson);

    //遍历数组
    var articleProductAutoListStr="";
    $("#DiscoveryShop tbody tr").each(function(i,v){
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
var EditDataJson={};
function saveExternalProduct() {
    var url= PLATFORM_URL_PRE+"/essential/linkProduct/saveLinkProduct";
    //来源平台
    EditDataJson.linkFrom=$(".linkPlatform").val();

    //商品名称
    EditDataJson.productName=$(".productName").val();

    //品牌名称
    EditDataJson.brandName=$(".brandName").val();

    //图片路径
    EditDataJson.path=EditShop_picPath;

    //市场价
    EditDataJson.marketPrice=$(".marketPrice").val();

    //链接地址
    EditDataJson.linkUrl=$(".linkUrl").val();

    $.ajax({
        type:"post",
        url:url,
        dataType:"json",
        data:EditDataJson,
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
                    "<td class='EsProductInfo'><img src='"+EditDataJson.path+"' style='width: 80px;height: 80px;'>" +
                    "<span>"+EditDataJson.productName+"</span></td>" +
                    "<td>"+EditDataJson.marketPrice+"</td>" +
                    "<td>"+EditDataJson.brandName+"</td>" +
                    "<td>"+EditDataJson.linkFrom+"</td>" +
                    "<td class='outLinkUrl'><a href='javascript:void(0);'>"+EditDataJson.linkUrl+"</a></td>" +
                    "<td><a href='javascript:;' class='delProduct'>删除</a></td>" +
                    "</tr></tbody></table>";

                $("#DiscoveryShop").append(outHtml);

                $(".linkShop").show();
                $("#EditOutProducts").hide();

                $(".EditEssential").hide();
                $(".EditSaveArticle").show();
                $(".EditNextTab").hide();
                $("#DiscoveryShop").show();
                isUpload=false;
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
    //商品列表渲染
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
        "brandId":$("#EditAllBrands").val(),
        "categoryId":$("#EditCategory").val(),
        "productName":$("#EditProductName").val(),
        "articleNumber":$("#commodityCode").val(),
        "linkFrom":$("#EditSelf").val()
    };
    getProductList(params);
});

//点击下一步
var EditTabBNum = 0;
$('.tabUl li').removeClass('selected');

$('.tabUl li').eq(EditTabBNum).addClass('selected');
if(EditTabBNum == 0){
    $("#EditPrevSpan").css("display","none");
}

$("#EditNext1").click(function () {     //点击下一步

    EditTabBNum ++;
    if(EditTabBNum==2){
        $(".EditEssential").hide();
        $(".EditSaveArticle").show();
        $(".EditNextTab").hide();
        $('.tabUl li').removeClass('selected');
        $('.tabUl li').eq(EditTabBNum).addClass('selected');
        $('.discoveryDiv').hide();
        $('.discoveryDiv').eq(EditTabBNum).show();
    }else if(EditTabBNum<2){

        $("#EditPrevSpan").css("display","inline-block");
        $('.tabUl li').removeClass('selected');

        $('.tabUl li').eq(EditTabBNum).addClass('selected');
        $('.discoveryDiv').hide();
        $('.discoveryDiv').eq(EditTabBNum).show();

    }else{
        EditTabBNum=0;
    }
});


$("#EditPrevSpan").click(function(){        //点击上一步
    EditTabBNum --;
    if(EditTabBNum>=0){

        $('.tabUl li').removeClass('selected');

        $('.tabUl li').eq(EditTabBNum).addClass('selected');
        $('.discoveryDiv').hide();
        $('.discoveryDiv').eq(EditTabBNum).show();
    }else if(EditTabBNum==1){
        $("#EditPrevSpan").css("display","none");
    }else{
        EditTabBNum=0;
    }

});


//上传基本信息logo图
function Edit_columnLogo(){
    $('#Edit_columnLogo').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {
            if(data.code==1){
                $("#Edit_columnLogo").siblings("img").attr({"src":data.info[0]});
                $("#Edit_columnLogo").siblings("p").css("display","none");

                $(".parentFileBox").remove();
            }

        },
        error:function( err ) {
            alert(err.msg);
        },
        buttonText : '上传图片',
        chunked:true,
        fileNumLimit:1,
        fileSingleSizeLimit:1024* 1024,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image/*"
        }
    });
}
Edit_columnLogo();

//上传基本信息主图
function EditMaster_pic(){
    $('#Edit_AddMasterPic').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {
            if(data.code==1){
                $("#Edit_AddMasterPic").siblings("img").attr({"src":data.info[0]});
                $("#Edit_AddMasterPic").siblings("p").css("display","none");

                $(".parentFileBox").remove();

            }

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
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image/*"
        }
    });
}
EditMaster_pic();

//上传外部商品的主图
var EditShop_picPath;
var isUpload=false;
function EditOutProduct_bg(){
    $('#product_MasterPic').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {

            $("#product_MasterPic").siblings("img").attr({"src":data.info[0]});
            $("#product_MasterPic").siblings("img").css("display","block");
            $("#product_MasterPic").siblings("p").css("display","none");

            $(".parentFileBox").remove();
            EditShop_picPath = data.info[0];
            isUpload=true;
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
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image/*"
        }
    });
}
EditOutProduct_bg();

//添加奕赏商品
$("#EditAddEssential_shop").on("click",function(e){
    e.stopImmediatePropagation();

    $(".linkShop").hide();
    $("#DiscoveryShop").hide();
    $("#EditRelationProductList").show(function(){
        $(".nextNew span").hide();

        $(".EditEssential").show();
        getProductList({"pageIndex":1,"type":0,"pageSize":10});

        $(".returnPrev").on("click",function(e){
            e.stopImmediatePropagation()
            $(".linkShop").show();
            $("#EditRelationProductList").hide();

            $(".EditEssential").css("display","none");
            $(".EditSaveArticle").css("display","inline-block");
            $(".EditNextTab").css("display","none");
            $("#DiscoveryShop").css("display","block");
        });
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
                    "<a href='javascript:;' class='delProduct'>删除</a></td>" +
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
$("#EditAddOutChains").on("click",function(e){
    e.stopImmediatePropagation();
    $(".linkPlatform").val("");
    $(".productName").val("");
    $(".brandName").val("");
    $(".marketPrice").val("");
    $(".linkUrl").val("");
    $("#EditOutProductPic").attr("src","");
    EditOutProduct_bg();

    $("#EditOutProducts").siblings().hide();

    $("#EditOutProducts").show(function(){

        $(".nextNew span").hide();
        $(".EditEssential").show();

        $(document).on("click",".returnPrev",function(){         //点击返回相关商品

            $(".linkShop").show();
            $("#EditOutProducts").hide();

            $(".EditEssential").hide();
            $(".EditSaveArticle").show();
            $(".EditNextTab").hide();
            $("#DiscoveryShop").show();

        });

        $(".add_shop").on("click",function(e){       //点击确定添加外链商品
            e.stopImmediatePropagation();
            var regNumber=/^[\d]+$/g;

            var reg = new RegExp("[a-zA-z]+://[^s]*");
            if($(".productName").val() ==''){
                alert("商品名称不能为空");
                return false;
            }
            if($(".marketPrice").val() ==""){
                alert("商品价格不能为空");
                return false;
            }else if(!regNumber.test($(".marketPrice").val())){
                alert("请输入正确的商品价格");
                return false;
            }
            if($(".brandName").val() == ""){
                alert("商品品牌不能为空");
                return false;
            }
            if(!isUpload){
                alert("商品主图不能为空");
                return false;
            }
            if($(".linkPlatform").val()==""){
                alert("渠道不能为空");
                return false;
            }
            if(!$(".linkUrl").val()){
                alert("链接地址不能为空");
                return false;
            }
            if(!reg.test($(".linkUrl").val())){
                alert("请输入正确的链接地址");
                return false;
            }
            if(confirm("确定添加吗?")){
                saveExternalProduct();
            }
        });

        EditOutProduct_bg();

    });

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
$("#EditRelease").on("click",function(){
    if(confirm("确定发布?")){
        editDiscovery();
    }

});

//删除商品
$(document).on("click",".delProduct",function(e){
    e.stopImmediatePropagation();
    if(confirm("确定删除吗?")){
        $(this).parent().parent().parent().parent().remove();
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
    var n=10;
    $(".pagination").paging(PageCount, {
        format: '[< ncnnn >]',
        perpage: n,
        onSelect: function(page) {
            if(!flag){
                data.pageIndex = page;
                data.pageSize=n;
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
EditAllClassify();
function EditAllClassify(){
    $.ajax({
        url: PLATFORM_URL_PRE + "/essential/productCategory/query",
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                //渲染模板
                var EditCategoryHtml = $("#EditCategoryTmp").render(res);
                $("#EditCategory").append(EditCategoryHtml);

            } else {
                //alert(res.msg);
            }
        }
    });
}

//所有品牌渲染
EditAllBrands();
function EditAllBrands(){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/bussinessBrand/queryTotalBrandNoPage",
        type:"POST",
        success:function(res){
            if(res.code == 1){
                var html = $("#editBrandsTmp").render(res.info);
                $("#EditAllBrands").append(html);
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
EditAllShops();
function EditAllShops(){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/querySomeList/queryShopList",
        type:"POST",
        success:function(res){
            if(res.code == 1){
                var shopHtml = $("#EditShopTmp").render(res);
                $("#EditShopName").append(shopHtml);
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
$(".discoveryContent").on("keyup",".articlekeyWords",function(){
    var getValueLength=this.value;
    $("#article_keywords_Lastcount").text(100-getValueLength.length);
    this.value=this.value.replace("，",",");
});