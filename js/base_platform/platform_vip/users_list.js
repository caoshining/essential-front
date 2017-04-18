/**
 * Created by chenM on 2016/8/10.
 */

$('.screening_btn').on('click',function (){
    users_lists();
})
users_lists();
function users_lists(){

    var pageIndex = 1;
    var userName = null;
    var platform = null;
    var status = null;
    var userNickname = null;
    var userSex = null;

    /*账号*/
    if($('.screening_account').val()==''){
        userName = null;
    }else{
        userName = $('.screening_account').val();
    }
    /*昵称*/
    if($('.screening_name').val()==''){
        userNickname = null;
    }else{
        userNickname = $('.screening_name').val();
    }

    /*性别*/

    if($('.screening_sex').val()==''){
        userSex = null;
    }else if($('.screening_sex').val()=='男'){
        userSex = 0;
    }else if($('.screening_sex').val()=='女'){
        userSex = 1;
    }
    /*用户类型*/

    if($('.user_types').val()==''){
        platform = null;
    }else if($('.user_types').val()=='手机用户'){
        platform = 0;
    }else if($('.user_types').val()=='QQ用户'){
        platform = 1;
    }else if($('.user_types').val()=='微信用户'){
        platform = 2;
    }else if($('.user_types').val()=='微博用户'){
        platform = 3;
    }

    /*状态*/
   if($('.screening_state').val()==''){
       status = null;
   }else if($('.screening_state').val()=='正常'){
       status = 0;
   }else if($('.screening_state').val()=='禁用'){
       status = 2;
   }


    var parmaData = {
        pageIndex:pageIndex,
        userName:userName,
        platform:platform,
        status:status,
        userNickname:userNickname,
        userSex:userSex
    };
    //console.log(parmaData)

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/userInfo/queryUserList',
        dataType: 'json',
        data:parmaData,
        success:function (res){
            //console.log(res)
            if(res.code == 1){
                var result = '';
                $('.lists tbody').html('');
                $.each(res.info.userList,function (i,v){
                    result+=' <tr>'+
                            ' <td >'+
                            ' <img src='+v.userIcon+' >'+
                            ' </td>'+
                            ' <td>'+v.userName+'</td>'+
                            ' <td>'+v.userNickname+'</td>'+
                            ' <td>'+v.userDiscri+'</td>'+
                            ' <td>'+v.userSex+'</td>'+
                            ' <td>'+v.platform+'</td>'+
                            ' <td>'+timeFn(v.createTime)+'</td>'+
                            ' <td><a href="#" class="look">查看</a></td>'+
                            ' <td class="showStatus">'+v.status+'</td>'+
                            ' <td><a href="#" class="control">禁用</a></td>'+
                        ' </tr>'

                })
                $('.lists tbody').html(result);
                $('.total').html('共'+res.info.count+'条');
                $("#Pagination").pagination(res.info.count, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    items_per_page:10 //每页显示6项
                });
                function  pageselectCallback(page_index){

                    var pageIndex = page_index+1;
                    var parmaData1 = {
                        pageIndex:page_index+1,
                        userName:userName,
                        platform:platform,
                        status:status,
                        userNickname:userNickname,
                        userSex:userSex
                    };

                    $.ajax({
                        type: "post",
                        url: PLATFORM_URL_PRE+'/essential/userInfo/queryUserList',
                        dataType: 'json',
                        data:parmaData1,
                        success:function (res){
                            if(res.code == 1){

                                var result = '';
                                $('.lists tbody').html('');
                                $.each(res.info.userList,function (i,v){
                                    /*性别*/
                                    if(v.userSex == 0){
                                        v.userSex = '男';
                                    }else if(v.userSex == 1){
                                        v.userSex = '女';
                                    }

                                    /*用户类型*/
                                    if(v.platform == 0){
                                        v.platform = '手机用户';
                                    }else if(v.platform == 1){
                                        v.platform = 'QQ用户';
                                    }else if(v.platform == 2){
                                        v.platform = '微信用户';
                                    }else if(v.platform == 3){
                                        v.platform = '微博用户';
                                    }
                                    var controlStatus;
                                    /*状态*/
                                    if(v.status == 0){
                                        v.status = '正常';
                                        controlStatus = '禁用'
                                    }else if(v.status == 2){
                                        v.status = '禁用';
                                        controlStatus = '启用'
                                    }


                                    result+=' <tr userId = '+v.userId+'>'+
                                        ' <td >'+
                                        ' <img src='+v.userIcon+' >'+
                                        ' </td>'+
                                        ' <td>'+v.userName+'</td>'+
                                        ' <td>'+v.userNickname+'</td>'+
                                        ' <td>'+v.userDiscri+'</td>'+
                                        ' <td>'+v.userSex+'</td>'+
                                        ' <td>'+v.platform+'</td>'+
                                        ' <td>'+timeFn(v.createTime)+'</td>'+
                                        ' <td><a href="#" class="look">查看</a></td>'+
                                        ' <td class="showStatus">'+v.status+'</td>'+
                                        ' <td><a href="#" class="control">'+controlStatus+'</a></td>'+
                                        ' </tr>'

                                })
                                $('.lists tbody').html(result);

                            }

                        }
                    });
                };
            }

        }
    });
};


