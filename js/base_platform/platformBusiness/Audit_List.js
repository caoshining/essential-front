/**
 * Created by Morgan on 2016/11/21.
 */
//加载品牌列表
var time;
var CheckBrandParamData = {};
var CheckBrandLists=[];
var CheckBrandIndex=[];

$(function(){
    CheckBrandList({"pageNo":1});
    $(document).on("click",".CheckBrand_btn",function(e){          //审核品牌
        e.stopImmediatePropagation();
        CheckBrandIndex = CheckBrandLists[$(this).parent().parent().attr("data-index")];
        BrandPassOrRefuse(CheckBrandIndex.applicationId);
    }).on("click",".CheckBrand_look",function(e){              //查看品牌
        e.stopImmediatePropagation();
        CheckBrandIndex = CheckBrandLists[$(this).parent().parent().attr("data-index")];
        $(".Checkbrand_brandDetail").show().siblings(".Audit_List").hide();
        var html = $("#Check_Brand_details_Tmple").render(CheckBrandIndex);
        $(".Checkbrand_brandDetail").html(html);
        //$("#Brand_Lists").load("pages/base_platform/business/platform_product/Brand_edit.html");
    })
});

function CheckBrandList(data){
    $.ajax({
        "type":'post',
        "data":data,
        "url": PLATFORM_URL_PRE+"/essential/bussinessBrand/brandPendingAuditForList",
        beforeSend:function(){
            $(".Audit_List .Img_Load").remove();
            $('.Audit_List').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code == 1){
                $(".Audit_List .Img_Load").remove();
                $("#CheckBrandTab").html('');
                CheckBrandLists = res.info.brandApplyVoList;

                $.each(res.info.brandApplyVoList,function(i,v){
                    res.info.brandApplyVoList[i].createTime=timeFn(res.info.brandApplyVoList[i].createTime);
                });

                var html = $("#CheckBrand_List_Tmp").render(res.info);

                $("#CheckBrandTab").append(html);
                CheckBrandpagePlus(res.info.totalPageCount,res,true);
            }else{
                alert(res.msg);
            }
        },
        error:function(res){
            alert("网络错误，请稍后重试！");
        }
    })
}

//分页调数据
function CheckBrandListForPage(data){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/bussinessBrand/brandPendingAuditForList",
        data: data,
        type: "post",
        beforeSend:function(){
            $("#CheckBrandTab").html('');
            $(".Audit_List .Img_Load").remove();
            $('.Audit_List').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success: function (res) {
            if (res.code == 1) {
                $(".Audit_List .Img_Load").remove();
                $("#CheckBrandTab").html('');
                CheckBrandLists = res.info.brandApplyVoList;
                //orderList = res.info.orderProductVos;

                $.each(res.info.brandApplyVoList,function(i,v){
                    res.info.brandApplyVoList[i].modifyTime=timeFn(res.info.brandApplyVoList[i].modifyTime);
                });

                //渲染模板
                var html = $("#CheckBrand_List_Tmp").render(res.info);
                $("#CheckBrandTab").append(html);
            } else {
                alert(res.msg);
            }
        },
        error: function (res) {
            alert("服务器错误");
        }
    });
}

//分页
function CheckBrandpagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '10',
        onSelect: function(page) {
            if(!flag){
                CheckBrandParamData.pageNo = page;
                CheckBrandListForPage(CheckBrandParamData);
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


//时间转换
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}

function BrandPassOrRefuse(applicationId){
    $(".CheckBrand_Big_Remark").remove();
    var PassOrRefus="<div class='CheckBrand_Big_Remark' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
        "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
        "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
        "<div id='Refuse_Brand'>" +
        "<ul>" +
            "<li>审核该商家申请的品牌</li>" +
            "<li>" +
                "<a class='CheckBrand_Rigth_btn' href='javascript:;'>确定</a>" +
                "<a class='CheckBrand_cancle_btn' href='javascript:;'>驳回</a>" +
            "</li>" +
        "</ul>" +
        "</div></div></div>";
    $(".index-tab-cont").append(PassOrRefus);
    $(".CheckBrand_cancle_btn").on("click",function(){
        $(".CheckBrand_Big_Remark").remove();
        CreatCheckContent(applicationId);
    });
    $(".CheckBrand_Rigth_btn").on("click",function(){
        $(".CheckBrand_Big_Remark").remove();
        RefundBrandInfom({
            applicationId:applicationId,
            checked:0
        },1);
    });
}

function CreatCheckContent(applicationId){
    $(".Big_Remark").remove();
    var divContent=
        "<div class='Big_Remark' style='position:absolute;width:100%;height:100%;top:0;left:0;'>"+
        "<div class='Plat_RefuseInput2' style='z-index:99;position:absolute;width:100%;height:100%;top:0;left:0;background:#333;opacity:0.6;'></div>" +
        "<div class='Plat_RefuseInput' style='z-index:100;position:absolute;width:100%;height:100%;top:0;left:0;'>" +
        "<div id='Refuse_Brand'>" +
            "<ul>" +
                "<li>驳回理由</li>" +
                "<li>" +
                    "<textarea id='RefuMony_Inf' type='text' col='9' rows='8' placeholder='请填写驳回理由' cols='20'></textarea>" +
                "</li>" +
                "<li>" +
                    "<a class='Remark_Rigth_btn' href='javascript:;'>确定</a>" +
                    "<a class='Remark_cancle_btn' href='javascript:;'>返回</a>" +
                "</li>" +
            "</ul>" +
        "</div></div></div>";
    $(".index-tab-cont").append(divContent);
    $(".Remark_cancle_btn").on("click",function(){
        $(".Big_Remark").remove();
    });

    $(".Remark_Rigth_btn").on("click",function(){
        if ($("#RefuMony_Inf").val()!=""){
            RefundBrandInfom({
                reasonsForRefusal:$("#RefuMony_Inf").val(),
                applicationId:applicationId,
                checked:0
            },2);
        }else{
            alert("驳回内容不能为空。")
        }
    });
}

function RefundBrandInfom(data,passOrRefuse){
    $.ajax({
        url: PLATFORM_URL_PRE+"/essential/bussinessBrand/brandAudit",
        data: data,
        type: "post",
        success: function (res) {
            if(res.code==1){
                if(passOrRefuse==1){
                    alert("审核通过成功");
                }else if(passOrRefuse==2){
                    alert("品牌驳回成功");
                }
                $(".Big_Remark").remove();
            }else{
                alert(res.msg);
                $(".Big_Remark").remove();
            }
        },error: function (res) {
            alert("网络有问题，请刷新重试");
            $(".Big_Remark").remove();
        }
    })
}