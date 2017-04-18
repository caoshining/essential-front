/**
 * Created by Morgan on 2016/7/9.
 */


var paramData={};
function Add_Onsave_Selt(){
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
            $('#Onsave_Selt').append(html);
        }
    })
}
Add_Onsave_Selt();
/*增添商品分类的下拉数据*/
function Add_Onsave_Brand(res){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/bussinessBrand/queryShopIdCategoryId",
        data:res,
        dataType:'json',
        success:function(data){
            var html;
            for(var i=0;i<data.info.length;i++){
                if(data.info[i]) {
                    if (data.info[i].brand_id) {
                        html += "<option data-brandid='" + data.info[i].brand_id + "'>" + data.info[i].brand_name + "</option>";
                    }
                }
            }
            $('#Onsave_Brand').append(html);
        }
    })
}
Add_Onsave_Brand({shopId:BUSINESS_LOGIN_SHOP_ID});
/*增添品牌的下拉*/

function MaxAndMin_Price(){
    var minPrice="";
    var maxPrice="";
    if($("#Onsave_Pric1").val()>$("#Onsave_Pric2").val()){
        minPrice=$("#Onsave_Pric2").val();
        maxPrice=$("#Onsave_Pric1").val();
    }else if($("#Onsave_Pric1").val()<$("#Onsave_Pric2").val()){
        minPrice=$("#Onsave_Pric1").val();
        maxPrice=$("#Onsave_Pric2").val();
    }
    return {"minPrice":minPrice,"maxPrice":maxPrice}
}
/*价格比对并选取*/
$(".Onsave_Sear>a").click(function(){

    MaxAndMin_Price();
    var InptData={
        productName:$("#Onsave_Name").val(),
        articleNumber:$("#Onsave_Code").val(),
        categoryId:$("#Onsave_Selt option:selected").attr("data-categoryid"),
        firstPrice:MaxAndMin_Price().minPrice,
        secondPrice:MaxAndMin_Price().maxPrice,
        brandId:$("#Onsave_Brand option:selected").attr("data-brandid"),
        saleStatus:$("#Onsave_State").val(),
        type:0,
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
            $("#Onsave_GodsList").children().remove();
            $('.Onsave_gods_btm').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
        },
        success:function(res){
            $(".Img_Load").remove();
           if(res.code==1){
               var html="";
               var $getContain=$("#Onsave_GodsList");
               for(var i=0;i<res.info.productManageVoList.length;i++){
                   html+="<tr data-productId='"+res.info.productManageVoList[i].productId+"'><td class='Chek_btn'><input type='checkbox'></td><td><figure>" +
                       "<img   src="+res.info.productManageVoList[i].path+" />" +
                       "<figcaption>"+res.info.productManageVoList[i].articleNumber+"</figcaption>" +
                       "</figure>"+
                       "<dl>" +
                       "<dt>"
                       +res.info.productManageVoList[i].productName+
                       "</dt>" +
                       "<dd>"+res.info.productManageVoList[i].costPrice+"</dd></dl></td>"+"<td>"+res.info.productManageVoList[i].brandName+"</td>"
                       +"<td>"+res.info.productManageVoList[i].categoryName+"</td><td>"+res.info.productManageVoList[i].stock+"</td><td>"+res.info.productManageVoList[i].saleNum+"</td><td><time>"+res.info.productManageVoList[i].createTime
                       +"</time></td><td>" +res.info.productManageVoList[i].saleStatusNume+"</td><td>"+res.info.productManageVoList[i].rejectReasonContent+"</td><td>" +"<a href='###' onsale-god-action='added'>上架</a>" +
                       "<a href='###' onsale-god-action='edit'>编辑</a><a href='###' onsale-god-action='delet'>删除</a><a href='###' onsale-god-action='clone'>复制</a>"+"</td></tr>"
               }
               $getContain.append(html);

               save_selet_btn();

               pagePlus(res.info.pageCount,data,true);
               $("time").each(function(i){
                   $(this).html(timeFn($("time").eq(i).html()))
               });
               edit_gods();//编辑商品
           }else{
               alert(res.msg);
           }
        },error:function(){
            alert("网络有问题，请重试");
        }
    })
}
/*点击筛选进行数据的拉去并对其进行填充*/
Search_Infm({type:0,shopId:BUSINESS_LOGIN_SHOP_ID,pageIndex:1});
//全选按钮
function save_selet_btn(){
    $("#all_selt_save").click(function() {
        if ($("#all_selt_save").prop("checked")==false) {
            $("#Onsave_GodsList .Chek_btn input").each(function(){
                $(this).prop("checked",false);
                console.log("true")
            });

        } else{
            $("#Onsave_GodsList .Chek_btn input").each(function(){
                $(this).prop("checked",true);
                /*console.log(false)*/
            })
        }
    });
}

