/*
/!**
 * Created by Morgan on 2016/7/9.
 *!/

/*从注册页拿过来的用户名*/
var smsCode = -1;
var onoff = false;

//$('#UserName').val(BUSINESS_LOGIN_USER_NAME);


$('#UserName').focus();
/*错误提示*/
function  erroraction(str,top){
    $('.error').css('top',top);
    $('.error').show();

    $(".errorMessage").html(str);
}
/*/!*验证手机号*!/
function validateUserName(){
    var userName = $('#UserName').val();

    if(userName == ''){
        //alert('请输入手机号！');
        erroraction('请输入手机号','0px');
        $('#UserName').focus();
        return false;
    }else if(userName.length !=11){

        erroraction('请输入正确的手机号','0px');
        $('#UserName').focus();
        return false;
    }
    else{

        $.ajax({
            type: 'post',
            url:BUSINESS_URL_PRE+'/essential/userRegistrationController/chackUser',
            dataType: 'json',
            data:{
                userNumber:userName,
                userTypeId:1
            },
            success:function (res){
                console.log(res);
                if(res.code == 1){

                    $('.error').hide();
                    $('#Password').focus();
                }else{
                    erroraction("用户名不存在",'0px');

                }
            }
        })
    }
};
/!*用户名失去焦点判断*!/
$('#UserName').on('blur',function (){
    //validateUserName();
});*/
/*------------------------------------------------------------*/
/*验证手机号*/
function  validationPhonenNum(){
    var userName = $('#UserName').val();

    if(userName == ''){
        alert('手机号不能为空');
        return false;
    }else if(userName.length != 11){
        alert('手机号为11位');
        return false;
    }else{
        return true;
    }
}

/*验证密码*/
function validationPasswordfn(){
    var passw = $('#Password').val();

    if(passw == ''){
        alert('密码不能为空');
        return false;
    }else{
        return true;
    }
};

function  VerificationCodefn(){

    var code1 = $('#Captcha').val();
    var code2 = $('#captcha_button').html();

    if(code1 == ''){
        alert('请输入验证码');
        return false;
    }else if(code1 != code2){
        alert('输入的验证码不正确');
        createCode();
        return false;
    }else{
        return true;
    }
};

/*点击登录*/
$('.submitButton').on('click',function (){
    var userName = $('#UserName').val();
    var passw = $('#Password').val();
    if(validationPhonenNum()&&validationPasswordfn()&&VerificationCodefn()){
        $.ajax({
            type: 'post',
            url:BUSINESS_URL_PRE+'/essential/index',
            dataType: 'json',
            data:{
                userCode:userName,
                password:passw,
                userType:1
            },
            success:function (res){
                //console.log(res);
                if(res.code == 1){
                    sessionStorage.setItem("EssentialUserId",res.info.userId)
                    window.location.href = 'index_busi.html';
                }else{
                    createCode();
                    alert(res.msg);
                }
            },
            error:function (res){
                alert('网络连接失败，请稍后重试~');
            }
        })
    }
});
/*------------------------------------------------------------*/
/*找回密码部分*/
$(".forgetPass").click(function() {


    $(".page-container").html("<div class='login_box'>" +
        "<h4>登录>找回密码</h4>" +
        "<p><strong>*</strong>手机号<input type=text id='userName' name='userName' class='userName find_password' placeholder=请输入您的手机号！></p>" +
        "<p><strong>*</strong>短信验证码<input type=Captcha id='captcha' class=Captcha name='Captcha phoneCode' placeholder=请输入验证码！>" +
        "<a id=getMessage_code>获取</a> </p><button id=next_button type=button class=next_button>下一步</button><div class='error'> <span>+</span> <span class='errorMessage'></span> </div></div>");
    $('.find_password').focus();
});


/*判断手机号*/
function validateUserName(){
    var userName = $('#userName').val();

    if(userName == ''){

        erroraction('请输入手机号','50px');
        $('#userName').focus();
        return;
    }else if(userName.length !=11){

        erroraction('请输入正确的手机号','50px');
        $('#userName').focus();
        return;
    }else if(!(/^1[3|4|5|7|8]\d{9}$/.test(userName))){
        erroraction('请输入正确的手机号','50px');
        $('#userName').focus();
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

                    $('.error').hide();
                    $("#getMessage_code").bind('click',getMessageCode);
                    $('#Captcha').focus();

                    onoff = true;

                    return false;
                }else{
                    $('#userName').focus();
                    erroraction(res.msg,'50px');
                    //erroraction("手机号可以注册",'0px');
                }
            },
            error:function (){
                alert('网络连接失败，请稍后重试~');
            }
        });

    }
}


