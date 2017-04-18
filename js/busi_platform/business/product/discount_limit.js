/**
 * Created by Morgan on 2016/7/23.
 */

var paIndexmData={};
var lookdetailPage={};

/*定义一个数组，用来存储选中的相关商品*/
var productIdArr = [];
var editproductIdArr=[]
function addDiscount_Infm(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/queryPromotionProduct',
        data:res,
        dataType:"json",
        beforeSend:function(){
            $("#discount_limit_table1").children().remove();
            $('#discount_limit_table1').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if(data.code==1){
                $("#discount_limit_table1").children().remove();
                var html='<table style="width:100%;">' +
                    '<thead><th style="width: 45%;">商品信息</th>' +
                    '<th style="width: 20%;">库存</th> ' +
                    '<th style="width: 15%;">操作</th></thead><tbody id="discount_limit_list">';
                for(var i=0;i<data.info.promotionProductVoList.length;i++){
                    if($.inArray(data.info.promotionProductVoList[i].productId.toString(), productIdArr) != -1){
                        html+="<tr data-type-productOrShopId='"+data.info.promotionProductVoList[i].productId+"'>" +
                            "<td>" +
                            "<input type='checkbox' class='checkbtn' checked='checked'>" +
                            "<figure>" +
                            "<img src="+data.info.promotionProductVoList[i].path+" action-name='img' />" +
                            "<figcaption action-name='article_number'>"+data.info.promotionProductVoList[i].articleNumber+"</figcaption>" +
                            "</figure><dl>" +
                            "<dt action-name='product_name'>"+data.info.promotionProductVoList[i].productName+"</dt>" +
                            "<dd action-name='price'>"+data.info.promotionProductVoList[i].costPrice+"</dd></dl></td>"+
                            "<td action-name='stock'>"+data.info.promotionProductVoList[i].stock+"</td>"+
                            "<td market-status=" +data.info.promotionProductVoList[i].promotionType+"></td></tr>"
                    }else if($.inArray(data.info.promotionProductVoList[i].productId.toString(), productIdArr) == -1){
                        html+="<tr data-type-productOrShopId='"+data.info.promotionProductVoList[i].productId+"'>" +
                            "<td>" +
                            "<input type='checkbox' class='checkbtn'>" +
                            "<figure>" +
                            "<img src="+data.info.promotionProductVoList[i].path+" action-name='img' />" +
                            "<figcaption action-name='article_number'>"+data.info.promotionProductVoList[i].articleNumber+"</figcaption>" +
                            "</figure><dl>" +
                            "<dt action-name='product_name'>"+data.info.promotionProductVoList[i].productName+"</dt>" +
                            "<dd action-name='price'>"+data.info.promotionProductVoList[i].costPrice+"</dd></dl></td>"+
                            "<td action-name='stock'>"+data.info.promotionProductVoList[i].stock+"</td>"+
                            "<td market-status=" +data.info.promotionProductVoList[i].promotionType+"></td></tr>"
                    }

                }
                html+="</tbody></table>";
                $("#discount_limit_table1").append(html);

                pagePlus(data.info.pageCount,res,true);//分页方法调用;

                $("#total_pages").html("共"+data.info.pageCount+"页");
                $("#each_total").html("每页"+data.info.promotionProductVoList.length+"条");

                $("td[market-status]").each(function(i){
                    if($("td[market-status]").eq(i).attr("market-status")=="null"){
                        $("td[market-status]").eq(i).append("<a href='###' action-attend='"+i+"'>参加折扣</a>")
                    }else if($("td[market-status]").eq(i).attr("market-status")==0){
                        $("td[market-status]").eq(i).append("<p>已参加</p>");
                        $("td[market-status]").eq(i).parent().find("input[ type='checkbox']").attr("disabled","disabled");
                    }else if($("td[market-status]").eq(i).attr("market-status")!=0&&$("td[market-status]").eq(i).attr("market-status")!="null"){
                        $("td[market-status]").eq(i).append("<p>该商品已参加其他活动</p>");
                        $("td[market-status]").eq(i).parent().find("input[ type='checkbox']").attr("disabled","disabled");
                    }
                });
                $("a[action-attend]").bind("click",function(){
                    if($(this).parent().parent().find("input[type='checkbox']").prop("checked")==false){
                        $(this).parent().parent().find("input[type='checkbox']").click()
                    }else{
                        $(this).parent().parent().find("input[type='checkbox']").click();
                    }
                });
                //点击参加活动其前方input获取状态;
                $("#discout_all_join").prop("checked",false);
                All_selet_btn();
                //全选按钮
            }else {
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题");
        }
    })
}
$(".discount_next_step a").bind("click",function(){
    if($(".discount_next_step a").attr("discount-next")==0){
        $("#discount_limit_change").children().remove();
        Discoun_Next();
        $(".Sel_Gods_look").css("display","none");
        $(".Sel_Gods_add").css("display","block");
        $("#discount_sel_gods li").eq(1).addClass("active").siblings().removeClass("active");
        Refsh_InputVal();//折扣赋值
        discount_sel_gods();//动态进行折扣计算并赋值
        discout_all_reback();// 全选功能
        $(".discount_next_step a").attr("discount-next","1");
        $(".discount_next_step a[discount-next='1']").html("完成 ");

    }else if($(".discount_next_step a").attr("discount-next")==1){
        Save_dicount_active(discount_add(),'/essential/promotionAutoController/addPromotionProduct');
    }else if($(".discount_next_step a").attr("discount-next")==2){

        postProductArray({productList:productIdArr});
        Refsh_InputVal();//折扣赋值

        discout_all_reback();// 全选功能
        $(".discount_next_step a").attr("discount-next","3");
        $(".discount_next_step a[discount-next='1']").html("完成 ");

    }else if($(".discount_next_step a").attr("discount-next")==3){
        Save_dicount_active(UpdateData(),'/essential/promotionAutoController/addPromotionProduct');
    }
    /*$(".discount_next_step a").bind("click",function(){
     if($(".discount_next_step a").attr("discount-next")==1){
     }
     });*/
});

