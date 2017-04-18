/**
 * Created by Morgan on 2016/8/10.
 */

var get_godsInfms={};
function Get_gods_Inmfs(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/productManageController/editeProducts",
        data:{productId:res},
        dataType:'json',
        beforeSend:function(){

        },
        success:function(data){
            if (data.code==1){
                get_godsInfms=data.info;

                edit_addGoods(data);//添加大分类

                edit_addSelclass(get_godsInfms.categoryId,data);//添加小分类
                edit_addBrand(get_godsInfms.categoryId,data);//添加品牌列表
                add_MakeInf_pages(data);//添加详情和富文本

                Click_next();
            }else{

                alert(data.msg);

            }
        },error:function(){
            alert("网络错误，请刷新重试")
        }
    })
}
//调取编辑对应的返回值;


/*选择品类增添*/
function edit_addGoods(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/productCategory/query",
        data:'',
        dataType:'json',
        beforeSend:function(){
            $("#Edit_Select_pin").html("");
            $('#Edit_Select_pin').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            console.log("---------大分类--------");
            if (data.code==1){

                $('#Edit_Select_pin').find(".Img_Load").remove();
                var html='<ul>';
                for(var i=0;i<data.info.length;i++){
                    html+="<li data-categoryId='"+data.info[i].categoryId+"'><a href='javascript:void(0)'>"+data.info[i].categoryName+"</a></li>" ;
                }
                html+='</ul>' ;
                $("#Edit_Select_pin").append(html);

                $("#Edit_Select_pin").addClass("active");
                //console.log(res);
                edit_addActive(res);
                //console.log(res);
                //渲染结构 并加active；
                //Make_yunfei()

                edit_selectGoods();

            }else{
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
        }
    })
}

var edit_selGodNam;
var edit_categoryId;
var edit_selClasNam;
var edit_productTypeId;
var edit_selBrands;

/*选择品类并获取其值*/
function edit_selectGoods(){
    var $getlis=$('#Edit_Select_pin ul li');
    $getlis.bind('click',function(){
        $(this).siblings().children('a').css('color','black');
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(this).children('a').css('color','red');
        edit_selGodNam=$(this).text();
        edit_categoryId=$(this).attr("data-categoryId");
    })
}


/*选择分类增添*/
function edit_addSelclass(categoryId,res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/productType/query",
        data:{categoryId:categoryId},
        dataType:'json',
        beforeSend:function(){
            $("#Edit_Select_class").html("");
            $('#Edit_Select_class').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if (data.code==1){
                $("#Edit_Select_class").find(".Img_Load").remove();
                var html='<ul>';
                for(var i=0;i<data.info.length;i++){
                    html+="<li data-productTypeId='"+data.info[i].productTypeId+"'><a href='javascript:void(0)'>"+data.info[i].productypeName+"</a></li>" ;
                }
                html+='</ul>';
                $('#Edit_Select_class').append(html);

                //$("#Edit_Select_class").addClass("active");

                edit_addActive(res);//将取回的值进行active添加

                selectClass();
            }else{
                alert(data.msg)
            }
        }
    })
}

//品牌的数据调用
function edit_addBrand(CategoryId,res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/bussinessBrand/queryShopIdCategoryId",
        data:{shopId:BUSINESS_LOGIN_SHOP_ID,categoryId:CategoryId},
        dataType:'json',
        beforeSend:function(){
            $("#Edit_Select_brand").html("");
            $('#Edit_Select_brand').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if (data.code==1){
                $('#Edit_Select_brand').find(".Img_Load").remove();

                var html='<ul>';
                for(var i=0;i<data.info.length;i++){
                    if(data.info[i]!=null){
                        html+="<li data-brand_id='"+data.info[i].brand_id+"'><a href='javascript:void(0)'>"+data.info[i].brand_name+"</a></li>" ;
                    }
                }
                html+='</ul>';
                $('#Edit_Select_brand').append(html);

                //$("#Edit_Select_brand").addClass("active");

                edit_addActive(res);//将取回的值进行active添加

                selBrand();

            }else{
                alert(data.code)
            }
        }
    })
}


