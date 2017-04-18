/**
 * Created by Morgan on 2016/9/21.
 */

/*查询填充--新建活动按钮功能*/
$("#Make_new_discount").on("click",function(){
    if($(".Set_discount").is(":hidden")){
        $(".Set_discount").show();
        $(".Look_discount").hide();
        addDiscount_Infm({
            shopId:BUSINESS_LOGIN_SHOP_ID,
            pageIndex:1,
            pageSize:10,
            promotionId:$("#discount-input-name").attr("data-promotionId")});
    }else{
        $(".Set_discount").hide();
        $(".Look_discount").show();
        //重置一次
        $("#discount-input-name").attr("data-promotionId","");
        $("#discount-input-name").val("");
        $("#discount-input-time1").val("");
        $("#discount-input-time2").val("");
        $("#discount-input-tag").val("");
        $("#discount_sel_gods li").eq(0).click();
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

//活动列表分页二次调用
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

                Look_btn_action();//列表内功能按钮实现
            }else {
                alert(data.msg)
            }
        },error:function(){
            alert("网络有问题,请刷新重试");
        }
    })
}
//活动列表分页2
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
//编辑按钮功能实现
$(".Look_discount").on("click",".edit_promotion",function(){
    var getPromotionid=$(this).attr("data-promotionid");
    $("#discount-input-name").attr("data-promotionid",getPromotionid);
    $("#Make_new_discount").trigger("click");
    editPromotion({promotionId:getPromotionid});
    function editPromotion(res){
        $.ajax({
            type: 'post',
            url: BUSINESS_URL_PRE + '/essential/promotionAutoController/queryPromotion',
            data: res,
            dataType: "json",
            success: function (data) {
                if(data.code==1){
                    $("#discount-input-name").val(data.info.promotionName);
                    $("#discount-input-time1").val(data.info.startTime);
                    $("#discount-input-time2").val(data.info.endTime);
                    $("#discount-input-tag").val(data.info.tag);
                }else{
                    alert(data.msg);
                }
            },errpr:function(){
                alert("网络有问题，请刷新重试");
            }
        })
    }
});
//活动搜索功能
$(".Make_newDiscount").on("keydown","#search_discount",function(event){
    if(event.keyCode == 13){
        Look_discount(
            {shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,pageSize:PAGE_COUNT,promotionName:$("#search_discount").val()},
            '/essential/promotionAutoController/queryAllPromotion'
        );
    }
});
//日期实例化
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

//选择商品上方搜索
$("a[data-action='search_btn']").bind("click",function(){
    var $getname=$(".Sel_Gods_look input[data-name='gods_name']").val();
    var $getcode=$(".Sel_Gods_look input[data-name='gods_code']").val();
    addDiscount_Infm({
        shopId:BUSINESS_LOGIN_SHOP_ID,
        pageIndex:1,
        productName:$getname,
        articleNumber:$getcode,
        promotionId:$("#discount-input-name").attr("data-promotionId")});
});

//新建-选择商品接口调用
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
                html += $("#seletGodsTmpl").render(data.info);
                html+="</tbody></table>";

                $("#discount_limit_table1").html(html);

                pagePlus(data.info.pageCount,res,true);//分页方法调用;
                $("#total_pages").html("共"+data.info.pageCount+"页");
                $("#each_total").html("每页"+data.info.promotionProductVoList.length+"条");


                //全选按钮
                All_selet_btn();

            }else {
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题");
        }
    })
}

//新建-选择商品分页
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
                paIndexmData.promotionId=$("#discount-input-name").attr("data-promotionId");

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

//新建-选择商品分页调用渲染
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
                html += $("#seletGodsTmpl").render(data.info);
                html+="</tbody></table>";

                $("#discount_limit_table1").append(html);

                $("#total_pages").html("共"+data.info.pageCount+"页");
                $("#each_total").html("每页"+data.info.promotionProductVoList.length+"条");


                //全选按钮
                All_selet_btn();

            }else {
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题");
        }
    })
}

