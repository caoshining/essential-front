var selGodNam;
var categoryId;
var selClasNam;
var productTypeId;
var selBrands;
var endLiIndex = 1;
/*var stepNum=0;*/
function selectGoods(){
	var $getlis=$('.PostTd_cont ul li');
	$getlis.bind('click',function(){
		$(this).siblings().children('a').css('color','black');
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		$(this).children('a').css('color','red');
		selGodNam=$(this).text();
		categoryId=$(this).attr("data-categoryId");
	})
}
/*选择品类并获取其值*/
function selectClass(){
	var $getlis=$('.PostTd_cont ul li');
	$getlis.bind('click',function(){
		$(this).siblings().children('a').css('color','black')
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		$(this).children('a').css('color','red');
		selClasNam=$(this).text();
		productTypeId=$(this).attr("data-productTypeId");
	})
}
/*选择分类并获取其值*/

function selBrand(){
	var $getlis=$('.PostTd_cont ul li');
	$getlis.bind('click',function(){
		$(this).siblings().children('a').css('color','black');
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
		$(this).children('a').css('color','red');
		selBrands=$(this).text();
		productTypeId=$(this).attr("data-productTypeId");
	})
}
/*选择分类并获取其值*/

function addGoods(){
	$.ajax({
		type:'post',
		url:BUSINESS_URL_PRE+"/essential/productCategory/query",
		data:'',
		dataType:'json',
		beforeSend:function(){
			$("#Select_pin").remove();
			$('.PostTd_cont').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
		},
		success:function(data){
			if (data.code==1){
				$('.PostTd_cont').find(".Img_Load").remove();
				var html='<div id="Select_pin" class="tab-pane"><ul>';
				for(var i=0;i<data.info.length;i++){
					if(data.info[i]!=null) {
						html += "<li data-categoryId='" + data.info[i].categoryId + "'><a href='javascript:void(0)'>" + data.info[i].categoryName + "</a></li>";
					}
				}
				html+='</ul></div>' ;
				$('.PostTd_cont').append(html);
				$("#Select_pin").addClass("active");
				selectGoods();
			}else{
				alert(data.msg);

				$(".goods_btn a").one("click",function(){
					addGoods();
				});

			}

		},error:function(){
			$(".goods_btn a").one("click",function(){
				addGoods();
			});
		}
	})
}

/*选择品类增添*/

$(".goods_btn a").bind("click",function(){
	$(".PostTd_cont").html("");
	endLiIndex=1;
	PostTrd_nav(0);

	$('.PostTd_nextBtn1').html("下一步");
	$(".PostTd_nextBtn div a:not('.PostTd_nextBtn1')").css("visibility","hidden");
	addGoods();

	$("#onsale_goods").html("");
	$("#havesale_goods").html("");
	$("#onhome_goods").html("");
});

/*发布商品按钮*/

function addSelclass(){
	$.ajax({
		type:'post',
		url:BUSINESS_URL_PRE+"/essential/productType/query",
		data:"categoryId="+categoryId,
		dataType:'json',
		beforeSend:function(){
			$("#Select_class").remove();
			$('.PostTd_cont').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
		},
		success:function(data){
			if (data.code==1){
				$('.PostTd_cont').find(".Img_Load").remove();
				var html='<div id="Select_class" class="tab-pane"><ul>';
				for(var i=0;i<data.info.length;i++){
					if(data.info[i]!=null) {
						html += "<li data-productTypeId='" + data.info[i].productTypeId + "'><a href='javascript:void(0)'>" + data.info[i].productypeName + "</a></li>";
					}
				}
				html+='</ul></div>';
				$('.PostTd_cont').append(html);
				$("#Select_class").addClass("active");
				selectClass();
			}else{
				alert(data.msg)
			}

		}
	})
}

/*选择分类增添*/

function addBrand(){
	$.ajax({
		type:'post',
		url:BUSINESS_URL_PRE+"/essential/bussinessBrand/queryShopIdCategoryId",
		data:{shopId:BUSINESS_LOGIN_SHOP_ID,categoryId:$("#Select_pin ul li.active").attr("data-categoryid")},
		dataType:'json',
		beforeSend:function(){
			$("#Select_brand").remove();
			$('.PostTd_cont').append("<img class='Img_Load' src='assets/css/images/loading.gif'>");
		},
		success:function(data){
			if (data.code==1){
				$('.PostTd_cont').find(".Img_Load").remove();
				var html='<div id="Select_brand" class="tab-pane"><ul>';
				for(var i=0;i<data.info.length;i++){
					if(data.info[i]!=null){
						html+="<li data-brand_id='"+data.info[i].brand_id+"'><a href='javascript:void(0)'>"+data.info[i].brand_name+"</a></li>" ;
					}
				}
				html+='</ul></div>' ;
				$('.PostTd_cont').append(html);
				$("#Select_brand").addClass("active");
				selBrand();
			}else{
				alert(data.code)
			}

		}
	})
}