function all_action(url){
    var getInputs=$('#Onsave_GodsList input[type="checkbox"]:checked');
    get_Inputs(getInputs,url);
}
/*获取有用checked的input 并存储 调用循环进行对其对应的tr的数据的获取并渲染*/
function get_Inputs(objs,url){
  var productIds= function (){
       var productId="";
      function Make_Table(obj){
          var getTr=$(obj).parent().parent();
          var getProduct=getTr.attr("data-productid");
          console.log(getProduct);
          return getProduct;
      }
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
                $('#Onsave_GodsList input[type="checkbox"]:checked').parent().parent().remove();
                /*$('#Onsave_GodsList input[type="checkbox"]:checked').each(function(i){
                    $('#Onsave_GodsList input[type="checkbox"]:checked').eq(i).parent().parent().remove();
                });*/
                alert(data.msg);
            }else if(data.code=0){
                alert(data.msg);
            }
        },error:function(){
            alert("网络错误，请重试");
        }
    })
}




function Onsavedel_btn(arrow,url){
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
            }else if(data.code=0){
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
            $("#Onsave_GodsList").children().remove();
            $('.Onsave_gods_btm').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");

        },
        success:function(res){
            if(res.code==1){
                $(".Img_Load").remove();
                var html="";
                var $getContain=$("#Onsave_GodsList");
                for(var i=0;i<res.info.productManageVoList.length;i++){
                    html+="<tr data-productId='"+res.info.productManageVoList[i].productId+"'><td class='Chek_btn'><input type='checkbox'></td><td><figure>" +
                        "<img   src="+res.info.productManageVoList[i].path+" />" +
                        "<figcaption>"+res.info.productManageVoList[i].articleNumber+"</figcaption>" +
                        "</figure>"+
                        "<dl>" +
                        "<dt>"
                        +res.info.productManageVoList[i].productName+
                        "</dt>" +
                        "<dd>"+res.info.productManageVoList[i].costPrice+"</dd></dl></td>"+"<td>"+res.info.productManageVoList[i].brandName+"</td>"
                        +"<td>"+res.info.productManageVoList[i].categoryName+"</td><td>"+res.info.productManageVoList[i].stock+"</td><td>"+res.info.productManageVoList[i].saleNum+"</td><td><time>"+res.info.productManageVoList[i].createTime
                        +"</time></td><td>" +res.info.productManageVoList[i].saleStatusNume+"</td><td>"+res.info.productManageVoList[i].rejectReasonContent+"</td><td>" +"<a href='###' onsale-god-action='added'>上架</a>" +
                        "<a href='###' onsale-god-action='edit'>编辑</a><a href='###' onsale-god-action='delet'>删除</a><a href='###' onsale-god-action='clone'>复制</a>"+"</td></tr>"
                }
                $getContain.append(html);

                $("time").each(function(i){
                    $(this).html(timeFn($("time").eq(i).html()))
                });

                edit_gods();//编辑商品

            }else {
                alert(res.msg);
            }
        },
        error:function(){
            alert("网络有问题，请重试");
        }
    })
}
function BtnAction(){
    $(document).on("click","#Onsave_GodsList tr td a[onsale-god-action='delet']",function(e){
        e.stopImmediatePropagation();
        var $thiss=$(this);
        if (confirm("是否删除该商品")){
            Onsavedel_btn($thiss,"/essential/productManageController/deleteProducts");
        }
        console.log(1111)
    });//删除商品
    $(document).on("click","#Onsave_GodsList tr td a[onsale-god-action='added']",function(e){
        e.stopImmediatePropagation();
        var $thiss=$(this);
        if (confirm("是否上架该商品")){
            Onsavedel_btn($thiss,"/essential/productManageController/addProductShelves");
        }
    });//商品上架
    $(document).on("click","#Onsave-Gods .delet_btn",function(e){
        e.stopImmediatePropagation();
        if (confirm("是否删除所选中的商品")){
            all_action("/essential/productManageController/deleteProducts");
        }
    });//全选商品删除
    $(document).on("click","#Onsavegods_putup",function(e){
        e.stopImmediatePropagation();
        if (confirm("是否上架所选中的商品")){
            all_action("/essential/productManageController/addProductShelves");
        }
    });//全选商品上架
}
BtnAction();
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
    $("#Onsave_GodsList tr td a[onsale-god-action='edit']").on("click",function(){

        getonsale_productId= $(this).parent().parent().attr("data-productId");
        if (confirm("是否确认编辑该商品")){
            $("#onhome_goods").load("pages/busi_platform/business/product/editGods.html");
        }
    });//编辑该商品
}