//全选按钮
function All_selet_btn() {
    $("#discout_all_join").click(function () {
        if ($("#discout_all_join").prop("checked") == false) {
            $("#discount_limit_list tr td input").not("input[disabled='disabled']").each(function () {
                /*if($(this).parent().parent().children().last().children("a").hasClass("add_discount")){
                 $(this).prop("checked",false);
                 }*/
                $(this).prop("checked", false);
            });
        } else {
            $("#discount_limit_list tr td input").not("input[disabled='disabled']").each(function () {
                /*if($(this).parent().parent().children().last().children("a").hasClass("add_discount")){
                 $(this).prop("checked",true);
                 }*/
                $(this).prop("checked", true);
            })

        }
    });
}
//批量参加
function manyGodsAttend(){
    $("#manyGodsAttend").click(function(){
        if($("#discount-input-name").attr("data-promotionid")!=""){
            var addorfalse=false;
            var datajson={loginUser:BUSINESS_LOGIN_USER_ID,
                promotionId:$("#discount-input-name").attr("data-promotionId")};
            var $getTrs=$('#discount_limit_table1 input[type="checkbox"]:checked').parent().parent();
            if($('#discount_limit_table1 input[type="checkbox"]:checked').size()>0){
                $('#discount_limit_table1 input[type="checkbox"]:checked').parent().parent().each(function(i){
                    var keyId1="promotionList["+i+"].productOrShopId";
                    datajson[keyId1]=$getTrs.eq(i).attr("data-type-productorshopid");
                })
            }
            ManyPostProductIdInDisscount(datajson,$getTrs,addorfalse);
        }else if($("#discount-input-name").attr("data-promotionid") ==""){
            var addorfalse=true;
            var datajson={loginUser:BUSINESS_LOGIN_USER_ID,
                promotionId:$("#discount-input-name").attr("data-promotionId")};
            var $getTrs=$('#discount_limit_table1 input[type="checkbox"]:checked').parent().parent();
            if($('#discount_limit_table1 input[type="checkbox"]:checked').size()>0){
                $('#discount_limit_table1 input[type="checkbox"]:checked').parent().parent().each(function(i){
                    var keyId1="promotionList["+i+"].productOrShopId";
                    datajson[keyId1]=$getTrs.eq(i).attr("data-type-productorshopid");
                })
            }
            ManyPostProductIdInDisscount(datajson,$getTrs,addorfalse);
        }
    })
}
manyGodsAttend();

//参加折扣和取消折扣接口调用
function AddOrRebackBtn(){
    $("#discount_limit_table1").on("click",".add_discount",function(){
        if($("#discount-input-name").attr("data-promotionid")!=""){
            var addorfalse=false;
            var datajson={loginUser:BUSINESS_LOGIN_USER_ID,
                promotionId:$("#discount-input-name").attr("data-promotionId")};
            var keyId1="promotionList[0].productOrShopId";
            datajson[keyId1]=$(this).parent().parent().attr("data-type-productorshopid");

            PostProductIdInDisscount(datajson,$(this),addorfalse);
        }else if($("#discount-input-name").attr("data-promotionid") ==""){
            var addorfalse=true;
            var datajson={loginUser:BUSINESS_LOGIN_USER_ID,
                          promotionId:$("#discount-input-name").attr("data-promotionId")};
            var keyId1="promotionList[0].productOrShopId";
            datajson[keyId1]=$(this).parent().parent().attr("data-type-productorshopid");

            PostProductIdInDisscount(datajson,$(this),addorfalse);
        }
    });
    $("#discount_limit_table1").on("click",".cancle_discount",function(){
        var datajson={loginUser:BUSINESS_LOGIN_USER_ID,
            promotionId:$("#discount-input-name").attr("data-promotionId")};
        var keyId1="revokeProductIdList[0].productOrShopId";
        datajson[keyId1]=$(this).parent().parent().attr("data-type-productorshopid");

        RemoveDiscountProuduct(datajson,$(this));
    });
    $('#discount_limit_table1').on('mouseover mouseout',".have_add",function(event){
        if(event.type == "mouseover"){
           /* $(this).siblings(".cancle_discount").show();
            $(this).hide();*/
            $(this).removeClass("have_add").addClass("cancle_discount").html("取消参加折扣")
        }else if(event.type == "mouseout"){
            /*$(this).show();
            $(this).siblings(".cancle_discount").hide();*/
            $(this).removeClass("cancle_discount").addClass("have_add").html("已参加");
        }
    });
    $("#discount_limit_change").on("click",".cancle_discount",function(){
        var datajson={loginUser:BUSINESS_LOGIN_USER_ID,
            promotionId:$("#discount-input-name").attr("data-promotionId")};
        var keyId1="revokeProductIdList[0].productOrShopId";
        datajson[keyId1]=$(this).parent().parent().attr("productOrShopId");
        SetSingleRemoveDiscountProuduct(datajson,$(this));
    });
    //有问题.
}
AddOrRebackBtn();