//商品详情页面的内容添加&商品说明页添加
function add_MakeInf_pages(data){
    $("#Edit_make_basic").load("pages/busi_platform/business/product/edit_MakeBasicInfm.html",function(){
        $("#Edit_make_basic #make_basic").removeClass("active");
        $("#Edit_make_basic #make_basic").unwrap();
        $("#make_basic").attr("id","Edit_make_basic");

        $(document).ready(function(){
            $("#Make_keywords").val(data.info.twoDimensionPath);//商品关键字
            $("#articleNumber").val(data.info.articleNumber);
            $("#Make_productName").val(data.info.productName);
            $("#Make_productPrice").val(data.info.costPrice);
            $(".total-repertory").text(data.info.stock);
            if(data.info.freightType==0){
                //统一运费
                $("#youfei1").prop("checked",true);
                $("#freightPrice").val(data.info.freightPrice);
            }else if(data.info.freightType==1){
                // 运费模板
                $("#youfeiMB").prop("checked",true);
            }
            setTimeout(function(){
                makeInfmpage_Rendering(data);
                setInterval(edtit_rePlaceTill(),1000);
            },1000);
        });
    });
    $("#Edit_make_gods").load("pages/busi_platform/business/product/Edit_commodity.html",function(){
        $("#make_gods").removeClass("active");
        $("#make_gods").unwrap();

        $("#Edit_oneword").val(data.info.words);
        setTimeout(function(){
            UE.getEditor('editor').setContent(data.info.productDescribe);
            UE.getEditor('editor1').setContent(data.info.returnProductExplain);
        },2000)

    });
}

function edit_addActive(res){
    var categoryId=res.info.categoryId;
    var productTypeId=res.info.productTypeId;
    var brandid=res.info.brandId;

    $("#Edit_Select_pin ul li[data-categoryid="+categoryId+"]").addClass("active");;
    $("#Edit_Select_pin ul li[data-categoryid="+categoryId+"]").children('a').css('color','red');

    $("#Edit_Select_class ul li[data-producttypeid="+productTypeId+"]").addClass("active");
    $("#Edit_Select_class ul li[data-producttypeid="+productTypeId+"]").css('color','red');

    $("#Edit_Select_brand ul li[data-brand_id="+brandid+"]").addClass("active");
    $("#Edit_Select_brand ul li[data-brand_id="+brandid+"]").css('color','red');

}

Get_gods_Inmfs(getonsale_productId);


