/**
 * Created by Morgan on 2016/7/9.
 */



function Add_Onsale_Selt(){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/productCategory/query",
        data:'',
        dataType:'json',
        success:function(data){
            var html;
            for(var i=0;i<data.info.length;i++){
                if(data.info[i].categoryId!=null){
                    html+="<option data-categoryId='"+data.info[i].categoryId+"'>"+data.info[i].categoryName+"</option>" ;
                }
            }
            $('#Onsale_Selt').append(html);
        }
    })
}
Add_Onsale_Selt();
/*增添商品分类的下拉数据*/
function Add_Onsale_Brand(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/bussinessBrand/queryShopIdCategoryId",
        data:res,
        dataType:'json',
        success:function(data){
            var html;
            for(var i=0;i<data.info.length;i++){
                if(data.info[i]){
                    if(data.info[i].brand_id){
                        html+="<option data-brandid='"+data.info[i].brand_id+"'>"+data.info[i].brand_name+"</option>" ;
                    }
                }
            }
            $('#Onsale_Brand').append(html);
        }
    })
}
Add_Onsale_Brand({shopId:BUSINESS_LOGIN_SHOP_ID});
/*增添品牌的下拉*/

function MaxAndMin_Price(){
    var minPrice="";
    var maxPrice="";
    if($("#Onsale_Pric1").val()>$("#Onsale_Pric2").val()){
        minPrice=$("#Onsale_Pric2").val();
        maxPrice=$("#Onsale_Pric1").val();
    }else if($("#Onsale_Pric1").val()<$("#Onsale_Pric2").val()){
        minPrice=$("#Onsale_Pric1").val();
        maxPrice=$("#Onsale_Pric2").val();
    }
    return {"minPrice":minPrice,"maxPrice":maxPrice}
}
/*价格比对并选取*/

$(".Onsale_Sear>a").click(function(){
    /*var minPrice="";
    var maxPrice="";*/
    MaxAndMin_Price();

    var InptData={
        productName:$("#Onsale_Name").val(),
        articleNumber:$("#Onsale_Code").val(),
        categoryId:$("#Onsale_Selt option:selected").attr("data-categoryid"),
        firstPrice:MaxAndMin_Price().minPrice,
        secondPrice:MaxAndMin_Price().maxPrice,
        brandId:$("#Onsale_Brand  option:selected").attr("data-brandid"),
        type:2,
        shopId:BUSINESS_LOGIN_SHOP_ID,
        pageIndex:1
    };
    Search_Infm(InptData);
});