//参加折扣按钮功能-批量参加实现
function PostProductIdInDisscount(res,tag,status){
    var thisClass=tag.attr("class");
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/addPromotionProduct',
        data:res,
        dataType:"json",
        beforeSend:function(){
            tag.removeClass(thisClass);
        },
        success:function(data){
            if(data.code==1){
                if(status){
                    $("#discount-input-name").attr("data-promotionId",data.info.promotionId);
                    tag.addClass("have_add").html("已参加");
                    //tag.after("<a href='###' class='cancle_discount'>取消参加折扣</a>")
                }else{
                    tag.addClass("have_add").html("已参加");
                    //tag.after("<a href='###' class='cancle_discount'>取消参加折扣</a>")
                }
                tag.parent().parent().find(".checkbtn").attr("disabled","disabled");
            }else{
                alert(data.msg);
                tag.addClass(thisClass);
            }
        },error:function(){
            alert("网络有问题，请刷新重试")
            tag.addClass(thisClass);
        }
    })
}
function ManyPostProductIdInDisscount(res,tag,status){
    var thisClass=tag.eq(0).children("td").last().find("a").attr("class");
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/addPromotionProduct',
        data:res,
        dataType:"json",
        beforeSend:function(){
            tag.removeClass(thisClass);
            tag.each(function(i){
                tag.eq(i).children("td").last().find("a").removeClass(thisClass);
            });
        },
        success:function(data){
            if(data.code==1){
                if(status){
                    $("#discount-input-name").attr("data-promotionId",data.info.promotionId);
                    tag.each(function(i){
                        tag.eq(i).children("td").last().find("a")
                            .addClass("have_add").html("已参加");
                    });
                }else{
                    tag.each(function(i){
                        tag.eq(i).children("td").last().find("a")
                            .addClass("have_add").html("已参加")
                    });
                }
                $("#discout_all_join").prop("checked",false);
                tag.each(function(i){
                    tag.eq(i).find(".checkbtn").attr("disabled","disabled");
                    tag.eq(i).children("td").first().find("input[type='checkbox']").prop("checked",false);
                })
            }else{
                alert(data.msg);
                tag.each(function(i){
                    tag.eq(i).children("td").last().find("a").addClass(thisClass);
                });
            }
        },error:function(){
            alert("网络有问题，请刷新重试")
            tag.each(function(i){
                tag.eq(i).children("td").last().find("a").addClass(thisClass);
            });
        }
    })
}

//撤销按钮功能实现
function RemoveDiscountProuduct(res,tag){
    var thisClass=tag.attr("class");
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/revokePromotionProduct',
        data:res,
        dataType:"json",
        beforeSend:function(){
            tag.removeClass(thisClass);
        },
        success:function(data){
            if(data.code==1){
                tag.addClass("add_discount").html("参加折扣");
                tag.parent().parent().find(".checkbtn").removeAttr("disabled");
            }else{
                alert(data.msg);
                tag.addClass(thisClass);
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
            tag.addClass(thisClass);
        }
    })
}


//选择商品与设置折扣页面切换
function discount_sel_gods(){
    $("#discount_sel_gods li").on("click",function(){
        var $index=$(this).index();
        if($index==0){
            addDiscount_Infm({
                shopId:BUSINESS_LOGIN_SHOP_ID,
                pageIndex:1,
                pageSize:10,
                promotionId:$("#discount-input-name").attr("data-promotionId")});
            $(this).addClass("active").siblings().removeClass("active");
            $(".discount_next_step a").attr("discount-next","0");
            $(".discount_next_step a").html("下一步");
        }else if($index==1){
            SetDiscountData({loginUser:BUSINESS_LOGIN_USER_ID,promotionId:$("#discount-input-name").attr("data-promotionId")});
            $(this).addClass("active").siblings().removeClass("active");
            $(".discount_next_step a").attr("discount-next","1");
            $(".discount_next_step a").html("完成");
        }
        $(".Sel_Gods_Detail>div").eq($index).show().siblings().hide();
    })
}
discount_sel_gods();

