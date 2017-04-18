/**
 * Created by chenM on 2016/8/10.
 */

getOldMsgFn()
function getOldMsgFn(){

var pushTypeId = $('.allType').val();
var msgTitle = $('.push_content').val();
var attr1 = $('.create_user').val();
var startTime = $('#Refund_modifyStartTime').val();
var endTime = $('#Refund_modifyEndTime').val();
if($('.allType').val() == 10){
    pushTypeId = null;
}
getOldmsg(1,0,pushTypeId,msgTitle,attr1,startTime,endTime);
function getOldmsg(page,pushStrategy,pushTypeId,msgTitle,attr1,startTime,endTime){


    var parmaData = {
        pageIndex:page,
        pushStrategy:pushStrategy,
        pushTypeId:pushTypeId,
        msgTitle:msgTitle,
        attr1:attr1,
        startTime:startTime,
        endTime:endTime
    };
    console.log(parmaData)
    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/pushMsg/queryPlatformPushMsg',
        dataType: 'json',
        data: parmaData,
        success: function (res) {
            console.log(res);
            if(res.code == 1) {
                var result = '';
                $.each(res.info.contentList, function (i, v) {

                    if (v.pushTypeId == 0) {
                        v.pushTypeId = '专栏';
                        result += '<tr>' +
                            '<td>' + v.msgTitle + '</td>' +
                            '<td>' + v.pushTypeId + '</td>' +
                            '<td>' + v.articleName + '</td>' +
                            '<td>全部用户</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + v.attr1 + '</td>' +
                            '</tr>'
                    } else if (v.pushTypeId == 3) {
                        v.pushTypeId = '商品';
                        result += '<tr>' +
                            '<td>' + v.msgTitle + '</td>' +
                            '<td>' + v.pushTypeId + '</td>' +
                            '<td>' +
                            '<div class="img_box">' +
                            '<img src = ' + v.path + '>' +
                            '<span>WIWJ8123</span>' +
                            '</div>' +
                            '<div class="text_box">' +
                            ' <span>' + v.productName + '</span>' +
                            ' <p>￥' + v.costPrice + '</p>' +
                            '</div>' +
                            '</td>' +
                            '<td>全部用户</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + v.attr1 + '</td>' +
                            '</tr>'
                    } else if (v.pushTypeId == 5) {
                        v.pushTypeId = '品牌';
                        result += '<tr>' +
                            '<td>' + v.msgTitle + '</td>' +
                            '<td>' + v.pushTypeId + '</td>' +
                            '<td>' + v.brandName + '</td>' +
                            '<td>' +
                            '全部用户' +
                            '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + v.attr1 + '</td>' +
                            '</tr>'
                    }else if(v.pushTypeId == 1){
                        v.pushTypeId = '推荐';
                        result += '<tr>' +
                            '<td>' + v.msgTitle + '</td>' +
                            '<td>' + v.pushTypeId + '</td>' +
                            '<td>' + v.recommendTitle + '</td>' +
                            '<td>' +
                            '全部用户' +
                            '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + v.attr1 + '</td>' +
                            '</tr>'
                    }
                });
            }
            $('.pushMsgList tbody').html(result);
           pagePlus(res.info.totalPageCount,pushStrategy,pushTypeId,msgTitle,attr1,startTime,endTime)
        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }
    })
};


function getOldmsgForPage(page,pushStrategy,pushTypeId,msgTitle,attr1,startTime,endTime){


    var parmaData = {
        pageIndex:page,
        pushStrategy:pushStrategy,
        pushTypeId:pushTypeId,
        msgTitle:msgTitle,
        attr1:attr1,
        startTime:startTime,
        endTime:endTime
    };
    console.log(parmaData)
    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/pushMsg/queryPlatformPushMsg',
        dataType: 'json',
        data: parmaData,
        success: function (res) {
            if(res.code == 1) {


                var result = '';
                console.log(res);
                $.each(res.info.contentList, function (i, v) {
                    if (v.pushTypeId == 0) {
                        v.pushTypeId = '专栏';
                        result += '<tr>' +
                            '<td>' + v.msgTitle + '</td>' +
                            '<td>' + v.pushTypeId + '</td>' +
                            '<td>' + v.articleName + '</td>' +
                            '<td>全部用户</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + v.attr1 + '</td>' +
                            '</tr>'
                    } else if (v.pushTypeId == 3) {
                        v.pushTypeId = '商品';
                        result += '<tr>' +
                            '<td>' + v.msgTitle + '</td>' +
                            '<td>' + v.pushTypeId + '</td>' +
                            '<td>' +
                            '<div class="img_box">' +
                            '<img src = ' + v.path + '>' +
                            '<span>WIWJ8123</span>' +
                            '</div>' +
                            '<div class="text_box">' +
                            ' <span>' + v.productName + '</span>' +
                            ' <p>￥' + v.costPrice + '</p>' +
                            '</div>' +
                            '</td>' +
                            '<td>全部用户</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + v.attr1 + '</td>' +
                            '</tr>'
                    } else if (v.pushTypeId == 5) {
                        v.pushTypeId = '品牌';
                        result += '<tr>' +
                            '<td>' + v.msgTitle + '</td>' +
                            '<td>' + v.pushTypeId + '</td>' +
                            '<td>' + v.brandName + '</td>' +
                            '<td>' +
                            '全部用户' +
                            '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + v.attr1 + '</td>' +
                            '</tr>'
                    }else if(v.pushTypeId == 1){
                        v.pushTypeId = '推荐';
                        result += '<tr>' +
                            '<td>' + v.msgTitle + '</td>' +
                            '<td>' + v.pushTypeId + '</td>' +
                            '<td>' + v.recommendTitle + '</td>' +
                            '<td>' +
                            '全部用户' +
                            '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + removeDian(v.createTime) + '</td>' +
                            '<td>' + v.attr1 + '</td>' +
                            '</tr>'
                    }
                });
            }
            $('.pushMsgList tbody').html(result);
        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }
    })
}



//分页
function pagePlus(totalPageCount,pushStrategy,pushTypeId,msgTitle,attr1,startTime,endTime){

    $('.pagination').paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            getOldmsgForPage(page,pushStrategy,pushTypeId,msgTitle,attr1,startTime,endTime)

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
};
}


/*点击筛选*/
$('.screeningButton').on('click',function (){
    getOldMsgFn();
})


/*时间*/

function timeControl(){
    var start = {
        dateCell: '#Refund_modifyStartTime',
        format: 'YYYY-MM-DD',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        isinitVal:false,
        festival:true,
        ishmsVal:false,
        maxDate: '2099-06-30', //最大日期
        choosefun: function(elem,datas){
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var end = {
        dateCell: '#Refund_modifyEndTime',
        format: 'YYYY-MM-DD',
        //minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        festival:true,
        ishmsVal:false,
        maxDate: '2099-06-16 23:59:59', //最大日期
        choosefun: function(elem,datas){
            start.maxDate = datas; //将结束日的初始值设定为开始日的最大日期
        }
    };
    jeDate(start);
    jeDate(end);
}
timeControl();

//时间截取
function removeDian(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}