function Search_Infm(data){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/productManageController/queryProductInfo",
        data:data,
        dataType:'json',
        beforeSend:function(){
            $("#Onsale_GodsList").children().remove();
            $('.Onsale_gods_btm').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if (res.code==1){
                $(".Img_Load").remove();
                var html="";
                var $getContain=$("#Onsale_GodsList");
                for(var i=0;i<res.info.productManageVoList.length;i++){
                    if(res.info.productManageVoList[i].linkUrl==1){
                        html+="<tr data-productid='"+res.info.productManageVoList[i].productId+"'>" +
                            "<td class='Chek_btn'><input type='checkbox'></td>" +
                            "<td><figure>" +
                            "<img  src="+res.info.productManageVoList[i].path+" /><figcaption>"
                            +res.info.productManageVoList[i].articleNumber+"</figcaption></figure>"+"<dl><dt class='producnt_name'>"
                            +res.info.productManageVoList[i].productName+"</dt>" +
                            "<dd class='product_discountprice'>￥"+res.info.productManageVoList[i].discountPrice+"</dd>"+
                            "<del class='product_costprice'>￥"+res.info.productManageVoList[i].costPrice+"</del>" +
                            "<span class='product_tag'>"+res.info.productManageVoList[i].tag+"</span>"+
                            "</dl></td>"+
                            "<td>"+res.info.productManageVoList[i].brandName+"</td>"
                            +"<td>"+res.info.productManageVoList[i].categoryName+"</td><td>"+res.info.productManageVoList[i].stock+"</td><td>"+res.info.productManageVoList[i].saleNum+"</td><td><time>"
                            +res.info.productManageVoList[i].createTime
                            +"</time></td><td>" +res.info.productManageVoList[i].saleStatusNume+"</td><td>" +"<a href='###' onsale-god-action='soldout'> 下架</a>" +
                            "<a href='###' onsale-god-action='edit'>编辑</a><a href='###' onsale-god-action='delet'>删除</a>"+"</td></tr>"
                    }else{
                        html+="<tr data-productid='"+res.info.productManageVoList[i].productId+"'>" +
                            "<td class='Chek_btn'><input type='checkbox'></td>" +
                            "<td><figure>" +
                            "<img  src="+res.info.productManageVoList[i].path+" /><figcaption>"+res.info.productManageVoList[i].articleNumber+"</figcaption></figure>"+"<dl><dt>"
                            +res.info.productManageVoList[i].productName+"</dt><dd>￥"+res.info.productManageVoList[i].costPrice+"</dd></dl></td>"+"<td>"+res.info.productManageVoList[i].brandName+"</td>"
                            +"<td>"+res.info.productManageVoList[i].categoryName+"</td><td>"+res.info.productManageVoList[i].stock+"</td><td>"+res.info.productManageVoList[i].saleNum+"</td><td><time>"
                            +res.info.productManageVoList[i].createTime
                            +"</time></td><td>" +res.info.productManageVoList[i].saleStatusNume+"</td><td>" +"<a href='###' onsale-god-action='soldout'> 下架</a>" +
                            "<a href='###' onsale-god-action='edit'>编辑</a><a href='###' onsale-god-action='delet'>删除</a>"+"</td></tr>"
                    }
                }
                $getContain.append(html);
                All_selet_btn();

                pagePlus(res.info.pageCount,data,true);

                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()))
                });

                edit_gods();//编辑商品
            }else {
                alert(res.msg);
            }

        },error:function(){
            alert("网络有问题，请重试");
        }
    })
}
Search_Infm({type:2,shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1,pageSize:PAGE_COUNT});
/*点击筛选进行数据的拉去并对其进行填充*/
function BtnAction(){

    $(document).on("click","#Onsale_GodsList tr td a[onsale-god-action='delet']",function(e){
        e.stopImmediatePropagation();
        var $thiss=$(this);
        if (confirm("是否确认删除商品")){
            OnsaleDel_btn($thiss,"/essential/productManageController/deleteProducts");
        }

    });//删除商品

    $(document).on("click","#Onsale_GodsList tr td a[onsale-god-action='soldout']",function(e){
        e.stopImmediatePropagation();
        var $thiss=$(this);
        if (confirm("是否确认下架该商品")){
            OnsaleDel_btn($thiss,"/essential/productManageController/downloadProductShelves");
        }
    });//商品下架

    $(document).on("click","#Onsale-Gods .delet_btn",function(e){
        e.stopImmediatePropagation();
        if (confirm("是否删除选中商品")){
            all_action("/essential/productManageController/deleteProducts");
        }
    });//全选商品删除

    $(document).on("click","#Onsale-Gods .gods_putup",function(e){
        e.stopImmediatePropagation();
        if (confirm("是否下架选中商品")){
            all_action("/essential/productManageController/downloadProductShelves");
        }
    });//全选商品下架
}
BtnAction();
//全选按钮
function All_selet_btn(){
    $(".action_btn #all_selt").click(function() {
        if ($(".action_btn #all_selt").prop("checked")==false) {
            $("#Onsale_GodsList .Chek_btn input").each(function(){
                $(this).prop("checked",false);
                console.log("true")
            });

        } else{
            $("#Onsale_GodsList .Chek_btn  input").each(function(){
                $(this).prop("checked",true);
                console.log(false)
            })
        }
    });
}

function all_action(url){
    var getInputs=$('#Onsale_GodsList input[type="checkbox"]:checked');
    get_Inputs(getInputs,url);
}
/*获取有用checked的input 并存储 调用循环进行对其对应的tr的数据的获取并渲染*/
function get_Inputs(objs,url){
    var productIds= function (){
        var productId="";
        objs.each(function(i){
            var getobj=objs.eq(i);
            if(productId.length > 0 ){
                productId = productId.concat(",",Make_Table(getobj));
            }else{
                productId = Make_Table(getobj);
            }
        });
        return productId;
    };

    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+url,
        data:{"productId":productIds},
        dataType:'json',
        success:function(data){
            if(data.code==1){
                $('#Onsale_GodsList input[type="checkbox"]:checked').parent().parent().remove();
                /*$('#Onsale_GodsList input[type="checkbox"]:checked').each(function(i){
                    $('#Onsale_GodsList input[type="checkbox"]:checked').eq(i).parent().parent().remove();
                });*/
                alert(data.msg);
            }else{
                alert(data.msg);
            }
        },error:function(){
            alert("网络错误，请重试");
        }
    })
}