/*查询填充*/
$("#Make_new_discount").on("click",function(){
    if($(".Set_discount").is(":hidden")){
        $(".Set_discount").show()
        $(".Look_discount").hide()
        addDiscount_Infm({shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,pageSize:10});
    }else{
        $(".Set_discount").hide()
        $(".Look_discount").show()
    }

});

$(".Apply_Market ul li").click(function(){
    console.log($(this).index());
    if(!$(".look_discount_table").is(":hidden")){
        var getIndex=$(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        if(getIndex==0){
            Look_discount({shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,pageSize:PAGE_COUNT},'/essential/promotionAutoController/queryAllPromotion');
        }else if(getIndex==1){
            Look_discount({shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,pageSize:PAGE_COUNT},'/essential/promotionAutoController/queryNotStartPromotion');
        }else if(getIndex==2){
            Look_discount({shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,pageSize:PAGE_COUNT},'/essential/promotionAutoController/queryStartPromotion');
        }else if(getIndex==3){
            Look_discount({shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,pageSize:PAGE_COUNT},'/essential/promotionAutoController/queryEndPromotion');
        }
        if(getIndex!=0){
            $("#search_discount").parent().hide();
        }else{
            $("#search_discount").parent().show();
        }
    }
});

function Discoun_Next(){
    var getInputs=$('#discount_limit_list input[type="checkbox"]:checked');
    get_Inputs(getInputs);
}
/*获取有用checked的input 并存储 调用循环进行对其对应的tr的数据的获取并渲染*/
function get_Inputs(objs){
    objs.each(function(i){
        var getobj=objs.eq(i)
        Make_Table(getobj);
    })
}

function Make_Table(obj){
    var getTr=$(obj).parent().parent();
    var getProduct=getTr.attr("data-type-productOrShopId");
    var getImg=getTr.find("[action-name='img']").attr("src")
    var getArticl= getTr.find("[action-name='article_number']").html();
    var getProductName= getTr.find("[action-name='product_name']").html();
    var getPrice= getTr.find("[action-name='price']").html();
    var getStock= getTr.find("[action-name='stock']").html();
    var html="<tr productOrShopId='"+getProduct+"'><td><input type='checkbox'><figure>" +
        "<img src="+getImg+" action-name='img' />" +
        "<figcaption setaction-name='article_number'>"+getArticl+"</figcaption>" +
        "</figure><dl>" +
        "<dt setaction-name='product_name'>"+getProductName+"</dt>" +
        "<dd setaction-name='stock'>库存："+getStock+"</dd></dl></td>"+
        "<td setaction-name='price'>"+getPrice+"</td>"+
        "<td setaction-name='discout' ><input type='text' maxlength='' class='input_discout'>折</td>"+
        "<td setaction-name='discoutprice'><div><i>￥</i><input type='text' style='width:50%;' class='input_discout_price'></div></td>"+
        "<td ><a href='###' action-btn='cancle'>撤销</a></td></tr>";
    $("#discount_limit_change").append(html);
}

function Refsh_InputVal(){
    var gettrs=$("#discount_limit_change").children("tr");
    gettrs.each(function(i){
        var b=i;
        var $that=$(this);
        $(this).find(".input_discout").change(b,function(b){
            var getprice=$that.children("td[setaction-name='price']").html();
            var getdiscount=$that.find(".input_discout").val();

            if($(this).val()!=''){
                $(this).parent().parent().find("input[type='checkbox']").prop("checked",true);
                console.log(true)
            }else{
                $(this).parent().parent().find("input[type='checkbox']").prop("checked",false);
                console.log(false)
            }
            var getLast=parseFloat(getprice)*parseFloat(getdiscount/10);
            $that.find(".input_discout_price").val(getLast)
        });
        $(this).find(".input_discout_price").change(function(){
            var getprice=$that.children("td[setaction-name='price']").html();
            var getdiscount=$that.find(".input_discout_price").val();
            if($(this).val()!=''){
                $(this).parent().parent().parent().find("input[type='checkbox']").prop("checked",true);
            }else{
                $(this).parent().parent().find("input[type='checkbox']").prop("checked",false);
            }
            var getLast=parseFloat(getdiscount)/parseFloat(getprice)*10;
            $that.find(".input_discout").val(getLast);
        })
    });
    $("a[action-btn='cancle']").click(function(){
        $(this).parent().parent().remove();
    });
}

/*动态进行折扣计算并赋值*/
function discount_sel_gods(){
    $("#discount_sel_gods li").on("click",function(){
        var $index=$(this).index();
        if($index==0){
            $(this).addClass("active").siblings().removeClass("active");
            $(".discount_next_step a").attr("discount-next","0");
            $(".discount_next_step a").html("下一步");
        }else if($index==1){
            $(this).addClass("active").siblings().removeClass("active");
            $(".discount_next_step a").attr("discount-next","1");
            $(".discount_next_step a").html("完成");
        }
        $(".Sel_Gods_Detail>div").eq($index).show().siblings().hide();
    })
}

function discount_add(){
    var datajson={
        loginUser:BUSINESS_LOGIN_USER_ID,
        promotionType:0,
        promotionName:$("#discount-input-name").val(),
        startTime:$("#discount-input-time1").val(),
        endTime:$("#discount-input-time2").val(),
        tag:$("#discount-input-tag").val(),
        shopId:BUSINESS_LOGIN_SHOP_ID
    };
    var $getTrs=$('#discount_limit_change input[type="checkbox"]:checked').parent().parent();

    $getTrs.each(function(i){
        var keyId1="promotionList["+i+"].productOrShopId";
        var keyId2="promotionList["+i+"].discountPercent";
        //var keyId3="promotionList["+i+"].discountMoney";

        datajson[keyId1]=$getTrs.eq(i).attr("productOrShopId");
        datajson[keyId2]=$getTrs.eq(i).find(".input_discout").val();
        //datajson[keyId3]=2;
    });
    console.log(datajson);
    return datajson;
}

function UpdateData(){
    var datajson={
        loginUser:BUSINESS_LOGIN_USER_ID,
        promotionType:0,
        promotionName:$("#discount-input-name").val(),
        startTime:$("#discount-input-time1").val(),
        endTime:$("#discount-input-time2").val(),
        tag:$("#discount-input-tag").val(),
        shopId:BUSINESS_LOGIN_SHOP_ID
    };
    var $getTrs=$('#discount_limit_change input[type="checkbox"]:checked').parent().parent();

    $getTrs.each(function(i){
        var keyId1="promotionList["+i+"].productOrShopId";
        var keyId2="promotionList["+i+"].discountPercent";
        var keyId3="promotionList["+i+"].productRomotionId";

        //var keyId3="promotionList["+i+"].discountMoney";

        datajson[keyId1]=$getTrs.eq(i).attr("productOrShopId");
        datajson[keyId2]=$getTrs.eq(i).find(".input_discout").val();
        datajson[keyId3]=$getTrs.eq(i).attr("productRomotionId");
        //datajson[keyId3]=2;
    });
    console.log(datajson);
    return datajson;
}

function check_Time(){
    if((new Date($("#discount-input-time2").val()).getTime())-(new Date($("#discount-input-time1").val()).getTime())>0){
        return true
    }else {
        return false
    }
}

function Save_dicount_active(res,url){
    if(res.startTime==""){
        alert("活动开始时间不能为空")
    }else if(res.endTime==""){
        alert("活动截止时间不能为空")
    }else if(res.promotionName==""){
        alert("活动名称不能为空")
    }else if(check_Time()==false){
        alert("请输入正确的活动时间")
    }else if(res.startTime!="" && res.endTime!="" && res.promotionName!=""&&check_Time()){
        console.log(res.startTime)
        $.ajax({
            type:'post',
            url:BUSINESS_URL_PRE+url,
            data:res,
            dataType:"json",
            success:function(res){
                if(res.code==1){
                    $("#discount_limit_change").children().remove();
                    alert(res.msg);
                    $("a[href='#ApplyMarket']").trigger("click");
                }else {
                    alert(res.msg);
                    $("a[href='#ApplyMarket']").trigger("click");
                }
            },error:function(){
                alert("网络有问题");
            }
        })
    }

}
//全选按钮

function All_selet_btn(){
    $("#discout_all_join").click(function() {
        if ($("#discout_all_join").prop("checked")==false) {
            $("#discount_limit_list tr td input").not("input[disabled='disabled']").each(function(){
                $(this).prop("checked",false);

                $('.checkbtn').each(function (i) {
                    if ($('.checkbtn').eq(i).prop('checked') == false) {
                        var productid1 = $('#discount_limit_list tr').eq(i).attr('data-type-productorshopid');
                        $.each(productIdArr, function (j, k) {
                            if (k == productid1) {
                                productIdArr.splice(j, 1);
                            }
                        });
                    }
                });
            });
        } else{
            $("#discount_limit_list tr td input").not("input[disabled='disabled']").each(function(){
                $(this).prop("checked",true);
                $('.checkbtn').each(function (i){
                    if($('.checkbtn').eq(i).prop('checked') == true){
                        var productid = $('#discount_limit_list tr').eq(i).attr('data-type-productorshopid');
                        if($.inArray(productid,productIdArr) == -1){
                            productIdArr.push(productid);
                        }
                    }
                });
            })
        }
    });
}

function discout_all_reback(){
    $("#discout_all_reback").click(function() {
        if ($("#discout_all_reback").prop("checked")==false) {
            $("#discount_limit_change tr td input").not("input[disabled='disabled']").each(function(){
                $(this).prop("checked",false);
            });

        } else{
            $("#discount_limit_change tr td input").not("input[disabled='disabled']").each(function(){
                $(this).prop("checked",true);
            })
        }
    });
    $("#all_reback").click(function(){
        $("#discount_limit_change tr").each(function(i){
            if($(this).find("input[type='checkbox']").prop("checked")){
                $(this).remove();
            }
        })
    });
}

//商品ID数据封存到数组里
$(document).on('click','.checkbtn',function (e){
    e.stopImmediatePropagation();
    var _index = $(this).index('.checkbtn');
    var productid1 = $('#discount_limit_list tr').eq(_index).attr('data-type-productorshopid');
    if($(this).prop('checked') == true){
        productIdArr.push(productid1);

    }else if($(this).prop('checked') == false){

        $.each(productIdArr,function (i,v){
            if(v == productid1){
                productIdArr.splice(i,1);
            }
        })
    }
    console.log(productIdArr);
});

function MakeSlectArray(){
    $(document).on('click','.checkbtn',function (e){
        e.stopImmediatePropagation();
        var _index = $(this).index('.checkbtn');
        var productid1 = $('#discount_limit_list tr').eq(_index).attr('data-type-productorshopid');
        if($(this).prop('checked') == true){
            editproductIdArr.push(productid1);

        }else if($(this).prop('checked') == false){

            $.each(editproductIdArr,function (i,v){
                if(v == productid1){
                    editproductIdArr.splice(i,1);
                }
            })
        }
        console.log(editproductIdArr);
    });
}

function AddListGods(){
    var ChekedList=[];
    $("#discount_limit_list tr")
        .find("input[type='checkbox']:checked").each(function(i){
        var product={};
        product.productId=$(this).parent().parent().attr("data-type-productorshopid");
        ChekedList.push(product);
    })
}



$("a[data-action='search_btn']").bind("click",function(){
    var $getname=$(".Sel_Gods_look input[data-name='gods_name']").val();
    var $getcode=$(".Sel_Gods_look input[data-name='gods_code']").val();
    addDiscount_Infm({shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,productName:$getname,articleNumber:$getcode});
});

//分页调用渲染
function page_Infm(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/queryPromotionProduct',
        data:res,
        dataType:"json",
        beforeSend:function(){
            $("#discount_limit_table1").children().remove();
            $('#discount_limit_table1').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if(data.code==1){
                $("#discount_limit_table1").children().remove();
                var html='<table style="width:100%;">' +
                    '<thead><th style="width: 45%;">商品信息</th>' +
                    '<th style="width: 20%;">库存</th> ' +
                    '<th style="width: 15%;">操作</th></thead><tbody id="discount_limit_list">';
                for(var i=0;i<data.info.promotionProductVoList.length;i++){
                    if($.inArray(data.info.promotionProductVoList[i].productId.toString(), productIdArr) != -1){
                        html+="<tr data-type-productOrShopId='"+data.info.promotionProductVoList[i].productId+"'>" +
                            "<td>" +
                            "<input type='checkbox' class='checkbtn' checked='checked'>" +
                            "<figure>" +
                            "<img src="+data.info.promotionProductVoList[i].path+" action-name='img' />" +
                            "<figcaption action-name='article_number'>"+data.info.promotionProductVoList[i].articleNumber+"</figcaption>" +
                            "</figure><dl>" +
                            "<dt action-name='product_name'>"+data.info.promotionProductVoList[i].productName+"</dt>" +
                            "<dd action-name='price'>"+data.info.promotionProductVoList[i].costPrice+"</dd></dl></td>"+
                            "<td action-name='stock'>"+data.info.promotionProductVoList[i].stock+"</td>"+
                            "<td market-status=" +data.info.promotionProductVoList[i].promotionType+"></td></tr>"
                    }else if($.inArray(data.info.promotionProductVoList[i].productId.toString(), productIdArr) == -1){
                        html+="<tr data-type-productOrShopId='"+data.info.promotionProductVoList[i].productId+"'>" +
                            "<td>" +
                            "<input type='checkbox' class='checkbtn'>" +
                            "<figure>" +
                            "<img src="+data.info.promotionProductVoList[i].path+" action-name='img' />" +
                            "<figcaption action-name='article_number'>"+data.info.promotionProductVoList[i].articleNumber+"</figcaption>" +
                            "</figure><dl>" +
                            "<dt action-name='product_name'>"+data.info.promotionProductVoList[i].productName+"</dt>" +
                            "<dd action-name='price'>"+data.info.promotionProductVoList[i].costPrice+"</dd></dl></td>"+
                            "<td action-name='stock'>"+data.info.promotionProductVoList[i].stock+"</td>"+
                            "<td market-status=" +data.info.promotionProductVoList[i].promotionType+"></td></tr>"
                    }

                }
                html+="</tbody></table>";
                $("#discount_limit_table1").append(html);

                $("#total_pages").html("共"+data.info.pageCount+"页");
                $("#each_total").html("每页"+data.info.promotionProductVoList.length+"条");

                $("td[market-status]").each(function(i){
                    if($("td[market-status]").eq(i).attr("market-status")=="null"){
                        $("td[market-status]").eq(i).append("<a href='###' action-attend='"+i+"'>参加折扣</a>")
                    }else if($("td[market-status]").eq(i).attr("market-status")==0){
                        $("td[market-status]").eq(i).append("<p>已参加</p>");
                        $("td[market-status]").eq(i).parent().find("input[ type='checkbox']").attr("disabled","disabled");
                    }else if($("td[market-status]").eq(i).attr("market-status")!=0&&$("td[market-status]").eq(i).attr("market-status")!="null"){
                        $("td[market-status]").eq(i).append("<p>该商品已参加其他活动</p>");
                        $("td[market-status]").eq(i).parent().find("input[ type='checkbox']").attr("disabled","disabled");
                    }
                });
                $("a[action-attend]").bind("click",function(){
                    if($(this).parent().parent().find("input[type='checkbox']").prop("checked")==false){
                        $(this).parent().parent().find("input[type='checkbox']").click()
                    }else{
                        $(this).parent().parent().find("input[type='checkbox']").click();
                    }
                });
                //点击参加活动其前方input获取状态;

                $("#discout_all_join").prop("checked",false);
                All_selet_btn();
                //全选按钮
            }else {
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题");
        }
    })
}
$("a[market-data-act='discount']").click(
    function(){
        $(this).hide();$(".Set_Right_cancle").show();
        AllDiscount()
});

