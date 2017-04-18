/**
 * Created by wangs on 2016/8/4.
 */
//营销推广
//新建发现

function newDiscovery(){
    $("a[href='#newDiscovery']").click(function(){
        $("#newDiscovery").load("pages/base_platform/business/platform_marketing/newDiscovery.html");
        $("#Market_Promotion .tab-pane").removeClass('active');
        $(this).addClass('active');
    })
}
newDiscovery();

/*专栏列表*/
function columnList(){
    $("a[href='#columnList']").click(function(){
        $("#columnList").load("pages/base_platform/business/platform_marketing/columnLists.html");
        $("#Market_Promotion .tab-pane").removeClass('active');

        $("#columnList").addClass('active');
    })
}
columnList();

//点击营销推广加载专栏列表
$("a[href='#Market_Promotion']").click(function(){
    $("#columnList").load("pages/base_platform/business/platform_marketing/columnLists.html");
    $("#Market_Promotion .tab-pane").removeClass('active');

    $("#columnList").addClass('active');
});

/*营销活动*/
function market_activy(){
    $("a[href='#coupons_control']").click(function(){
        $("#columnList").load("pages/base_platform/business/platform_coupons/make_coupons.html");
        $("#Market_Promotion .tab-pane").removeClass('active');
        $("#coupons_control").addClass('active');
    })
}
market_activy();