/*点击查看，查看用户的订单*/

$(document).on('click','.look',function (){
    //alert(PLATFORM_LOGIN_USER_ID);
    $('.new_push_msg').show();
    $('.users_lists').hide();
    var userId = $('.lists tbody tr').eq($(this).index('.look')).attr('userid');
    var loginUserId = PLATFORM_LOGIN_USER_ID;
    showUserOrder(1,loginUserId,userId)
})


function showUserOrder(page,loginUserId,userId){

    var parmaData = {
        pageNo:page,
        loginUserId:loginUserId,
            userId:userId
    };

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/queryOrder/platform/queryOrderByShopId',
        dataType: 'json',
        data: parmaData,
        success: function (res) {

            if(res.code == 1){
                var result = '';
                $.each(res.info.orderProductVos,function (i,v){

                    if(v.orderStatus == 0){
                        v.orderStatus = '取消订单';
                    }else if(v.orderStatus == 1){
                        v.orderStatus = '等待买家付款';
                    }else if(v.orderStatus == 2){
                        v.orderStatus = '等待商家发货';
                    }else if(v.orderStatus == 3){
                        v.orderStatus = '商家已发货';
                    }else if(v.orderStatus == 4){
                        v.orderStatus = '订单完成';
                    }else if(v.orderStatus == 5){
                        v.orderStatus = '订单关闭';
                    }
                    result += '<tr class="order_details_title clear">'+
                        '<td colspan="7" style="margin-bottom: 20px">'+
                    '<p class="title_l"><span>订单号:'+ v.orderNumber+'</span><span>下单时间:'+ v.createTime+'</span></p>'+
                    '<p class="title_r"><a href="#">查看详情</a>   <a href="#">备注</a></p>'+
                    '</td>'+
                    '</tr>'
                    $.each(v.orderProducts,function (j,k){


                       if(j==0){

                           result += '<tr>'+
                               '<td  style="width: 364px">'+
                               '<img src='+ k.productPic+'>'+
                               '<div>'+ k.productName+ k.productSpecification+'<p style="margin-top: 20px">商品代码：'+ k.articleNumber +'</p></div>'+
                               '</td>'+
                               '<td  style="width: 80px">￥'+ k.productPrice+'</td>'+
                               '<td style="width: 68px">'+ k.productCount+'</td>'+
                               '<td style="width: 68px">'+ k.returnRefundStatus+'</td>'+
                               '<td rowspan='+(v.orderProducts.length)+'>'+ v.userNickname+'</td>'+
                               '<td rowspan='+(v.orderProducts.length)+'>'+
                               '<p>'+ v.orderStatus+'</p>'+
                               '<p><button>'+ v.orderStatus+'</button></p>'+
                               '</td>'+
                               '<td rowspan='+(v.orderProducts.length)+'>'+
                               '<p>￥'+ v.finalPrice+'</p>'+
                               '<p>(含快递'+ v.freight+'元)</p>'+
                               '</td>'+
                               '</tr>'
                       }else{

                           result += '<tr>'+
                               '<td  style="width: 364px">'+
                               '<img src='+ k.productPic+'>'+
                               '<div>'+ k.productName+ k.productSpecification+'<p style="margin-top: 20px">商品代码：'+k.articleNumber+'</p></div>'+
                               '</td>'+
                               '<td  style="width: 80px">￥'+ k.productPrice+'</td>'+
                               '<td style="width: 68px">'+ k.productCount+'</td>'+
                               '<td style="width: 68px">'+ k.returnRefundStatus+'</td>'+
                               '</tr>'
                       }
                    })
                });
                $('.order_details_box').html(result);

                $("#Pagination1").pagination(res.info.totalPageCount, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback1,
                    items_per_page:10 //每页显示10项
                });
                function  pageselectCallback1(page_index){

                    $('#Pagination1').children().css('margin','5px');

                    var parmaData = {
                        pageNo:page_index+1,
                        loginUserId:loginUserId,
                        userId:userId
                    };
                    $.ajax({
                        type: "post",
                        url: PLATFORM_URL_PRE + '/essential/queryOrder/platform/queryOrderByShopId',
                        dataType: 'json',
                        data: parmaData,
                        success: function (res) {

                            if(res.code == 1){
                                var result = '';
                                $.each(res.info.orderProductVos,function (i,v){

                                    if(v.orderStatus == 0){
                                        v.orderStatus = '取消订单';
                                    }else if(v.orderStatus == 1){
                                        v.orderStatus = '等待买家付款';
                                    }else if(v.orderStatus == 2){
                                        v.orderStatus = '等待商家发货';
                                    }else if(v.orderStatus == 3){
                                        v.orderStatus = '商家已发货';
                                    }else if(v.orderStatus == 4){
                                        v.orderStatus = '订单完成';
                                    }else if(v.orderStatus == 5){
                                        v.orderStatus = '订单关闭';
                                    }
                                    result += '<tr class="order_details_title clear">'+
                                        '<td colspan="7" style="margin-bottom: 20px">'+
                                        '<p class="title_l"><span>订单号:'+ v.orderNumber+'</span><span>下单时间:'+ v.createTime+'</span></p>'+
                                        '<p class="title_r"><a href="#">查看详情</a>   <a href="#">备注</a></p>'+
                                        '</td>'+
                                        '</tr>'
                                    $.each(v.orderProducts,function (j,k){


                                        if(j==0){

                                            result += '<tr>'+
                                                '<td  style="width: 364px">'+
                                                '<img src='+ k.productPic+'>'+
                                                '<div>'+ k.productName+ k.productSpecification+'<p style="margin-top: 20px">商品代码：'+k.articleNumber+'</p></div>'+
                                                '</td>'+
                                                '<td  style="width: 80px">￥'+ k.productPrice+'</td>'+
                                                '<td style="width: 68px">'+ k.productCount+'</td>'+
                                                '<td style="width: 68px">'+ k.returnRefundStatus+'</td>'+
                                                '<td rowspan='+(v.orderProducts.length)+'>'+ v.userNickname+'</td>'+
                                                '<td rowspan='+(v.orderProducts.length)+'>'+
                                                '<p>'+ v.orderStatus+'</p>'+
                                                '<p><button>'+ v.orderStatus+'</button></p>'+
                                                '</td>'+
                                                '<td rowspan='+(v.orderProducts.length)+'>'+
                                                '<p>￥'+ v.finalPrice+'</p>'+
                                                '<p>(含快递'+ v.freight+'元)</p>'+
                                                '</td>'+
                                                '</tr>'
                                        }else{

                                            result += '<tr>'+
                                                '<td  style="width: 364px">'+
                                                '<img src='+ k.productPic+'>'+
                                                '<div>'+ k.productName+ k.productSpecification+'<p style="margin-top: 20px">商品代码：'+k.articleNumber+'</p></div>'+
                                                '</td>'+
                                                '<td  style="width: 80px">￥'+ k.productPrice+'</td>'+
                                                '<td style="width: 68px">'+ k.productCount+'</td>'+
                                                '<td style="width: 68px">'+ k.returnRefundStatus+'</td>'+
                                                '</tr>'
                                        }
                                    })
                                });
                                $('.order_details_box').html(result);
                            }
                        },
                        error: function (res) {
                            alert('网络连接失败，请稍后重试')
                        }
                    })
                }
            }
        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }
    })
};
/*点击返回到用户列表*/
$('.return button').on('click',function (){

    $('.new_push_msg').hide();
    $('.users_lists').show();
})