function AllDiscount(){
    $("a[market-data-act='save']").click(function(){
        if($("#allDiscountInput").val()==""){
            alert("折扣不能为空")
        }else if(typeof ($("#allDiscountInput").val()-0) != "number"){
            alert("请输入数字")
        }else if(typeof ($("#allDiscountInput").val()-0) == "number"){
            $("#discount_limit_change input[type='checkbox']").each(function(i){
                if($("#discount_limit_change input[type='checkbox']").eq(i).prop("checked")){
                    $("#discount_limit_change input[type='checkbox']").eq(i).parent().parent().find("input.input_discout").val($("#allDiscountInput").val())
                }
            });
            $(".Set_Right_cancle").hide();
            $("a[market-data-act='discount']").show();
        }
    });
    $("a[market-data-act='cancle']").click(function(){
        $(".Set_Right_cancle").hide();
        $("a[market-data-act='discount']").show();
    })
}

//分页
function pagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            paIndexmData = data;
            if(!flag){
                //console.log(paramData);
                paIndexmData.pageIndex = page;
                paIndexmData.pageSize=10;
                page_Infm(paIndexmData);
            }
            flag = false;
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


/*限时折扣活动相关查询*/

function Look_discount(res,url){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+url,
        data:res,
        dataType:"json",
        beforeSend:function(){
            $("#look_discount_tables").html("");
            $('.look_discount_table').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if (data.code==1){
                $(".Img_Load").remove();

                //渲染模板
                var html = $("#discountTableTmpl").render(data.info);
                $("#look_discount_tables").append(html);

                LookpagePlus(data.info.pageCount,res,true,url);//分页方法调用;
                $("#look_total_pages").html("共"+Math.ceil(data.info.pageCount/PAGE_COUNT)+"页");
                $("#look_each_total").html("每页"+data.info.promotionAutoList.length+"条");

                Look_btn_action();
            }else {
                alert(data.msg)
            }

        },error:function(){
            alert("网络有问题,请刷新重试");
        }
    })
}
Look_discount({shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,pageSize:PAGE_COUNT},'/essential/promotionAutoController/queryAllPromotion');

