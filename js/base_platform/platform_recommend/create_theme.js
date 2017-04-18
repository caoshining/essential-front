/**
 * Created by chenM on 2016/9/1.
 */

/*tab切换*/
/*$('.createThemeTab span').on('click',function (){
    var _index = $(this).index('.createThemeTab span');
    $('.createThemeTab span').removeClass('selected');
    $(this).addClass('selected');
    $('.goCreateTheme').hide();
    $('.goCreateTheme').eq(_index).show();
});*/
/*当前登录用户Id*/
var userId = PLATFORM_LOGIN_USER_ID;


/*定义变量，用来判断是否上传封面图和主图*/

var isUpload1 = false;
var isUpload2 = false;

/*定义变量，用来储存上传的封面图和主图的路径*/

var upLoadPic1 = '';
var upLoadPic2 = '';

/*定义一个数组，用来存储选中的相关商品*/
var productIdArr = [];

/*渲染商家名称部分*/
shopNameGroup()
function shopNameGroup() {

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/querySomeList/queryShopList',
        dataType: 'json',
        success: function (res) {

            var result = '';
            if(res.code == 1){
                $.each(res.info,function (i,v){
                    result+= '<option>'+ v.name+'</option>';
                })

            }

            $('.shopName').append(result);

        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }

    })
};
/*渲染商品分类部分*/
productClassGroup();
function productClassGroup() {

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/querySomeList/queryCategoryList',
        dataType: 'json',
        success: function (res) {

            var result = '';
            if(res.code == 1){
                $.each(res.info,function (i,v){
                    result+= '<option value='+v.categoryId+'>'+ v.categoryName+'</option>';
                })

            }

            $('.productClass').append(result);

        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }

    })
};
/*渲染商品品牌部分*/
brandGroup()
function brandGroup() {

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/querySomeList/queryBrandList',
        dataType: 'json',
        success: function (res) {

            var result = '';
            if(res.code == 1){
                $.each(res.info,function (i,v){
                    result+= '<option value='+v.brandId+'>'+ v.brandName+'</option>';
                })

            }

            $('.productBrand').append(result);

        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }

    })
};

