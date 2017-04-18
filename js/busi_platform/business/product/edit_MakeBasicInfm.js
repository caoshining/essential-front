/**
 * Created by Morgan on 2016/7/8.
 */
var getVal;
var Guige1;
var Guige2;
var Guige3;
var cliNum=0;
var step=0;
function addProducts(){
    var html;
    if($('.Pro_standard').length<3){
        if ($('.Pro_standard').length==1) {
            html="<ul></ul>";
            $('.Pro_standard').eq(0).clone().appendTo('.Product_Select');
            $('.Product_Select').append(html);
            Product_selt(1);
        }
        else if ($('.Pro_standard').length==2) {
            html="<ul></ul>";
            $('.Pro_standard').eq(0).clone().appendTo('.Product_Select');
            $('.Product_Select').append(html);
            Product_selt(2);
        }
        else if ($('.Pro_standard').length==3) {
            html="<ul></ul>";
            $('.Pro_standard').eq(0).clone().appendTo('.Product_Select');
            $('.Product_Select').append(html);
            Product_selt(3);
        }
    }
}
$("#Make_GuigeBtn").click(function(){
    addProducts();
});
/*增添规格 其对应的功能*/
function addProduct(step){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/specification/selectAllValuesByKeyId",
        data:'keyId='+getVal,
        dataType:'json',
        beforeSend:function(){
            $('.Pro_standard').eq(step).next('ul').children('li').remove();
            $('.Pro_standard').eq(step).next('ul').next("button").remove();
        },
        success:function(data){
            console.log(data);
            var html='';
            for(var i=0;i<data.info.length;i++){
                console.log(data.info.length)
                html+="<li data-specificationValueid='"+data.info[i].specificationValueid+"'>"+data.info[i].valueName+"</li>" ;
            }
            $('.Pro_standard').eq(step).next('ul').append(html);
            $('.Pro_standard').eq(step).next('ul').after("<button class='delt_btn' data-del-targe="+step+" data-action='delt_standard'>"+
            "删除" +
            "</button>");
            lisClick(step);

            delt_btn();

        }
    })
}
/*通用增添其相对应的子元素*/
function delt_btn(){
    $(".delt_btn").on("click",function(){
        var getstep=$(this).attr("data-del-targe");
        if(getstep==0){
            $('.Pro_standard').eq(getstep).next("ul").html("");
            $(this).remove();
            //$('.Pro_standard').eq(getstep).next("ul").after("button").remove();
        }else{

            $(this).prevUntil("button").remove();
            $(this).remove();
        }

    })
}

function lisClick(step){
    $('.Pro_standard').eq(step).next('ul').children('li').click(function(){
        //guige=$(this).text();
        if(step == 0){
            $(this).toggleClass('active1');
        }else if(step == 1){
            $(this).toggleClass('active2');
        }else if(step == 2){
            $(this).toggleClass('active3');
        }
    })
}

function Product_selt(step){
    $getSlt=$('.Pro_standard').eq(step);
    $getSlt.change(function(){
        getVal=$(this).val();
        addProduct(step);
    });
}

function Produt_Color(){

    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/specification/selectAllKeys",
        data:'',
        dataType:'json',
        success:function(data){
            console.log(data);
            var html="<option value=''>- -</option>";
            var $getSle=$('.Product_Select .Pro_standard');
            for(var i=0;i<data.info.length;i++){
                html+="<option value='"+data.info[i].specificationId+"'>"+data.info[i].keyname+"</option>" ;
            }
            $getSle.prepend(html);
            Product_selt(0);
        }
    })
}
Produt_Color();
/*从后台拉取数据填充规格*/

function youfeiMB(){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/freightTemplate/queryFreightGroupList",
        data:{shopId:BUSINESS_LOGIN_SHOP_ID},
        dataType:'json',
        success:function(data){
            var html='<option value="">-请选择-</option>';
            for(var i=0;i<data.info.length;i++){
                html+="<option value='"+data.info[i].freightGroupId+"'>"+data.info[i].freightGroupName+"</option>" ;
            }
            $('#youfeiMB').append(html);
        }
    })
}
youfeiMB();
/*运费模板接口调用*/

