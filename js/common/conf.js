//*************product env start*******************
/*var PLATFORM_URL_PRE = "http://p.essential01.com.cn";
var BUSINESS_URL_PRE = "http://b.essential01.com.cn";*/
//*************product env end*******************

//*************local env start**********************
var same_env_url_pre = "http://10.0.1.42:8080";
var PLATFORM_URL_PRE = same_env_url_pre;
var BUSINESS_URL_PRE = same_env_url_pre;
//*************local env end**********************


//回退键禁用
document.getElementsByTagName("body")[0].onkeydown =function(){
    if(event.keyCode==8){
        var elem = event.srcElement;
        var name = elem.nodeName;

        if(name!='INPUT' && name!='TEXTAREA'){
            event.returnValue = false ;
            return ;
        }
        var type_e = elem.type.toUpperCase();
        if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE'&& type_e!='TEL'&& type_e!='NUMBER')){
            event.returnValue = false ;
            return ;
        }
        if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){
            event.returnValue = false ;
            return ;
        }
    }
}
