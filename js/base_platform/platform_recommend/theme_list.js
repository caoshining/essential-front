/**
 * Created by chenM on 2016/9/1.
 */

/*当前登录用户Id*/
var userId = PLATFORM_LOGIN_USER_ID;

var listData = [];


/*获取列表*/
getThemeListFn();
function getThemeListFn(){
    var status = $('.activityStatus .status').val();
    var recommendTitle = $('.activityTitle .title').val();

    getList();
    function  getList(){
        var parmaData = {
            status:status,
            recommendTitle:recommendTitle,
            pageNo:1,
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
                $('.themeListBox').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
            },

            success:function (res){
                listData = res;
                if(res.code == 1){
                    var result = '';
                    $(".themeListBox .Img_Load").remove();
                    $('.themeListBox tbody').html('');
                    if(res.info.recommendList == null){
                        return;
                    }
                    $.each(res.info.recommendList,function (i,v){
                        if(v.status == 1){
                            v.statusStr1 = '上线';
                            v.statusStr2 = '下线';
                            v.statusTimeStr = timeFn(v.statusTime);
                        }else if(v.status == 0){
                            v.statusStr1 = '下线';
                            v.statusStr2 = '上线';
                            v.statusTimeStr = "";
                        }
                        result += ' <tr recommendId = '+ v.recommendId+'>'+
                            '<td>'+ v.recommendId+'</td>'+
                            '<td>'+ v.recommendTitle+'</td>'+
                            '<td>'+ v.createUserName+'</td>'+
                            '<td  class="offlineName">'+ v.statusStr1+'</td>'+
                            ' <td class="time">'+ timeFn(v.createTime)+'</td>'+
                            '<td class="time">'+ v.statusTimeStr+'</td>'+
                            '<td>'+
                            '<p class="lookTheme">查看</p>'+
                            '<p class="editor">编辑</p>'+
                            '<p class="offline">'+ v.statusStr2+'</p>'+
                            '</td>'+
                            '</tr>';
                    });
                    $('.pagination_span').html('共'+Math.ceil(res.info.totalCount/10)+'页 每页10条');
                    $('.themeListBox tbody').html(result);
                    getListPagePlus(res.info.totalCount);



                }else{
                    alert(res.msg)
                }
            },
            error:function (){
                alert('网络连接失败，请稍后重试');
            }
        });
    }

       /*分页数据*/

    function getListForPage(page){
        var parmaData = {
            status:status,
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
                $('.themeListBox').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
            },
            success:function (res){

                listData = res;
                if(res.code == 1){
                    var result = '';
                    $(".themeListBox .Img_Load").remove();
                    $('.themeListBox tbody').html('');
                    if(res.info.recommendList == null){
                        return;
                    }
                    $.each(res.info.recommendList,function (i,v){
                        if(v.status == 1){
                            v.statusStr1 = '上线';
                            v.statusStr2 = '下线';
                            v.statusTimeStr = timeFn(v.statusTime);
                        }else if(v.status == 0){
                            v.statusStr1 = '下线';
                            v.statusStr2 = '上线';
                            v.statusTimeStr = "";
                        }
                        result += ' <tr recommendId = '+ v.recommendId+'>'+
                            '<td>'+ v.recommendId+'</td>'+
                            '<td>'+ v.recommendTitle+'</td>'+
                            '<td>'+ v.createUserName+'</td>'+
                            '<td  class="offlineName">'+ v.statusStr1+'</td>'+
                            ' <td class="time">'+ timeFn(v.createTime)+'</td>'+
                            '<td class="time">'+v.statusTimeStr +'</td>'+
                            '<td>'+
                            '<p class="lookTheme">查看</p>'+
                            '<p class="editor">编辑</p>'+
                            '<p class="offline">'+ v.statusStr2+'</p>'+
                            '</td>'+
                            '</tr>';
                    });
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
    function getListPagePlus(totalPageCount){

        $('.pagination1').paging(totalPageCount, {
            format: '[< ncnnn >]',
            perpage: '10',
            onSelect: function(page) {
                getListForPage(page);
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
/*点击查看*/

$(document).on('click','.themeListBox .lookTheme',function (e){
    e.stopImmediatePropagation();
    var _index = $(this).index('.themeListBox .lookTheme');
    var recommendId = $('.themeListBox tbody tr').eq(_index).attr('recommendId');

   getOneData(recommendId);

   $("#theme_list").load("pages/base_platform/business/platform_recommend/look_theme.html");
});
/*点击编辑*/
$(document).on('click','.themeListBox .editor',function (e){
    e.stopImmediatePropagation();

   var _index = $(this).index('.themeListBox .editor');
    var recommendId = $('.themeListBox tbody tr').eq(_index).attr('recommendId');

    getOneData(recommendId);

    $("#theme_list").load("pages/base_platform/business/platform_recommend/editor_theme.html");
});
/*点击上下线*/
$(document).on('click','.themeListBox .offline',function (e){
    e.stopImmediatePropagation();
    var flag;
    var _this = $(this);

    if($(this).html() == '上线'){
        flag = 1;
    }else if($(this).html() == '下线'){
        flag = 0;
    }

    var _index = $(this).index('.themeListBox .offline');
    var recommendId = $('.themeListBox tbody tr').eq(_index).attr('recommendId');
    $('.themeListBox .offlineName').eq(_index).html();
    var offlineName = $('.offlineName').eq(_index);

    $.ajax({
        type:'post',
        url:PLATFORM_URL_PRE+'/essential/recommend/updateStatus',
        dataType:'json',
        data:{
            flag:flag,
            recommendId:recommendId
        },
        success:function (res){

            if(res.code == 1){
                if(flag == 0){
                    _this.html('上线');
                    offlineName.html("下线");

                }else if(flag == 1){
                    _this.html('下线');
                    offlineName.html("上线")
                }

            }
        },
        error:function (res){
            alert('网络连接失败，请稍后重试');
        }
    })

});

/*根据推荐ID查一条数据*/
function getOneData(recommendId){

    $.each(listData.info.recommendList,function (i,v){
        if(v.recommendId == recommendId){
            oneListData = v;
        }
    });
};
/*点击筛选*/
$('.listScreeningBtn').on('click',function (){

    getThemeListFn();
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
//时间截取
function timeFn(time){
    if(time){
        if(time && time.indexOf('.')!=-1){
            return time.substr(0,time.indexOf('.'));
        }else{
            return time;
        }
    }else{
        return "";
    }

}