var guige1=[];
var guige2=[];
var guige3=[];
var dataList = [];
$("#Make_Mean").click(function(){
    GetSelt_Gui();
});
function GetSelt_Gui(){
    dataList = [];
    $("#theadTmpl").html('');
    $("#list").html('');

    $(".Product_Select select").each(function(){
        //渲染th数据
        var data = {"thead":$(this).children("option:selected").text()};
        var html = $("#testTheadTmpl").render(data);
        $("#theadTmpl").append(html);
    });
    $("#theadTmpl").append("<th>价格(元)</th><th>库存</th><th>商品代码</th>");


    if($('.Pro_standard').length == 1){
        if($(".Product_Select>ul>li.active1").size() == []){
            var html = $("#testTrTmpl").render();
            $("#list").append(html);
            var tdTmplHTML = "<td></td><td><input type='text' name='pice'/></td><td><input type='text' name='repertory'/></td><td><input type='text' name='GodCode'/></td>";
            $("#list>tr").append(tdTmplHTML);
        }else if($(".Product_Select>ul>li.active1").size() == 1){

            var dataJson = {
                "productSkuRelationList[0].specificationKeyId": $(".Product_Select select").eq(0).val(),
                "productSkuRelationList[0].specificationValueId": $(".Product_Select>ul>li.active1").eq(0).attr("data-specificationvalueid"),
                "productSkuRelationList[0].type":2
            };
            dataList.push(dataJson);

            var html = $("#testTrTmpl").render();
            $("#list").append(html);
            var tdTmplHTML = "<td>"+$(".Product_Select>ul>li.active1").eq(0).text()
                +"</td><td><input type='text'  name='pice'/></td>" +
                "<td><input type='text' name='repertory'/></td>" +
                "<td><input type='text' name='GodCode'/></td>";
            $("#list>tr").append(tdTmplHTML);
            $("#list>tr").attr("data-keyId",$(".Product_Select select").eq(0).val());
            $("#list tr").eq(0).attr("data-specificationvalueid0",$(".Product_Select>ul>li.active1").eq(0).attr("data-specificationvalueid"));

        }else{
            $(".Product_Select>ul>li.active1").each(function(i,v){

                var tempJson = {};
                var tempJson0 = {};
                var keyId = "productSkuRelationList[0].specificationKeyId";
                var valueId = "productSkuRelationList[0].specificationValueId";
                var type="productSkuRelationList[0].type";
                tempJson[type] = 2;
                tempJson[keyId] =  $(".Product_Select select").eq(0).val();
                tempJson[valueId] = $(".Product_Select>ul>li.active1").eq(i).attr("data-specificationvalueid");

                dataList.push($.extend(tempJson0,tempJson));

                var html = $("#testTrTmpl").render();
                $("#list").append(html);
                var tdJson = {"tdText":$(v).text()};
                var tdHtml = $("#testTdTmpl").render(tdJson)+"<td><input type='text'  name='pice'/></td><td><input type='text' name='repertory'/></td><td><input type='text' name='GodCode'/></td>";
                $("#list>tr").last().append(tdHtml);
                $("#list tr").eq(i).attr("data-skuId","");
                $("#list tr").eq(i).attr("data-specificationvalueid0",$(".Product_Select select").eq(0).next("ul").children("li.active1").eq(i).attr("data-specificationvalueid"));

            })
        }

    }else if($('.Pro_standard').length == 2){
        if($(".Product_Select>ul>li.active1").size() == 1
            && $(".Product_Select>ul>li.active2").size() == []){
            var html = $("#testTrTmpl").render();
            $("#list").append(html);
            var tdTmplHTML = "<td>"+$(".Product_Select>ul>li.active1").eq(0).text()+"</td><td></td><td><input type='text'  name='pice'/></td><td><input type='text' name='repertory'/></td><td><input type='text' name='GodCode'/></td>";
            $("#list>tr").append(tdTmplHTML);
        }else if($(".Product_Select>ul>li.active1").size() == 1
            && $(".Product_Select>ul>li.active2").size() == 1){

            var dataJson = {
                "productSkuRelationList[0].specificationKeyId": $(".Product_Select select").eq(0).val(),
                "productSkuRelationList[0].specificationValueId": $(".Product_Select>ul>li.active1").eq(0).attr("data-specificationvalueid"),
                "productSkuRelationList[0].type": 2,
                "productSkuRelationList[1].specificationKeyId": $(".Product_Select select").eq(1).val(),
                "productSkuRelationList[1].specificationValueId": $(".Product_Select>ul>li.active2").eq(0).attr("data-specificationvalueid"),
                "productSkuRelationList[1].type": 2

            }
            dataList.push(dataJson);

            //渲染tr
            var html = $("#testTrTmpl").render();
            $("#list").append(html);
            var tdTmplHTML = "";
            tdTmplHTML += "<td>"+$(".Product_Select>ul>li.active1").eq(0).text()+"</td>";
            tdTmplHTML += "<td>"+$(".Product_Select>ul>li.active2").eq(0).text()+"</td><td><input type='text'  name='pice'/></td><td><input type='text' name='repertory'/></td><td><input type='text' name='GodCode'/></td>";
            $("#list>tr").append(tdTmplHTML);
            $("#list tr").eq(0).attr("data-skuId","");
            $("#list tr").eq(0).attr("data-specificationvalueid0",$(".Product_Select select").eq(0).next("ul").children("li.active1").eq(0).attr("data-specificationvalueid"));
            $("#list tr").eq(0).attr("data-specificationvalueid1",$(".Product_Select select").eq(1).next("ul").children("li.active2").eq(0).attr("data-specificationvalueid"));

        }else{
            var map = {};
            var indexI=0;
            $(".Product_Select>ul>li.active1").each(function(i,v){
                var tempJson = {};
                var tempJson0 = {};
                var keyId = "productSkuRelationList[0].specificationKeyId";
                var valueId = "productSkuRelationList[0].specificationValueId";
                var type="productSkuRelationList[0].type";
                tempJson[type] = 2;
                tempJson[keyId] =  $(".Product_Select select").eq(0).val();
                tempJson[valueId] = $(".Product_Select>ul>li.active1").eq(i).attr("data-specificationvalueid");
                $.extend(tempJson0,tempJson);
                $(".Product_Select>ul>li.active2").each(function(i1,v1){
                    var tempJson1 = {};
                    var keyId1 = "productSkuRelationList[1].specificationKeyId";
                    var valueId1 = "productSkuRelationList[1].specificationValueId";
                    var type1="productSkuRelationList[1].type";
                    tempJson1[type1] = 2;
                    tempJson1[keyId1] =  $(".Product_Select select").eq(1).val();
                    tempJson1[valueId1] = $(v1).attr("data-specificationvalueid");

                    dataList.push($.extend(false,tempJson0,tempJson1));

                    var html = $("#testTrTmpl").render();
                    $("#list").append(html);

                    $("#list tr").eq(indexI).attr("data-skuId","");
                    $("#list tr").eq(indexI).attr("data-specificationvalueid0",$(".Product_Select select").eq(0).next("ul").children("li.active1").eq(i).attr("data-specificationvalueid"));
                    $("#list tr").eq(indexI).attr("data-specificationvalueid1",$(".Product_Select select").eq(1).next("ul").children("li.active2").eq(i1).attr("data-specificationvalueid"));

                    indexI++;

                    var tdJson1 = {"tdText":$(v1).text()};
                    var tdHtml = "";

                    if(map[$(v).attr("data-specificationvalueid")] == $(v).attr("data-specificationvalueid")){
                        tdHtml += $("#testTdTmpl").render(tdJson1)+"<td><input type='text'  name='pice'/></td><td><input type='text' name='repertory'/></td><td><input type='text' name='GodCode'/></td>";
                    }else{
                        tdHtml += "<td data-id='"+$(v).attr("data-specificationvalueid")+"' rowspan='"+$(".Product_Select>ul>li.active2").size()+"'>"+$(v).text()+"</td>"
                            +$("#testTdTmpl").render(tdJson1)+"<td><input type='text'  name='pice'/></td><td><input type='text' name='repertory'/></td><td><input type='text' name='GodCode'/></td>";
                    }
                    $("#list>tr").last().append(tdHtml);
                    if(!map[$(v).attr("data-specificationvalueid")]){
                        map[$(v).attr("data-specificationvalueid")] = $(v).attr("data-specificationvalueid");
                    }
                })
            })
        }
    }else if($('.Pro_standard').length == 3){
        if($(".Product_Select>ul>li.active1").size() == 1
            && $(".Product_Select>ul>li.active2").size() == 1
            && $(".Product_Select>ul>li.active3").size() == []){
            //渲染tr
            var html = $("#testTrTmpl").render();
            $("#list").append(html);
            var tdTmplHTML = "";
            tdTmplHTML += "<td>"+$(".Product_Select>ul>li.active1").eq(0).text()+"</td>";
            tdTmplHTML += "<td>"+$(".Product_Select>ul>li.active2").eq(0).text()+"</td>";
            tdTmplHTML += "<td></td><td><input type='text'  name='pice'/></td><td><input type='text' name='repertory'/></td><td><input type='text' name='GodCode'/></td>";
            $("#list>tr").append(tdTmplHTML);


        }else if($(".Product_Select>ul>li.active1").size() == 1
            && $(".Product_Select>ul>li.active2").size() == 1
            && $(".Product_Select>ul>li.active3").size() == 1){
            var dataJson = {
                "productSkuRelationList[0].specificationKeyId": $(".Product_Select select").eq(0).val(),
                "productSkuRelationList[0].specificationValueId": $(".Product_Select>ul>li.active1").eq(0).attr("data-specificationvalueid"),
                "productSkuRelationList[0].type": 2,
                "productSkuRelationList[1].specificationKeyId": $(".Product_Select select").eq(1).val(),
                "productSkuRelationList[1].specificationValueId": $(".Product_Select>ul>li.active2").eq(0).attr("data-specificationvalueid"),
                "productSkuRelationList[1].type": 2,
                "productSkuRelationList[2].specificationKeyId": $(".Product_Select select").eq(2).val(),
                "productSkuRelationList[2].specificationValueId": $(".Product_Select>ul>li.active3").eq(0).attr("data-specificationvalueid"),
                "productSkuRelationList[2].type": 2
            }
            dataList.push(dataJson);

            //渲染tr
            var html = $("#testTrTmpl").render();
            $("#list").append(html);

            $("#list tr").eq(0).attr("data-skuId","");
            $("#list tr").eq(0).attr("data-specificationvalueid0",$(".Product_Select select").eq(0).next("ul").children("li.active1").eq(0).attr("data-specificationvalueid"));
            $("#list tr").eq(0).attr("data-specificationvalueid1",$(".Product_Select select").eq(1).next("ul").children("li.active2").eq(0).attr("data-specificationvalueid"));
            $("#list tr").eq(0).attr("data-specificationvalueid2",$(".Product_Select select").eq(2).next("ul").children("li.active3").eq(0).attr("data-specificationvalueid"));

            var tdTmplHTML = "";
            tdTmplHTML += "<td>"+$(".Product_Select>ul>li.active1").eq(0).text()+"</td>";
            tdTmplHTML += "<td>"+$(".Product_Select>ul>li.active2").eq(0).text()+"</td>";
            tdTmplHTML += "<td>"+$(".Product_Select>ul>li.active3").eq(0).text()+"</td>";
            tdTmplHTML += "<td><input type='text'  name='pice'/></td><td><input type='text' name='repertory'/></td><td><input type='text' name='GodCode'/></td>";
            $("#list>tr").append(tdTmplHTML);
        }else{
            var map = {};
            var indexI=0;
            $(".Product_Select>ul>li.active1").each(function(i,v){
                var tempJson = {};
                var tempJson0 = {};

                var keyId = "productSkuRelationList[0].specificationKeyId";
                var valueId = "productSkuRelationList[0].specificationValueId";
                var type="productSkuRelationList[0].type";
                tempJson[type] = 2;
                tempJson[keyId] =  $(".Product_Select select").eq(0).val();
                tempJson[valueId] = $(".Product_Select>ul>li.active1").eq(i).attr("data-specificationvalueid");
                $.extend(tempJson0,tempJson);
                var map1 = {};
                $(".Product_Select>ul>li.active2").each(function(i1,v1){
                    var tempJson1 = {};
                    var tempJson10 = {};
                    var keyId1 = "productSkuRelationList[1].specificationKeyId";
                    var valueId1 = "productSkuRelationList[1].specificationValueId";
                    var type1="productSkuRelationList[1].type";
                    tempJson1[type1] = 2;
                    tempJson1[keyId1] =  $(".Product_Select select").eq(1).val();
                    tempJson1[valueId1] = $(".Product_Select>ul>li.active2").eq(i1).attr("data-specificationvalueid");
                    $.extend(tempJson10,tempJson1);
                    $(".Product_Select>ul>li.active3").each(function(i2,v2){
                        var tempJson2 = {};
                        var keyId2 = "productSkuRelationList[2].specificationKeyId";
                        var valueId2 = "productSkuRelationList[2].specificationValueId";
                        var type2="productSkuRelationList[2].type";
                        tempJson2[type2] = 2;
                        tempJson2[keyId2] =  $(".Product_Select select").eq(2).val();
                        tempJson2[valueId2] = $(".Product_Select>ul>li.active3").eq(i2).attr("data-specificationvalueid");
                        dataList.push($.extend(false,tempJson0,tempJson10,tempJson2));

                        var html = $("#testTrTmpl").render();
                        $("#list").append(html);

                        $("#list tr").eq(indexI).attr("data-skuId","");
                        $("#list tr").eq(indexI).attr("data-specificationvalueid0",$(".Product_Select select").eq(0).next("ul").children("li.active1").eq(i).attr("data-specificationvalueid"));
                        $("#list tr").eq(indexI).attr("data-specificationvalueid1",$(".Product_Select select").eq(1).next("ul").children("li.active2").eq(i1).attr("data-specificationvalueid"));
                        $("#list tr").eq(indexI).attr("data-specificationvalueid2",$(".Product_Select select").eq(2).next("ul").children("li.active3").eq(i2).attr("data-specificationvalueid"));
                        indexI++;


                        var tdJson2 = {"tdText":$(v2).text()};
                        var tdHtml = "";

                        if(map[$(v).attr("data-specificationvalueid")] != $(v).attr("data-specificationvalueid")){
                            var rowspan = $(".Product_Select>ul>li.active3").size()*$(".Product_Select>ul>li.active2").size();
                            tdHtml += "<td data-id='"+$(v).attr("data-specificationvalueid")+"' rowspan='"+rowspan+"'>"+$(v).text()+"</td>";
                        }
                        if(map1[$(v1).attr("data-specificationvalueid")] != $(v1).attr("data-specificationvalueid")){
                            tdHtml += "<td data-id='"+$(v1).attr("data-specificationvalueid")+"' rowspan='"+$(".Product_Select>ul>li.active3").size()+"'>"+$(v1).text()+"</td>";
                        }

                        tdHtml += $("#testTdTmpl").render(tdJson2)+"<td><input type='text'  name='pice'/></td><td><input type='text' name='repertory'/></td><td><input type='text' name='GodCode'/></td>";
                        $("#list>tr").last().append(tdHtml);
                        if(!map[$(v).attr("data-specificationvalueid")]){
                            map[$(v).attr("data-specificationvalueid")] = $(v).attr("data-specificationvalueid");
                        }
                        if(!map1[$(v1).attr("data-specificationvalueid")]){
                            map1[$(v1).attr("data-specificationvalueid")] = $(v1).attr("data-specificationvalueid");
                        }
                    })
                })
            })
        }
    }

    return dataList;

}