//活动搜索功能
$(".Make_newDiscount").on("keydown","#search_discount",function(event){
    if(event.keyCode == 13){
        Look_discount(
            {shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,pageSize:PAGE_COUNT,promotionName:$("#search_discount").val()},
            '/essential/promotionAutoController/queryAllPromotion'
        );
    }
});

function Look_btn_action(){
    $("#look_discount_tables tr td a[data-btn-action]").click(function(){
        var $that=$(this);
        var $gepromotionid=$(this).attr("data-promotionid");
        if($(this).attr("data-btn-action")=="invalid"){
            if (confirm("是否确认该活动失效")){
                MakeIt_Inavlid({loginUser:BUSINESS_LOGIN_USER_ID,promotionId:$gepromotionid},$that);
            }
        }else if($(this).attr("data-btn-action")=="delet"){
            if (confirm("是否确认删除该活动")){
                MakeIt_delt({loginUser:BUSINESS_LOGIN_USER_ID,promotionId:$gepromotionid},$that);
            }
        }
    })
}

//限时折扣-上方列表内的 渲染的操作按键功能
function MakeIt_delt(res,pointer){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/deletePromotion',
        data:res,
        dataType:"json",
        success:function(data){
            if(data.code==1){
                alert(data.msg);

                pointer.html("已删除");
                pointer.removeAttr("data-promotionid");
                pointer.unbind("click");

            }else {
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题,请刷新重试");
        }
    })
}
function MakeIt_Inavlid(res,pointer){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/invalidPromotion',
        data:res,
        dataType:"json",
        success:function(data){
            if(data.code==1){
                alert(data.msg);

                pointer.html("已失效");
                pointer.removeAttr("data-promotionid");
                pointer.unbind("click");

            }else {
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题,请刷新重试");
        }
    })
}

