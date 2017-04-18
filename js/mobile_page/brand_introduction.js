/**
 * Created by chenM on 2016/7/27.
 */


/*设置头部div的高度*/





/*分页*/
$(function(){

   var brandId= GetQueryString("brandId");

    /*初始化数据*/

    var counter = 1;
    // 每页展示4个
    var num = 4;
    //brandId = 1;
    brandIntroduction(brandId,counter,num);
    function brandIntroduction(brandId,counter,num){

        var parmaData = {
            brandId:brandId,//商品ID
            pageIndex:counter,//页码
            pageSize:num,//条数

        };
        $.ajax({
            type: 'post',
            url: BUSINESS_URL_PRE+'/essential/bussinessBrand/queryBrandAndProductList',
            dataType: 'json',
            data:parmaData,
            success: function(data){
                if(data.code == 1){
                    //console.log(data)
                    var result = '';
                    $('title').html(data.info.brand.brandName);
                    var productList = data.info.productList;

                    $('.head_introduction img').attr('src',data.info.brand.picPath);
                    $('.head_introduction h4').html(data.info.brand.brandName);
                    $('.head_introduction p').html(data.info.brand.pageDesc);
                    $('.head_introduction .introduction_msg').html(data.info.brand.detailedDesc);
                }
            },
            error:function (res){
                alert('网络连接失败，请稍后重试')
            }
        })
    };




    /*上拉加载商品*/

    $('.goods_list').dropload({

        scrollArea : window,
        loadDownFn : function(me){


            var parmaData = {
                brandId:brandId,//商品ID
                pageIndex:counter,//页码
                pageSize:num,//条数

            };

           $.ajax({
                type: 'post',
                url: BUSINESS_URL_PRE+'/essential/bussinessBrand/queryBrandAndProductList',
                dataType: 'json',
                data:parmaData,
                success: function(data){
                    if(data.code == 1){
                        //console.log(data)
                        var productList = data.info.productList;
                        var result = '';
                        counter++;
                        pageEnd = num * counter;
                        pageStart = pageEnd - num;

                        $('.head_introduction img').attr('src',data.info.brand.picPath);
                        $('.head_introduction h4').html(data.info.brand.brandName);
                        $('.head_introduction p').html(data.info.brand.pageDesc);
                        $('.head_introduction .introduction_msg').html(data.info.brand.detailedDesc);

                        for(var i = 0; i < productList.length; i++){
                            if(productList[i].isDiscount == 0){
                                result +=   '<div class="single_good" productId = '+productList[i].productId+'>'+
                                    '<a href="#"><img src='+productList[i].path+' /></a>'+
                                    '<h5>'+productList[i].brandName+'</h5>'+
                                    '<p>'+productList[i].productName+'</p>'+
                                    '<span>￥'+productList[i].costPrice+'</span>'+
                                    '</div>'
                            }else if(productList[i].isDiscount != 0){
                                result +=   '<div class="single_good" productId = '+productList[i].productId+'>'+
                                    '<a href="#"><img src='+productList[i].path+' /></a>'+
                                    '<h5>'+productList[i].brandName+'</h5>'+
                                    '<p>'+productList[i].productName+'</p>'+
                                    '<span>￥'+productList[i].discountPrice+'<em class="discount_price">￥'+productList[i].costPrice+'</em></span>'+
                                    '</div>'
                            }


                        }
                        if(productList.length===0){
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();

                        };
                        $('.goods_list_item').append(result);
                        me.resetload();
                    }

                },
               error:function (){
                   alert('网络连接失败，请稍后重试');
               }
            });
        }
    });

    //得到地址栏的值
    function GetQueryString(name) {

        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

        var r = window.location.search.substr(1).match(reg);

        if (r != null) return unescape(r[2]); return null;
    };

});



/**
 * Created by Morgan on 2016/7/26.
 */