addGoodsList();
function addGoodsList(){
    var productName = $('.productName').val();
    var brandId = $('.productBrand').val();
    var firstPrice =$('.price_d').val();
    var secondPrice = $('.price_g').val();
    var shopName = $('.shopName').val();
    var categoryId = $('.productClass').val();
    var linkFrom = $('.isLink').val();
    var articleNumber = $('.productCode').val();
    var linkUrl = $('.isDiscount').val();

    /*商品区*/
    newPushMsg_goods(productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom,articleNumber,linkUrl);

    function newPushMsg_goods(productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom,articleNumber,linkUrl){
        var parmaData = {
            pageIndex:1,
            type:0,
            pageSize:20,
            productName:productName,
            brandId:brandId,
            firstPrice:firstPrice,
            secondPrice:secondPrice,
            shopName:shopName,
            categoryId:categoryId,
            linkFrom:linkFrom,
            articleNumber:articleNumber,
            linkUrl:linkUrl
        };

        $.ajax({
            type: "post",
            url: PLATFORM_URL_PRE+'/essential/productPlatform/queryProductPlatform',
            dataType: 'json',
            data:parmaData,
            beforeSend:function(){
                $('.relatedProductsList tbody').html('');
                //$(".productLists .Img_Load").remove();
                $('.relatedProductsList').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
            },
            success:function (res){

                if(res.code == 1){
                    var result = '';
                    $('.relatedProductsList tbody').html('');
                    $(".relatedProductsList .Img_Load").remove();
                    $.each(res.info.productPlatformList, function (i, v) {
                        if(v.linkUrl == 1){
                            result += '<tr productId = '+ v.productId+'>'+
                                '<td class="clear">'+
                                '<input type="checkbox">'+
                                '<div class="imgBox">'+
                                '<img  src='+ v.path+'>'+
                                '<p>'+ v.articleNumber+'</p>'+
                                '</div>'+
                                '<div class="describeBox" style="width: 140px">'+
                                '<p>'+ v.productName+'</p>'+
                                '<p>￥'+v.discountPrice+'<span class="discount_price">￥'+v.costPrice+'</span><span class="discount_icon">折</span></p>'+
                                '</div>'+
                                '</td>'+
                                '<td>'+v.brandName+'</td>'+
                                '<td>'+v.categoryName+'</td>'+
                                '<td>'+v.shopName+'</td>'+
                                '<td>'+v.stock+'</td>'+
                                '<td>'+v.saleNum+'</td>'+
                                '<td class="time">'+timeFn(v.createTime)+'</td>'+
                                '<td>'+v.productStatusName+'</td>'+
                                '<td>'+v.selfName+'</td>'+
                                '<td>'+
                                '<p class="lookProduct">查看</p>'+
                                '<p class="add">未添加</p>'+
                                '</td>'+
                                '</tr>';
                        }if(v.linkUrl == 0){
                            result += '<tr productId = '+ v.productId+'>'+
                                '<td class="clear">'+
                                '<input type="checkbox">'+
                                '<div class="imgBox">'+
                                '<img  src='+ v.path+'>'+
                                '<p>'+ v.articleNumber+'</p>'+
                                '</div>'+
                                '<div class="describeBox" style="width: 140px">'+
                                '<p>'+ v.productName+'</p>'+
                                '<p>￥'+v.costPrice+'</p>'+
                                '</div>'+
                                '</td>'+
                                '<td>'+v.brandName+'</td>'+
                                '<td>'+v.categoryName+'</td>'+
                                '<td>'+v.shopName+'</td>'+
                                '<td>'+v.stock+'</td>'+
                                '<td>'+v.saleNum+'</td>'+
                                '<td class="time">'+timeFn(v.createTime)+'</td>'+
                                '<td>'+v.productStatusName+'</td>'+
                                '<td>'+v.selfName+'</td>'+
                                '<td>'+
                                '<p class="lookProduct">查看</p>'+
                                '<p class="add">未添加</p>'+
                                '</td>'+
                                '</tr>';
                        }

                    });
                    $('.pagination1_span').html('共'+Math.ceil(res.info.pageCount/20)+'页 每页20条')
                    $('.relatedProductsList tbody').html(result);
                    pagePlus(res.info.pageCount,productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom,articleNumber,linkUrl);
                }

            },
            error:function (res){
                alert('网络连接失败，请稍后重试')
            }
        });
    };


    /*分页调数据*/

    function newPushMsg_goodsForPage(page,productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom,articleNumber,linkUrl){
        var parmaData = {
            pageIndex:page,
            type:0,
            pageSize:20,
            productName:productName,
            brandId:brandId,
            firstPrice:firstPrice,
            secondPrice:secondPrice,
            shopName:shopName,
            categoryId:categoryId,
            linkFrom:linkFrom,
            articleNumber:articleNumber,
            linkUrl:linkUrl
        };


        $.ajax({
            type: "post",
            url: PLATFORM_URL_PRE+'/essential/productPlatform/queryProductPlatform',
            dataType: 'json',
            data:parmaData,
            beforeSend:function(){
                $('.relatedProductsList tbody').html('');
                //$(".productLists .Img_Load").remove();
                $('.relatedProductsList').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
            },

            success:function (res){
                if(res.code == 1){
                    var result = '';
                    $(".relatedProductsList .Img_Load").remove();
                    $('.relatedProductsList tbody').html('');

                    $.each(res.info.productPlatformList, function (i, v) {
                        var statusStr = '';

                        if($.inArray(v.productId.toString(), productIdArr) != -1){
                            statusStr = '已添加';
                            if(v.linkUrl == 1){
                                result += '<tr productId = '+ v.productId+'>'+
                                    '<td class="clear">'+
                                    '<input type="checkbox" class="checkbox" checked="checked">'+
                                    '<div class="imgBox">'+
                                    '<img  src='+ v.path+'>'+
                                    '<p>'+ v.articleNumber+'</p>'+
                                    '</div>'+
                                    '<div class="describeBox" style="width: 140px">'+
                                    '<p>'+ v.productName+'</p>'+
                                    '<p>￥'+v.discountPrice+'<span class="discount_price">￥'+v.costPrice+'</span><span class="discount_icon">折</span></p>'+
                                    '</div>'+
                                    '</td>'+
                                    '<td>'+v.brandName+'</td>'+
                                    '<td>'+v.categoryName+'</td>'+
                                    '<td>'+v.shopName+'</td>'+
                                    '<td>'+v.stock+'</td>'+
                                    '<td>'+v.saleNum+'</td>'+
                                    '<td class="time">'+timeFn(v.createTime)+'</td>'+
                                    '<td>'+v.productStatusName+'</td>'+
                                    '<td>'+v.selfName+'</td>'+
                                    '<td>'+
                                    '<p class="lookProduct">查看</p>'+
                                    '<p class="add">'+statusStr+'</p>'+
                                    '</td>'+
                                    '</tr>';
                            }else if(v.linkUrl == 0){
                                result += '<tr productId = '+ v.productId+'>'+
                                    '<td class="clear">'+
                                    '<input type="checkbox" class="checkbox" checked="checked">'+
                                    '<div class="imgBox">'+
                                    '<img  src='+ v.path+'>'+
                                    '<p>'+ v.articleNumber+'</p>'+
                                    '</div>'+
                                    '<div class="describeBox" style="width: 140px">'+
                                    '<p>'+ v.productName+'</p>'+
                                    '<p>￥'+v.costPrice+'</p>'+
                                    '</div>'+
                                    '</td>'+
                                    '<td>'+v.brandName+'</td>'+
                                    '<td>'+v.categoryName+'</td>'+
                                    '<td>'+v.shopName+'</td>'+
                                    '<td>'+v.stock+'</td>'+
                                    '<td>'+v.saleNum+'</td>'+
                                    '<td class="time">'+timeFn(v.createTime)+'</td>'+
                                    '<td>'+v.productStatusName+'</td>'+
                                    '<td>'+v.selfName+'</td>'+
                                    '<td>'+
                                    '<p class="lookProduct">查看</p>'+
                                    '<p class="add">'+statusStr+'</p>'+
                                    '</td>'+
                                    '</tr>';
                            }

                        }else if($.inArray(v.productId.toString(), productIdArr) == -1){
                            statusStr = '未添加';
                            if(v.linkUrl == 1){
                                result += '<tr productId = '+ v.productId+'>'+
                                    '<td class="clear">'+
                                    '<input type="checkbox" class="checkbox">'+
                                    '<div class="imgBox">'+
                                    '<img  src='+ v.path+'>'+
                                    '<p>'+ v.articleNumber+'</p>'+
                                    '</div>'+
                                    '<div class="describeBox" style="width: 140px">'+
                                    '<p>'+ v.productName+'</p>'+
                                    '<p>￥'+v.discountPrice+'<span class="discount_price">￥'+v.costPrice+'</span><span class="discount_icon">折</span></p>'+
                                    '</div>'+
                                    '</td>'+
                                    '<td>'+v.brandName+'</td>'+
                                    '<td>'+v.categoryName+'</td>'+
                                    '<td>'+v.shopName+'</td>'+
                                    '<td>'+v.stock+'</td>'+
                                    '<td>'+v.saleNum+'</td>'+
                                    '<td class="time">'+timeFn(v.createTime)+'</td>'+
                                    '<td>'+v.productStatusName+'</td>'+
                                    '<td>'+v.selfName+'</td>'+
                                    '<td>'+
                                    '<p class="lookProduct">查看</p>'+
                                    '<p class="add">'+statusStr+'</p>'+
                                    '</td>'+
                                    '</tr>';
                            }else if(v.linkUrl == 0){
                                result += '<tr productId = '+ v.productId+'>'+
                                    '<td class="clear">'+
                                    '<input type="checkbox" class="checkbox">'+
                                    '<div class="imgBox">'+
                                    '<img  src='+ v.path+'>'+
                                    '<p>'+ v.articleNumber+'</p>'+
                                    '</div>'+
                                    '<div class="describeBox" style="width: 140px">'+
                                    '<p>'+ v.productName+'</p>'+
                                    '<p>￥'+v.costPrice+'</p>'+
                                    '</div>'+
                                    '</td>'+
                                    '<td>'+v.brandName+'</td>'+
                                    '<td>'+v.categoryName+'</td>'+
                                    '<td>'+v.shopName+'</td>'+
                                    '<td>'+v.stock+'</td>'+
                                    '<td>'+v.saleNum+'</td>'+
                                    '<td class="time">'+timeFn(v.createTime)+'</td>'+
                                    '<td>'+v.productStatusName+'</td>'+
                                    '<td>'+v.selfName+'</td>'+
                                    '<td>'+
                                    '<p class="lookProduct">查看</p>'+
                                    '<p class="add">'+statusStr+'</p>'+
                                    '</td>'+
                                    '</tr>';
                            }

                        }

                    })
                    $('.relatedProductsList tbody').html(result);
                    $('.allChecked').prop('checked',false);
                }
            },
            error:function (res){
                alert('网络连接失败，请稍后重试')
            }
        });
    };
    //商品分页
    function pagePlus(totalPageCount,productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom,articleNumber,linkUrl){

        $('.pagination1').paging(totalPageCount, {
            format: '[< ncnnn >]',
            perpage: '20',
            onSelect: function(page) {

                newPushMsg_goodsForPage(page,productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom,articleNumber,linkUrl)
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

};
/*点击筛选*/
$('.screening').on('click',function (){
    addGoodsList();
});

var parmaData = {};

/*创建推荐*/
function createTheme(){
    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/article/queryArticleListByPage',
        dataType: 'json',
        data: parmaData,
        success: function (res) {
            alert(res.msg)
        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }
    })

};
var recommendType = 1;
/*点击单选按钮*/
$('input[type = radio]').on('click',function (){
    recommendType = $(this).val();
});

/*点击下一步*/

$('.nextButton').on('click',function (){
    parmaData = {};
    if($('.CreateThemeAuthor').val() == ''){
        alert('请输入作者');
    }
    else if($('.CreateThemeTitle').val() == ''){
        alert('请输入标题');

    }else if(!isUpload1){
        alert('请上传封面图');
    }else if($(".CreateThemeAbstract").val() == ''){
        alert('请输入商品简介');
    }else if(!isUpload2){
        alert('请上传主图');
    }else if($('.CreateThemeDescription').val() == ''){
        alert('请输入活动描述');
    }else{
        var recommendTitle = $('.CreateThemeTitle').val();
        var createUserName = $('.CreateThemeAuthor').val();
        var coverPic = upLoadPic1;
        var mainPicPath = upLoadPic2;
        var recommendIntroduction = $('.CreateThemeAbstract').val();
        var recommendDescription = $('.CreateThemeDescription').val();

        parmaData = {
            createUserName:createUserName,
            recommendTitle:recommendTitle,
            recommendType:recommendType,
            coverPic:coverPic,
            recommendIntroduction:recommendIntroduction,
            mainPicPath:mainPicPath,
            recommendDescription:recommendDescription,
            relatedProducts:productIdArr,
            createUser:userId
        };

        $('.createThemeTab span').removeClass('selected');
        $('.createThemeTab span').eq(1).addClass('selected');
        $('.goCreateTheme').hide();
        $('.goCreateTheme').eq(1).show();


    };

});

/*点击上一步*/

$('.prevButton').on('click',function (){
    $('.createThemeTab span').removeClass('selected');
    $('.createThemeTab span').eq(0).addClass('selected');
    $('.goCreateTheme').hide();
    $('.goCreateTheme').eq(0).show();

});
var onoff = true;
/*点击保存*/
$('.save').on('click',function (){
    if(!onoff){
        return;
    }
    onoff = false;

    if(productIdArr.length == 0){
        alert('请选择相关商品');
        return;
    };

    parmaData.relatedProducts = productIdArr.toString();

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/recommend/add',
        dataType: 'json',
        data:parmaData,
        success:function (res){
            if(res.code == 1){
                onoff = true;
                $('#Market_Promotion .tab-pane').removeClass("active");
                $("#theme_list").addClass("active")
                //$("#create_theme").load("pages/base_platform/business/platform_recommend/theme_list.html");
                $("#theme_list").load("pages/base_platform/business/platform_recommend/theme_list.html");
                alert('保存成功');
            }

        },
        error:function (res){
            alert('网络连接失败，请稍后重试');
        }
    });

});

