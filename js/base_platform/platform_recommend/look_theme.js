/**
 * Created by chenM on 2016/9/1.
 */

/*tab切换*/
$('.basicInformation').on('click',function (){
    $(this).addClass('selected');
    $('.relatedProducts').removeClass('selected');
    $('.basicInformationBox').show();
    $('.relatedProductsBox').hide();
});
$('.relatedProducts').on('click',function (){
    $(this).addClass('selected');
    $('.basicInformation').removeClass('selected');
    $('.relatedProductsBox').show();
    $('.basicInformationBox').hide();
});


/*显示专题内容*/
showCon();
function showCon(){
    /*创建人*/
    $('.basicInformationBox .author').html(oneListData.createUserName);
    /*标题*/
    $('.basicInformationBox .title').html(oneListData.recommendTitle);
    /*样式选择*/

/*
    $('input:radio[name="radioChoose"]').eq(oneListData.recommendType-1).prop('checked',true);
*/

    if(oneListData.recommendType == 1){
        $('.basicInformationBox .showStyle1').prop('checked',true);

    }else if(oneListData.recommendType == 2){
        $('.basicInformationBox .showStyle2').prop('checked',true);


    }else if(oneListData.recommendType == 3){
        $('.basicInformationBox .showStyle3').prop('checked',true);

    }

    /*封面图*/
    $('.basicInformationBox .fengmiantu').attr('src',oneListData.coverPic);
    /*简介*/
    $('.basicInformationBox .abstract').html(oneListData.recommendIntroduction);
    /*主图*/
    $('.basicInformationBox .mainPic').attr('src',oneListData.mainPicPath);
    /*活动描述*/
    $('.basicInformationBox .activityDescription').html(oneListData.recommendDescription);
};


/*获取相关商品*/
getRelatedProducts(oneListData.recommendId);
function getRelatedProducts(recommendId){
    var parmaData = {
        recommendId:recommendId
    };
    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/recommend/queryRecommendRelatedProduct',
        dataType: 'json',
        data:parmaData,
        beforeSend:function(){
            $('.relatedProductsBox table tbody').html('');
            //$(".productLists .Img_Load").remove();
            $('.relatedProductsBox table tbody').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function (res){

            if(res.code == 1){

                var result = '';
                $(".relatedProductsBox .Img_Load").remove();
                $('.relatedProductsBox tbody').html('');
                if(res.info.relatedProducts == null){
                    return;
                }
                $.each(res.info.relatedProducts,function (i,v){
                    if(v.linkFrom == 0){
                        v.linkFrom = '否';
                    }else if(v.linkFrom == 1){
                        v.linkFrom = '是';
                    }

                    if(v.saleStatus == 1){
                        v.saleStatus = '上架';
                    }else if(v.saleStatus == 2){
                        v.saleStatus = '强制下架';
                    }else if(v.saleStatus == 0){
                        v.saleStatus = '下架';
                    }

                    if(v.activityFlag == 0){
                        result += '<tr productId = '+ v.productId+'>'+
                            '<td class="clear">'+
                            '<div class="imgBox">'+
                            '<img  src='+ v.path+'>'+
                            '<p>'+ v.articleNumber+'</p>'+
                            '</div>'+
                            '<div class="describeBox" style="width: 130px">'+
                            '<p>'+ v.productName+'</p>'+
                            '<p>￥'+v.costPrice+'</p>'+
                            '</div>'+
                            '</td>'+
                            '<td>'+v.brandName+'</td>'+
                            '<td>'+v.categoryName+'</td>'+
                            '<td>'+v.shopName+'</td>'+
                            '<td>'+v.stock+'</td>'+
                            '<td>'+v.saleNum+'</td>'+
                            '<td>'+timeFn(v.createTime)+'</td>'+
                            '<td>'+v.saleStatus+'</td>'+
                            '<td>'+ v.linkFrom+'</td>'+
                            '<td><span class="look_Product">查看</span></td>'+
                            '</tr>';
                    }else if(v.activityFlag != 0){
                        result += '<tr productId = '+ v.productId+'>'+
                            '<td class="clear">'+
                            '<div class="imgBox">'+
                            '<img  src='+ v.path+'>'+
                            '<p>'+ v.articleNumber+'</p>'+
                            '</div>'+
                            '<div class="describeBox" style="width: 130px">'+
                            '<p>'+ v.productName+'</p>'+
                            '<p>￥'+v.activityPrice+'<span class="discount_price">￥'+v.costPrice+'</span><span class="discount_icon">折</span></p>'+
                            '</div>'+
                            '</td>'+
                            '<td>'+v.brandName+'</td>'+
                            '<td>'+v.categoryName+'</td>'+
                            '<td>'+v.shopName+'</td>'+
                            '<td>'+v.stock+'</td>'+
                            '<td>'+v.saleNum+'</td>'+
                            '<td>'+timeFn(v.createTime)+'</td>'+
                            '<td>'+timeFn(v.saleStatus)+'</td>'+
                            '<td>'+ v.linkFrom+'</td>'+
                            '<td><span class="look_Product">查看</span></td>'+
                            '</tr>';
                    }

                });
                $('.relatedProductsBox tbody').html(result);

            }else{
                alert(res.msg);
            }

        },
        error:function (res){
            alert('网络连接失败，请稍后重试')
        }
    });


};
/*点击查看*/
$(document).on('click','.look_Product',function (e){
    e.stopImmediatePropagation();
    var _index = $(this).index('.look_Product');
    window.a=1;
    window.ProductId = $('.relatedProductsBox tbody tr').eq(_index).attr('ProductId');

    $('#create_theme').html('');
    $("#theme_list").load("pages/base_platform/business/platform_recommend/productList_look.html");
})



//时间截取
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}