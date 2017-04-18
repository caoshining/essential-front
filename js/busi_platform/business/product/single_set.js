/**
 * Created by Morgan on 2016/8/22.
 */
function click_choice(){
    $(".set_index_action").on("click","#Set_modificationCode",function(){
        $(".set_changecode").css("display","block").siblings("div").css("display","none");
        $("#set_changecode_step1").css("display","block");
        $(".set_getAuthcode").click(getCode);

        $("#set_changecode_step1").on("click","#Set_change_next",function(){
            var getPhone=$("#set_changecode_phone1").val();
            var getcode=$("#set_changecode_code1").val();
            var that=$(this);
            if(getPhone==""){
                alert("手机号码不能为空")
            }else if(getcode==""){
                alert("手机验证码不能为空")
            }else if(getPhone!=""&&getPhone.length!=11){
                alert("手机号码应为11位")
            }else if(getcode!=""&&getcode.length!=6){
                alert("手机验证码应为6位")
            }else if(getPhone!=""&&getPhone.length==11&&getcode!=""&&getcode.length==6){
                var stadus= $("#set_changecode_step1 .set_getAuthcode").attr("data-stadus");
                check_code(that,getPhone,getcode,stadus);
            }
        });

    }).on("click","#Set_unwrapPhone",function(){
        $(".set_unwrap").css("display","block").siblings("div").css("display","none");
        $("#set_unwrap_step1").css("display","block");
        $(".set_getAuthcode").click(getCode);

        $("#set_unwrap_step1").on("click","#Set_unwrap_next",function(){
            var getPhone=$("#set_unwrap_phone1").val();
            var getcode=$("#set_unwrap_code").val();
            var that=$(this);
            if(getPhone==""){
                alert("手机号码不能为空")
            }else if(getcode==""){
                alert("手机验证码不能为空")
            }else if(getPhone!=""&&getPhone.length!=11){
                alert("手机号码应为11位")
            }else if(getcode!=""&&getcode.length!=6){
                alert("手机验证码应为6位")
            }else if(getPhone!=""&&getPhone.length==11&&getcode!=""&&getcode.length==6){
                var stadus= $("#set_unwrap_step1 .set_getAuthcode").attr("data-stadus");
                check_code(that,getPhone,getcode,stadus);
            }
        });
        $("#set_unwrap_step2").on("click","#Set_unwrap_right",function(){
            var getPhone=$("#set_unwrap_phone2").val();
            var getcode=$("#set_unwrap_code2").val();
            var that=$(this);
            if(getPhone==""){
                alert("手机号码不能为空")
            }else if(getcode==""){
                alert("手机验证码不能为空")
            }else if(getPhone!=""&&getPhone.length!=11){
                alert("手机号码应为11位")
            }else if(getcode!=""&&getcode.length!=6){
                alert("手机验证码应为6位")
            }else if(getPhone!=""&&getPhone.length==11&&getcode!=""&&getcode.length==6){
               var stadus= $("#set_unwrap_step2 .set_getAuthcode").attr("data-stadus");
                check_code(that,getPhone,getcode,stadus);
            }
        })
    })
}

function getCode(){
    if($(this).parent().parent().parent().attr("id")!="set_unwrap_step2"){
        $(this).attr("data-stadus","1")
    }else{
        $(this).attr("data-stadus","3")
    }
    var getPhoneNumber=$(this).parent().prev("label").find("input[type='tel']").val();
    if(getPhoneNumber!=""&&getPhoneNumber.length==11){
        var $that=$(this);
        getMessageCode($that,getPhoneNumber,$(this).attr("data-stadus"));
    }else{
        alert("手机号码不能为空且必须为11位");
    }
}