/*选择品牌增添*/

function addMake_Infrm(){
	var $PostTd_cont =$('.PostTd_cont');
		$.ajax({
			type:"get",
			url:"pages/busi_platform/business/product/MakeBasicInfm.html",
			async:true,
			dataType:"html",
			beforeSend:function(){
				$("#make_basic").remove();
			},
			success:function(msg){
				$PostTd_cont.append(msg);
				setInterval(rePlaceTill(),500);
			}
		});
		/*$(".PostTd_cont").load("MakeBasicInfm.html");*/
}
/*编辑基本信息增添*/

function rePlaceTill(){
	var $getTitles=$('#make_basic .Basic_title span');
	$getTitles.eq(0).html($("#Select_pin").find(".active").children().html());
	$getTitles.eq(1).html($("#Select_class").find(".active").children().html());
	$getTitles.eq(2).html($("#Select_brand").find(".active").children().html());
}

function PostTrd_nav(i){
	var  $navlis=$('.PostTd_nav>ul>li');
	$navlis.eq(i).addClass('active').siblings().removeClass('active');
}
function removeActive(aa){
	$(aa).removeClass('active');
}
/*移除active*/

$(".PostTd_nextBtn1").click(function(){
	PostTd_nextBtn($("#product_head li.active").attr("data-id"));
});
function PostTd_nextBtn(pageIndex){
	console.log(pageIndex)

	/*Btoom_Btn(pageIndex);*/
	switch (parseInt(pageIndex)){
		case 1:
			if(selGodNam != undefined){
				if(!endLiIndex || endLiIndex < 2){
					endLiIndex = 2;
				}
				console.log(endLiIndex);
				removeActive('#Select_pin');
				addSelclass();
				PostTrd_nav(1);
				$(".btn-step-five").css("visibility","hidden");
				/*$("#Index_PostTd").click(function(){
					refresh();
				})*/
				$('.PostTd_nextBtn1').html("下一步");
			}
		break;
		case 2:
			if(selClasNam != undefined){
				/*stepNum=2;*/
				if(!endLiIndex || endLiIndex < 3){
					endLiIndex = 3;
				}console.log(endLiIndex);
				removeActive('#Select_class');
				addBrand();
				PostTrd_nav(2);
				$(".btn-step-five").css("visibility","hidden");
				$('.PostTd_nextBtn1').html("下一步");
			}
		break;
		case 3:
			if(selBrands != undefined){
				/*stepNum=3;*/
				if(!endLiIndex || endLiIndex < 4){
					endLiIndex = 4;
				}console.log(endLiIndex);
				removeActive('#Select_brand');
				addMake_Infrm();
				PostTrd_nav(3);
				$(".btn-step-five").css("visibility","hidden");
				$('.PostTd_nextBtn1').html("下一步");
			}
		break;
		case 4:
			if (selBrands != undefined){
				/*stepNum=4;*/
				if(!endLiIndex || endLiIndex < 5){
					endLiIndex = 5;
				}console.log(endLiIndex);
				removeActive('#make_basic');
				addMake_gods();
				PostTrd_nav(4);
				console.log(dataList);
				$('.PostTd_nextBtn1').html("保存至仓库");
			}
		break;
		case 5:
			if(selBrands != undefined){
				save_Gods();
			}
		break;
	}

}

/*function Post_Nav(aa){
	var $getPostNav=$('.PostTd_nav ul li');
	for(var i=0;i<aa;i++){
		$getPostNav.eq(i).on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			console.log('i'+i);
			console.log($(this))
		})
	}
	console.log('stepNum'+stepNum);
}*/


function addMake_gods(){
	var $PostTd_cont =$('.PostTd_cont');
	if($("#make_gods").is("div")==false){
		$.ajax({
			type:"get",
			url:"pages/busi_platform/business/product/Edit_commodity.html",
			async:true,
			beforeSend:function(){
				$("#make_gods").remove();
			},
			success:function(msg){
				$PostTd_cont.append(msg);
				//rePlaceTill();
				//MoniClick();
				$(".btn-step-five").css("visibility","visible");
				console.log("是否存在"+$("#make_gods").is("div"));
			}
		});
	}else if($("#make_gods").is("div")==true){
		$(".btn-step-five").css("visibility","visible");
		$("#make_gods").addClass("active").siblings().removeClass("active");
		console.log("是否存在"+$("#make_gods").is("div"))
	}

}
/*beforeSend:function(){
 $PostTd_cont.children('#make_gods').remove();
 //$body.css("background","url(img/1.jpg)");
 },*/
