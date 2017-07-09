/**
 * Created by Administrator on 2017/7/9.
 */
$(function () {
	//店铺定位
	var $radio_spans = $('#main_form_shop_type').find('.glyphicon')
	var $shop_type_radios = $('input:radio[name = "shop_type"]')

	$shop_type_radios.change(function () {
		var $span = $(this).prev('span')
		if ($(this)[0].checked){
			$radio_spans.addClass('glyphicon-star-empty')
			$radio_spans.removeClass('glyphicon-star')
			$span.removeClass('glyphicon-star-empty')
			$span.addClass('glyphicon-star')
		}
	})

	//业务范围
	var $shop_business_checkbox = $('input:checkbox[name = "shop_business"]')

	$shop_business_checkbox.change(function () {
		var $span = $(this).prev('span')
		if ($(this)[0].checked){
			$span.removeClass('glyphicon-unchecked')
			$span.addClass('glyphicon-check')
		}else {
			$span.removeClass('glyphicon-check')
			$span.addClass('glyphicon-unchecked')
		}
	})

	//公众号
	var $account_spans = $('#shop_accounts').find('.glyphicon')
	var $account_radios = $('input:radio[name = "shop_accounts"]')

	$account_radios.change(function () {
		var $span = $(this).prev('span')
		if ($(this)[0].checked) {
			$account_spans.addClass('glyphicon-star-empty')
			$account_spans.removeClass('glyphicon-star')
			$span.removeClass('glyphicon-star-empty')
			$span.addClass('glyphicon-star')
		}
	})

	//提交检测
	var $main_form_sub = $('#main_form_sub')

	$main_form_sub.on('click',function () {
		var flag1 = true
		var flag2 = true

		for (var i in $shop_type_radios){
			if ($shop_type_radios[i].checked){
				flag1 = false
				break
			}
		}

		for (var j in $shop_business_checkbox){
			if ($shop_business_checkbox[j].checked){
				flag2 = false
				break
			}
		}
		if (flag1){
			alert('您的店铺定位还未填写！')
			return false
		} else if (flag2){
			alert('您的业务范围还未填写！')
			return false
		}
	})

})