function Make_Table(obj){
    var getTr=$(obj).parent().parent();
    var getProduct=getTr.attr("data-productid");
    console.log(getProduct);
    return getProduct;
}
/*全选后进行相关的操作*/
function OnsaleDel_btn(arrow,url){
    var $getproductId=arrow.parent().parent().attr("data-productId");//传递指针。
    console.log($getproductId);
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+url,
        data:{productId:$getproductId},
        dataType:'json',
        success:function(data){
            if(data.code==1){
                arrow.parent().parent().remove();
                alert(data.msg);
            }else if(data.code==0){
                alert(data.msg);
            }
        },error:function(){
            alert("网络错误，请重试");
        }
    })
}//删除和下架

//分页调用渲染
function page_Infm(data){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/productManageController/queryProductInfo",
        data:data,
        dataType:'json',
        beforeSend:function(){
            $("#Onsale_GodsList").children().remove();
            $('.Onsale_gods_btm').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            if(res.code==1){
                $(".Img_Load").remove();
                var html="";
                var $getContain=$("#Onsale_GodsList");
                for(var i=0;i<res.info.productManageVoList.length;i++){
                    if(res.info.productManageVoList[i].linkUrl==1){
                        html+="<tr data-productid='"+res.info.productManageVoList[i].productId+"'>" +
                            "<td class='Chek_btn'><input type='checkbox'></td>" +
                            "<td><figure>" +
                            "<img  src="+res.info.productManageVoList[i].path+" /><figcaption>"
                            +res.info.productManageVoList[i].articleNumber+"</figcaption></figure>"+"<dl><dt class='producnt_name'>"
                            +res.info.productManageVoList[i].productName+"</dt>" +
                            "<dd class='product_discountprice'>￥"+res.info.productManageVoList[i].discountPrice+"</dd>"+
                            "<del class='product_costprice'>￥"+res.info.productManageVoList[i].costPrice+"</del>" +
                            "<span class='product_tag'>"+res.info.productManageVoList[i].tag+"</span>"+
                            "</dl></td>"+
                            "<td>"+res.info.productManageVoList[i].brandName+"</td>"
                            +"<td>"+res.info.productManageVoList[i].categoryName+"</td><td>"+res.info.productManageVoList[i].stock+"</td><td>"+res.info.productManageVoList[i].saleNum+"</td><td><time>"
                            +res.info.productManageVoList[i].createTime
                            +"</time></td><td>" +res.info.productManageVoList[i].saleStatusNume+"</td><td>" +"<a href='###' onsale-god-action='soldout'> 下架</a>" +
                            "<a href='###' onsale-god-action='edit'>编辑</a><a href='###' onsale-god-action='delet'>删除</a>"+"</td></tr>"
                    }else{
                        html+="<tr data-productid='"+res.info.productManageVoList[i].productId+"'>" +
                            "<td class='Chek_btn'><input type='checkbox'></td>" +
                            "<td><figure>" +
                            "<img  src="+res.info.productManageVoList[i].path+" /><figcaption>"+res.info.productManageVoList[i].articleNumber+"</figcaption></figure>"+"<dl><dt>"
                            +res.info.productManageVoList[i].productName+"</dt><dd>￥"+res.info.productManageVoList[i].costPrice+"</dd></dl></td>"+"<td>"+res.info.productManageVoList[i].brandName+"</td>"
                            +"<td>"+res.info.productManageVoList[i].categoryName+"</td><td>"+res.info.productManageVoList[i].stock+"</td><td>"+res.info.productManageVoList[i].saleNum+"</td><td><time>"
                            +res.info.productManageVoList[i].createTime
                            +"</time></td><td>" +res.info.productManageVoList[i].saleStatusNume+"</td><td>" +"<a href='###' onsale-god-action='soldout'> 下架</a>" +
                            "<a href='###' onsale-god-action='edit'>编辑</a><a href='###' onsale-god-action='delet'>删除</a>"+"</td></tr>"
                    }
                }
                $getContain.append(html);
                All_selet_btn();

                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()))
                });
                edit_gods();//编辑商品
            }
            else {
                alert(res.msg);
            }
        },error:function(){
            alert("网络有问题，请重试")
        }
    })
}


//分页
function pagePlus(totalPageCount,data,flag){
    $(".pagination").paging(totalPageCount, {
        format: '[< ncnnn >]',
        perpage: '20',
        onSelect: function(page) {
            paramData = data;
            if(!flag){
                //console.log(paramData);
                paramData.pageIndex = page;
                page_Infm(paramData);
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

//时间截取
function timeFn(time){
    if(time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}


var getonsale_productId;
//右侧功能键
function edit_gods(){
    $("#Onsale_GodsList tr td a[onsale-god-action='edit']").on("click",function(){

        getonsale_productId= $(this).parent().parent().attr("data-productId");
        if (confirm("是否确认编辑该商品")){
            $("#onsale_goods").load("pages/busi_platform/business/product/editGods.html");
        }
    });//编辑该商品
}