function Ajax_detail(data){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/product/queryByProductId",
        data:data,
        dataType:'json',
        beforeSend:function(){
            $("#gods_shop").next(".swiper-container").remove();
            $("body").attr("productId",data.productId);
        },
        success:function(data){
            if(data.code==1){
                /*$("#gods_logoimg").attr("src",data.info.logoPath);
                 $("#gods_shopName").html(data.info.brandName);
                 $("#gods_shop_descri").html(data.info.shopDescribe);*/

                $("title").html(data.info.brandName);

                var pics=data.info.picList;

                var html="<div class='swiper-container'><div class='swiper-wrapper'>";

                for(var i=0;i<pics.length;i++){
                    html+='<div class="swiper-slide"><img src=' +pics[i].path+ ' /></div>';
                }
                html+="</div><div class='swiper-pagination'></div></div>";

                $("#gods_shop").after(html);

                //RunImg();
                set_Swiper();


                $("#gods_title").html(data.info.salesName);
                $("#present_price").html(data.info.price);
                $(".pasent_price").html("");
                $(".pasent_price").append("<a href='#' id='pasent_price'>￥"+data.info.costPrice+"</a>");

                if(data.info.isPromotion==0){
                    $("#discount_type").html("");
                    $("#discount_time").html("");
                }else if(data.info.isPromotion==1){
                    $("#discount_type").html(data.info.tag.promotionName);

                    $("#timebox").val(parseInt((new Date(data.info.tag.endTime)).getTime()/1000));//将返回时间转成时间戳

                    $("#discount_time").html("<p>距离恢复原价：<span id='time_new'></span></p>");
                    discut_Countdown();
                }
                if(data.info.recommendComment!=null){
                    $(".RecommendComment_Logo").attr("src",data.info.recommendComment.userIcon);
                    $(".RecommendComment_Name").html(data.info.recommendComment.userNickname);
                    $(".RecommendComment_cotent").html(data.info.recommendComment.commentContent);

                    $(".RecommendComment_time").html(data.info.recommendComment.createTime);
                    $(".RecommendComment_color").html(data.info.recommendComment.productSpecification);
                }else if(data.info.recommendComment==null){
                    $("#gods_discuss ul").html("<li>暂无评论</li>")
                }

                $("#commentCount").html(data.info.commentCount);

                $(".flexslider .slides img").css("height",$(".flexslider .slides img").css("width"));
                /*$("body").attr("brandId",data.info.brandId);*/

            }else{
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试")
        }
    });
}
function set_Swiper(){
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'horizontal',
        loop: true,
        // 如果需要分页器
        pagination: '.swiper-pagination',
        paginationClickable :true
        // 如果需要前进后退按钮
        /*nextButton: '.swiper-button-next',
         prevButton: '.swiper-button-prev',*/

        // 如果需要滚动条
        /*scrollbar: '.swiper-scrollbar',*/
    })
}
function RunImg() {
    $(".flexslider").flexslider({
        touch: true,//是否支持触屏滑动
        animation: "slide",
        direction:"horizontal",
        slideDirection: "horizontal",
        easing:"linear",
        pauseOnHover:true,
        slideshowSpeed: 5000, //展示时间间隔ms
        animationDuration:400,
        animationSpeed: 500//滚动时间ms
    });
}
/*flexslider调用*/

//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]); return null;

}

function NavClick(){
    $("header ul li").click(function(){
        var $getindex=$(this).index();
        $("header~div").eq($getindex).css("display","block").siblings().css("display","none");
        if(i==1){
            Add_page("#gods_details",location)
        }else if(i==2){
            Add_page("#gods_details",location)
        }
    })
}

$("header ul li").click(function(){
    var $getindex=$(this).index();
    $("header~div").eq($getindex).css("display","block").siblings().css("display","none");
    $("header").css("display","block");
    if($getindex==0){
        $("#testApp").css("display","block");
    }
    if($getindex==1){
        postInm("#gods_details",{productId:$("body").attr("productId"),type:0});
    }else if($getindex==2){
        postInm("#after_sale",{productId:$("body").attr("productId"),type:1});
    }
});

function postInm(obj,datajson){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/product/queryProductDetails",
        data:datajson,
        dataType:'json',
        beforeSend:function(){
            $(obj).children().remove();
        },success:function(data){
            if(data.code==1){
                $(obj).append(data.info);
            }else{
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试")
        }
    });
}


