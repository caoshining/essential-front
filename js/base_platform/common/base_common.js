var PLATFORM_LOGIN_USER_ID ;
var PAGE_COUNT=10;
var UEDITOR_URL_PRE = PLATFORM_URL_PRE;

function GetQueryString(name) {

    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    var r = window.location.search.substr(1).match(reg);

    if (r != null) {
        return unescape(r[2]);
    }else{
        return null;
    }
}
PLATFORM_LOGIN_USER_ID ="-100";

/*var Session;
window.Session = Session = {};

    /!**
     * 设置全局session,提供给原生调用
     * @param {json} session
     *!/
    var setSession = function (session) {
        //var object = JSON.parse(session);
        Session = session;
    };*/


if(PLATFORM_URL_PRE.indexOf(":",5,PLATFORM_URL_PRE.length)!=-1){
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
                window.location.href="backgroundLoginUser.html";
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
                window.location.href="backgroundLoginUser.html";
            }

        }

    });
}