/*点击禁用，启用*/

$(document).on('click','.control',function (e){
    e.stopImmediatePropagation();
    //alert($(this).index('.control'))
    var _index = $(this).index('.control');
    var userId = $('.lists tbody tr').eq($(this).index('.control')).attr('userid');
    var showStatus = $('.lists tbody .showStatus').eq($(this).index('.control'))
    var modifyUserId = PLATFORM_LOGIN_USER_ID;
    var _this = $(this);
    var status;
    if($(this).html()=='禁用'){
        status = 2;
  /*      $(this).html('启用');
        showStatus.html('禁用');*/

    }else if($(this).html()=='启用'){
        status = 0;
  /*      $(this).html('禁用');
        showStatus.html('正常');*/
    }
    var parmaData = {
        userId:userId,
        modifyUserId:modifyUserId,
        requestType:7,
        status:status
    };
    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/userInfo/modUserBaseInfo',
        dataType: 'json',
        data:parmaData,
        success:function (res){

            if(res.code == 1){
                alert(res.msg);

                if(_this.html()=='禁用'){

                    _this.html('启用');
                    showStatus.html('禁用');

                }else if(_this.html()=='启用'){

                    _this.html('禁用');
                    showStatus.html('正常');
                }

            }


        },
        error:function (res){
            alert('网络连接失败，请稍后重试')
        }
    })


    /*if(){

    }
    $('.showStatus').html()*/
})



//时间截取
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}