/**
 * Created by chenM on 2016/8/8.
 */

/*得到userId的值*/
var userId = PLATFORM_LOGIN_USER_ID

//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }else{
        return null;
    }
}

    /*分页*/

/*每页个数*/
var PageSize = 4;
/*编号*/
var Num = 1;

resetFn()
function resetFn(){


    var parmaData = {
        pageIndex:1,
        pageSize:PageSize
    };

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/opinonAutoController/queryOpinion',
        dataType: 'json',
        data:parmaData,
        success:function (res){
            if(res.code == 1){
               //console.log(res)
                var result = '';
                $('#Tbody').html('');
                $.each(res.info.opinonList,function (i,v){
                    result += '<tr>'+
                            '<td>'+(i+1)+'</td>'+
                            '<td>'+v.opinionContent+'</td>'+
                            '<td>'+v.userName+'</td>'+
                            '<td>'+v.phone+'</td>'+
                            '<td>'+removeDian(v.createTime)+'</td>'+
                        '</tr>'
                })
                $('#Tbody').html(result);
                $("#Pagination").html('');
                // 创建分页
                $("#Pagination").pagination(res.info.pageCount, {
                    num_edge_entries: 1, //边缘页数
                    num_display_entries: 4, //主体页数
                    callback: pageselectCallback,
                    items_per_page:PageSize //每页显示1项
                });
            }
        }
    });
};

function  pageselectCallback(page_index){
    //console.log(page_index)
    var parmaData = {
        pageIndex:page_index+1,
        pageSize:PageSize
    };

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/opinonAutoController/queryOpinion',
        dataType: 'json',
        data:parmaData,
        success:function (res){
            if(res.code == 1){
                //console.log(res)
                var result = '';
                $('#Tbody').html('');
                $.each(res.info.opinonList,function (i,v){
                    result += '<tr>'+
                        '<td>'+(PageSize*page_index+(i+1))+'</td>'+
                        '<td>'+v.opinionContent+'</td>'+
                        '<td>'+v.userName+'</td>'+
                        '<td>'+v.phone+'</td>'+
                        '<td>'+removeDian(v.createTime)+'</td>'+
                        '</tr>'
                })
                $('#Tbody').html(result);
            }
        }
    });
};
/*去掉小数点*/
function removeDian(str){
    var index = str.indexOf('.');
    if(index){
        return str.substr(0,index);
    }
    else{
        return str;
    }
}