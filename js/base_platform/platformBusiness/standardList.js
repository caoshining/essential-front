/*Created by chenM on 2016/7/21.*/



var standardlist = function (){
    window.state1 = true;
    var list_con = $('.list-con');

    list_con.html('');
    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/specification/selectSpecificationList',
        dataType: 'json',
        success: function(res) {

            if(res.code == 0){
                return;
            };
            var html = '';
            var html1 = '';
            var html2 = '<ul class="standard-nav clear"></ul>'
            for(var i=0;i<res.info.length;i++){

                html+='<li class="item">'+res.info[i].name+'</li>';
                html1+='<div class="commodity-size">'
                for(var j=0;j<res.info[i].specificationKeyVoItemList.length;j++){

                    var data = res.info[i].specificationKeyVoItemList[j];
                    html1+='<div class="china-size" >'+
                        '<div class="size-title clear" keyID = '+data.keyId+'>'+
                        '<div class="size-title-name">'+j+'.' +
                        '<span class="standard-name">'+data.keyName+'</span>'+
                        '<input type="text" class="standard-input" >'+
                        '<span class="standard-enter">确认</span>'+
                        '<span class="standard-cancel">取消</span>'+
                        '<a href="javascript:;" class="modi">【修改】</a></div>'+
                        '<a href="javascript:;" class="unfold-hide Hide">展开</a> </div>'+
                        '<div class="size-value clear"></div></div>'
                }
                html1+='</div>';

            };
            list_con.append(html2);
            $('.standard-nav').html(html);
            list_con.append(html1);
            /*点击修改*/
            modiStandard();
            /*计算宽度*/
            var w = 100/res.info.length;
            $('.list-con .item').eq(0).addClass('selected');
            $('.list-con .item').css('width',w+'%');
            $('.list-con .item').on('click',function (){

                $('.list-con .item').removeClass('selected');
                $(this).addClass('selected');
                $('.commodity-size').css('display','none');
                $('.commodity-size').eq($(this).index('.list-con .item')).css('display','block');
            });
            /*初始化*/
            $('.commodity-size').eq(0).css('display','block');
            /*点击展开*/
            $('.unfold-hide').on('click',function (){
                if($(this).hasClass('Hide')==false){
                    $(this).addClass('Hide');
                    $(this).html('展开');
                    $('.china-size').eq($(this).index('.unfold-hide')).find('.size-value').css('display','none');

                }else{

                    $(this).removeClass('Hide');
                    $(this).html('收起');
                    $('.china-size').eq($(this).index('.unfold-hide')).find('.size-value').css('display','block');
                    var This = $(this);
                    if(This.attr('flag')){
                        return;
                    }
                    var keyID = $('.commodity-size .size-title').eq($(this).index('.commodity-size .unfold-hide')).attr('keyID');

                    var html2 = '';
                    $.ajax({
                        type: "post",
                        url: PLATFORM_URL_PRE+'/essential/specification/selectAllValuesByKeyId?keyId='+keyID,
                        dataType: 'json',
                        success: function(res) {
                            if(res.code == 0){
                                return;
                            };
                            This.attr("flag","true");

                            if(res.info){
                                for(var i=0;i<res.info.length;i++){
                                    html2+='<a href="javascript:;">'+res.info[i].valueName+'</a>'
                                }
                            }
                            html2+='<input type="text" placeholder="输入数值" class="import-size" /><span class="add-size add">添加</span><span class="add-size enter">确定</span>'

                            var ele = $('.size-value').eq(This.index('.commodity-size .unfold-hide'));
                            ele.html(html2);

                            $('.china-size .add').on('click',function (){

                                if($(this).html()=='添加'){
                                    $(this).parent().find('.import-size').show();
                                    $(this).parent().find('.enter').show();
                                    $(this).html('取消');
                                }else if($(this).html()=='取消'){
                                    $(this).parent().find('.import-size').hide();
                                    $(this).parent().find('.enter').hide();
                                    $(this).html('添加');
                                }
                            });

                            $('.enter').on('click',function (){
                                var inp = $(this).parent().find('.import-size');
                                if(inp.val() == ''){
                                    alert('请输入适当的值');
                                }else{

                                    $(this).parent().find('.add').html('添加')
                                    var createEle = $('<a href="javascript:;">'+inp.val()+'</a>');
                                    inp.before(createEle);

                                    var parmaData = {
                                        keyId:$(this).parent().parent().find('.size-title').attr('keyID'),
                                        valueName:inp.val()
                                    };
                                    inp.val('');
                                    $(this).parent().find('.import-size').hide();
                                    $(this).parent().find('.enter').hide();

                                    $.ajax({
                                        type: "post",
                                        url: PLATFORM_URL_PRE+'/essential/specification/addValue',
                                        dataType: 'json',
                                        data:parmaData,
                                        success:function (res){
                                            alert(res.msg);
                                        }
                                    });
                                };
                            })

                        }
                    })
                }

            })

        },
        error: function (res)//服务器响应失败处理函数
        {
            alert('网络连接失败，请稍后重试~');
        }
    });


};

standardlist();

/*点击修改*/
modiStandard();
function  modiStandard(){

    /*点击修改*/
    $('.modi').on('click',function (){
        var standardName = $(this).parent().find('.standard-name').html();

        $(this).parent().find('.standard-input').css('display','inline-block');
        $(this).parent().find('.standard-input').val(standardName);
        $(this).parent().find('.standard-enter').css('display','inline-block');
        $(this).parent().find('.standard-cancel').css('display','inline-block');
        $(this).parent().find('.standard-name').hide();
        $(this).hide();
    })
    /*点击确认*/
    $('.standard-enter').on('click',function (){
        var val = $(this).parent().find('.standard-input').val();
        if(val == ''){
            alert('您还没输入规格！')
        }else{
            var val  = $(this).parent().find('.standard-input').val();
            $(this).parent().find('.standard-name').html(val);

            $(this).parent().find('.standard-input').css('display','none');
            $(this).css('display','none');
            $(this).parent().find('.standard-cancel').css('display','none');
            $(this).parent().find('.standard-name').show();
            $(this).parent().find('.modi').show();

            var keyid = $(this).parent().parent().attr('keyid');


            var parmaData = {
                specificationId:keyid,
                keyname:val
            };

            $(this).parent().find('.import-size').hide();
            $(this).parent().find('.enter').hide();

            $.ajax({
                type: "post",
                url: PLATFORM_URL_PRE+'/essential/specification/modifySpecificationKey',
                dataType: 'json',
                data:parmaData,
                success:function (res){
                    alert(res.msg);
                },
                error: function (res)//服务器响应失败处理函数
                {
                    alert('网络连接失败，请稍后重试~');
                }
            });
        }
    });

    /*点击取消*/

    $('.standard-cancel').on('click',function (){

        var val = $(this).parent().find('.standard-input').val();
        $(this).parent().find('.standard-input').css('display','none');

        $(this).css('display','none');
        $(this).parent().find('.standard-enter').css('display','none');
        $(this).parent().find('.standard-name').show();
        $(this).parent().find('.modi').show();

    });

}