//分页二次调用
function look_page_Infm(res,url){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+url,
        data:res,
        dataType:"json",
        beforeSend:function(){
            $("#look_discount_tables").html("");
            $('.look_discount_table').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if (data.code==1){
                $(".Img_Load").remove();

                //渲染模板
                var html = $("#discountTableTmpl").render(data.info);
                $("#look_discount_tables").append(html);

                $("#look_total_pages").html("共"+Math.ceil(data.info.pageCount/PAGE_COUNT)+"页");
                $("#look_each_total").html("每页"+data.info.promotionAutoList.length+"条");

                Look_btn_action();
            }else {
                alert(data.msg)
            }
        },error:function(){
            alert("网络有问题,请刷新重试");
        }
    })
}

//分页2
function LookpagePlus(totalPageCount,data,flag,url){
    $(".pagesContent").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            lookdetailPage = data;
            if(!flag){
                //console.log(paramData);
                lookdetailPage.pageSize=10;
                lookdetailPage.pageIndex = page;
                look_page_Infm(lookdetailPage,url);
            }
            flag = false;
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

function timeControl(){
    var start = {
        dateCell: '#discount-input-time1',
        format: 'YYYY-MM-DD hh:mm:ss',
        minDate: jeDate.now(0), //设定最小日期为当前日期
        isTime:true,
        isinitVal:true,
        festival:true,
        ishmsVal:false,
        maxDate: '2099-06-30 23:59:59', //最大日期
        choosefun: function(elem,datas){
            end.minDate = datas; //开始日选好后，重置结束日的最小日期
        }
    };
    var end = {
        dateCell: '#discount-input-time2',
        format: 'YYYY-MM-DD hh:mm:ss',
        minDate: jeDate.now(0), //设定最小日期为当前日期
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

//编辑按钮功能实现
$(".Look_discount").on("click",".edit_promotion",function(){
    var getPromotionid=$(this).attr("data-promotionid");
    MakeSlectArray();//数组存储相应的product的点击事件

    $(".Look_discount").hide();
    $(".Set_discount").show(function(){

        edit_sel_gods(getPromotionid);//选择切换

        $(".Sel_Gods_Detail>div").eq(0).show().siblings().hide();

        //调用编辑接口获取相关数据-选择商品
        edit_seletgods({promotionId:getPromotionid});

        //调用编辑接口获取相关数据
        //editPromotionInfm({promotionId:getPromotionid});

    });

});

function edit_seletgods(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/editePromotion',
        data:res,
        dataType:"json",
        beforeSend:function(){
            $("#discount_limit_table1").children().remove();
            $('#discount_limit_table1').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if(data.code==1){
                $("#discount_limit_table1").children().remove();
                var html='<table style="width:100%;">' +
                    '<thead><th style="width: 45%;">商品信息</th>' +
                    '<th style="width: 20%;">库存</th> ' +
                    '<th style="width: 15%;">操作</th></thead><tbody id="discount_limit_list">';
                for(var i=0;i<data.info.promotionProductList.length;i++){
                    if($.inArray(data.info.promotionProductList[i].productId.toString(), editproductIdArr) != -1){
                        html+="<tr data-type-productOrShopId='"+data.info.promotionProductList[i].productId+"'>" +
                            "<td>" +
                            "<input type='checkbox' class='checkbtn' checked='checked'>" +
                            "<figure>" +
                            "<img src="+data.info.promotionProductList[i].path+" action-name='img' />" +
                            "<figcaption action-name='article_number'>"+data.info.promotionProductList[i].articleNumber+"</figcaption>" +
                            "</figure><dl>" +
                            "<dt action-name='product_name'>"+data.info.promotionProductList[i].productName+"</dt>" +
                            "<dd action-name='price'>"+data.info.promotionProductList[i].costPrice+"</dd></dl></td>"+
                            "<td action-name='stock'>"+data.info.promotionProductList[i].stock+"</td>"+
                            "<td market-status=" +data.info.promotionProductList[i].promotionType+"></td></tr>"
                    }else if($.inArray(data.info.promotionProductList[i].productId.toString(), editproductIdArr) == -1){
                        html+="<tr data-type-productOrShopId='"+data.info.promotionProductList[i].productId+"'>" +
                            "<td>" +
                            "<input type='checkbox' class='checkbtn'>" +
                            "<figure>" +
                            "<img src="+data.info.promotionProductList[i].path+" action-name='img' />" +
                            "<figcaption action-name='article_number'>"+data.info.promotionProductList[i].articleNumber+"</figcaption>" +
                            "</figure><dl>" +
                            "<dt action-name='product_name'>"+data.info.promotionProductList[i].productName+"</dt>" +
                            "<dd action-name='price'>"+data.info.promotionProductList[i].costPrice+"</dd></dl></td>"+
                            "<td action-name='stock'>"+data.info.promotionProductList[i].stock+"</td>"+
                            "<td market-status='"+data.info.promotionProductList[i].promotionType+
                                "' producteStatusName='"+data.info.promotionProductList[i].producteStatusName+
                            "'></td></tr>"
                    }

                }
                html+="</tbody></table>";
                $("#discount_limit_table1").append(html);

                editpagePlus(data.info.pageCount,res,true);//分页方法调用;

                $("#total_pages").html("共"+data.info.pageCount+"页");
                $("#each_total").html("每页"+data.info.promotionProductList.length+"条");

                $("td[market-status]").each(function(i){
                    if($("td[market-status]").eq(i).attr("market-status")=="null"){
                        $("td[market-status]").eq(i).append("<a href='###' action-attend='"+i+"'>参加折扣</a>")
                    }else if($("td[market-status]").eq(i).attr("market-status")!="null"){
                        $("td[market-status]").eq(i).append("<p>"+$("td[market-status]").eq(i).attr("producteStatusName")+"</p>");
                        $("td[market-status]").eq(i).parent().find("input[ type='checkbox']").attr("disabled","disabled");
                    }
                });
                $("a[action-attend]").bind("click",function(){
                    if($(this).parent().parent().find("input[type='checkbox']").prop("checked")==false){
                        $(this).parent().parent().find("input[type='checkbox']").click()
                    }else{
                        $(this).parent().parent().find("input[type='checkbox']").click();
                    }
                });
                //点击参加活动其前方input获取状态;
                $("#discout_all_join").prop("checked",false);
                All_selet_btn();
                //全选按钮
            }else {
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题");
        }
    })
}
/*编辑选择商品分页*/
function editpagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            paIndexmData = data;
            if(!flag){
                //console.log(paramData);
                paIndexmData.pageIndex = page;
                paIndexmData.pageSize=10;
                editpage_Infm(paIndexmData);
            }
            flag = false;
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
//编辑选择商品-分页调用渲染
function editpage_Infm(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/editePromotion',
        data:res,
        dataType:"json",
        beforeSend:function(){
            $("#discount_limit_table1").children().remove();
            $('#discount_limit_table1').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if(data.code==1){
                $("#discount_limit_table1").children().remove();
                var html='<table style="width:100%;">' +
                    '<thead><th style="width: 45%;">商品信息</th>' +
                    '<th style="width: 20%;">库存</th> ' +
                    '<th style="width: 15%;">操作</th></thead><tbody id="discount_limit_list">';
                for(var i=0;i<data.info.promotionProductList.length;i++){
                    if($.inArray(data.info.promotionProductList[i].productId.toString(), editproductIdArr) != -1){
                        html+="<tr data-type-productOrShopId='"+data.info.promotionProductList[i].productId+"'>" +
                            "<td>" +
                            "<input type='checkbox' class='checkbtn' checked='checked'>" +
                            "<figure>" +
                            "<img src="+data.info.promotionProductList[i].path+" action-name='img' />" +
                            "<figcaption action-name='article_number'>"+data.info.promotionProductList[i].articleNumber+"</figcaption>" +
                            "</figure><dl>" +
                            "<dt action-name='product_name'>"+data.info.promotionProductList[i].productName+"</dt>" +
                            "<dd action-name='price'>"+data.info.promotionProductList[i].costPrice+"</dd></dl></td>"+
                            "<td action-name='stock'>"+data.info.promotionProductList[i].stock+"</td>"+
                            "<td market-status=" +data.info.promotionProductList[i].promotionType+"></td></tr>"
                    }else if($.inArray(data.info.promotionProductList[i].productId.toString(), editproductIdArr) == -1){
                        html+="<tr data-type-productOrShopId='"+data.info.promotionProductList[i].productId+"'>" +
                            "<td>" +
                            "<input type='checkbox' class='checkbtn'>" +
                            "<figure>" +
                            "<img src="+data.info.promotionProductList[i].path+" action-name='img' />" +
                            "<figcaption action-name='article_number'>"+data.info.promotionProductList[i].articleNumber+"</figcaption>" +
                            "</figure><dl>" +
                            "<dt action-name='product_name'>"+data.info.promotionProductList[i].productName+"</dt>" +
                            "<dd action-name='price'>"+data.info.promotionProductList[i].costPrice+"</dd></dl></td>"+
                            "<td action-name='stock'>"+data.info.promotionProductList[i].stock+"</td>"+
                            "<td market-status='"+data.info.promotionProductList[i].promotionType+
                            "' producteStatusName='"+data.info.promotionProductList[i].producteStatusName+
                            "'></td></tr>"
                    }

                }
                html+="</tbody></table>";
                $("#discount_limit_table1").append(html);

                $("#total_pages").html("共"+data.info.pageCount+"页");
                $("#each_total").html("每页"+data.info.promotionProductList.length+"条");

                $("td[market-status]").each(function(i){
                    if($("td[market-status]").eq(i).attr("market-status")=="null"){
                        $("td[market-status]").eq(i).append("<a href='###' action-attend='"+i+"'>参加折扣</a>")
                    }else if($("td[market-status]").eq(i).attr("market-status")!="null"){
                        $("td[market-status]").eq(i).append("<p>"+$("td[market-status]").eq(i).attr("producteStatusName")+"</p>");
                        $("td[market-status]").eq(i).parent().find("input[ type='checkbox']").attr("disabled","disabled");
                    }
                });
                $("a[action-attend]").bind("click",function(){
                    if($(this).parent().parent().find("input[type='checkbox']").prop("checked")==false){
                        $(this).parent().parent().find("input[type='checkbox']").click()
                    }else{
                        $(this).parent().parent().find("input[type='checkbox']").click();
                    }
                });
                //点击参加活动其前方input获取状态;
                $("#discout_all_join").prop("checked",false);
                All_selet_btn();
                //全选按钮
            }else {
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题");
        }
    })
}

function edit_sel_gods(Promotionid){
    $("#discount_sel_gods li").on("click",function(){
        var $index=$(this).index();
        if($index==0){
            $(this).addClass("active").siblings().removeClass("active");
            $(".discount_next_step a").attr("discount-next","2");
            edit_seletgods({promotionId:Promotionid});
            $(".discount_next_step a").html("下一步");
        }else if($index==1){
            $(this).addClass("active").siblings().removeClass("active");
            $(".discount_next_step a").attr("discount-next","3");
            $(".discount_next_step a").html("完成");
        }
        $(".Sel_Gods_Detail>div").eq($index).show().siblings().hide();
    })
}

function editPromotionInfm(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/editePromotion',
        data:res,
        dataType:"json",
        beforeSend:function(){
            $(".discount_div_change").append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if(data.code==1){
                $(".Img_Load").remove();
                $("#discount-input-name").val(data.info.promotionName);
                $("#discount-input-time1").val(data.info.startTime);
                $("#discount-input-time2").val(data.info.endTime);
                $("#discount-input-tag").val(data.info.tag);

                var editGodsTmpl = $("#editGodsTmpl").render(data.info);
                $("#discount_limit_change").html(editGodsTmpl);


                edit_cancle_btn();//撤销按钮
            }else{
                alert(data.msg);
                $(".Img_Load").remove();
            }
        },error:function(){
            alert("网络有问题,请刷新重试");
        }
    })
}