function addAll_elt(){
    var $getTds2=$(".Lot_size1");
    var $getTds3=$(".Lot_size2 a");
    for(var i=0;i<$getTds3.size();i++){
        $getTds3.eq(i).click(function(){
            var getAtxt=$(this).text();
            addAll_msg(getAtxt);
            $getTds2.css('display','block');
            $(this).parent('div').css('dispalay','none');
//				if($(this).index()==0){
//					console.log('0  '+$(this).index())
//					Lotsize1_btnR('pice');
//				}else if($(this).index()==1){
//					console.log('1  '+$(this).index())
//					Lotsize1_btnR('repertory');
//				}else if($(this).index()==2){
//					console.log('2  '+$(this).index())
//					Lotsize1_btnR('GodCode');
//				}
        })
    }
}
addAll_elt();
function addAll_msg(dd){
    $('.Lot_size1').children('input').attr("placeholder",dd);
}

function getAll(name,value){
    var $gettrs=$('#list tr');
    console.log($gettrs);
    var $gettds=$('#list tr:eq(0) td');
    console.log($gettds);
    for(var i=0;i<$gettrs.size();i++){
        for(var j=0;j<$gettds.size();j++){
            console.log(name);
            $gettrs.eq(i).children('td').eq(j).children('input[name='+name+']').val(value)
        }
    }
}
/*赋值给INPUT*/