//新建-设置折扣页面数据加载
function SetDiscountData(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/installPromotionProduct',
        data:res,
        dataType:"json",
        beforeSend:function(){
            $(".discount_div_change").append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(data){
            if(data.code==1){
                $(".Img_Load").remove();

                var setGodsTmpl = $("#setGodsTmpl").render(data);
                $("#discount_limit_change").html(setGodsTmpl);

                //全选功能赋值
                discout_all_reback();

                //折扣赋值
                Refsh_InputVal();

            }else{
                alert(data.msg);
                $(".Img_Load").remove();
            }
        },error:function(){
            alert("网络有问题，请刷新重试")
        }
    })
}

//新建-设置折扣-全选
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
        function postdata(){
            var revokeProductIdList=[];
            var datajson={loginUser:BUSINESS_LOGIN_USER_ID,
                promotionId:$("#discount-input-name").attr("data-promotionId")};
            $("#discount_limit_change tr").each(function(i){
                if($(this).find("input[type='checkbox']").prop("checked")){
                    revokeProductIdList.push($(this).attr("productorshopid"));
                }
            });
            for(var i=0;i< revokeProductIdList.length;i++){
                var keyId1="revokeProductIdList["+i+"].productOrShopId";
                datajson[keyId1]=revokeProductIdList[i];
            }
            return  datajson;
        }
        SetRemoveDiscountProuduct(postdata(),$(this));

    });
}

//新建-设置折扣多选撤销功能实现
function SetRemoveDiscountProuduct(res,tag){
    var getId=$(this).attr("id");
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/revokePromotionProduct',
        data:res,
        dataType:"json",
        beforeSend:function(){
            tag.removeAttr("id",getId);
        },
        success:function(data){
            if(data.code==1){
                $("#discount_limit_change tr").each(function(i) {
                    if ($(this).find("input[type='checkbox']").prop("checked")) {
                        $(this).remove();
                    }
                    $("#discout_all_reback").prop("checked",false);
                })
            }else{
                alert(data.msg);
                tag.attr("id",getId)
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
            tag.attr("id",getId);
        }
    })
}
//新建-设置折扣撤销功能单一实现
function SetSingleRemoveDiscountProuduct(res,tag){
    var getClass=$(this).attr("class");
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/promotionAutoController/revokePromotionProduct',
        data:res,
        dataType:"json",
        beforeSend:function(){
            tag.removeClass(getClass);
        },
        success:function(data){
            if(data.code==1){
                tag.parent().parent().remove();
            }else{
                alert(data.msg);
                tag.addClass(getClass);
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
            tag.addClass(getClass);
        }
    })
}

//新建活动-设置折扣 折扣设置监听
$("#discount_limit_change").on("change",".input_discout",function(){
    var data={
        loginUser:BUSINESS_LOGIN_USER_ID,
        promotionId:$("#discount-input-name").attr("data-promotionId"),
        productId:$(this).parent().parent().attr("productorshopid"),
        discountPercent:$(this).val(),
        discountMoney:$(this).parent().parent().find(".input_discout_price").val()
    };
    if(data.discountPercent>10){
        alert("输入的折扣有误，请重新输入");
    }else{
        setDiscoungpostdata(data);
    }
});
$("#discount_limit_change").on("change",".input_discout_price",function(){
    var getPrice=$(this).parent().parent().parent().children("td[setaction-name='price']").html()-0;
    var data={
        loginUser:BUSINESS_LOGIN_USER_ID,
        promotionId:$("#discount-input-name").attr("data-promotionId"),
        productId:$(this).parent().parent().parent().attr("productorshopid"),
        discountPercent:$(this).parent().parent().parent().find(".input_discout").val(),
        discountMoney:$(this).val()
    };
    if(data.discountMoney>getPrice){
        alert("输入的折扣后价格有误，请重新输入");
    }else{
        setDiscoungpostdata(data);
    }
});

