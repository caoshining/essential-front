
/**
 * Created by wangs on 2016/8/11.
 */

//专栏渲染
function columns(){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/articleGroup/queryGroupList",
        type:"POST",
        success:function(data){
            if(data.code==1) {
                if(data.info.length>0){
                    for(var i=0;i<data.info.length;i++) {
                        $("#columns").append("<option value="+data.info[i].articleGroupId+">" +
                            ""+data.info[i].groupName+"</option>");
                    }
                }
            }else{
                alert(data.msg);
            }
        }
    });
}
columns();

/*专栏列表渲染*/
columnLists({"pageIndex":1,"articleGroupId":0});

function columnLists(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/article/queryArticleListByPage",
        type:"POST",
        data:data,
        beforeSend:function(){
            $(".columnList .Img_Load").remove();
            $('.columnList').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code==1) {
                $(".columnList .Img_Load").remove();
                $("#columnTab").html("");
                $.each(res.info.contentList,function(i,v){
                    res.info.contentList[i].createTime=timeFn(res.info.contentList[i].createTime);
                    res.info.contentList[i].sendTime=timeFn(res.info.contentList[i].sendTime);
                });
                var columnHtml=$("#columnList_Tmp").render(res.info);
                $("#columnTab").append(columnHtml);

                pagePlus(res.info.totalPageCount,data,true);

            }else{
                alert(res.msg);
            }
        },
        error:function(){
            alert("服务器繁忙，稍后重试");
        }
    })
}

/*专栏列表渲染*/
var articleId;
/*删除文章*/
function DelArticle(data,$that){
    if(confirm("确定删除吗?")){
        $.ajax({
            url:PLATFORM_URL_PRE+"/essential/article/deleteArticle",
            type:"POST",
            data:data,
            success:function(res){
                if(res.code==1){
                    $that.remove();
                }else{
                    alert(res.msg);
                }
            },
            error:function(){

            }
        })
    }
}


$(document).on("click",".delArticle",function(e){       /*删除文章*/
    e.stopImmediatePropagation();

    DelArticle({"articleId":$(this).parent().parent().data("articleid")},$(this).parent().parent());

}).on("click",".editArticle",function(e){           /*点击编辑文章*/
    e.stopImmediatePropagation();

    articleId=$(this).parent().parent().data("articleid");

    $("#columnList").load("pages/base_platform/business/platform_marketing/editArticle.html");

});

$(".columnFilter").on("click",function(){       /*点击筛选*/

    var paras={
        "pageIndex":1,
        "articleGroupId":$("#columns").val()=="---"?0:$("#columns").val(),
        "articleContent":$("#articleTitle").val()
    };

    columnLists(paras);
});



//分页调数据
function queryOrderListForPage(data){
    $.ajax({
        url:PLATFORM_URL_PRE+"/essential/article/queryArticleListByPage",
        type:"POST",
        data:data,
        beforeSend:function(){
            $("#columnTab").html('');
            $(".columnList .Img_Load").remove();
            $('.columnList').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code==1) {
                $(".columnList .Img_Load").remove();
                $("#columnTab").html('');
                $.each(res.info.contentList,function(i,v){
                    res.info.contentList[i].createTime=timeFn(res.info.contentList[i].createTime);
                    res.info.contentList[i].sendTime=timeFn(res.info.contentList[i].sendTime);
                });
                var columnHtml=$("#columnList_Tmp").render(res.info);
                $("#columnTab").append(columnHtml);

            }else{
                alert(res.msg);
            }
        },
        error:function(){
            alert("服务器繁忙，稍后重试");
        }
    })
}

//分页
function pagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            var paramData = data;
            if(!flag){
                paramData.pageIndex = page;
                queryOrderListForPage(paramData);
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


function timeFn(time){
    if(time && time.indexOf('.') != -1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}