/**
 * Created by chenM on 2016/7/23.
 */

/*定义一个变量，用于判断是否上传图片*/
var uploadPictures = false;

/*定义一个变量，用于保存图片的路径*/
var uploadPicturesPath = '';


    $('.submit').on('click',function (){


        /*定义一个变量，用来存储已经存在的大分类*/
        var BigClassArr = [];
        $.ajax({
            type:'POST',
            url:PLATFORM_URL_PRE+'/essential/productType/queryCategoryTypeList',
            dataType: 'json',
            success:function (res){
                if(res.code == 0){
                    alert(res.msg)
                    return;
                };
                $.each(res.info,function (i,v){
                    BigClassArr.push(v.categoryName);
                })


                /*判断输入的值是否合适*/

                /*先判断是否为空*/
                if($('#firstC_inp').val() == ''){
                    alert('请输入合适的一级品类！');
                }
                /*判断是否存在*/
                else if($.inArray($('#firstC_inp').val(),BigClassArr) != -1){
                    alert('添加的一级分类已存在！');
                }
                else if(!uploadPictures){
                    alert('请上传图片！');
                }
                else if($('.second-class').val() == ''){
                    alert('请输入合适的二级品类！');
                }
                else{

                    /*当输入的值合适时发送请求*/
                    var parmaData = {
                        categoryName:$('#firstC_inp').val(),
                        typeName:$('.second-class').val(),
                        path:uploadPicturesPath
                    };
                    $('#firstC_inp').val('');
                    $('.second-class').val('');
                    $.ajax({
                        type: "post",
                        url: PLATFORM_URL_PRE+'/essential/productCategory/saveCategoryAndType',
                        dataType: 'json',
                        data:parmaData,
                        success:function (res){

                            if(res.code == 1){
                                alert(res.msg);
                                if(window.state2){
                                    brandlistfn();
                                };
                            };
                        }
                    });
                };
            },
            error: function (res)//服务器响应失败处理函数
            {
                alert('网络连接失败，请稍后重试~');
            }
        });
    });



/*对输入的值进行判断*/

/*function detection(str){

    if(str == ''){
        return false;
    }else{
        return true;
    };
};*/

/*上传图片*/
function addbrandlist_IMG(){
    var logoPath;
    $('#addbrand_img2').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {

            uploadPictures = true;
            uploadPicturesPath = data.info[0];


            $("#addbrand_img2").siblings("img").attr("src",data.info[0]);
            $('.parentFileBox').remove();

        },
        error:function( err ) {
            alert('网络连接失败，请稍后重试~');
        },
        buttonText : '选择图片',
        chunked:true,
        // 分片大小
        chunkSize:512 * 1024,
        //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
        fileNumLimit:1,
        fileSizeLimit:1024 * 1024,
        fileSingleSizeLimit:1024 * 1024,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image/gif,image/jpeg,image/png,image/bmp,image/jpg"
        }
    });
}
addbrandlist_IMG();