//新建-折扣动态发送
function setDiscoungpostdata(res){
    $.ajax({
        type: 'post',
        url: BUSINESS_URL_PRE + '/essential/promotionAutoController/updatePromotionProductInfo',
        data: res,
        dataType: "json",
        success: function (data) {
            if (data.code == 1) {

            } else {
                alert(data.msg);
            }
        },error: function () {
            alert("网络有问题，请刷新重试");
        }
    })
}

//活动-保存功能
$(".discount_next_step a").bind("click",function(){
    if($(".discount_next_step a").attr("discount-next")==0){
         $("#discount_sel_gods li").eq(1).click();

         $(".discount_next_step a").attr("discount-next","1");
         $(".discount_next_step a[discount-next='1']").html("完成 ");
    }else if($(".discount_next_step a").attr("discount-next")==1){
        Save_dicount_active(discount_add(),'/essential/promotionAutoController/addPromotion');
    }
});

//设置折扣-批量设置
$("a[market-data-act='discount']").click(
    function(){
        $(this).hide();$(".Set_Right_cancle").show();
        AllDiscount()
    });
function AllDiscount(){
    $("a[market-data-act='save']").click(function(){
        if($("#discount_limit_change input[type='checkbox']:checked").size()>0){
            if($("#allDiscountInput").val()==""){
                alert("折扣不能为空")
            }else if(typeof ($("#allDiscountInput").val()-0) != "number"){
                alert("请输入数字")
            }else if(typeof ($("#allDiscountInput").val()-0) == "number"){
                $("#discount_limit_change input[type='checkbox']").each(function(i){
                    if($("#discount_limit_change input[type='checkbox']").eq(i).prop("checked")){
                        $("#discount_limit_change input[type='checkbox']").eq(i).parent().parent().find("input.input_discout").val($("#allDiscountInput").val())
                        $("#discount_limit_change input[type='checkbox']").eq(i).parent().parent().find("input.input_discout").change();
                    }
                });
                $(".Set_Right_cancle").hide();
                $("a[market-data-act='discount']").show();
            }
        }else{
            alert("请选中商品")
        }
    });
    $("a[market-data-act='cancle']").click(function(){
        $(".Set_Right_cancle").hide();
        $("a[market-data-act='discount']").show();
    })
}
//新建保存-数据
function discount_add(){
    var datajson={
        loginUser:1,
        promotionType:0,
        promotionId:$("#discount-input-name").attr("data-promotionId"),
        promotionName:$("#discount-input-name").val(),
        startTime:$("#discount-input-time1").val(),
        endTime:$("#discount-input-time2").val(),
        tag:$("#discount-input-tag").val(),
        shopId:BUSINESS_LOGIN_SHOP_ID
    };
    return datajson;
}
//完成按钮功能绑定
function Save_dicount_active(res,url){
    if(res.startTime==""){
        alert("活动开始时间不能为空")
    }else if(res.startTime!=""&&!CheckTime(res.startTime)){
        alert("请输入正确的活动开始时间")
    } else if(res.endTime==""){
        alert("活动截止时间不能为空")
    }else if(res.endTime!=""&&!CheckTime(res.endTime)){
        alert("请输入正确的活动截止时间")
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

//活动-时间检验
function check_Time(){
    if((new Date($("#discount-input-time2").val()).getTime())-(new Date($("#discount-input-time1").val()).getTime())>0){
        return true
    }else {
        return false
    }
}

//折扣价与折扣动态赋值
function Refsh_InputVal(){
    var gettrs=$("#discount_limit_change").children("tr");
    gettrs.each(function(i){
        var b=i;
        var $that=$(this);
        $(this).find(".input_discout").change(b,function(b){
            var getprice=$that.children("td[setaction-name='price']").html();
            var getdiscount=$that.find(".input_discout").val();

            var getLast=parseFloat(getprice)*parseFloat(getdiscount/10);
            $that.find(".input_discout_price").val(getLast)
        });
        $(this).find(".input_discout_price").change(function(){
            var getprice=$that.children("td[setaction-name='price']").html();
            var getdiscount=$that.find(".input_discout_price").val();

            var getLast=(parseFloat(getdiscount)/parseFloat(getprice)*10).toFixed(7);
            $that.find(".input_discout").val(getLast);
        })
    });
}

function CheckTime(time){
    var getTime=new Date(time);
    if(getTime.getHours()<24){
        return true
    }else{
        return false
    }
}