function Gods_relation(RelatGodsData){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/productRelatedGoodsController/queryRelatedGoods",
        data:RelatGodsData,
        dataType:"json",
        beforeSend:function(){
            $("#relate_gods").children("ul").remove();
        },
        success:function(data){
            if(data.code==1){
                var html="";
                if(data.info.isDiscount==1){
                    for(var i=0;i<data.info.length;i++){
                        html+="<ul productId="+data.info[i].productId+"  "+"brandId="+data.info[i].brandId+"><li>" +
                            "<img src="+data.info[i].path+" /></li>" +
                            "<li>"+data.info[i].brandName+"</li>" +
                            "<li>"+data.info[i].productName+"</li>"+
                            "<li>" +
                            "<span>￥"+data.info[i].discountPrice+"<span>" +
                            "<del>￥"+data.info[i].costPrice+"</del>" +
                            "</li></ul>"
                    }
                }else{
                    for(var i=0;i<data.info.length;i++){
                        html+="<ul productId="+data.info[i].productId+"  "+"brandId="+data.info[i].brandId+"><li>" +
                            "<img src="+data.info[i].path+" /></li>" +
                            "<li>"+data.info[i].brandName+"</li>" +
                            "<li>"+data.info[i].productName+"</li>"+
                            "<li>" +
                            "<span>￥"+data.info[i].costPrice+"<span>" +
                            "</li></ul>"
                    }
                }

                $("#relate_gods").append(html);
                ClickRelact();
            }else{
                alert(data.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试")
        }
    })
}


function ClickRelact(){
    $("#relate_gods ul").click(function(){
        /*var $getbrandId=$(this).attr("brandId");*/
        var $getproductId=$(this).attr("productId");
        /*$("body").attr("brandId",$getbrandId);*/
        $("body").attr("productId",$getproductId);
        Ajax_detail({productId:$getproductId});
        Gods_relation({productId:$getproductId,pageIndex:1});
    })
}

function get_Inms(productId){
    Gods_relation({productId:productId,pageIndex:1});
    Ajax_detail({productId:productId});
}

/*function testApp(url) {
 if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
 window.location.href ="syj://m.875.cn/home/project?projectId=9820";
 }else{
 var timeout, t = 1000, hasApp = true;
 setTimeout(function () {
 if (hasApp) {
 alert('正在打开APP');
 if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
 window.location.href ="syj://m.875.cn/home/project?projectId=9820";
 }
 } else {
 alert('未安装app');
 }
 document.body.removeChild(ifr);
 }, 2000);

 var t1 = Date.now();
 var ifr = document.createElement("iframe");
 ifr.setAttribute('src', url);
 ifr.setAttribute('style', 'display:none');
 document.body.appendChild(ifr);
 timeout = setTimeout(function () {
 var t2 = Date.now();
 if (!t1 || t2 - t1 < t + 100) {
 hasApp = false;
 }
 }, t);
 }
 }*/

function turnApp(){
    if (navigator.userAgent.match(/android/i)) {
        // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为
        // 否则打开a标签的href链接
        var isInstalled;

        //下面是安卓端APP接口调用的地址，自己根据情况去修改

        /*var ifrSrc = 'cartooncomicsshowtwo://platformapi/startApp? type=0&id=${com.id}&phone_num=${com.phone_num}';*/
        var ifrSrc = "essential://com.yishanxiu.yishang";

        var ifr = document.createElement('iframe');

        ifr.src = ifrSrc;

        ifr.style.display = 'none';

        ifr.onload = function() {

            // alert('Is installed.');

            isInstalled = true;

            alert(isInstalled);

            document.getElementById('run_app').click();
        };

        ifr.onerror = function() {

            // alert('May be not installed.');

            isInstalled = false;

            alert(isInstalled);

        };

        document.body.appendChild(ifr);

        setTimeout(function() {

            document.body.removeChild(ifr);

        },1000);

    }

//ios判断
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))  {


        //window.location.href="essential://com.yishanxiu.yishang";
        //Animation://com.yz.animation

        var isInstalled;


        //var gz = '{"comName":"${com.short_name}","comID":"${com.id}","comPhoneNum":"${com.phone_num}","type":"0"}';

        //var jsongz =JSON.parse(gz);

        //下面是IOS调用的地址，自己根据情况去修改

        /*var ifrSrc = 'Animation://?comName=${com.short_name}&comID=${com.id}&comPhoneNum=${com.phone_num}&type=0';*/
        var ifrSrc = "essential://com.yishanxiu.yishang";

        location.href = 'essential://com.yishanxiu.yishang';
        setTimeout(function() {
            location.href = 'itms-apps://itunes.apple.com/app/id1142094811';
            setTimeout(function() {
                history.back()
            }, 2000);
        }, 1500);
        setTimeout(function() {
            location.reload();
        }, 3500);

        /*var ifr = document.createElement('iframe');

         ifr.src = ifrSrc;

         ifr.style.display = 'none';


         ifr.onload = function() {

         // alert('Is installed.');

         isInstalled = true;

         window.location.href="essential://com.yishanxiu.yishang";

         //document.getElementById('run_app').click();
         };

         ifr.onerror = function() {

         // alert('May be not installed.');
         isInstalled = false;

         window.location.href="download.html";

         };

         document.body.appendChild(ifr);

         setTimeout(function() {

         document.body.removeChild(ifr);

         },1000);*/

    }

}

