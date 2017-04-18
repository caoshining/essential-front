/**
 * Created by chenM on 2016/8/11.
 */
var typeId = 3;

var userId = PLATFORM_LOGIN_USER_ID;
/*改变类型*/
$('.pushType').on('change',function (){
    var _index = $('.pushType').val();
    typeId = _index;
    if(_index == 0){
        $('.new_push_msg_goods').hide();
        $('.new_push_msg_articles').show();
        $('.new_push_msg_brands').hide();
        $('.new_push_msg_theme').hide();

    }else if(_index == 1){
        $('.new_push_msg_goods').hide();
        $('.new_push_msg_articles').hide()
        $('.new_push_msg_brands').hide();
        $('.new_push_msg_theme').show();
    }else if(_index == 3){
        $('.new_push_msg_goods').show();
        $('.new_push_msg_articles').hide()
        $('.new_push_msg_brands').hide();
        $('.new_push_msg_theme').hide();
    }
    else if(_index == 5){
        $('.new_push_msg_goods').hide();
        $('.new_push_msg_articles').hide()
        $('.new_push_msg_brands').show();
        $('.new_push_msg_theme').hide();
    }

})
/*定义一个数组，储存所有的商品分类Id,商品分类名称,商家名称,店铺Id*/
var categoryNameArr = [];
getGoodList();
function getGoodList(){
    var productName = $('.product_name').val();
    var brandId = $('.brand_class').val();
    var firstPrice =$('.price_d').val();
    var secondPrice = $('.price_g').val();
    var shopName = $('.shop_class').val();
    var categoryId = $('.product_class').val();
    var linkFrom = $('.link_from').val();


    /*商品区*/
    newPushMsg_goods(productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom);

    function newPushMsg_goods(productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom){
        var parmaData = {
            pageIndex:1,
            type:0,
            pageSize:20,
            productName:productName,
            brandId:brandId,
            firstPrice:firstPrice,
            secondPrice:secondPrice,
            shopName:shopName,
            categoryId:categoryId,
            linkFrom:linkFrom
        };
        $.ajax({
            type: "post",
            url: PLATFORM_URL_PRE+'/essential/productPlatform/queryProductPlatform',
            dataType: 'json',
            data:parmaData,
            success:function (res){
                if(res.code == 1){
                    var result = '';
                    $('.artiles_list_box tbody').html('');

                    $.each(res.info.productPlatformList, function (i, v) {
                        if(v.linkUrl == 1){
                            result +='<tr productId = '+ v.productId+'>'+
                                '<td class="clear">'+
                                '<input name="choose" type="radio" class="choose_goods">'+
                                '<div style="width: 80px; margin-right: 10px">'+
                                '<img src='+ v.path+'>'+
                                '<span>'+ v.articleNumber+'</span>'+
                                '</div>'+
                                '<div>'+
                                '<span>'+ v.productName+'</span>'+
                                '<p style="text-align: left;margin-top: 20px">￥'+v.discountPrice+'<em class="discount_price">￥'+v.costPrice+'</em><span class="discount_icon">折</span></p>'+
                                '</div>'+
                                '</td>'+
                                '<td>'+v.brandName+'</td>'+
                                '<td>'+v.categoryName+'</td>'+
                                '<td>'+v.shopName+'</td>'+//商家
                                '<td>'+v.stock+'</td>'+
                                '<td>'+v.saleNum+'</td>'+
                                '<td class="time">'+removeDian(v.createTime)+'</td>'+
                                '<td>'+v.productStatusName+'</td>'+
                                '<td>'+v.selfName+'</td>'+//是否自营
                                '</tr>'
                        }else if(v.linkUrl == 0){
                            result +='<tr productId = '+ v.productId+'>'+
                                '<td class="clear">'+
                                '<input name="choose" type="radio" class="choose_goods">'+
                                '<div style="width: 80px; margin-right: 10px">'+
                                '<img src='+ v.path+'>'+
                                '<span>'+ v.articleNumber+'</span>'+
                                '</div>'+
                                '<div>'+
                                '<span>'+ v.productName+'</span>'+
                                '<p style="text-align: left;margin-top: 20px">￥'+v.costPrice+'</p>'+
                                '</div>'+
                                '</td>'+
                                '<td>'+v.brandName+'</td>'+
                                '<td>'+v.categoryName+'</td>'+
                                '<td>'+v.shopName+'</td>'+//商家
                                '<td>'+v.stock+'</td>'+
                                '<td>'+v.saleNum+'</td>'+
                                '<td class="time">'+removeDian(v.createTime)+'</td>'+
                                '<td>'+v.productStatusName+'</td>'+
                                '<td>'+v.selfName+'</td>'+//是否自营
                                '</tr>'
                        }

                    });

                    $('.artiles_list_box tbody').html(result);

                    pagePlus(res.info.pageCount,productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom);
                }else{
                    // alert(res.msg);
                }

            },
            error:function (res){
                alert('网络连接失败，请稍后重试')
            }
        });
    };


    /*分页调数据*/

    function newPushMsg_goodsForPage(page,productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom){
        var parmaData = {
            pageIndex:page,
            type:0,
            pageSize:20,
            productName:productName,
            brandId:brandId,
            firstPrice:firstPrice,
            secondPrice:secondPrice,
            shopName:shopName,
            categoryId:categoryId,
            linkFrom:linkFrom
        };

        $.ajax({
            type: "post",
            url: PLATFORM_URL_PRE+'/essential/productPlatform/queryProductPlatform',
            dataType: 'json',
            data:parmaData,
            success:function (res){
                if(res.code == 1){
                    var result = '';
                    $('.artiles_list_box tbody').html('');

                    $.each(res.info.productPlatformList, function (i, v) {
                        if(v.linkUrl == 1){
                            result +='<tr productId = '+ v.productId+'>'+
                                '<td class="clear">'+
                                '<input name="choose" type="radio" class="choose_goods">'+
                                '<div style="width: 80px; margin-right: 10px">'+
                                '<img src='+ v.path+'>'+
                                '<span>'+ v.articleNumber+'</span>'+
                                '</div>'+
                                '<div>'+
                                '<span>'+ v.productName+'</span>'+
                                '<p style="text-align: left;margin-top: 20px">￥'+v.discountPrice+'<em class="discount_price">￥'+v.costPrice+'</em><span class="discount_icon">折</span></p>'+
                                '</div>'+
                                '</td>'+
                                '<td>'+v.brandName+'</td>'+
                                '<td>'+v.categoryName+'</td>'+
                                '<td>'+v.shopName+'</td>'+//商家
                                '<td>'+v.stock+'</td>'+
                                '<td>'+v.saleNum+'</td>'+
                                '<td class="time">'+removeDian(v.createTime)+'</td>'+
                                '<td>'+v.productStatusName+'</td>'+
                                '<td>'+v.selfName+'</td>'+//是否自营
                                '</tr>'
                        }else if(v.linkUrl == 0){
                            result +='<tr productId = '+ v.productId+'>'+
                                '<td class="clear">'+
                                '<input name="choose" type="radio" class="choose_goods">'+
                                '<div style="width: 80px; margin-right: 10px">'+
                                '<img src='+ v.path+'>'+
                                '<span>'+ v.articleNumber+'</span>'+
                                '</div>'+
                                '<div>'+
                                '<span>'+ v.productName+'</span>'+
                                '<p style="text-align: left;margin-top: 20px">￥'+v.costPrice+'</p>'+
                                '</div>'+
                                '</td>'+
                                '<td>'+v.brandName+'</td>'+
                                '<td>'+v.categoryName+'</td>'+
                                '<td>'+v.shopName+'</td>'+//商家
                                '<td>'+v.stock+'</td>'+
                                '<td>'+v.saleNum+'</td>'+
                                '<td class="time">'+removeDian(v.createTime)+'</td>'+
                                '<td>'+v.productStatusName+'</td>'+
                                '<td>'+v.selfName+'</td>'+//是否自营
                                '</tr>'
                        }
                    });

                    $('.artiles_list_box tbody').html(result);

                }else{
                    alert(res.msg);
                }
            },
            error:function (res){
                alert('网络连接失败，请稍后重试')
            }
        });
    };
    //商品分页
    function pagePlus(totalPageCount,productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom){

        $('.pagination1').paging(totalPageCount, {
            format: '[< ncnnn >]',
            perpage: '20',
            onSelect: function(page) {

                newPushMsg_goodsForPage(page,productName,brandId,firstPrice,secondPrice,shopName,categoryId,linkFrom)
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

};
/*点击筛选*/

$('.screening_goods').on('click',function (){
    getGoodList();
})

/*渲染商家名称部分*/
shopNameGroup()
function shopNameGroup() {

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/querySomeList/queryShopList',
        dataType: 'json',
        success: function (res) {
            var result = '';
            if(res.code == 1){
                $.each(res.info,function (i,v){
                    result+= '<option>'+ v.name+'</option>';
                })

            }
            $('.shop_class').append(result);

        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }

    })
};
/*渲染商品分类部分*/
productClassGroup();
function productClassGroup() {

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/querySomeList/queryCategoryList',
        dataType: 'json',
        success: function (res) {
            var result = '';
            if(res.code == 1){
                $.each(res.info,function (i,v){
                    result+= '<option value='+v.categoryId+'>'+ v.categoryName+'</option>';
                })

            }
            $('.product_class').append(result);

        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }

    })
};
/*渲染商品品牌部分*/
brandGroup()
function brandGroup() {

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/querySomeList/queryBrandList',
        dataType: 'json',
        success: function (res) {
            var result = '';
            if(res.code == 1){
                $.each(res.info,function (i,v){
                    result+= '<option value='+v.brandId+'>'+ v.brandName+'</option>';
                })

            }
            $('.brand_class').append(result);

        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }

    })
};


