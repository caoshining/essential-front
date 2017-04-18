/**
 * Created by chenM on 2016/8/3.
 */
/*得到userId的值*/
//var userId = GetQueryString('userId')


/*取session里面的userId*/
//var busi_userId = sessionStorage.getItem("busi_userId");
busi_userId=BUSINESS_LOGIN_USER_ID;

var shopId ;
//alert(busi_userId)
//busi_userId = 100;
getStoreMsg();
function getStoreMsg(){
    $.ajax({
        type: "post",
        url: BUSINESS_URL_PRE+'/essential/shopBackstageInfoController/queryShopInfo',
        dataType: 'json',
        data:{
            userId:BUSINESS_LOGIN_USER_ID
        },
        success:function (res){
            //console.log(res);
            if(res.code == 1){
                //shopId = res.info.shopId;
                /*保存shopId*/
                //BUSINESS_LOGIN_SHOP_ID =shopId;
                $('.merchantHome .success_status').hide();
                $('.merchantHome .failure_status').show();
                $('.dp_logo').attr('src',res.info.logoPath);

                $('.waitSet').html(res.info.name);
                $('.time').html(res.info.createTime);
                $('.waitAudit').html(res.info.checkStatusName);
                $('.navbar-brand_R small').html(res.info.name+'—设置');
                HomePageFn();
            }else if(res.code==2){
                $(".black a:not(a[href='#Shop'])").removeAttr("data-toggle");
                $('.merchantHome .failure_status').hide();
                $('.merchantHome .success_status').show();
                $('.navbar-brand_R small').html('设置');
            }else if(res.code==0){
                $(".black a").removeAttr("data-toggle");
                alert(res.msg);
            }
        },
        error:function (res){
            alert('网络连接失败，请稍后重试');
        }
    });
}






function HomePageFn(){

    $.ajax({
        type: "post",
        url: BUSINESS_URL_PRE+'/essential/business/queryIndexInfo',
        dataType: 'json',
        data:{
            shopId:BUSINESS_LOGIN_SHOP_ID
        },
        success:function (res){

            if(res.code == 1){
                $('.wait_send').html(res.info.pendingProccessOrders[0].goodsCount);
                $('.wait_payment').html(res.info.pendingProccessOrders[0].moneyCount);
                $('.Return_money').html(res.info.pendingProccessOrders[1].goodsCount);
                $('.Return_goods').html(res.info.pendingProccessOrders[1].moneyCount);

                $('.Saling_goods').html(res.info.productCoun.productInSaleCount);
                $('.warehouse_goods').html(res.info.productCoun.productInStorehouseCount);
                $('.over_goods').html(res.info.productCoun.productSaleOutCount);

                $('.order_number').html(res.info.operationData.todayOrderNumber);
                $('.sevenDays_money').html("￥"+res.info.operationData.nearlySevenDaysTransactionAmount);
                $('.thirty_money').html("￥"+res.info.operationData.nearlyThirtyDaysTransactionAmount);
                $('.today_money').html("￥"+res.info.operationData.todayTransactionAmount);
            }
        },
        error:function(){
            alert('网络连接失败，请稍后重试~');
        }
    });
};
/*去设置*/
/*$(".go_set").click(function(){$("a[href='#Shop_set']").trigger("click")})*/

$(".go_set").click(function(){
    var parmaData = {
        userId:busi_userId
    };
    $.ajax({
        type: "post",
        url: BUSINESS_URL_PRE+'/essential/shopBackstageInfoController/addShop',
        dataType: 'json',
        data:parmaData,
        success:function (res){
           // console.log(res);
            if(res.code == 1){
                //BUSINESS_LOGIN_SHOP_ID = res.info.shopId
                $("a[href='#Shop_set']").trigger("click");
            };
        },
        error:function (){
            alert('网络连接失败，请稍后重试')
        }
    });
});