function makeInfmpage_Rendering(infms){
    /*for(var a=0;a<res.length;a++){
    }*/
    var res=infms.info.productSkuAutoList;
    var getGuige=res[0].productSkuRelationList.length;

    //循环点击出规格的次数
    for(var b=0;b<getGuige-1;b++){
        $("#Make_GuigeBtn").click();
        console.log("Cishu"+b);
    }
    var getGuige1=[];
    var getGuige2=[];
    var getGuige3=[];
    var swith=false;
    //循环出大分类的点击
    console.log(res[0].productSkuRelationList[0].specificationKeyId)
    for(var c=0;c<$(".Pro_standard").length;c++){
        var getcategroy=res[0].productSkuRelationList[c].specificationKeyId
        $(".Pro_standard").eq(c).bind("click",function(){
            $(".Pro_standard:eq("+c+") option[value='"+getcategroy+"']").prop("selected","selected");
            console.log("getcategroy"+getcategroy);
            $(".Pro_standard").eq(c).change();
        });
        $(".Pro_standard").eq(c).click();
        /*setTimeout(function(){
         add_Active()
         },1500)*/
        swith=true;
    }
    if(swith){
        setTimeout(function(){
            add_Active()
        },1000)
    }
    function add_Active(){
        if($(".Pro_standard").length==1){
            for(var d=0;d<res.length;d++){
                getGuige1[d]=res[d].productSkuRelationList[0].specificationValueId;
                $(".Pro_standard").eq(0).next("ul")
                    .find("li[data-specificationvalueid='"+res[d].productSkuRelationList[0].specificationValueId+"']")
                    .addClass("active1")
            }
        }else if($(".Pro_standard").length==2){
            for(var e=0;e<res.length;e++){
                getGuige1[e]=res[e].productSkuRelationList[0].specificationValueId;
                getGuige2[e]=res[e].productSkuRelationList[1].specificationValueId;
                $(".Pro_standard").eq(0).next("ul")
                    .find("li[data-specificationvalueid='"+getGuige1[e]+"']")
                    .addClass("active1");
                $(".Pro_standard").eq(1).next("ul")
                    .find("li[data-specificationvalueid='"+getGuige2[e]+"']")
                    .addClass("active2")
            }
        }else if($(".Pro_standard").length==3){
            for(var f=0;f<res.length;f++){
                getGuige1[f]=res[f].productSkuRelationList[0].specificationValueId;
                getGuige2[f]=res[f].productSkuRelationList[1].specificationValueId;
                getGuige3[f]=res[f].productSkuRelationList[2].specificationValueId;

                $(".Pro_standard").eq(0).next("ul")
                    .find("li[data-specificationvalueid='"+getGuige1[f]+"']")
                    .addClass("active1");
                $(".Pro_standard").eq(1).next("ul")
                    .find("li[data-specificationvalueid='"+getGuige2[f]+"']")
                    .addClass("active2");
                $(".Pro_standard").eq(2).next("ul")
                    .find("li[data-specificationvalueid='"+getGuige3[f]+"']")
                    .addClass("active3")
            }
            console.log("--------3--------")
        }
        $("#Make_Mean").click();
        for(var i=0;i<res.length;i++){
            for(var j=0;j<$("#list tr").size();j++){
                var trueOrfalse=0;
                for(var x=0;x<$(".Product_Select select").size();x++){
                    if($("#list tr").eq(j).attr("data-specificationvalueid"+x)==res[i].productSkuRelationList[x].specificationValueId){
                        trueOrfalse+=0;
                    }else{
                        trueOrfalse+=1;
                    }
                }
                if(trueOrfalse==0){
                    $("tbody#list").children("tr").eq(j).find("input[name='pice']").val(res[i].prices);
                    $("tbody#list").children("tr").eq(j).attr("data-skuId",res[i].productskuId);
                    $("tbody#list").children("tr").eq(j).find("input[name='repertory']").val(res[i].productskuCount);
                    $("tbody#list").children("tr").eq(j).find("input[name='GodCode']").val(res[i].articleNumber);
                }
            }
        }
        //克隆Tab表
        $(".TotalStock").append($("#list").clone().attr("id","CloneList").hide());
        $("#Make_Mean").bind("click",function(){
           setTimeout(
               function(){
                   eachOnetd();
               }
           ,500)
        });

        //商品主图查询获取并 实例化控件
        for(var i=0;i<infms.info.picturePathList.length;i++){
            $("#MakeInfm_img").append(
                "<div class='brick'>" +
                    "<img src='"+infms.info.picturePathList[i]+" '/>"+
                    "<i class='icon-trash icon-2x icon-only Img-remove'>"+
                "</div>");
        }
        //拖拽功能实现
        $("#MakeInfm_img").dragsort("destroy");
        $("#MakeInfm_img").dragsort({ dragSelector: "div.brick", dragBetween: true, dragEnd: function() { }, placeHolderTemplate: "" });
        del_imgs();//点击删除图片功能

        $('#test').diyUpload({
            url:BUSINESS_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=1',
            contentType:"multipart/form-data",
            beforeSend: function(xhr) {
                xhr.setRequestHeader("Content-Type",'multipart/form-data')
            },
            success:function( data ) {
                $("#MakeInfm_img").append(
                    "<div class='brick'>" +
                    "<img src='"+data.info[0]+" '/>"+
                    "<i class='icon-trash icon-2x icon-only Img-remove'>"+
                    "</div>");
                //控件隐藏
                var getlis=$("#test").siblings(".parentFileBox").children("ul").children("li").length;
                if($("#MakeInfm_img div").length==getlis){
                    $("#test").siblings(".parentFileBox").fadeOut("slow",function(){
                        $("#test").siblings(".parentFileBox").remove();
                    });
                }
                //拖拽功能实现
                $("#MakeInfm_img").dragsort("destroy");
                $("#MakeInfm_img").dragsort({ dragSelector: "div.brick", dragBetween: true, dragEnd: function() { }, placeHolderTemplate: "" });
                del_imgs();//点击删除图片功能
            },
            error:function( err ) {
                alert(err.msg);
            },
            // 并发数限制为1
            threads:1,
            //文件上传方式
            method:"POST",
            //服务器地址
            /*server:BUSINESS_URL_PRE,*/
            //是否已二进制的流的方式发送文件，这样整个上传内容php://input都为文件内容
            sendAsBinary:false,
            // 开起分片上传。 thinkphp的上传类测试分片无效,图片丢失;
            chunked:false,
            // 分片大小
            chunkSize:512 * 1024,
            //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
            fileNumLimit:50,
            fileSizeLimit:50 * 1024 * 1024,
            fileSingleSizeLimit:2 * 1024 * 1024
        });
    }
}

function del_imgs(){
    $("#Edit_make_basic").on("click","#MakeInfm_img div i",function() {
        console.log("111");
        $(this).parent().fadeOut("slow", function () {
            $(this).remove();
        })
    })
}

