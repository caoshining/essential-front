/**
 * Created by wangs on 2016/8/2.
 */

$("#Delivery_layout").html('');

var html = $("#Delivery_Tmp").render(orderIndex);
$("#Delivery_layout").append(html);

//点击确定发货

$("#delivery").click(function(){
    var courierVal=$("#courier_Choose").val();
    var awbNumber=$(".awbNumber").val();
    var consigner=$(".consigner").val();
    var deliveryTime=$(".deliveryTime").val();

    if(courierVal == ''){
        alert('物流公司不能为空！');
        return false;
    }
    if(awbNumber == ''){
        alert("运单号不能为空!");
        return false;
    }
    if(consigner == ''){
        alert("发货人不能为空!");
        return false;
    }
    if(deliveryTime == ''){
        alert("请填写发货时间！");
        return false;
    }
    else{

        DeliverGoods({
            'orderId':orderIndex.orderId,
            'loginUserId':BUSINESS_LOGIN_USER_ID,
            'consignor':consigner,
            'deliveryTime':deliveryTime,
            'logisticNumber':awbNumber,
            'logisticsCompany':courierVal});
    }

});

function deliveryTime(){
    var start = {
        dateCell: '#deliveryTime',
        format: 'YYYY-MM-DD hh:mm:ss',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        isinitVal:true,
        festival:true,
        ishmsVal:false,
        maxDate: jeDate.now(0), //最大日期
        choosefun: function(elem,datas){
            //end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    /*var end = {
        dateCell: '#discount-input-time2',
        format: 'YYYY-MM-DD hh:mm:ss',
        minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        festival:true,
        ishmsVal:false,
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function(elem,datas){
            start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
        }
    };*/
    jeDate(start);
    //jeDate(end);
}
deliveryTime();