/*找回密码的验证手机号*/
$(document).on('blur','.find_password',function (){
    validateUserName()
});



/*点击下一步*/


$(document).on('click','#next_button',function (){
   // console.log(onoff)
    if(!onoff){
        return;
    }

    validateCaptcha(smsCode)

})

/*/!*校验验证码*!/
function  validateCaptcha1(num){
    var val = $('#captcha').val();

    if(val != num){

        erroraction('输入的验证码不正确','70px');
        return false;

    }else if(val == num){
        $('#Password').focus();
        return true

    }
};*/



/*获取验证码*/
function  getMessageCode(){

    var username =$("#userName").val();



    /*倒计时*/
    var T = 60;
    $('#getMessage_code').unbind('click',getMessageCode)
    var Timer = setInterval(function (){

        $('#getMessage_code').html(T);
        T--;
        if(T < 0){
            clearInterval(Timer);
            $('#getMessage_code').html('获取');
            $('#getMessage_code').bind('click',getMessageCode);

        }
    },1000);

    $.ajax({
        type:'post',
        url:BUSINESS_URL_PRE+'/essential/sms/sendSms',
        data:{
            userPhone:$('#userName').val(),
            userTypeId:1,
            serviceType:1
        },
        dataType:'json',

        success:function(data){
            //console.log(data);
            if(data.code==1){
                smsCode = data.info.smsCode;
            }
        },
        error:function (){
            alert('网络连接失败，请稍后重试~');
        }
    });
};


/*校验验证码*/
function  validateCaptcha(num){
    var val = $('#Captcha').val();
   // console.log(smsCode)
    var data = {
        userPhone:$('#userName').val(),
        userTypeId:1,
        serviceType:1,
        smsCode:$('#captcha').val()
    };
   // console.dir(data)
    if(val ==''){
        erroraction('请输入验证码','70px');
        $('#Captcha').focus();
    }
    else{
        $.ajax({
            type:'post',
            url:BUSINESS_URL_PRE+'/essential/sms/querySmsValidate',

            dataType:'json',
            data:data,
            success:function(data){

                if(data.code == 1){
                    nextFn();
                }
            },
            error:function (data){
                alert('网络连接失败，请稍后重试~');
            }
        });

    }
};


/*点击下一步*/
function  nextFn(){
    var userName = $('.find_password').val();

    $(".page-container").html("<div class='login_box'>" +
    "<h4>登录>找回密码</h4>"+

    '<p><strong>*</strong>手机号<input type="text" id="user_name" name="userName" class="userNam enter_phoneNum" disabled> </p>'+
    '<p><strong>*</strong>设置新密码<input type="password" id="" name="resetPassword" class="resetPassword new_password"> </p>'+
    '<p class="confirmPassword"><strong>*</strong>确认新密码<input type="password" id="confirmPassword" class="confirmPassword enter_password" name="confirmPassword"> </p>'+
    '<button id=enter_button  class="confirm_button mer_confirm_button back_confirm_button">确认修改</button><div class="error"> <span>+</span> <span class="errorMessage"></span> </div>');
    $('.enter_phoneNum').val(userName);
};

/*点击确认修改*/
$(document).on('click','.back_confirm_button',function (){
   // console.log(11)
    var val1 = $('.new_password').val();
    var val2 = $('.enter_password').val();
    var userName = $('#user_name').val();

    if(val1 == ''){
        erroraction('请输入密码','115px');
        $('.new_password').focus();

    }
    else if(val1.length < 6 || val1.length > 20){
        erroraction('请输入6~20位密码','115px');
        $('.new_password').focus();
    }
    else if(val2 == ''){
        erroraction('输入重复密码','200px');
        $('.confirmPassword').focus();

    }else if(val1 != val2){

        erroraction('两次密码不一致','200px');
    }else{
        $('.error').hide();
        $.ajax({
            type: 'post',
            url:BUSINESS_URL_PRE+'/essential/userLoginAndRegistration/retrievePassword',
            dataType: 'json',
            data:{
                userName:userName,
                userPwd:val1,
                userTypeId:1
            },
            success:function (res){
                if(res.code == 1){
                    alert('修改成功');
                    window.location.href = 'merchantsLoginUser.html';
                   // console.log(res);
                }

            },
            error:function (res){
                alert('网络连接失败，请稍后重试~');
            }
        })
    }

});

