/**
 * Created by chenM on 2016/9/1.
 */

/*当前登录用户Id*/
var userId = PLATFORM_LOGIN_USER_ID;

var listData = [];

/*获取列表*/
getThemeListConFn();
function getThemeListConFn(){

    var recommendTitle = $('.advertisingActivityTitle input').val();

    getThemeListCon()
    function  getThemeListCon(){
        var parmaData = {
            loginUserId:userId,
            recommendTitle:recommendTitle,
            status:1,
            pageNo:1
        };
        $.ajax({
            type:"post",
            url:PLATFORM_URL_PRE+'/essential/recommend/queryAdvertisingForList',
            dataType: 'json',
            data:parmaData,
            beforeSend:function(){
                $('.themeListBox tbody').html('');
                //$(".productLists .Img_Load").remove();
                $('.themeListBox tbody').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
            },
            success:function (res){


                if(res.code == 1){
                    var result = '';
                    $(".themeListBox .Img_Load").remove();
                    $('.themeListBox tbody').html('');
                    listData = res;
                    if(res.info.recommendList != null){
                        $.each(res.info.recommendList,function (i,v){
                            if(v.advertisingPositionFlag == 0){
                                v.advertisingPositionFlag = '未选择';
                            }else if(v.advertisingPositionFlag == 1){
                                v.advertisingPositionFlag = '取消选择';
                            }
                            if(v.status == 1){
                                v.status = '上线';
                            }else if(v.status == 0){
                                v.status = '下线';
                            }
                            result += '<tr recommendId = '+ v.recommendId+'>'+
                                '<td>'+ v.recommendId+'</td>'+
                                '<td>'+ v.recommendTitle+'</td>'+
                                '<td>'+ v.createUserName+'</td>'+
                                '<td>'+ v.status+'</td>'+
                                '<td class="time">'+ timeFn(v.createTime)+'</td>'+
                                '<td class="time">'+ timeFn(v.statusTime)+'</td>'+
                                '<td>'+
                                '<p class="LookTheme">查看</p>'+
                                '<p class="choose" >'+ v.advertisingPositionFlag+'</p>'+
                                '<p class="goTop">置顶</p>'+
                                '</td>'+
                                '</tr>';
                        });

                    };
                    $('.pagination_span').html('共'+Math.ceil(res.info.totalCount/10)+'页 每页10条');
                    $('.themeListBox tbody').html(result);
                    getListConPagePlus(res.info.totalCount);
                }else{
                    alert(res.msg)
                }
            },
            error:function (){
                alert('网络连接失败，请稍后重试');
            }
        });

    };

    /*分页数据*/

    function getListConForPage(page){
        var parmaData = {
            status:1,
            recommendTitle:recommendTitle,
            pageNo:page,
            loginUserId:userId
        };

        $.ajax({
            type:"post",
            url:PLATFORM_URL_PRE+'/essential/recommend/queryAdvertisingForList',
            dataType: 'json',
            data:parmaData,
            beforeSend:function(){
                $('.themeListBox tbody').html('');
                //$(".productLists .Img_Load").remove();
                $('.themeListBox tbody').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
            },
            success:function (res){
                if(res.code == 1){
                    var result = '';
                    $(".themeListBox .Img_Load").remove();
                    $('.themeListBox tbody').html('');
                    listData = res;
                    if(res.info.recommendList != null){
                        $.each(res.info.recommendList,function (i,v){
                            if(v.advertisingPositionFlag == 0){
                                v.advertisingPositionFlag = '未选择';
                            }else if(v.advertisingPositionFlag == 1){
                                v.advertisingPositionFlag = '取消选择';
                            }
                            if(v.status == 1){
                                v.status = '上线';
                            }else if(v.status == 0){
                                v.status = '下线';
                            }
                            result += '<tr recommendId = '+ v.recommendId+'>'+
                                '<td>'+ v.recommendId+'</td>'+
                                '<td>'+ v.recommendTitle+'</td>'+
                                '<td>'+ v.createUserName+'</td>'+
                                '<td>'+ v.status+'</td>'+
                                '<td class="time">'+ timeFn(v.createTime)+'</td>'+
                                '<td class="time">'+ timeFn(v.statusTime)+'</td>'+
                                '<td>'+
                                '<p class="LookTheme">查看</p>'+
                                '<p class="choose" >'+ v.advertisingPositionFlag+'</p>'+
                                '<p class="goTop">置顶</p>'+
                                '</td>'+
                                '</tr>';
                        });

                    };
                    $('.themeListBox tbody').html(result);

                }else{
                    alert(res.msg)
                }
            },
            error:function (){
                alert('网络连接失败，请稍后重试');
            }
        });

    };


    //商品分页
    function getListConPagePlus(totalPageCount){

        $('.pagination6').paging(totalPageCount, {
            format: '[< ncnnn >]',
            perpage: '10',
            onSelect: function(page) {
                getListConForPage(page);
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
$('.advertisingScreeningBox .advertisingScreeningBtn').on('click',function (e){
    e.stopImmediatePropagation();
    getThemeListConFn();
})
/*点击查看*/

$(document).on('click','.themeListBox .LookTheme',function (e){
    e.stopImmediatePropagation();
    var _index = $(this).index('.themeListBox .LookTheme');
    var recommendId = $('.themeListBox tbody tr').eq(_index).attr('recommendId');
    getOneData(recommendId);

    $("#advertising_management").load("pages/base_platform/business/platform_recommend/look_theme.html");
});


/*渲染广告位*/
showAdvertisingList()
function  showAdvertisingList(){
    var parmaData = {
        loginUserId:userId,
        pageNo:1
    };
    $.ajax({
        type:"post",
        url:PLATFORM_URL_PRE+'/essential/recommend/queryAdvertisingForList',
        dataType: 'json',
        data:parmaData,
        success:function (res){
            if(res.code == 1){
                if(res.info.advertList){
                    var result1 = '';
                    $('.showProductPic').html('')
                    $.each(res.info.advertList,function (i,v){
                        result1 += '<div class="showItem" recommendId = '+ v.recommendId+'>'+
                            '<img src='+ v.coverPic+'>'+
                            '<div class="showItemText">'+ v.recommendTitle+'</div>'+
                            '<div class="markBox">取消选择</div>'+
                            '</div>';
                    });
                };
                $('.showProductPic').html(result1);
            }else{
                alert(res.msg)
            }
        },
        error:function (){
            alert('网络连接失败，请稍后重试');
        }
    });

};
/*点击广告位*/
$(document).on('mouseover','.showItem',function(){
    var _index = $(this).index('.showItem');
    $('.markBox').eq(_index).show();
});
$(document).on('mouseout','.showItem',function(){
    var _index = $(this).index('.showItem');
    $('.markBox').eq(_index).hide();
});
/*$(document).on('click','.showItem',function(){
    $(this).remove();
});*/

/*点击选择，设置广告位*/
$(document).on('click','.choose',function(e){

    e.stopImmediatePropagation();
    var _index = $(this).index('.choose');
    var _this = $(this);
    var recommendId = $('.themeListBox tbody tr').eq(_index).attr('recommendId');
    var flag;
    if($(this).html()=='未选择'){
        if($('.showProductPic .showItem').length == 8){
            alert('只能添加8个广告位');
            return;
        }
        flag = 1;

    }else if($(this).html()=='取消选择'){
        flag = 0;
    };
    var parmaData = {
        recommendId:recommendId,
        flag:flag,
        type:2
    };

    $.ajax({
        type:"post",
        url:PLATFORM_URL_PRE+'/essential/recommend/advertisingPositionManager',
        dataType: 'json',
        data:parmaData,
        success:function (res){

            if(res.code == 1){
                if(_this.html()=='未选择'){
                    _this.html('取消选择');
                }else if(_this.html()=='取消选择'){
                    _this.html('未选择');
                };
                showAdvertisingList();
            }
        },
        error:function (res){
            aletr("网络连接失败，请稍后重试");
        }
    });
});
/*点击取消选择，去掉广告位*/
$(document).on('click','.showItem',function(){
    var recommendId = $(this).attr('recommendId');
    var parmaData = {
        recommendId:recommendId,
        flag:0,
        type:2
    };

    $.ajax({
        type:"post",
        url:PLATFORM_URL_PRE+'/essential/recommend/advertisingPositionManager',
        dataType: 'json',
        data:parmaData,
        success:function (res){

            if(res.code == 1){
                showAdvertisingList();
                getThemeListConFn();
            }
        },
        error:function (res){
            aletr("网络连接失败，请稍后重试");
        }
    });
});


/*根据推荐ID查一条数据*/
function getOneData(recommendId){

    $.each(listData.info.recommendList,function (i,v){
        if(v.recommendId == recommendId){
            oneListData = v;
        }
    });
};
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
//时间截取
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}