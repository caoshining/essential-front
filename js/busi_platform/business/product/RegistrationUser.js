/**
 * Created by Morgan on 2016/7/9.
 */
/*

/*错误提示*/
function  erroraction(str,top){
    $('.error').css('top',top);
    $('.error').show();

    $(".errorMessage").html(str);
}
/*把用户名存起来*/
var mer_username = '';


$('#UserName').focus();

function validateUserName(){
    var userName = $('#UserName').val();

    if(userName == ''){
        //alert('请输入手机号！');
        erroraction('请输入手机号','0px');
        $('#UserName').focus();
        return;
    }else if(userName.length !=11){

        erroraction('请输入正确的手机号','0px');
        $('#UserName').focus();
        return;
    }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(userName))){
        erroraction('请输入正确的手机号','0px');
        $('#UserName').focus();
        return;
    }
    else{


        $.ajax({
            type: 'post',
            url:BUSINESS_URL_PRE+'/essential/userLoginAndRegistration/chackUser',
            dataType: 'json',
            data:{
                userNumber:userName,
                userTypeId:1
            },
            success:function (res){
                if(res.code == 1){

                    erroraction(res.msg,'0px');
                    $('#UserName').focus();
                    return false;
                }else{
                    $('.error').hide();
                    $("#getMessage_code").unbind('click',getMessageCode);
                    $("#getMessage_code").bind('click',getMessageCode);
                    //erroraction("手机号可以注册",'0px');
                    $('#Captcha').focus();

                }
            }
        });

    }
}
$('#UserName').on('blur',function (){
    validateUserName()
})


//获取验证码

var smsCode = -1;
function  getMessageCode(){

    var username =$("#userName").val();

    $('#Captcha').focus();

    /*倒计时*/
    var T = 60;
    $("#getMessage_code").unbind('click',getMessageCode);
    var Timer = setInterval(function (){

        $('.getMessage_code').html(T);
        T--;
        if(T < 0){
            clearInterval(Timer);
            $('.getMessage_code').html('获取');
            $("#getMessage_code").bind('click',getMessageCode);
        }
    },1000);

    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/sms/sendSms',
        data:{
            userPhone:$('#UserName').val(),
            userTypeId:1,
            serviceType:0
        },
        dataType:'json',

        success:function(data){
           // console.log(data)

            if(data.code==1){
                smsCode = data.info.smsCode;
                $('#Captcha').focus();
            }
        },
        error:function (data){
            alert(data.msg);
        }
    });
};


/*校验验证码*/
function  validateCaptcha(num){
    var val = $('#Captcha').val();

    if(smsCode ==-1){

        return false;
    }
    else if(val != num){
        //alert('输入的验证码不正确');
        erroraction('输入的验证码不正确','70px');
        return false;

    }else if(val == num){
        $.ajax({
            type:'post',
            url:BUSINESS_URL_PRE+'/essential/sms/querySmsValidate',
            data:{
                userPhone:$('#UserName').val(),
                userTypeId:1,
                serviceType:0,
                smsCode:smsCode
            },
            dataType:'json',

            success:function(data){
                if(data.code == 1){
                    validatePassword();

                }else{
                    alert(data.msg);
                }
            },
            error:function (data){
                alert("网络有问题，请刷新重试");
            }
        });
        $('#Password').focus();
        return true

    }
};

/*判断密码*/
function  validatePassword(){
    var val = $('#Password').val();

    if(val == ''){
        //alert('请设置密码');
        erroraction('请设置密码','137px');
        return false;
    }else{

        validateSurePass();
        $('#SurePass').focus();
        return true;

    }

};
/*验证确认密码*/
function  validateSurePass(){
    var n1 = $('#Password').val();
    var n2 = $('#SurePass').val();

    var username =$("#UserName").val();
    if(n1.length < 6 || n1.length >20){
        erroraction('请输入6~20位密码','135px');
        return false;
    }
    else if(n2 != n1){
        //alert('两次输入的密码不一致');
        erroraction('两次输入的密码不一致','210px');
        return false;
    }else if(n2 == n1){

            $.ajax({
                type:'post',
                url:BUSINESS_URL_PRE+'/essential/userLoginAndRegistration/userRegistration',
                data:{
                    userName:username,
                    userPwd:n1,
                    userTypeId:1
                },
                dataType:'json',
                success:function(data){
                    if(data.code == 1){
                        alert(data.msg);

                        //alert(BUSINESS_LOGIN_USER_NAME)
                       window.location.href = 'merchantsLoginUser.html';
                    }

                },
                error:function (data){
                    alert(data.msg);
                }
            });
        };

};

/*点击注册*/
$('.submit_button').on('click',function (){

    var  bool = false;
    validateCaptcha(smsCode);


    /*if(validateUserName()&&validateCaptcha(smsCode)){

        if(validatePassword()){
            validateSurePass();
        }
    };*/
});


