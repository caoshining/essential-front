

/*得到富文本的内容*/
function  getContent() {
    var arr = [];
    arr.push(UE.getEditor('editor').getContent());
    return arr;
}
//得到发现富文本内容
function getDiscoveryInformation(productId,type)
{


    var dataJson=new Object();
    dataJson.productId=productId;
    dataJson.type=type;
    dataParameter= $.param(dataJson);

    var url=BUSINESS_URL_PRE+"/essential/product/queryProductDetails";
    var dataParameter;
    $.ajax({
        type:'post',
        url:url,
        dataType:'json',
        data:dataParameter,
        success:function(data)
        {

            console.info("成功");
            var json = eval(data);
            if(json.code==1) {

                console.info(json.info);
                //$("#richContent").append(unescape(json.info));
                $("#richContent").append(json.info);

            }


        }

    });
}
//得到地址栏的值
function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) return unescape(r[2]); return null;

}

/*function unescape(str) {
    var elem = document.createElement('div')
    elem.innerHTML = str
    return elem.innerText || elem.textContent
}*/