//未发送成功时显示的效果
/*编辑商品详情页添加*/


function Btoom_Btn(res){
	if(res!=4){
		$(".btn-step-five").css("visibility","hidden");
	}else{
		$(".btn-step-five").css("visibility","visible");
	}
}
Btoom_Btn(0);
/*下方按钮显隐*/



function MoniClick(){
	$('.PostTd_nav ul li').eq(4).click(function(){
		$("#make_gods").siblings().removeClass("active");
		$("#make_gods").addClass("active");
		$(".PostTd_nextBtn div a:not('.PostTd_nextBtn1')").css("visibility","visible");
		$('.PostTd_nextBtn1').html("保存至仓库");
	});
	$('.PostTd_nav ul li').not($('.PostTd_nav ul li').eq(4)).click(function(){
		/*$(this).index();console.log($(this).index());
		 stepNum=$(this).index()*/
		var $index=$(this).index();
		$('.PostTd_nextBtn1').attr("href","###");
		$('.PostTd_nextBtn1').html("下一步");
		$('.PostTd_nextBtn1').click(function(){
			$('.PostTd_nav ul li').eq(4).trigger('click');
			$('.PostTd_nextBtn1').attr("onclick","PostTd_nextBtn()");
			$(".PostTd_nextBtn div a").css("display","inline-block");
		});
		$(".PostTd_nextBtn div a:not('.PostTd_nextBtn1')").css("visibility","hidden");
		$('.PostTd_nav ul li').eq(4).click(function(){
			$('.PostTd_nextBtn1').attr("onclick","PostTd_nextBtn()");
			$(".PostTd_nextBtn div a").css("display","inline-block");
		})
	});
	$(".PostTd_nextBtn div a[data-btn='pre_step']").click(function(){
		$('.PostTd_nextBtn1').attr("href","###");
		$('.PostTd_nextBtn1').click(function(){
			$('.PostTd_nav ul li').eq(4).trigger('click');
			$('.PostTd_nextBtn1').attr("onclick","PostTd_nextBtn()");
			$(".PostTd_nextBtn div a").css("display","inline-block");
		});
		$(".PostTd_nextBtn div a:not('.PostTd_nextBtn1')").css("visibility","hidden");
		$('.PostTd_nav ul li').eq(3).trigger('click');
	});


}
/*编辑商品详情---上一步按钮*/

function getSkuVal(){
	var $getTr=$(".ProducStock table tbody tr");
	var tempJson1 = {};
	for(var i=0;i<$getTr.size();i++){
		var keyHead = "productSkuAutoList["+i+"].";
		var keyId1="productSkuAutoList["+i+"].articleNumber";
		var keyId2="productSkuAutoList["+i+"].prices";
		var keyId3="productSkuAutoList["+i+"].productskuCount";
		tempJson1[keyId1]=$(".ProducStock table tbody tr").eq(i).find("input[name='GodCode']").val();
		tempJson1[keyId2]=$(".ProducStock table tbody tr").eq(i).find("input[name='pice']").val();
		tempJson1[keyId3]=$(".ProducStock table tbody tr").eq(i).find("input[name='repertory']").val();
		$.each(dataList[i], function(i1,v1){
			var skuKey = keyHead+i1;
			tempJson1[skuKey] = v1;
		});

		//BigList.push(tempJson1);
	}
	//for(var j=0;j<BigList.length;j++){
	//	var productSkuRelationList="productSkuRelationList";
	//	BigList[j][productSkuRelationList]=dataList[j];
	//}
	console.log(tempJson1);
	return tempJson1;
}

function PutSaveAway(params) {
	$.ajax({
		type: 'post',
		url: BUSINESS_URL_PRE + "/essential/product/addReleaseCommodity",
		data: params,
		dataType: 'json',
		success: function (data) {
			console.log(data);
			if (data.code == 1) {
				alert(data.msg);
				$("#myTabI-1 li a[href='#onhome_goods']").trigger("click");
				/*$("#Index_PostTd").trigger("click");点击成功后 回调一个点击事件 再次发布商品*/
			}else{
				alert(data.msg)
			}
		},
		error: function () {
			alert("网络有问题，请刷新重试");
			window.location.href = window.location.href;
		}
	})
}

