/**
 * Created by wangs on 2016/7/20.
 */
/*加载首页*/
$("#platformHome").load("pages/base_platform/business/platform_product/homePpage.html");
function  loadingPlatformHome(){
    $(".ace-nav").find("a[href='#platform_home']").click(function(){

        $("#platformHome").load("pages/base_platform/business/platform_product/homePpage.html");
        //$("#platform_brands").find("a[href='#Brand_Lists']").unbind("click");
    });
}
loadingPlatformHome();

//加载品牌列表页面
function loadingBrand(){
    $("#platform_brands").find("a[href='#Brand_Lists']").click(function(){
        $("#Brand_Lists").load("pages/base_platform/business/platform_product/brand.html");
        //$("#platform_brands").find("a[href='#Brand_Lists']").unbind("click");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#Brand_Lists").addClass("active");

    });
}
loadingBrand();

/*加载商品列表*/
function ProductList(){
    $("#platform_shopList").find("a[href='#platform_GoodsList']").click(function(){
        $("#platform_GoodsList").load("pages/base_platform/business/platform_product/productsList.html");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#platform_GoodsList").addClass("active");
    });
    $("a[href='#platform_Goods']").click(function(){
        $("#platform_GoodsList").load("pages/base_platform/business/platform_product/productsList.html");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#platform_GoodsList").addClass("active");
    });
}
ProductList();

/*强制下架商品*/
function ForceShelves_shops(){
    $("#platform_shopList").find("a[href='#ForceShelves_Goods']").click(function(){
        $("#ForceShelves_Goods").load("pages/base_platform/business/platform_product/ForceShelves_Goods.html");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#ForceShelves_Goods").addClass("active");
    });
}
ForceShelves_shops();

//加载添加品牌界面
function addBrands(){
    $("#platform_brands").find("a[href='#Add_Brand']").click(function(){
        $("#Add_Brand").load("pages/base_platform/business/platform_product/Addbrand.html");
        //$("#platform_brands").find("a[href='#Add_Brand']").unbind("click");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#Add_Brand").addClass("active");
    });
}
addBrands();

//加载规格列表界面
function standardList(){
    $("#platform_standard").find("a[href='#platform_StandardLists']").click(function(){

        $("#platform_StandardLists").load("pages/base_platform/business/platform_product/standardList.html");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#platform_StandardLists").addClass("active");


    });
}

standardList();
//加载添加规格界面
function addstandard(){
    $("#platform_standard").find("a[href='#platform_AddStandard']").click(function(){

        $("#platform_AddStandard").load("pages/base_platform/business/platform_product/addstandard.html");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#platform_AddStandard").addClass("active");
        //$("#platform_standard").find("a[href='#platform_AddStandard']").unbind("click");
    });
}
addstandard();

//加载品类列表界面
function brandList(){
    $("#brand_list").find("a[href='#platform_ClassLists']").click(function(){

        $("#platform_ClassLists").load("pages/base_platform/business/platform_product/brandclassList.html");
       //$("#brand_list").find("a[href='#platform_ClassLists']").unbind("click");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#platform_ClassLists").addClass("active");
    });
}
brandList();
//加载添加品类界面
function addbrandList(){
    $("#brand_list").find("a[href='#platform_AddClassLists']").click(function(){

        $("#platform_AddClassLists").load("pages/base_platform/business/platform_product/addbrandList.html");
       // $("#brand_list").find("a[href='#platform_AddClassLists']").unbind("click");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#platform_AddClassLists").addClass("active");
    });
};
addbrandList();

//加载审核品牌列表
function AuditList(){
    $("#platform_brands").find("a[href='#Audit_Brand']").click(function(){
        $("#Audit_Brand").load("pages/base_platform/business/platform_product/Audit_List.html");
       // $("#platform_brands").find("a[href='#Add_Brand']").unbind("click");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#Audit_Brand").addClass("active");
    });
}
AuditList();

//加载热门品牌列表
function HotBrand(){
    $("#platform_brands").find("a[href='#Hot_Brands']").click(function(){
        $("#Hot_Brands").load("pages/base_platform/business/platform_product/HotBrand_List.html");
        //$("#platform_brands").find("a[href='#Add_Brand']").unbind("click");
        $('#platform_Goods .tab-pane').removeClass("active");
        $("#Hot_Brands").addClass("active");
    });
}
HotBrand();

/*加载订单管理*/
//所有订单

function AllOrder(){
    $("a[href='#Platform_allOrders']").click(function(){
        $("#Platform_allOrders").load("pages/base_platform/business/platform_order/Platform_allOrder.html");
        $('#platform_Management .tab-pane').removeClass("active");
        $("#Platform_allOrders").addClass("active");
    });

    //点击订单管理加载所有订单
    $("a[href='#platform_Management']").click(function(){
        $("#Platform_allOrders").load("pages/base_platform/business/platform_order/Platform_allOrder.html");
        $('#platform_Management .tab-pane').removeClass("active");
        $("#Platform_allOrders").addClass("active");
    })
}
AllOrder();

//退款订单
function RefundOrder(){
    $("a[href='#Platform_RefundOrders']").click(function(){
        $("#Platform_RefundOrders").load("pages/base_platform/business/platform_order/platform_RefundOrder.html");
        $('#platform_Management .tab-pane').removeClass("active");
        $("#Platform_RefundOrders").addClass("active");
    })
}
RefundOrder();

//退货订单
function RefundGoods_Order(){
    $("a[href='#Platform_RefundGoods']").click(function(){
        $("#Platform_RefundGoods").load("pages/base_platform/business/platform_order/platform_refundGoods.html");
        $('#platform_Management .tab-pane').removeClass("active");
        $("#Platform_RefundGoods").addClass("active");
    })
}
RefundGoods_Order();