//下一步点击事件
function Click_next(){
    $(".PostTd_nextBtn1").click(function(){
        var $getindex=$("#edit_cont>div.active").index();
        if($getindex==0){
            Edit_addSelclass();
        }else if($getindex==1){
            Edit_addBrand();
        }
        if($getindex!=4){
            $("#edit_cont>div.active").removeClass("active");
            $("#Edit_product_head ul li.active").removeClass("active");
            $("#edit_cont>div").eq($getindex+1).addClass("active");
            $("#Edit_product_head ul li").eq($getindex+1).addClass("active");
        }else if($getindex==4){
            $(".PostTd_nextBtn1").text("保存");
            Edit_Saved();
        }
    })
}

var freightType;
var freightGroupId;
var freightPrice;
function Edit_Make_yunfei(){
    freightType=$('#Make_yunfei li').find("input[type='radio']:checked").parent().parent().index().toString();
    if(freightType==0){
        freightPrice=$(this).children("input[type='number']");
    }else{
        freightPrice='';
    }
    //$(this).children().trigger('click');
}

/*运费模板调用*/



function Edit_Saved(){
    var getPathlist=[];
    Edit_Make_yunfei();
    $("#MakeInfm_img div img").each(function(i){getPathlist[i]=$(this).attr("src")});




    var DataJson= edit_getSkuVal();
    DataJson.productId=get_godsInfms.productId;
    DataJson.brandId = $("#Edit_Select_brand li.active").attr("data-brand_id");
    DataJson.categoryId=$("#Edit_Select_pin ul li.active").attr("data-categoryid");
    DataJson.productTypeId=$("#Edit_Select_class ul li.active").attr("data-producttypeid");
    DataJson.shopId=BUSINESS_LOGIN_SHOP_ID;
    DataJson.saleStatus= get_godsInfms.saleStatus;
    DataJson.productName=$("#Make_productName").val();
    DataJson.salesName=$("#Make_productName").val();
    DataJson.costPrice=$("#Make_productPrice").val();
    DataJson.price=$("#Make_productPrice").val();
    DataJson.productDescribe=UE.getEditor('editor').getContent();
    DataJson.returnProductExplain=UE.getEditor('editor1').getContent();
    DataJson.articleNumber=$("#articleNumber").val();
    DataJson.words=$("#Edit_oneword").val();
    DataJson.freightType=freightType;
    DataJson.freightPrice=$("#freightPrice").val();
    DataJson.freightGroupId=$("#youfeiMB").find("option:selected").val();
    DataJson.loginUser=BUSINESS_LOGIN_USER_ID;
    DataJson.totalStoreNum=$(".total-repertory").html();
    DataJson.picturePathList=getPathlist.toString();
    DataJson.productSku=$.param(edit_getSkuVal());

    DataJson.twoDimensionPath= $("#Make_keywords").val();//商品关键字
    console.log(DataJson.productSkuAutoList);

   /* for(var j=0;j<$(".Product_Select select").size();j++){
        $("#CloneList tr").each(function(i){
            console.log($("#CloneList tr").eq(i).attr("data-specificationvalueid"+j))
        })
    }
    var keyIdSize;
    for(var i=0;i<3;i++){
        if(typeof $("#CloneList tr").eq(0).attr("data-specificationvalueid"+i)=="undefined"){
            keyIdSize=i;
            if(keyIdSize==$(".Product_Select select").size()){
                eachOnetd(keyIdSize);
            }
        }
    }
*/
    if(DataJson.picturePathList==""){
        alert("商品主图不能为空")
    }else if(DataJson.freightType===""){
        alert("运费不能为空")
    }else if(DataJson.words==""){
        alert("一句话描述不能为空")
    }else if(DataJson.articleNumber==""){
        alert("商品代码不能为空")
    }else if(DataJson.productName==""){
        alert("商品名称不能为空")
    }else if(DataJson.returnProductExplain==""){
        alert("退货说明不能为空")
    }else if(DataJson.productDescribe==""){
        alert("商品详情说明不能为空")
    }else if(DataJson.productSku==""){
        alert("商品规格不能为空")
    }else if(DataJson.picturePathList!=""
        && DataJson.freightType!==""
        && DataJson.words!=""
        && DataJson.articleNumber!=""
        && DataJson.returnProductExplain!=""
        && DataJson.productDescribe!=""
        && DataJson.productName!=""){
        EditGods($.param(DataJson));
    }
}
function eachOnetd(){
    var keyIdSize;
    for(var i=0;i<4;i++){
        if(typeof $("#CloneList tr").eq(0).attr("data-specificationvalueid"+i)=="undefined"){
            keyIdSize=i;
            if(keyIdSize==$(".Product_Select select").size()){
                AttrInputValue(keyIdSize);
            }
        }
    }
    /*for(var d=0;d<3;d++){
     if(typeof $("#CloneList tr").eq(0).attr("data-specificationvalueid"+d)=="undefined"){
     console.log(d)
     }
     }*/
    function AttrInputValue(index){
        for(var a=0;a<$("#CloneList tr").size();a++){
            for(var j=0;j<$("#list tr").size();j++){
                var trueOrfalse=0;
                for(var x=0;x<index;x++){
                    if($("#CloneList tr").eq(a).attr("data-specificationvalueid"+x)==$("#list tr").eq(j).attr("data-specificationvalueid"+x)){
                        trueOrfalse+=0;
                    }else{
                        trueOrfalse+=1;
                    }
                }
                if(trueOrfalse==0){
                    $("#list tr").eq(j).attr("data-skuid",$("#CloneList tr").eq(a).attr("data-skuid"));
                    $("#list tr").eq(j).find("input[name='pice']").val($("#CloneList tr").eq(a).find("input[name='pice']").val());
                    $("#list tr").eq(j).find("input[name='repertory']").val($("#CloneList tr").eq(a).find("input[name='repertory']").val());
                    $("#list tr").eq(j).find("input[name='GodCode']").val($("#CloneList tr").eq(a).find("input[name='GodCode']").val());
                }
            }
        }
    }
}


