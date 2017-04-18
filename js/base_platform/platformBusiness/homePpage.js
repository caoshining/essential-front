/**
 * Created by chenM on 2016/7/30.
 */




homePageFn();
function homePageFn(){

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/platform/queryIndexInfo',
        dataType: 'json',
        success:function (res){
            if(res.code == 1){
                /*待处理订单*/
                $('.Arefund').html(res.info.pendingProccessOrders[0].moneyCount);
                $('.Return_goods').html(res.info.pendingProccessOrders[0].goodsCount);
                /*商品统计*/

                $('.Sale_goods').html(res.info.productCount.productInSaleCount)
                $('.Number_businesses').html(res.info.productCount.shopCount)
                $('.user_number').html(res.info.productCount.userCount)
                /*运营*/
                $('.order_number').html(res.info.operationData.todayOrderNumber);
                $('.sevenDays_money').html("￥"+res.info.operationData.nearlySevenDaysTransactionAmount);
                $('.thirty_money').html("￥"+res.info.operationData.nearlyThirtyDaysTransactionAmount);
                $('.today_money').html("￥"+res.info.operationData.todayTransactionAmount);
            }

        },
        error: function (res)//服务器响应失败处理函数
        {
            alert('网络连接失败，请稍后重试');
        }
    });
};