function edit_cancle_btn(){
    $(".edit_cancle").click(function(){
        var productId=$(this).parent().parent().attr("productOrShopId");
        if(confirm("是否确定撤销该已参加活动的商品")){
            deletPromotionProcut(productId);
        }
        function deletPromotionProcut(res){
            $.ajax({
                type:'post',
                url:BUSINESS_URL_PRE+'/essential/promotionAutoController/queryPromotionProduct',
                data:res,
                dataType:"json",
                beforeSend:function(){
                    $(this).removeClass("edit_cancle");
                },
                success:function(data){
                    if(data.code==1){
                        $(this).parent().parent().hide().remove();
                        $(this).removeClass("edit_cancle");
                    }else{
                        $(this).addClass("edit_cancle");
                        alert(data.msg);
                    }
                },error:function(){
                    alert("网络有问题,请刷新重试");
                    $(this).addClass("edit_cancle");
                }
            })
        }
    });
}

function postProductArray(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/queryPromotionProduct',
        data:res,
        dataType:"json",
        beforeSend:function(){
            $(".discount_div_change").append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (data) {
            if(data.code==1){
                var html="";
                for(var i=0;i<data.info.promotionProductVoList.length;i++){
                    html += "<tr productOrShopId='"+data.info.promotionProductVoList.productOrShopId+"'><td>" +
                        "<input type='checkbox'>" +
                        "<figure>" +
                        "<img src="+data.info.promotionProductVoList.path+" action-name='img' />" +
                        "<figcaption setaction-name='article_number'>"+data.info.promotionProductVoList.articleNumber+"</figcaption>" +
                        "</figure><dl>" +
                        "<dt setaction-name='product_name'>"+data.info.promotionProductVoList.productName+"</dt>" +
                        "<dd setaction-name='stock'>库存："+data.info.promotionProductVoList.stock+"</dd></dl></td>"+
                        "<td setaction-name='price'>"+data.info.promotionProductVoList.costPrice+"</td>"+
                        "<td setaction-name='discout' ><input type='text' maxlength='' class='input_discout'>折</td>"+
                        "<td setaction-name='discoutprice'>" +
                        "<div>" +
                        "<i>￥</i>" +
                        "<input type='text' style='width:50%;' class='input_discout_price'>" +
                        "</div></td>"+
                        "<td >" +
                        "<a href='#' action-btn='cancle'>撤销</a>" +
                        "</td>" +
                        "</tr>";
                }
                $("#discount_limit_change").append(html);

                $(".Img_Load").remove();
            }else{
                alert(data.msg);
                $(".Img_Load").remove();
            }

        },error:function(){
            alert("网络有问题,请刷新重试");
        }

    })
}