

/*得到富文本的内容*/
function  getContent() {
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());
    return arr;
}
/*得到专栏*/
function getSpecial() {
    var urlStr=PLATFORM_URL_PRE+"/essential/articleGroup/queryGroupList";
    $.ajax({
        type: "POST",
        url:urlStr,
        //dataType: "json",
        dataType: "text",
        timeout: 20000,
        cache: false,
        success: function (data) {
            var json = eval("(" + data+ ")");
            if(json.code==1)
            {
                for(var i=0;i<json.info.length;i++)
                {
                  $("#column").append("<option value="+json.info[i].articleGroupId+">"+json.info[i].groupName+"</option>")
                }
            }
        }
    });


}


/*新建发现*/
function addDiscovery()
{
     //商品id数组
    var productIdList=selectProductId();
    var urlStr=PLATFORM_URL_PRE+"/essential/article/addArticle";
    /*标题*/
    var title=$("#title").val();
    /*专栏*/
    var special=$("#column").find("option:selected").val();
    /*专蓝logo*/
    var specialLogo="logopathjfjdsfjjdfsjfjjfjfj";
    /*作者*/
    var author=$("#author").val();
  /*  主图*/
    var mainPic="我是主图的url嘻嘻嘻";
  /*  文章摘要*/
    var articelSummary=$("#articelSummary").val();
    /*富文本*/
    var rich=getContent();
    console.info(rich);

    /*是否为外联*/
    var ProductType;
    var dataJson=new Object();
    dataJson.articleGroupId=special;
    dataJson.articleName=title;
    dataJson.mainPath="xixi";
    dataJson.thumbnailPath=specialLogo;
    dataJson.articleAbstract=articelSummary;
    dataJson.articleContent=rich.toString();
    dataJson.createUserId="22";
    dataJson.authorIcon="22";
    dataJson.author=author;
    var dataPara= $.param(dataJson);
    //遍历数组
    var articleProductAutoListtemp="";
    for(var i=0;i<productIdList.length;i++)
    {

        articleProductAutoListtemp+="&articleProductAutoList["+i+"].productId="+productIdList[i];

    }
    //console.info(articleProductAutoListtemp);
     dataPara+=articleProductAutoListtemp;
   dataPara+="&articleProductAutoList[0].productId=1&articleProductAutoList[1].productId=2&articleProductAutoList[2].productId=3";
    dataPara+="&articleContent="+rich;



    //console.info(dataPara);

    $.ajax({
        type:'post',
        url:urlStr,
        dataType:'json',
        data:dataPara,
        success: function (data) {
        }
    });


}

//保存数据
function saveData()
{
    addDiscovery();

}
//保存外联商品
function saveExternalProduct()
{

    var url= PLATFORM_URL_PRE+"/essential/linkProduct/saveLinkProduct";

//来源平台

    var dataJson=new Object();

 //链接平台
    dataJson.linkFrom=$("#linkUrl").val();
    //商品名称
    dataJson.productName=$("#productName").val();

    //品牌名称
    dataJson.brandName=$("#brandName").val();
    //图片路径
    dataJson.path=$("#path").val();

    //市场价
    dataJson.marketPrice=$("#marketPrice").val();
    //链接地址
    dataJson.linkUrl=$("#linkUrl").val();
    var dataParamter= $.param(dataJson);
    $.ajax({
        type:"post",
        url:url,
        dataType:"json",
        data:dataParamter,
        success: function () {
            alert("添加外联商品成功");
            
        }

    });

}

//选择商品id给新建发现的
function selectProductId()
{
    var productIds=[];
    $("input[type='checkbox']:checked").each(function(i){
        var productId= $(this).val();
        productIds.push(productId);

    });
//console.info(productIds);
return productIds;


}
//得到商品列表
function getProductList(page)
{
    var url= PLATFORM_URL_PRE+"/essential/productManageController/queryProductInfo";
    var dataJson=new Object();
    dataJson.type=3;
    dataJson.pageIndex=page;

    var dataParameter= $.param(dataJson);
    $.ajax({
        type:'post',
        url:url,
        dataType:'json',
        data:dataParameter,
        success:function(data) {

            var json = eval(data);
            if(json.code==1) {
             //console.info(json.info.pageCount);
             //console.info(json.info.productManageVoList[0]);
                var product=json.info.productManageVoList;

                $(".tcdPageCode").createPage({
                    pageCount:json.info.pageCount,
                    current:1,
                    backFn:function(p){
                        getProductList(p);
                        //console.log(p);
                    }
                });
                /*for(var i;i<=json.info.productManageVoList.length;i++)
                {



                }*/
                $(".gridtable").empty();
                $(".gridtable").append(" <tr id='firstTr'><th>选择</th><th>图片</th><th><span>产品名称</span></th> <th><span>产品价格</span></th><th><span>品牌</span></th><th><span>分类</span></th> <th><span>库存</span></th><th><span>销量</span></th><th><span>时间</span></th><th><span>备注</span></th> </tr>");
                for(var i=0;i<=8;i++)
                {
                    //商品id
                    var productId=product[i].productId;
                    //品牌id
                    var brandId=product[i].brandId;
                    //大分类id
                    var categoryId=product[i].categoryId;
                    //市场价
                    var costPrice=product[i].costPrice;
                    //时间
                    var createTime=product[i].createTime;
                    //商品名称
                    var productName=product[i].productName;
                    //图片路径
                    var path=product[i].path;
                    //店铺id
                    var shopId=product[i].shopId;
                    //库存
                    var stock=product[i].stock;

                    $(".gridtable").append("<tr><td><input type='checkbox' value="+productId+"></td><td><img src="+path+" height='50px' width='50px'></td><td><span>"+productName+"</span></td> <td><span>"+createTime+"</span></td><td><span>阿迪达斯</span></td><td><span>服装</span></td> <td><span>100件</span></td><td><span>100万</span></td><td><span>"+createTime+"</span></td><td><span>这件很漂亮我他娘的喜欢</span></td> </tr>");


                }
            }
        }

    });

}
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
        success:function(data)
        {

            alert("成功");
            var json = eval(data);
            if(json.code==1) {

                //console.info(json.info);
                $("#richContent").append(json.info);

            }

        }

    });
}
//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]); return null;

}
//得到相关商品的总页数给html的分页插件使用
function getPageCount()
{

    var  count;
    var url= PLATFORM_URL_PRE+"/essential/productManageController/queryProductInfo";
    var dataJson=new Object();
    dataJson.type=3;
    dataJson.pageIndex=1;

    var dataParameter= $.param(dataJson);
    $.ajax({
        type:'post',
        url:url,
        dataType:'json',
        data:dataParameter,
        success:function(data)
        {

            var json = eval(data);
            if(json.code==1) {

             count=json.info.pageCount;
                //console.info(count);
                return count;
            }


        }

    });



}
//载入外部的productList
function loadExternalProductList() {
    $("#relationProductList").load("pages/busi_platform/business/discovery/relationProductList.html");

}
var tabswitch=function ()
{
    $(".tabUl li").click(function () {
         var id0=$(this).attr("id");
        var id1=".content"+id0;

        $(this).addClass("selected");
        $(this).siblings().removeClass("selected");
        $(id1).css("display","block");
        $(id1).siblings().css("display","none");
        $(".tabUl").css("display","block");
    });
};
tabswitch();