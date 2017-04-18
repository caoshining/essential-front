/**
 * Created by chenM on 2016/8/5.
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

/*判断是否上传成功了*/
var uploadfile = false;
/*存储*/
var uploadfileData = '';
 function modificationImg(){

     $('#upload_file').diyUpload({
         url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
         success:function( data ) {

             if(data.code == 1){
                 //console.log($('.webuploader-element-invisible').val());
                 uploadfile = true;
                 uploadfileData = data.info[0];
                   //console.log(data)
                 $('.parentFileBox').remove();
             }

        },
         error:function( err ) {
            alert(err.msg);
         },
         buttonText : '选择文件',
         chunked:true,
         // 分片大小
         chunkSize:51200 * 1024,
         //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
         fileNumLimit:1,
         fileSizeLimit:500000 * 1024,
         fileSingleSizeLimit:50000 * 1024,
         accept:{
             title:"*",
             extensions:"*",
             mimeTypes:"*"
         }
     });
 }
 modificationImg();

/*点击提交*/

function submitContent(){
    var parmaData = {
        versionNumber:$('.version_number').val(),//版本号
        versionContent:$('.New_features').val(),//新功能
        versionFileName:'Essential',//文件名称
        versionFilePath:uploadfileData,//文件路径
        createUser:userId//创建用户id
    };

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/versionAutoController/addVersion',
        dataType: 'json',
        data:parmaData,
        success:function (res){
            //console.log(res)
            if(res.code == 1){
                alert(res.msg);
            }else{
                alert(res.msg)
            };
        },
        error:function (){
            alert('网络连接失败，请稍后重试~');
        }
    });
};

$('.submit_content').on('click',function (){


    if($('.version_number').val() == ''){
        alert('请输入版本号');
    }else if($('.New_features').val() == ''){
        alert('请输入新功能');
    }else if(!uploadfile){
        alert('请上传文件')
    }else{
        submitContent();
    }



})