/*点击查看*/
$(document).on('click','.lookProduct',function (e){
    e.stopImmediatePropagation();
    var _index = $(this).index('.lookProduct');
    window.a=2;
    window.ProductId = $('.relatedProductsList tbody tr').eq(_index).attr('ProductId');
    $('#theme_list').html('');
    $("#create_theme").load("pages/base_platform/business/platform_recommend/productList_look.html");


});

/*点击全选*/
$('.allChecked').on('click',function (e){
    e.stopImmediatePropagation();
    if($(this).prop("checked")){

        $('.checkbox').prop('checked',true);
        $('.checkbox').each(function (i,v){

            if($('.checkbox').eq(i).prop('checked') == true){
                var productid = $('.relatedProductsList tbody tr').eq(i).attr('productid');
                $('.relatedProductsList tbody .add').eq(i).html('已添加');
                if($.inArray(productid,productIdArr) == -1){
                    productIdArr.push(productid);
                }

            };

        });


    }else{

        $('.checkbox').prop('checked',false);
        $('.checkbox').each(function (i,v){

            if($('.checkbox').eq(i).prop('checked') == false){
                var productid1 = $('.relatedProductsList tbody tr').eq(i).attr('productid');
                $('.relatedProductsList tbody .add').eq(i).html('未添加');
                $.each(productIdArr,function (j,k){
                    if(k == productid1){
                        productIdArr.splice(j,1);
                    }
                });


            };

        });
    }
});
$(document).on('click','.checkbox',function (e){
    e.stopImmediatePropagation();
    var _index = $(this).index('.checkbox');
    var productid1 = $('.relatedProductsList tbody tr').eq(_index).attr('productid');
    if($(this).prop('checked') == true){
        productIdArr.push(productid1);
        $('.relatedProductsList tbody .add').eq(_index).html('已添加');

    }else if($(this).prop('checked') == false){
        $('.relatedProductsList tbody .add').eq(_index).html('未添加');
        $.each(productIdArr,function (i,v){
            if(v == productid1){
                productIdArr.splice(i,1);
            }
        })
    }
});