window.onload=function(){

    if(isWeiXin()){
        $("#run_app").bind("click",function(){
            $("#run_app").attr("href","");
            alert("为了您拥有更好的使用体验，请在浏览器中打开并下载APP")
        });
        $("#top_cancle").click(function(){
            $("#top_cancle").parent().fadeOut("slow");
        });

        $(".head_introduction").on("click",".gods_slet",function(){
            $("#run_app").trigger("click");
        }).on("click",".look_all_discuss",function(){
            $("#run_app").trigger("click");
        }).on("click",".footer",function(){
            $("#run_app").trigger("click");
        });

        $(".head_introduction").on("click",".more_msg",function(){
            $("#run_app").trigger("click");
        }).on("click",".attention",function(){
            $("#run_app").trigger("click");
        })
    }else{
        $("#run_app").bind("click",function(){
            if (navigator.userAgent.match(/android/i)) {
                $("#run_app").attr("href","../../pages/busi_platform/business/sharepages/download.html");
            }
            turnApp();
        });
        $("#top_cancle").click(function(){
            $("#top_cancle").parent().fadeOut("slow");
        });

        $("#Gods_index").on("click",".gods_slet",function(){
            $("#run_app").trigger("click");
        }).on("click",".look_all_discuss",function(){
            $("#run_app").trigger("click");
        }).on("click",".footer",function(){
            $("#run_app").trigger("click");
        });

        $(".head_introduction").on("click",".more_msg",function(){
            $("#run_app").trigger("click");
        }).on("click",".attention",function(){
            $("#run_app").trigger("click");
        })
    }
    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        }
        else{
            return false;
        }
    }
};

/*
 $("#run_app").bind("click",function(){
 turnApp();
 testApp("QQ41DA13D1://");
 });
 */

function discut_Countdown(){
    var tid = setInterval(function () {
        var oTimebox = $("#timebox");
        var syTime = oTimebox.val();
        var localTime=parseInt(new Date().getTime()/1000);
        var totalSec = syTime-localTime;
        if (totalSec >= 0) {
            $("#time_new").text(getNewSyTime(totalSec));
        } else {
            clearInterval(tid);
        }

    }, 1000);

    //根据剩余时间字符串计算出总秒数
    /*function getTotalSecond(timestr) {
     var reg = /\d+/g;
     var r;
     console.log("111"+timestr);
     console.log("-----111-----")
     var timenums = new Array();
     while ((r = reg.exec(timestr)) != null) {
     timenums.push(parseInt(r));
     console.log("-----"+r+"-----")
     console.log("-----111-----")
     }
     var second = 0, i = 0;
     console.log("-----"+second+"-----");
     if (timenums.length == 4) {
     second += timenums[0] * 24 * 3600;
     i = 1;
     console.log("---内--"+timenums+"-----");
     }
     console.log("-----"+timenums+"-----");
     second += timenums[i]*3600 + timenums[++i]* 60 + timenums[++i];
     console.log(second);
     console.log("2222"+timestr);
     return second;
     }*/

    //根据剩余秒数生成时间格式
    function getNewSyTime(sec) {
        var s = sec % 60;
        sec = (sec - s) / 60; //min
        var m = sec % 60;
        sec = (sec - m) / 60; //hour
        var h = sec % 24;
        var d = (sec - h) / 24;//day
        var syTimeStr = "";
        if (d > 0) {
            syTimeStr += d.toString() + "天";
        }

        syTimeStr += ("0" + h.toString()).substr(-2) + "时"
            + ("0" + m.toString()).substr(-2) + "分"
            + ("0" + s.toString()).substr(-2) + "秒";

        return syTimeStr;
    }
}


/*商品详情的点击事件挑战到app*/



$(document).on('click','.single_good',function (){
    var productid = $(this).attr('productid');
    LinkApp(productid)
})

function LinkApp(productId){

    window.location.href = BUSINESS_URL_PRE+'/pages/busi_platform/business/sharepages/gods_detail.html?productId='+productId;
}