function PutAway(params) {
	$.ajax({
		type: 'post',
		url: BUSINESS_URL_PRE + "/essential/product/addReleaseCommodity",
		data: params,
		dataType: 'json',
		success: function (data) {
			console.log(data);
			if (data.code == 1) {
				alert(data.msg);

				$("#myTabI-1 li a[href='#onsale_goods']").trigger("click");

				/*$("#Index_PostTd").trigger("click");点击成功后 回调一个点击事件 再次发布商品*/
			}else{
				alert(data.msg);
			}
		},
		error: function () {
			alert("网络有问题，请刷新重试");
			window.location.href = window.location.href;
		}
	})
}
function refresh(){
	window.location.reload();//刷新当前页面.

	//或者下方刷新方法
	//parent.location.reload()刷新父亲对象（用于框架）--需在iframe框架内使用
	 //opener.location.reload()刷新父窗口对象（用于单开窗口
	//top.location.reload()刷新最顶端对象（用于多开窗口）

}
//编辑商品详情

function ClickId_onhomeGods(){
	$("#myTabI-1").find("a[href='#onhome_goods']").click(function(){
		$(".PostTd_cont").html("");
		$("#onhome_goods").load("pages/busi_platform/business/product/onsave_goods.html",function(){
			$(document).ready(function(){
				Add_Onsave_Selt();
			});
			function Add_Onsave_Selt(){
				$.ajax({
					type:'post',
					url:BUSINESS_URL_PRE+"/essential/productCategory/query",
					data:'',
					dataType:'json',
					success:function(data){
						if(data.code==1){
							var html;
							for(var i=0;i<data.info.length;i++){
								html+="<option data-categoryId='"+data.info[i].categoryId+"'>"+data.info[i].categoryName+"</option>" ;
							}
							$('#Onsave_Selt').append(html);
							selectGoods();
						}else{
							alert(data.msg);
						}
					}
				})
			}
		});
		//$("#myTabI-1").find("a[href='#onhome_goods']").unbind("click");
	})
}
ClickId_onhomeGods();

//添加仓库中的商品页面并对其进行点击事件解绑

function add_Onsalepage(){
	$("#myTabI-1").find("a[href='#onsale_goods']").click(function(){
		$(".PostTd_cont").html("");
		$("#onsale_goods").addClass("active").siblings().removeClass("active");
		$("#onsale_goods").load("pages/busi_platform/business/product/onsale_goods.html",function(){
			$(document).ready(function(){
				Add_Onsave_Selt();
			});
			function Add_Onsave_Selt(){
				$.ajax({
					type:'post',
					url:BUSINESS_URL_PRE+"/essential/productCategory/query",
					data:'',
					dataType:'json',
					success:function(data){
						if(data.code==1){
							var html;
							for(var i=0;i<data.info.length;i++){
								html+="<option data-categoryId='"+data.info[i].categoryId+"'>"+data.info[i].categoryName+"</option>" ;
							}
							$('#Onsave_Selt').append(html);
							selectGoods();
						}else{
							alert(data.msg);
						}
					}
				})
			}
		});
		//$("#myTabI-1").find("a[href='#onhome_goods']").unbind("click");
	});
	$("a[href='#Goods']").click(function(){
		$("#myTabI-1").find("a[href='#onsale_goods']").trigger("click");
	})
}
add_Onsalepage();
//点击出售中的商品进行页面的添加


function add_Onselloutpage(){
	$("#myTabI-1").find("a[href='#havesale_goods']").click(function(){
		$(".PostTd_cont").html("");
		$("#havesale_goods").load("pages/busi_platform/business/product/onsellout_goods.html",function(){
			$(document).ready(function(){
				Add_Onsave_Selt();

			});
			function Add_Onsave_Selt(){
				$.ajax({
					type:'post',
					url:BUSINESS_URL_PRE+"/essential/productCategory/query",
					data:'',
					dataType:'json',
					success:function(data){
						if (data.code==1){
							var html;
							for(var i=0;i<data.info.length;i++){
								html+="<option data-categoryId='"+data.info[i].categoryId+"'>"+data.info[i].categoryName+"</option>" ;
							}
							$('#Onsave_Selt').append(html);
							selectGoods();
						}else {
							alert(data.msg);
						}
					}
				})
			}
		});
		//$("#myTabI-1").find("a[href='#onhome_goods']").unbind("click");
	})
}
add_Onselloutpage();
//点击已售完的商品进行页面的添加