function Gods_Price(){
    var maxNum=0;
    var getPrice;
    var minNum=parseFloat($("#list input[name='pice']").eq(0).val());
    $("#list input[name='pice']").each(function(i){
        var num = parseFloat($("#list input[name='pice']").eq(i).val());
        if(num>maxNum)
        {
            maxNum=num;
        }
        if(num<minNum)
        {
            minNum=num;
        }
    });
    getPrice=minNum;
    return getPrice;
}
/*赋值给价格*/
$('.Lotsize1_cncle').click(function(){
    $('.Lot_size2').css('display','block');
    $('.Lot_size1').css('display','none');
});
$(".Lot_size2 a").click(function(){
    $(".Lot_size1 input").val('');
    $(".Lot_size1 input").removeAttr("data-name");
    $(".Lot_size1 input").attr("data-name",$(this).attr("data-name"));
});
$(".Lotsize1_btnR").click(function(){
    $('.Lot_size2').css('display','block');
    $("#list input[name='"+$(".Lot_size1 input").attr("data-name")+"']").val($(".Lot_size1 input").val());
    $('.Lot_size1').css('display','none');

    $(".total-repertory").text(getToalStock());
    $("#Make_productPrice").val(Gods_Price());
});
/*点击全体赋值*/


function getToalStock(){
    var total_stock=0;
    var $getInputs=$("#list input[name='repertory']");
    for(var i=0;i<$getInputs.length;i++){
        total_stock+=parseInt($getInputs.eq(i).val());
    }
    return total_stock;
}