function edtit_rePlaceTill(){
    var $getTitles=$('#Edit_make_basic .Basic_title span');
    $getTitles.eq(0).html($("#Edit_Select_pin").find(".active").children().html());
    $getTitles.eq(1).html($("#Edit_Select_class").find(".active").children().html());
    $getTitles.eq(2).html($("#Edit_Select_brand").find(".active").children().html());
}
function EditGods(params) {
    $.ajax({
        type: 'post',
        url: BUSINESS_URL_PRE + "/essential/productManageController/updateProduct",
        data: params,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.code == 1) {
                alert(data.msg);
                $("#myTabI-1 li a[href='#onsale_goods']").trigger("click");
            }else{
                alert(data.msg);
            }
        },
        error: function () {
            alert("网络有问题，请刷新重试");
            //$("#myTabI-1 li a[href='#onsale_goods']").trigger("click");
        }
    })
}


//大分类 小分类 品牌的改变
function Edit_addSelclass(){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/productType/query",
        data:{categoryId:$("#Edit_Select_pin ul li.active").attr("data-categoryid")},
        dataType:'json',
        beforeSend:function(){
            $("#Edit_Select_class").html("");
            $('#Edit_Select_class').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if (data.code==1){
                $('#Edit_Select_class').find(".Img_Load").remove();
                var html='<ul>';
                for(var i=0;i<data.info.length;i++){
                    if(data.info[i]!=null) {
                        html += "<li data-productTypeId='" + data.info[i].productTypeId + "'><a href='javascript:void(0)'>" + data.info[i].productypeName + "</a></li>";
                    }
                }
                html+='</ul>';
                $('#Edit_Select_class').html(html);

                Edit_selectClass();
            }else{
                alert(data.msg)
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
        }
    })
}


function Edit_addBrand(){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/bussinessBrand/queryShopIdCategoryId",
        data:{shopId:BUSINESS_LOGIN_SHOP_ID,categoryId:$("#Edit_Select_pin ul li.active").attr("data-categoryid")},
        dataType:'json',
        beforeSend:function(){
            $("#Edit_Select_brand").html("");
            $('#Edit_Select_brand').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if (data.code==1){
                $('#Edit_Select_brand').find(".Img_Load").remove();
                var html='<ul>';
                for(var i=0;i<data.info.length;i++){
                    if(data.info[i]!=null){
                        html+="<li data-brand_id='"+data.info[i].brand_id+"'><a href='javascript:void(0)'>"+data.info[i].brand_name+"</a></li>" ;
                    }
                }
                html+='</ul>' ;
                $('#Edit_Select_brand').html(html);

                Edit_selBrand();
            }else{
                alert(data.msg)
            }
        }
    })
}


function Edit_selectClass(){
    var $getlis=$('.PostTd_cont ul li');
    $getlis.bind('click',function(){
        $(this).siblings().children('a').css('color','black')
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(this).children('a').css('color','red');
        selClasNam=$(this).text();
        productTypeId=$(this).attr("data-productTypeId");
    })
}
/*选择分类并获取其值*/

function Edit_selBrand(){
    var $getlis=$('.PostTd_cont ul li');
    $getlis.bind('click',function(){
        $(this).siblings().children('a').css('color','black');
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        $(this).children('a').css('color','red');
        selBrands=$(this).text();
        productTypeId=$(this).attr("data-productTypeId");
    })
}
/*选择分类并获取其值*/