/*订单管理-所有订单页面添加*/
function orderDetails(){

	$("#myTab_orders").find("a[href='#Orders']").click(function(){
		$("#Orders").load("pages/busi_platform/business/order/order.html");
		$("#Indent .tab-pane").removeClass('active');
		$("#Orders").addClass('active');
	});

	$("a[href='#Indent']").click(function(){
		$("#Orders").load("pages/busi_platform/business/order/order.html");
		$("#Indent .tab-pane").removeClass('active');

		$("#Orders").addClass('active');
	});
}
orderDetails();
/*订单管理-所有订单页面添加*/

window.onload=function(){
	Add_Shop();
	addShopPage();
};
function addShopPage(){
	if($("#Shop").hasClass("active")==true){
		$("#merchantHomePage").load("pages/busi_platform/business/product/merchantHomePage.html");
	}else{
		$("#navbar-container a[href='#Shop']").click(function(){
			$("#merchantHomePage").load("pages/busi_platform/business/product/merchantHomePage.html");
		})
	}
}
/*店铺页面加载*/

function Refund_orders(){
	$("#myTab_orders").find("a[href='#Refund_orders']").click(function(){
		$("#Refund_orders").load("pages/busi_platform/business/order/Refund_order.html");
	});
}
Refund_orders();
/*增添退款订单*/
function Refund_Goods(){
	$("#myTab_orders").find("a[href='#Refund_Goods']").click(function() {
		$("#Refund_Goods").load("pages/busi_platform/business/order/Refund_goods.html");
	});
}
Refund_Goods();
/*增添退货订单*/

function Add_Market(){
	$("a[href='#ApplyMarket']").click(function(){
		$("#discount_limit").load("pages/busi_platform/business/product/discount_limit.html");
		$("#discount_limit").addClass('active').siblings().removeClass('active');
	});
	$("a[href='#freight_set']").click(function(){
		$("#freight_set").load("pages/busi_platform/business/product/freight_set.html");
		$("#freight_set").addClass('active').siblings().removeClass('active');
	})
}
Add_Market();
/*增加应用和营销*/

$(document).on('click',"#product_head ul li",function(e){
	e.stopImmediatePropagation();

	if($(this).attr("data-id") > endLiIndex){
		return  false;
	}
	$(this).children("a").tab("show");

	if($(this).index()==4){
		$('.PostTd_nextBtn1').html("保存至仓库");
		$(".PostTd_nextBtn div a:not('.PostTd_nextBtn1')").css("visibility","visible");
	}else {
		$('.PostTd_nextBtn1').html("下一步");
		$(".PostTd_nextBtn div a:not('.PostTd_nextBtn1')").css("visibility","hidden");
	}
});

//加载品牌界面
function MyBrand(){
	$("a[href='#MyBorand']").click(function(e){
		e.stopImmediatePropagation();
		$("#MyBorand").load("pages/busi_platform/business/product/MyBrand.html");
		$("#MyBorand").addClass("active").siblings().removeClass("active");
	})
}
MyBrand();

function Add_Shop(){
	$("a[href='#Shop_set']").click(function(e){
		e.stopImmediatePropagation();
		$("#Shop_Right").load("pages/busi_platform/business/product/Shop_right.html");
		$("#Shop_set").addClass("active").siblings().removeClass("active");
	});
}
Add_Shop();
/*店铺页面加载*/

//设置事件
function shop_Set(){
	$(".index_set").hover(function(){
		$(".index_set_cont").fadeToggle();
	},function(){
		$(".index_set_cont").fadeToggle();
	})
}
shop_Set();
function BrandApply(){
	$("a[href='#Brand_Apply']").click(function(e){
		e.stopImmediatePropagation();
		$("#Brand_Apply").load("pages/busi_platform/business/product/BrandApply.html");
		$("#Brand_Apply").addClass("active").siblings().removeClass("active");
	})
}
BrandApply();

function Discuss_control(){
	$("a[href='#Evaluation_Manage']").click(function(e){
		e.stopImmediatePropagation();
		$("#Evaluation_Manage").load("pages/busi_platform/business/order/discuss_control.html");
		$("#Evaluation_Manage").addClass("active").siblings().removeClass("active");
	});
	$("a[href='#Secut_logout']").click(function(){
		window.location.href = BUSINESS_URL_PRE;
	});
	$("a[href='#single_set']").click(function(e){
		e.stopImmediatePropagation();
		$("#single_set>div.index_layout").load("pages/busi_platform/business/product/single_set.html");
		$("#single_set").addClass("active").siblings().removeClass("active");
	})
}
Discuss_control();
/*商家评价管理 安全退出 个人设置*/