$(document).on("focusout","#list",function(){

        $(".total-repertory").text(getToalStock());
        $("#Make_productPrice").val(Gods_Price());

});
/*总库存动态赋值*/

var getpicturePathList=[];
$('#test').diyUpload({
    url:BUSINESS_URL_PRE+'/essential/pictureOrFilePathController/uploadPictureOrFile?imgType=1',
    contentType:"multipart/form-data",
    beforeSend: function(xhr) {
        xhr.setRequestHeader("Content-Type",'multipart/form-data')
    },
    success:function( data ) {
        $("#MakeInfm_img").append(
            "<div class='brick '>" +
            "<img src='"+data.info[0]+" '/>"+
            "<i class='icon-trash icon-2x icon-only Img-remove'>"+
            "</div>");
        getpicturePathList.push(data.info[0]);
        var getlis=$("#test").siblings(".parentFileBox").children("ul").children("li").length;
        if($("#MakeInfm_img div").length==getlis){
            $("#test").siblings(".parentFileBox").fadeOut("slow",function(){
                $("#test").siblings(".parentFileBox").remove();
            });
        }
        $("#MakeInfm_img").dragsort("destroy");
        $("#MakeInfm_img").dragsort({ dragSelector: "div.brick", dragBetween: true, dragEnd: function() { }, placeHolderTemplate: "" });
        del_imgs();//点击删除图片功能

    },
    error:function( err ) {
        alert(err.msg);
    },

    // 并发数限制为1
    threads:1,

    //文件上传方式
    method:"POST",
    //服务器地址
    /*server:BUSINESS_URL_PRE,*/
    //是否已二进制的流的方式发送文件，这样整个上传内容php://input都为文件内容
    sendAsBinary:false,
    // 开起分片上传。 thinkphp的上传类测试分片无效,图片丢失;
    chunked:false,
    // 分片大小
    chunkSize:512 * 1024,
    //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
    fileNumLimit:50,
    fileSizeLimit:50 * 1024 * 1024,
    fileSingleSizeLimit:2 * 1024 * 1024
});
function del_imgs(){
    $("#MakeInfm_img div i").click(function(){
        $(this).parent().fadeOut("slow",function(){
            $(this).remove();
        });
    })
}