/*
-----------------------------------------------------------------------------------------


/*专栏*/
/*初始化*/
var articleContent = $('.article_content').val();
articleFn(0,articleContent)
function articleFn(GroupId,articleContent){
    newPushMsg_articles(GroupId,articleContent)
    function newPushMsg_articles(GroupId,articleContent){

        var parmaData = {
            pageIndex:1,
            articleGroupId:GroupId,
            articleContent:articleContent
        };

        $.ajax({
            type: "post",
            url: PLATFORM_URL_PRE+'/essential/article/queryArticleListByPage',
            dataType: 'json',
            data:parmaData,
            success:function (res){


                if(res.code == 1){
                    if(res.info.totalPageCount != 0){
                        var result = '';
                        $('.artiles_list_box1 tbody').html('');

                        $.each(res.info.contentList, function (i, v) {

                            result +='<tr articleId = '+ v.articleId+'>'+
                                '<td>'+
                                '<input name="choose" type="radio">'+
                                '<span>'+(i+1)+'</span>'+
                                '</td>'+
                                '<td>'+ v.articleName+ '</td>'+
                                '<td>'+ v.groupName+  '</td>'+
                                '<td>'+v.author+ '</td>'+
                                '<td>'+removeDian(v.createTime)+
                                '</td>'+
                                '<td>'+removeDian(v.sendTime)+
                                '</td>'+
                                '</tr>'
                        });
                    }

                    $('.artiles_list_box1 tbody').html(result);
                    pagePlus1(res.info.totalPageCount,GroupId,articleContent);
                }else{
                    alert(res.msg);
                }

            },
            error:function (res){
                alert('网络连接失败，请稍后重试')
            }
        });
    };

    /*分页调数据*/
    function newPushMsg_articlesForPage(page,GroupId,articleContent){

        var parmaData = {
            pageIndex:page,
            articleGroupId:GroupId,
            articleContent:articleContent
        };

        $.ajax({
            type: "post",
            url: PLATFORM_URL_PRE+'/essential/article/queryArticleListByPage',
            dataType: 'json',
            data:parmaData,
            success:function (res){


                if(res.code == 1){

                    var result = '';
                    $('.artiles_list_box1 tbody').html('');
                    if(res.info.totalPageCount != 0) {
                        $.each(res.info.contentList, function (i, v) {

                            result += '<tr articleId = ' + v.articleId + '>' +
                                '<td>' +
                                '<input name="choose" type="radio">' +
                                '<span>' + (((page - 1) * 10) + (i + 1)) + '</span>' +
                                '</td>' +
                                '<td>' + v.articleName + '</td>' +
                                '<td>' + v.groupName + '</td>' +
                                '<td>' + v.author + '</td>' +
                                '<td>' + removeDian(v.createTime) + '</td>' +
                                '<td>' + removeDian(v.sendTime) + '</td>' +
                                '</tr>'
                        });
                    };

                    $('.artiles_list_box1 tbody').html(result);

                }else{
                    alert(res.msg);
                }

            },
            error:function (res){
                alert('网络连接失败，请稍后重试')
            }
        });
    };

    //专栏分页1
    function pagePlus1(totalPageCount,GroupId,articleContent){

        $('.pagination2').paging(totalPageCount, {
            format: '[< ncnnn >]',
            perpage: '10',
            onSelect: function(page) {

                newPushMsg_articlesForPage(page,GroupId,articleContent)
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
    };
};
/*渲染专栏部分*/
articleGroup();
function articleGroup() {

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE + '/essential/articleGroup/queryGroupList',
        dataType: 'json',
        success: function (res) {
            var result = '';
            if(res.code == 1){
                $.each(res.info,function (i,v){
                    result+= '<option value='+v.articleGroupId+'>'+ v.groupName+'</option>';
                })

            }
            $('.article_group').append(result);

        },
        error: function (res) {
            alert('网络连接失败，请稍后重试')
        }

    })
};
/*改变专栏*/
$('.article_group').on('change',function (){
    var N = $(this).val();
    var articleContent = $('.article_content').val();
    articleFn(N,articleContent)
})

/*点击筛选*/

$('.new_push_msg_articles .screening_button').on('click',function (){
    var N = $('.article_group').val();
    var articleContent = $('.article_content').val();
    articleFn(N,articleContent)
})

/*
---------------------------------------------------------------------------------
*/

/*
--------------------------------------------------------
*/
/*品牌*/

var brandName = $('.search').val()
getbrandList(brandName);
function getbrandList(brandName){

    brandListFn(brandName)
    function brandListFn(brandName){
        var parmaData = {
            pageNo:1,
            brandName:brandName
        };
        $.ajax({
            type: "post",
            url: PLATFORM_URL_PRE + '/essential/bussinessBrand/queryTotalBrand',
            dataType: 'json',
            data: parmaData,
            success: function (res) {

                if (res.code == 1) {
                    var result = '';
                    $('.artiles_list_box2 tbody').html('');

                    $.each(res.info.brandVoList, function (i, v) {

                        result +=  '<tr>'+
                            '<td>申请时间:'+ removeDian(v.createTime)+'</td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '</tr>'+
                            '<tr brandId='+v.brandId+' class="brand">'+
                            ' <td><input type="radio" name="Radio">'+ v.brandName+'</td>'+
                            '<td><img src='+ v.logoPath+'></td>'+
                            '<td>'+ v.pageDesc+'</td>'+
                            '<td>'+ v.collectionCount+'</td>'+
                            '</tr>';
                    });

                    $('.artiles_list_box2 tbody').html(result);
                    pagePlus2(res.info.totalPageCount,brandName);
                } else {
                    alert(res.msg);
                }

            },
            error: function (res) {
                alert('网络连接失败，请稍后重试')
            }

        });
    };
    /*品牌分页*/

    function brandListForPage(pageNo,brandName){
        var parmaData = {
            pageNo:pageNo,
            brandName:brandName
        };
        $.ajax({
            type: "post",
            url: PLATFORM_URL_PRE + '/essential/bussinessBrand/queryTotalBrand',
            dataType: 'json',
            data: parmaData,
            success: function (res) {

                if (res.code == 1) {
                    var result = '';
                    $('.artiles_list_box2 tbody').html('');

                    $.each(res.info.brandVoList, function (i, v) {

                        result +=  '<tr>'+
                            '<td>申请时间:'+ removeDian(v.createTime)+'</td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '<td></td>'+
                            '</tr>'+
                            '<tr brandId='+v.brandId+' class="brand">'+
                            ' <td><input type="radio" name="Radio">'+ v.brandName+'</td>'+
                            '<td><img src='+ v.logoPath+'></td>'+
                            '<td>'+ v.pageDesc+'</td>'+
                            '<td>'+ v.collectionCount+'</td>'+
                            '</tr>';
                    });

                    $('.artiles_list_box2 tbody').html(result);
                } else {
                    alert(res.msg);
                }

            },
            error: function (res) {
                alert('网络连接失败，请稍后重试')
            }

        });
    }

    //品牌分页
    function pagePlus2(totalPageCount,brandName){

        $('.pagination3').paging(totalPageCount, {
            format: '[< ncnnn >]',
            perpage: '10',
            onSelect: function(page) {
                brandListForPage(page,brandName)

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
};

/*搜索*/

$('.search').on('input',function(){
    var brandName = $('.search').val()
    getbrandList(brandName);
})


/*
---------------------------------------------------------------------------
*/
/*推荐*/
/*获取列表*/
getThemeList();
function getThemeList(){

    var recommendTitle = $('.theme_search_title input').val();

    getThemeListCon()
    function  getThemeListCon(){
        var parmaData = {
            loginUserId:userId,
            recommendTitle:recommendTitle,
            status:1,
            pageNo:1
        };
        $.ajax({
            type:"post",
            url:PLATFORM_URL_PRE+'/essential/recommend/queryAdvertisingForList',
            dataType: 'json',
            data:parmaData,
            success:function (res){


                if(res.code == 1){
                    var result = '';
                    $('.themeListBox tbody').html('');

                    if(res.info.recommendList != null){
                        $.each(res.info.recommendList,function (i,v){
                            if(v.status == 1){
                                v.status = '上线';
                            }else if(v.status == 0){
                                v.status = '下线';
                            }
                            result += '<tr recommendId = '+ v.recommendId+'>'+

                                    '<td style="padding-right: 5px"><input name="choose" type="radio">'+v.recommendId+'</td>'+
                                    '<td>'+ v.recommendTitle+'</td>'+
                                    '<td>'+ v.createUserName+'</td>'+
                                    '<td>'+ v.status+'</td>'+
                                    '<td>'+ timeFn(v.createTime)+'</td>'+
                                    '<td>'+ timeFn(v.statusTime)+'</td>'+
                                '</tr>';
                        });

                    };
                    $('.artiles_list_box3 tbody').html(result);
                    getThemeListPagePlus(res.info.totalCount);
                }else{
                    alert(res.msg)
                }
            },
            error:function (){
                alert('网络连接失败，请稍后重试');
            }
        });

    };

    /*分页数据*/

    function getListThemeForPage(page){
        var parmaData = {
            status:1,
            recommendTitle:recommendTitle,
            pageNo:page,
            loginUserId:userId
        };

        $.ajax({
            type:"post",
            url:PLATFORM_URL_PRE+'/essential/recommend/queryAdvertisingForList',
            dataType: 'json',
            data:parmaData,
            success:function (res){



                if(res.code == 1){
                    var result = '';
                    $('.themeListBox tbody').html('');

                    if(res.info.recommendList != null){
                        $.each(res.info.recommendList,function (i,v){
                            if(v.status == 1){
                                v.status = '上线';
                            }else if(v.status == 0){
                                v.status = '下线';
                            }
                            result += '<tr recommendId = '+ v.recommendId+'>'+
                                '<td style="padding-right: 5px"><input name="choose" type="radio">'+v.recommendId+'</td>'+
                                '<td>'+ v.recommendTitle+'</td>'+
                                '<td>'+ v.createUserName+'</td>'+
                                '<td>'+ v.status+'</td>'+
                                '<td>'+ timeFn(v.createTime)+'</td>'+
                                '<td>'+ timeFn(v.statusTime)+'</td>'+
                                '</tr>';
                        });

                    };
                    $('.artiles_list_box3 tbody').html(result);

                }else{
                    alert(res.msg)
                }
            },
            error:function (){
                alert('网络连接失败，请稍后重试');
            }
        });

    };


    //推荐分页
    function getThemeListPagePlus(totalPageCount){

        $('.pagination4').paging(totalPageCount, {
            format: '[< ncnnn >]',
            perpage: '10',
            onSelect: function(page) {
                getListThemeForPage(page);
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
};

$('.theme_screening').on('click',function (e){
    e.stopImmediatePropagation();
    getThemeList();
});
/*——————————————————————————————————————————————————————*/


/*点击发送*/

$('.send_btn').on('click',function (){

    if($('.msgContent').val()==""){
        alert('请输入内容');
        return;
    }
    if($('.msgContent').val().length >25){
        alert('请输入内容不要超过25个字');
        return;
    }
    if($('.createUser').val()==''){
        alert('请输入创建人');
        return;
    }

    var _index=-1;
/*查看单选框的选中状态*/
    if(typeId == 3){
        for(var i=0;i<$('.artiles_list_box tbody input').length;i++){
            if($('.artiles_list_box tbody input').eq(i).prop('checked')){

                _index = i;
            }
        }
    }else if(typeId == 0){
        for(var i=0;i<$('.artiles_list_box1 tbody input').length;i++){
            if($('.artiles_list_box1 tbody input').eq(i).prop('checked')){

                _index = i;
            }
        }
    }else if(typeId == 5){

        for(var i=0;i<$('.artiles_list_box2 tbody input').length;i++){
            if($('.artiles_list_box2 tbody input').eq(i).prop('checked')){

                _index = i;
            }
        }
    }
    else if(typeId == 1){

        for(var i=0;i<$('.artiles_list_box3 tbody input').length;i++){
            if($('.artiles_list_box3 tbody input').eq(i).prop('checked')){

                _index = i;
            }
        }
    }

    /*取到对应的商品Id*/
    if(_index != -1){

        if(typeId == 3){
            var mainId = $('.artiles_list_box tbody tr').eq(_index).attr('productId');
        }else if(typeId == 0){
            var mainId = $('.artiles_list_box1 tbody tr').eq(_index).attr('articleId');
        }else if(typeId == 5){
            var mainId = $('.artiles_list_box2 tbody tr').eq(_index).attr('brandid');
        }else if(typeId == 1){
            var mainId = $('.artiles_list_box3 tbody tr').eq(_index).attr('recommendid');
        }

    }else{
        alert('请选择')
        return;
    }

    var parmaData = {
        msgContent:$('.msgContent').val(),
        pushTypeId:$('.pushType').val(),
        mainId:mainId,
        createUserId:userId,
        pushStrategy:0,
        msgTitle:$('.msgContent').val(),
        attr1:$('.createUser').val()
    };

    $.ajax({
        type: "post",
        url: PLATFORM_URL_PRE+'/essential/pushMsg/savePushMsg',
        dataType: 'json',
        data:parmaData,
        success:function (res){
            if(res.code == 1){
                alert(res.msg)
            }
        },
        error:function (res){
            alert('网络连接失败，请稍后重试');
        }
    });


})
//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }else{
        return null;
    }
}


/*去掉小数点*/
function removeDian(str){
    var index = str.indexOf('.');
    if(index){
        return str.substr(0,index);
    }else{
        return str;
    }
};
//时间截取
function timeFn(time){
    if(time && time.indexOf('.')!=-1){
        return time.substr(0,time.indexOf('.'));
    }else{
        return time;
    }
}