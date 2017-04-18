/**
 * Created by chenM on 2016/8/6.
 */

version_management();
function version_management(){

    $.ajax({
        type:'POST',
        url:PLATFORM_URL_PRE+'/essential/versionAutoController/queryVersion',
        datatype:'json',
        success:function (res){
            if(res.code == 1){
               // console.log(res);
                $('tbody').html('');
                $.each(res.info,function (i,v){
                    $('tbody').append('<tr>'+
                            '<td>' +
                                '<p class="version_number">'+v.versionNumber+'</p></td>'+
                            '<td>'+
                                '<div class="newFeatures">' +
                                    '<p style="word-break: break-all">'+v.versionContent+'</p>' +
                                '</div>'+
                            ' </td>'+
                            '<td>'+
                                '<time class="time">'+ substrFn(v.createTime)+'</time>'+
                            '</td>'+
                            '<td>'+
                                '<p class="version_num">'+ v.versionFileName+'</p>'+
                            '</td>'+
                            '<td>'+
                                '<a href='+v.versionFilePath+' class="down">下载</a>'+
                            '</td>'+

                    '</tr>');

                })
            }else{
                alert(res.msg)
            }

        },
        error:function (res){
            alert('网络连接失败，请稍后重试~');
        }
    })

}


/*时间戳转时间*/
function add0(m){return m<10?'0'+m:m }
function getLocalTime(shijianchuo)
{
//shijianchuo是整数，否则要parseInt转换
    var time = new Date(shijianchuo);
    var y = time.getFullYear();
    var m = time.getMonth()+1;
    var d = time.getDate()+1;
    var h = time.getHours()+1;
    var mm = time.getMinutes()+1;
    var s = time.getSeconds()+1;
    return y+'-'+add0(m)+'-'+add0(d);
}

/*截取时间*/

function substrFn(str){
    return str.substr(0,10);
}