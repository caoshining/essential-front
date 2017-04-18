/**
 * Created by Morgan on 2016/8/3.
 */
discuss_control({shopId:BUSINESS_LOGIN_SHOP_ID});
var discus_data={};

/*var Product_CommentVoList=[];*/
var $discuss = $("#discuss_total");
$discuss.on("click",".LookDetail",function(){
    var $that=$(this);

    putdiscuss_Top({commentId:$that.attr("data-commentid"),productId:$that.attr("data-productid"),userId:BUSINESS_LOGIN_USER_ID},$that);
    /*$("#discuss_detail").load("pages/busi_platform/business/order/discuss_detail.html");*/
});

function discuss_control(data) {
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/productComment/queryCommentListByPage",
        data: data,
        type: "post",
        success: function (res) {
            console.log(res);
            if (res.code == 1) {
                $("#discuss_table").html('');
                /*Product_CommentVoList = res.info.orderProductCommentVoList;
                $.each(Product_CommentVoList, function(i,v){
                    res.info.orderProductCommentVoList[i].orderProductsSize = v.orderProducts.length;
                });*/

                //渲染模板
                var html = $("#discuss_control_moban").render(res.info);
                $("#discuss_table").append(html);

                $("#total_discuss").text(Math.ceil(res.info.totalPageCount/PAGE_COUNT));
                $("#discus_eachpage").text(PAGE_COUNT);

                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()));
                });
                //时间格式转化

                pagePlus(res.info.totalPageCount,data,true);

            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("查询订单失败");
        }
    });
}

function putdiscuss_Top(data,tag){
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/productComment/setRecommendComment",
        data: data,
        type: "post",
        success: function (res){
            if(res.code==1){
                $("#discuss_table .hasTop[data-productid='"+data.productId+"']").removeClass("hasTop")
                    .addClass("LookDetail").html("评论置顶");
                tag.removeClass("LookDetail").addClass("hasTop");
                tag.html("已置顶");
            }else {
                alert(res.msg);
            }

        },error:function(){
            alert("网络有问题，请重试")
        }
    })
}
/*评论置顶*/

function discuss_controlagain(data) {
    $.ajax({
        url: BUSINESS_URL_PRE+"/essential/productComment/queryCommentListByPage",
        data: data,
        type: "post",
        success: function (res) {
            if (res.code == 1) {
                $("#discuss_table").html('');
                /*Product_CommentVoList = res.info.orderProductCommentVoList;
                 $.each(Product_CommentVoList, function(i,v){
                 res.info.orderProductCommentVoList[i].orderProductsSize = v.orderProducts.length;
                 });*/

                //渲染模板
                var html = $("#discuss_control_moban").render(res.info);
                $("#discuss_table").append(html);



                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()));
                });
                //时间格式转化

            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("查询订单失败");
        }
    });
}

//分页
function pagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            discus_data = data;
            if(!flag){
                //console.log(paramData);
                discus_data.pageIndex = page;
                discuss_controlagain(discus_data);
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

/*function ChangeTime(tm){
    var tt=new Date(parseInt(tm)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
    return tt;
}*/

/*时间戳转变*/
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}