/*
上传图片-------------------------------------------------------------------
*/
function uploadCreateThemeImg1(){
    var logoPath;
    $('#addbrand_img3').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=3',
        success:function( data ) {

            isUpload1 = true;
            upLoadPic1 = data.info[0];


            $(".showImg1").attr("src",upLoadPic1);
            $('.parentFileBox').remove();

        },
        error:function( err ) {
            alert('网络连接失败，请稍后重试~');
        },
        buttonText : '选择图片',
        chunked:true,
        // 分片大小
        chunkSize:1024 * 1024,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileNumLimit:1,
        fileSizeLimit:1024 * 1024,
        fileSingleSizeLimit:1024 * 1024,
        accept:{
            title:"Images",
            extensions:"jpg,jpeg,bmp,png",
            mimeTypes:"image/jpg,image/jpeg,image/bmp,image/png"
        }
    });
}
uploadCreateThemeImg1();
/*上传图片*/
function uploadCreateThemeImg2(){
    var logoPath;
    $('#addbrand_img5').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=3',
        success:function( data ) {

            isUpload2 = true;
            upLoadPic2 = data.info[0];


            $(".showImg2").attr("src",upLoadPic2);
            $('.parentFileBox').remove();

        },
        error:function( err ) {
            alert('网络连接失败，请稍后重试~');
        },
        buttonText : '选择图片',
        chunked:true,
        // 分片大小
        chunkSize:1024 * 1024,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileNumLimit:1,
        fileSizeLimit:1024 * 1024,
        fileSingleSizeLimit:1024 * 1024,
        accept:{
            title:"Images",
            extensions:"jpg,jpeg,bmp,png",
            mimeTypes:"image/jpg,image/jpeg,image/bmp,image/png"
        }
    });
}

uploadCreateThemeImg2();
//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }else{
        return null;
    }
};