function getMessageCode(obj,phone,stadus){
        $.ajax({
            type:'post',
            url:BUSINESS_URL_PRE+"/essential/sms/sendSms",
            data:{
                userPhone:phone,
                userTypeId:1,
                serviceType:stadus
            },
            dataType:'json',
            success:function(res){
                if(res.code==1){
                    obj.unbind("click",getCode);
                    var i=60;
                    var time=setInterval(function(){
                        if(i>0){
                            i=i-1;
                            obj.text(i);
                        }else{
                            clearInterval(time);
                            obj.text("获取");
                            obj.bind("click",getCode);
                            obj.addClass("set_getAuthcode");
                        }
                    },1000)
                }else{
                    alert(res.msg)
                }
            },error:function(){
                alert("网络有问题，请刷新重试")
            }
        });
}

//验证码校验
function check_code(pointer,phone,code,stadus){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/sms/querySmsValidate",
        data:{
            userPhone:phone,
            userTypeId:1,
            serviceType:stadus,
            smsCode:code
        },
        dataType:'json',
        success:function(res){
            if(res.code==1){
                if(pointer.attr("id")=="Set_unwrap_next"){
                    pointer.parent().parent().parent().css("display","none").siblings("div").css("display","block");
                }else if(pointer.attr("id")=="Set_unwrap_right"){
                    change_phone_number(phone);
                }else if(pointer.attr("id")=="Set_change_next"){
                    pointer.parent().parent().parent().css("display","none").siblings("div").css("display","block");
                    $("#set_changecode_step2").on("click","#Set_changecode_right",function(){
                        var getPhone=$("#set_changecode_phone2").val();
                        var getOldpawsd=$("#set_old_pawsds").val();
                        var getnewpawsd1=$("#set_new_pawsds1").val();
                        var getnewpawsd2=$("#set_new_pawsds2").val();

                        if(getOldpawsd==""||getnewpawsd1==""||getnewpawsd2==""){
                            alert("密码不能为空")
                        }else if(getOldpawsd!=""&&getnewpawsd1!=""&&getnewpawsd1!=getnewpawsd2){
                            alert("两次密码不一致")
                        }else if(getOldpawsd!=""&&getnewpawsd1!=""&&getnewpawsd1==getnewpawsd2){
                            change_newcode(getPhone,getOldpawsd,getnewpawsd1)
                        }

                    })
                }
            }else{
                alert(res.msg)
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
        }
    })
}

function change_phone_number(phone){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/userLoginAndRegistration/unbundlePhone",
        data:{
            userId:BUSINESS_LOGIN_USER_ID,
            userName:phone
        },
        dataType:'json',
        success:function(res){
            if(res.code==1){
                alert(res.msg);
                $("a[href='#Shop']").trigger("click");
            }else{
                alert(res.msg);
            }
        },error:function(){
            alert("网络有问题，请刷新重试");
        }
    })
}

//密码修改
function change_newcode(phone,Oldpawsd,pawsd){
    $.ajax({
        type: 'post',
        url: BUSINESS_URL_PRE + "/essential/userLoginAndRegistration/updatePassword",
        data: {
            userId:BUSINESS_LOGIN_USER_ID,
            userName:phone,
            userOldPwd:Oldpawsd,
            userPwd:pawsd,
            userTypeId:1
        },
        dataType: 'json',
        success: function (res) {
            if(res.code==1){
                alert(res.msg);
                $("a[href='#Shop']").trigger("click");
            }else{
                alert(res.msg);
            }
        },error:function (){
            alert("网络有问题，请刷新重试")
        }
    })
}

//获取手机号
function getPhoneNumber(){
    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+"/essential/userLoginAndRegistration/queryPhoneNumber",
        data:{
            userId:BUSINESS_LOGIN_USER_ID
        },
        dataType:'json',
        success:function(res){
            if(res.code==1){
                $("#phone_number").text(res.info.userName);
                $("#set_changecode_phone1," +
                "#set_changecode_phone2,"+
                "#set_unwrap_phone1," +
                "#set_unwrap_phone").val(res.info.userName);
                //input赋电话号
                phoneNumber=res.info.userName;
            }else{
                alert(res.msg)
            }
        },error:function (){
            alert("网络有问题，请刷新重试")
        }
    })
}

$(document).ready(function(){
    var phoneNumber;
    getPhoneNumber();
    click_choice();
});