/*$('#as').diyUpload({
    url:'http://10.0.1.158:8080/essential/pictureOrFilePathController/uploadPictureOrFile?type=1',
    success:function( data ) {
        console.info( data );
        alert(data);
    },
    error:function( err ) {
        console.info( err );
    },
    buttonText : '选择文件',
    chunked:true,
    // 分片大小
    chunkSize:512 * 1024,
    //最大上传的文件数量, 总文件大小,单个文件大小(单位字节);
    fileNumLimit:50,
    fileSizeLimit:500000 * 1024,
    fileSingleSizeLimit:50000 * 1024,
    accept: function del_imgs(){
    $("#MakeInfm_img div i").click(function(){
        $(this).parent().fadeOut("slow",function(){
            $(this).remove();
        });
    })
}
{}
});*/
/*图片单独上传*/

function previewImage(file)
{
    var MAXWIDTH  = 160;
    var MAXHEIGHT = 80;
    var div = document.getElementById('preview');
    if (file.files && file.files[0])
    {
        div.innerHTML ='<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function(){
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width  =  rect.width;
            img.height =  rect.height;
//                 img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top+'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;}
        reader.readAsDataURL(file.files[0]);
    }
    else //兼容IE
    {
        var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
        div.innerHTML = "<div id=divhead style='width:"+rect.width+"px;height:"+rect.height+"px;margin-top:"+rect.top+"px;"+sFilter+src+"\"'></div>";
    }

}
function convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback.call(this, dataURL);
        canvas = null;
    };
    img.src = url;
}
function clacImgZoomParam( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:width, height:height};

    if( width>maxWidth || height>maxHeight )
    {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if( rateWidth > rateHeight )
        {
            param.width =  maxWidth;
            param.height = Math.round(height / rateWidth);
        }else
        {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }

    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}