//未生成退款单
function NotGenerate_Refund(){
    $("a[href='#NotGenerate_Refund']").click(function(){
        $("#NotGenerate_Refund").load("pages/base_platform/business/platform_order/NotGenerate_RefundList.html");
        $('#platform_Management .tab-pane').removeClass("active");
        $("#NotGenerate_Refund").addClass("active");
    })
}
NotGenerate_Refund();

//历史退款单
function History_Refund(){
    $("a[href='#Platform_HistoryRefund']").click(function(){
        $("#Platform_HistoryRefund").load("pages/base_platform/business/platform_order/HistoryRefund_List.html");
        $('#platform_Management .tab-pane').removeClass("active");
        $("#Platform_HistoryRefund").addClass("active");
    })
}
History_Refund();
/*加载订单管理*/


/*关于我们*/
function about_us(){
    $("a[href='#aboutUs']").click(function(){
        $("#aboutUs").load("pages/base_platform/business/platform_system/aboutUs.html");
        $('#System_Management .tab-pane').removeClass("active");
        $("#aboutUs").addClass("active");
    })

}
about_us();

/*帮助中心*/
function help_center(){
    $("a[href='#helpCenter']").click(function(){
        $("#helpCenter").load("pages/base_platform/business/platform_system/help_center.html");
        $('#System_Management .tab-pane').removeClass("active");
        $("#helpCenter").addClass("active");
    });

}
help_center();


/*意见反馈*/
function feed_back(){
    $("a[href='#feedback']").click(function(){
        $("#feedback").load("pages/base_platform/business/platform_system/feed_back.html");
        $('#System_Management .tab-pane').removeClass("active");
        $("#feedback").addClass("active");
    });

}
feed_back();

/*添加新版本*/
add_new_version();
function add_new_version(){
    $("a[href='#add_new_version']").click(function(){
        $("#add_new_version").load("pages/base_platform/business/platform_system/add_new_version.html");
        $('#System_Management .tab-pane').removeClass("active");
        $("#add_new_version").addClass("active");
    });

}
/*版本管理*/
version_management();
function version_management(){

    $("a[href='#version_management']").click(function(){

        $("#version_management").load("pages/base_platform/business/platform_system/version_management.html");
        $('#System_Management .tab-pane').removeClass("active");
        $("#version_management").addClass("active");
    });

}
/*------会员管理------*/

/*用户列表*/
usersLists()
function usersLists(){
    $("a[href='#usersLists']").click(function(e){
        e.stopImmediatePropagation();

        $("#usersLists").load("pages/base_platform/business/platform_vip/users_lists.html");
        $('#VIP_Management .tab-pane').removeClass("active");
        $("#usersLists").addClass("active");
    });

}
/*新建推送消息*/
newPushMsg_article()
function newPushMsg_article(){
    $("a[href='#new_push_Msg']").click(function(){
        $("#new_push_Msg").load("pages/base_platform/business/platform_vip/newPushMsg_goods.html");
        $('#VIP_Management .tab-pane').removeClass("active");
        $("#new_push_Msg").addClass("active");
    });

}
/*历史推送消息*/
oldPushMsg()
function oldPushMsg(){
    $("a[href='#old_push_Msg']").click(function(){
        $("#old_push_Msg").load("pages/base_platform/business/platform_vip/oldPushMsg.html");
        $('#VIP_Management .tab-pane').removeClass("active");
        $("#old_push_Msg").addClass("active");
    });
};



/*------------------营销管理-------------------------*/
/*专题列表*/
themeList()
function themeList(){
    $("a[href='#theme_list']").click(function(){
        $("#create_theme").html('');
        $("#advertising_management").html('');
        $("#theme_list").load("pages/base_platform/business/platform_recommend/theme_list.html");
        $('#Market_Promotion .tab-pane').removeClass("active");
        $("#theme_list").addClass("active")
    });
};
/*广告位管理*/
advertisingManagement()
function advertisingManagement(){
    $("a[href='#advertising_management']").click(function(){
        $("#theme_list").html('');
        $("#advertising_management").load("pages/base_platform/business/platform_recommend/advertising_management.html");
        $('#Market_Promotion .tab-pane').removeClass("active");
        $("#advertising_management").addClass("active")
    });
};
/*新建专题*/
createTheme()
function createTheme(){
    $("a[href='#create_theme']").click(function(){
        $("#theme_list").html('');
        $("#create_theme").load("pages/base_platform/business/platform_recommend/create_theme.html");
        $('#Market_Promotion .tab-pane').removeClass("active");
        $("#create_theme").addClass("active")
    });
};

//商家管理
function Business_control(){
    $("a[href='#Business_Management']").click(function(){
        $("#business_list").siblings().html("");
        $("#business_list").load("pages/base_platform/business/platform_control/bussiness_list.html");

    });
    $("a[href='#business_list']").click(function(){
        $("#business_list").siblings().html("");
        $("#business_list").load("pages/base_platform/business/platform_control/bussiness_list.html");

    });
    $("a[href='#business_check']").click(function(){
        $("#business_check").siblings().html("");
        $("#business_check").load("pages/base_platform/business/platform_control/bussiness_check.html");
    })
}
Business_control();
/*====================*/
/*营销活动*/

function create_coupons(){
    $("a[href='#coupons_manage']").click(function(){

        $("#coupons_manage").load("pages/base_platform/business/platform_coupons/make_coupons.html");
        $('#Market_Promotion .tab-pane').removeClass("active");
        $("#coupons_manage").addClass("active")
    });
};
create_coupons()