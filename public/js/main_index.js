/**
 * Created by Administrator on 2017/7/7.
 */
$(function () {
	//检测手机号码
	var $telPhone = $('#telPhone')
	var $helpBlock1 = $('#helpBlock1')
	var $getCaptcha = $('#getCaptcha')
	$telPhone.blur(function () {
		var telNumber = $telPhone.val()
		var $father = $(this).parent()
		if(telNumber.length !== 11 || !(/^1[3|4|5|7|8][0-9]\d{8}$/.test(telNumber))) {
			$helpBlock1.html('请输入正确的手机号码')
			$father.removeClass('has-success')
			$father.addClass('has-error')
			$getCaptcha.addClass('disabled')
		}else {
			$father.removeClass('has-error')
			$father.addClass('has-success')
			$helpBlock1.html('')
			$getCaptcha.removeClass('disabled')
		}
	})

	//验证码检测
	var $captcha = $('#captcha')
	var $helpBlock4 = $('#helpBlock4')
	$captcha.blur(function () {
		var captcha = $captcha.val()
		var $father = $(this).parents('.form-group')
		if(!$getCaptcha.hasClass('disabled')) {
			if(captcha.length !== 6 || !(/^[0-9]+$/.test(captcha))){
				$helpBlock4.html('验证码不正确')
				$father.removeClass('has-success')
				$father.addClass('has-error')
			}else {
				$father.removeClass('has-error')
				$father.addClass('has-success')
				$helpBlock4.html('')
			}
		}
	})

	//检测密码
	var $password = $('#password')
	var $helpBlock2 = $('#helpBlock2')

	$password.blur(function () {
		var password = $password.val()
		var $father = $(this).parent()

		if(password.length > 8 || !(/^[a-zA-Z0-9]+$/.test(password))){
			$helpBlock2.html('请输入正确的密码格式')
			$father.removeClass('has-success')
			$father.addClass('has-error')
		}else {
			$father.removeClass('has-error')
			$father.addClass('has-success')
			$helpBlock2.html('')
		}
	})

	//密码二次检测
	var $repassword = $('#repassword')
	var $helpBlock3 = $('#helpBlock3')

	$repassword.blur(function () {
		var password = $password.val()
		var repassword = $repassword.val()
		var $father = $(this).parent()

		if(password !== repassword || !repassword){
			$helpBlock3.html('两次输入的密码不一致')
			$father.removeClass('has-success')
			$father.addClass('has-error')
		}else {
			$father.removeClass('has-error')
			$father.addClass('has-success')
			$helpBlock3.html('')
		}
	})

	//注册按钮
	var $register = $('#register')
	var $form_group = $('.form-group')
	$register.on('click',function () {
		if($form_group.hasClass('has-error') || !$('.admin-register-part input').val()){
			alert('您还有信息没有正确填写')
			return false
		}else {
			//提交跳转
		}
	})
})