/*图片上传缩略图*/
var $getPostAjax=$("#PostAjax");
var getImgdata=$('#imghead').attr('src');
console.log(getImgdata);
/*convertImgToBase64($(this).val(), function(base64Img){
 // Base64DataURL
 });*/

/*图片上传数据转换*/
var freightType;
var freightGroupId;
var freightPrice;
function Make_yunfei(){
    var $getlis=$('#Make_yunfei li');
    $getlis.click(function(){
        freightType= $(this).index();
        if(freightType==0){
            freightPrice=$(this).children("input[type='number']");
        }
        //$(this).children().trigger('click');
    });
    return freightType;
}
Make_yunfei();
/*运费模板调用*/


//输入框获取焦点 其checkbox获取点
function input_checked(input,checked){
    $(input).focus(function(){
        $(checked).prop("checked",true);
    })
}
input_checked("#freightPrice","#youfei1");
input_checked("#youfeiMB","#youfei2");


function edit_getSkuVal(){
    var $getTr=$(".ProducStock table tbody tr");
    var tempJson1 = {};
    for(var i=0;i<$getTr.size();i++){
        var keyHead = "productSkuAutoList["+i+"].";
        var keyId1="productSkuAutoList["+i+"].articleNumber";
        var keyId2="productSkuAutoList["+i+"].prices";
        var keyId3="productSkuAutoList["+i+"].productskuCount";
        var keyId4="productSkuAutoList["+i+"].productskuId";
        tempJson1[keyId1]=$(".ProducStock table tbody tr").eq(i).find("input[name='GodCode']").val();
        tempJson1[keyId2]=$(".ProducStock table tbody tr").eq(i).find("input[name='pice']").val();
        tempJson1[keyId3]=$(".ProducStock table tbody tr").eq(i).find("input[name='repertory']").val();
        tempJson1[keyId4]=$(".ProducStock table tbody tr").eq(i).attr("data-skuid");
        $.each(dataList[i], function(i1,v1){
            var skuKey = keyHead+i1;
            tempJson1[skuKey] = v1;
        });

        //BigList.push(tempJson1);
    }
    //for(var j=0;j<BigList.length;j++){
    //	var productSkuRelationList="productSkuRelationList";
    //	BigList[j][productSkuRelationList]=dataList[j];
    //}
    console.log(tempJson1);
    return tempJson1;
}
//商品关键字输入
$("#onsale_goods").on("keyup","#Make_keywords",function(){
    var getValueLength=this.value;
    $("#Make_keywords_Lastcount").text(100-getValueLength.length);
    this.value=this.value.replace("，",",");
});