var PAGE_COUNT=10;
var BUSINESS_LOGIN_USER_ID="-100";
var BUSINESS_LOGIN_SHOP_ID='-100';
var UEDITOR_URL_PRE = BUSINESS_URL_PRE;

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
//BUSINESS_LOGIN_USER_ID =sessionStorage.getItem('EssentialUserId');
BUSINESS_LOGIN_USER_ID="-100";
//var BUSINESS_LOGIN_USER_NAME = 1;


if(BUSINESS_URL_PRE.indexOf(":",5,BUSINESS_URL_PRE.length)!=-1){

    $.ajaxSetup({

        contentType:"application/x-www-form-urlencoded;charset=utf-8",

        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,


        complete:function(XMLHttpRequest,textStatus){
            //通过XMLHttpRequest取得响应头，sessionstatus

            var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");

            /*console.log(sessionstatus);
            console.log(textStatus);*/
            if(sessionstatus=="timeout"){
                window.location.href="merchantsLoginUser.html";
            }

        }

    });
}else{
    $.ajaxSetup({

        contentType:"application/x-www-form-urlencoded;charset=utf-8",

        complete:function(XMLHttpRequest,textStatus){
            //通过XMLHttpRequest取得响应头，sessionstatus

            var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus");

            /*console.log(sessionstatus);
            console.log(textStatus);*/
            if(sessionstatus=="timeout"){
               window.location.href="merchantsLoginUser.html";
            }

        }
    });
}

