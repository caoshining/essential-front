/**
 * Created by chenM on 2016/10/21
 */

/*当前登录用户Id*/
var userId = PLATFORM_LOGIN_USER_ID;

var couponType =1;
/*点击切换*/
$('.tab_list span').on('click',function (){
    couponType = $(this).attr('coupontype');
    $('.tab_list span').removeClass('select');
    $('.search_coupons').val('');
    $(this).addClass('select');
    getCouponsData();
});
/*点击搜索*/

$('.search_coupons').on('change',function (){
    getCouponsData();
});

getCouponsData();
function getCouponsData(){
    var couponName = $('.search_coupons').val();
    getCouponsList();
    function  getCouponsList(){
        var parmaData = {
            couponName:couponName,
            pageIndex:1,
            pageSize:10,
            type:couponType
        };

        $.ajax({
            type:"post",
            url:PLATFORM_URL_PRE+'/essential/coupon/couponList',
            dataType: 'json',
            data:parmaData,
            beforeSend:function(){
                $('.coupons_list tbody').html('');
                //$(".productLists .Img_Load").remove();
                $('.themeListBox').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
            },

            success:function (res){

                $(".themeListBox .Img_Load").remove();
                if(res.code == 1){
                    if(!res.info.couponList.length){
                        return;
                    }
                    var result = '';
                    var couponTypeStr = '';
                    var issuingScopeStr = '';
                    var str = ''
                    $.each(res.info.couponList,function (i,v){
                        if(v.couponType == 1){
                            couponTypeStr = '满减送';
                            str = '满'+ v.minimumAmount+'元';
                        }else{
                            couponTypeStr = '代金券';
                            str = '';
                        }
                        if(v.issuingScope == 1){
                            issuingScopeStr = '全部用户';
                        }else if(v.issuingScope == 2){
                            issuingScopeStr = '新用户';
                        }else{
                            issuingScopeStr = '兑换';
                        }
                        result +='<tr couponId='+v.couponId+'>'+
                            '<td>'+ v.couponName+'</td>'+
                            '<td>'+ couponTypeStr+'</td>'+
                            '<td>'+str+'</td>'+
                            '<td>'+ v.couponAmount+'</td>'+
                            '<td>'+ subStringTime(v.startTime)+'至'+subStringTime(v.endTime)+'</td>'+
                            '<td>'+ issuingScopeStr+'</td>'+
                            '<td>'+ v.couponStateName+'</td>'+
                            '<td>'+
                            '<span class="editor">编辑</span>-<span class="delete">删除</span>'+
                            '</td>'+
                            ' </tr>'
                    });

                    $('.coupons_list tbody').html(result);
                    $('.pagination_span').html('共'+Math.ceil(res.info.pageCount/10)+'页 每页10条');
                    getListPagePlus(res.info.pageCount);
                }
            },
            error:function (){
                alert('网络连接失败，请稍后重试');
            }
        });
    }

    /*分页调数据*/

    function getCouponsListForPage(page){
        var parmaData = {
            couponName:couponName,
            pageIndex:page,
            pageSize:10,
            type:couponType
        };

        $.ajax({
            type:"post",
            url:PLATFORM_URL_PRE+'/essential/coupon/couponList',
            dataType: 'json',
            data:parmaData,
            beforeSend:function(){
                $('.coupons_list tbody').html('');
                //$(".productLists .Img_Load").remove();
                $('.themeListBox').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
            },

            success:function (res){

                $(".themeListBox .Img_Load").remove();
                if(res.code == 1){
                    if(!res.info.couponList.length){
                        return;
                    }
                    var result = '';
                    var couponTypeStr = '';
                    var issuingScopeStr = '';
                    var str = ''
                    $.each(res.info.couponList,function (i,v){
                        if(v.couponType == 1){
                            couponTypeStr = '满减送';
                            str = '满'+ v.minimumAmount+'元';
                        }else{
                            couponTypeStr = '代金券';
                            str = '';
                        }
                        if(v.issuingScope == 1){
                            issuingScopeStr = '全部用户';
                        }else if(v.issuingScope == 2){
                            issuingScopeStr = '新用户';
                        }else{
                            issuingScopeStr = '兑换';
                        }
                        result +='<tr couponId='+v.couponId+'>'+
                            '<td>'+ v.couponName+'</td>'+
                            '<td>'+ couponTypeStr+'</td>'+
                            '<td>'+str+'</td>'+
                            '<td>'+ v.couponAmount+'</td>'+
                            '<td>'+subStringTime(v.startTime)+'至'+subStringTime(v.endTime)+'</td>'+
                            '<td>'+ issuingScopeStr+'</td>'+
                            '<td>'+ v.couponStateName+'</td>'+
                            '<td>'+
                            '<span class="editor">编辑</span>-<span class="delete">删除</span>'+
                            '</td>'+
                            ' </tr>'
                    });

                    $('.coupons_list tbody').html(result);
                }
            },
            error:function (){
                alert('网络连接失败，请稍后重试');
            }
        });
    };
    //商品分页
    function getListPagePlus(totalPageCount){

        $('.pagination1').paging(totalPageCount, {
            format: '[< ncnnn >]',
            perpage: '10',
            onSelect: function(page) {
                getCouponsListForPage(page);
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
/*点击新建优惠券*/
$('.go_create_btn').on('click',function (){
    $("#coupons_manage").html('');
    $("#coupons_manage").load("pages/base_platform/business/platform_coupons/create_cuupons.html");
    $('#Market_Promotion .tab-pane').removeClass("active");
    $("#coupons_manage").addClass("active");
});
/*点击删除优惠券*/

$(document).on('click','.delete',function (e){
    e.stopImmediatePropagation();
   var ele = $(this).parent().parent();
    var couponid = ele.attr('couponid');
    if(confirm('确定删除吗？')){
        $.ajax({
            type:"post",
            url:PLATFORM_URL_PRE+'/essential/coupon/deleteCoupon',
            dataType: 'json',
            data:{
                couponId:couponid,
                loginUser:userId
            },
            success:function (res){

                if(res.code == 1){
                    ele.remove();
                }
                alert(res.msg);

            },
            error:function (){
                alert('网络连接失败，请稍后重试');
            }
        });
    };
});
/*点击编辑*/
$(document).on('click','.editor',function (e){
    e.stopImmediatePropagation();
    var ele = $(this).parent().parent();
    window.couponid = ele.attr('couponid');
    $("#coupons_manage").html('');
    $("#coupons_manage").load("pages/base_platform/business/platform_coupons/editor_coupon.html?couponid="+couponid);
    $('#Market_Promotion .tab-pane').removeClass("active");
    $("#coupons_manage").addClass("active");
});

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

/*截取时间*/

function subStringTime(time){
    if(time.length > 10){
        return time.substring(0,10);
    }else{
        return time;
    }
};