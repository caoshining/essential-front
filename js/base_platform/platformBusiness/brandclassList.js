/**
 * Created by chenM on 2016/7/23.
 */


/*定义一个变量，用来存储图片的路径*/
var modificationImgpath = '';
/*定义一个变量，用来判断是否上传图片*/
var uploadmodificationImg = false;

/*修改图片*/
function modificationImg(){

    $('#modification_img2').diyUpload({
        url:PLATFORM_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=2',
        success:function( data ) {

            uploadmodificationImg = true;
            modificationImgpath = data.info[0];
            //console.log(modificationImgpath)

            $("#modification_img2").siblings("img").attr("src",data.info[0]);
            $('#modification_img1 .parentFileBox').remove();

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
        fileSizeLimit:500000 * 1024,
        fileSingleSizeLimit:50000 * 1024,
        accept:{
            title:"Images",
            extensions:"gif,jpg,jpeg,bmp,png",
            mimeTypes:"image/gif,image/jpeg,image/png,image/bmp,image/jpg"
        }
    });
}
modificationImg();




/*获取后台数据*/
var brandlistfn = function (){
    window.state2 = true;
    $.ajax({
        type:'POST',
        url:PLATFORM_URL_PRE+'/essential/productType/queryCategoryTypeList',
        dataType: 'json',
        success:function (res){
            if(res.code == 1){

                var html = '';
                var html1 = '';
                var imgHtml = '';
                for(var i=0;i<res.info.length;i++){

                    html+='<li class="item" categoryId = '+res.info[i].categoryId+'>'+res.info[i].categoryName+'</li>';
                    html1 += '<div class="brand-list-item clear">';
                    imgHtml += '<div class="ShowImg"><img src="'+res.info[i].categoryImgPath+'"   /><a class="modificationImg">修改</a></div>'
                    for(var j=0;j<res.info[i].productTypeVoList.length;j++){
                        var data = res.info[i].productTypeVoList[j];
                        html1 += '<span>'+data.typeName+'</span>'
                    }
                    html1 += '<input type="text" placeholder="输入数值" class="import-size">'+
                             '<a href="javascript:;" class="add-size add">添加</a><a href="javascript:;" class="add-size enter">确认</a>'
                    html1 += '</div>';

                }
                /*渲染*/
                $('.brand-list-nav').html(html);
                $('.brand-list-con').html(imgHtml)
                $('.brand-list-con').append(html1);

                var brand_list_nav = $('.brand-list-nav .item');
                /*计算宽度*/
                var w = 100/res.info.length;
                brand_list_nav.eq(0).addClass('selected');
                brand_list_nav.css('width',w+'%');

                /*初始化*/
                $('.brand-list-item').eq(0).css('display','block');
                $('.ShowImg').eq(0).show();

                /*点击切换*/
                brand_list_nav.on('click',function (){

                    brand_list_nav.removeClass('selected');
                    $(this).addClass('selected');
                    $('.brand-list-item').hide();
                    $('.brand-list-item').eq($(this).index('.brand-list-nav .item')).show();
                    $('.ShowImg').hide();
                    $('.ShowImg').eq($(this).index('.brand-list-nav .item')).show();
                });

                /*点击确认添加*/
                $('.brand-list-item .enter').on('click',function (){
                    var inp = $(this).parent().find('.import-size');
                    if(inp.val() == ''){
                        alert('请输入合适的数值！');
                    }else{

                        var createEle = $('<span>'+inp.val()+'</span>');
                        inp.before(createEle);
                        $(this).parent().find('.import-size').hide();
                        $(this).parent().find('.enter').hide();
                        $(this).parent().find('.add').html('添加');

                        var id = $('.brand-list-nav .item').eq($(this).parent().index('.brand-list-item')).attr('categoryId')
                        var parmaData = {
                            categoryId:id,
                            productypeName:inp.val()
                        };
                        inp.val('');

                        $.ajax({
                            type: "post",
                            url: PLATFORM_URL_PRE+'/essential/productType/add',
                            dataType: 'json',
                            data:parmaData,
                            success:function (res){
                                if(res.code == 1){
                                    alert(res.msg);
                                };
                            }
                        })
                    };

                });




                /*点击添加*/
                $('.brand-list-item .add').on('click',function (){

                    if($(this).html()=='添加'){
                        $(this).parent().find('.import-size').show();
                        $(this).parent().find('.enter').show();
                        $(this).html('取消');
                    }else{
                        $(this).parent().find('.import-size').hide();
                        $(this).parent().find('.enter').hide();
                        $(this).html('添加');
                    }
                });

            }

        },
        error:function (){
            alert('网络连接失败，请稍后重试~');
        }
    });




};




brandlistfn();

/*大分类ID*/
var categoryID = 0;
/*索引*/
var _index = 0;
/*点击修改图片*/
$(document).on('click','.modificationImg',function (){

    _index = $(this).index('.modificationImg');

   categoryID = $('.brand-list-nav li').eq($(this).index('.modificationImg')).attr('categoryid');
    $('.modificationImg_popup').css('top','100px');

});

/*点击取消按钮*/
$('.cancelModification').on('click',function (){

    $('.modificationImg_popup').css('top','-1000px');
    $('#modification_img1 .parentFileBox').remove();
})

/*点击确定按钮*/
$('.enterModification').on('click',function (){

    if(!uploadmodificationImg){
        alert('请先上传图片！');
    }else{
        var parmaData = {
            pic:modificationImgpath,
            categoryId:categoryID
        };
        /*替换显示图片*/
        $('.ShowImg img').eq(_index).attr('src',modificationImgpath);
        $('.show_img').attr('src','');
        $('.brand-list .modificationImg_popup').css('top','-1000px');
        $.ajax({

            type: "post",
            url: PLATFORM_URL_PRE+'/essential/productCategory/modifyCategory',
            dataType: 'json',
            data:parmaData,
            success:function (res){
                alert(res.msg);
               // $('.ShowImg img').eq(_index).attr('src',modificationImgpath);

            }
        });
    }

})