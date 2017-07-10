/**
 * Created by Administrator on 2017/7/9.
 */
$(function () {
	//店铺定位
	// var $radio_spans = $('#main_form_shop_type').find('.glyphicon')
	var $shop_type_radios = $('input:radio[name = "shop_type"]')
	//
	// $shop_type_radios.change(function () {
	// 	var $span = $(this).prev('span')
	// 	if ($(this)[0].checked){
	// 		$radio_spans.addClass('glyphicon-star-empty')
	// 		$radio_spans.removeClass('glyphicon-star')
	// 		$span.removeClass('glyphicon-star-empty')
	// 		$span.addClass('glyphicon-star')
	// 	}
	// })

	//业务范围
	var $shop_business_checkbox = $('input:checkbox[name = "shop_business"]')

	$shop_business_checkbox.change(function () {
		var $span = $(this).prev('span')
		if ($(this)[0].checked) {
			$span.removeClass('glyphicon-unchecked')
			$span.addClass('glyphicon-check')
		} else {
			$span.removeClass('glyphicon-check')
			$span.addClass('glyphicon-unchecked')
		}
	})

	//公众号
	// var $account_spans = $('#shop_accounts').find('.glyphicon')
	// var $account_radios = $('input:radio[name = "shop_accounts"]')
	//
	// $account_radios.change(function () {
	// 	var $span = $(this).prev('span')
	// 	if ($(this)[0].checked) {
	// 		$account_spans.addClass('glyphicon-star-empty')
	// 		$account_spans.removeClass('glyphicon-star')
	// 		$span.removeClass('glyphicon-star-empty')
	// 		$span.addClass('glyphicon-star')
	// 	}
	// })

	//文件上传
	//swf文件地址
	if ($('#shop_license_picker').html()) {
		var swf = '../public/build/webuploader/Uploader.swf'
		//文件上传地址
		var host = 'http://webuploader.duapp.com/server/fileupload.php'

		// 初始化Web Uploader
		var shopLicenseUploader = WebUploader.create({

			// 选完文件后，是否自动上传。
			auto: true,

			fileVal: 'shop_license',

			method: 'POST',

			// swf文件路径
			swf: swf,

			// 文件接收服务端。
			server: host,

			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.

			pick: {
				id: '#shop_license_picker',
				multiple: false,
				innerHTML: '选择文件'
			},
		});

		// 当有文件被添加进队列的时候
		var $shop_license_list = $('#shop_license_list')
		shopLicenseUploader.on('fileQueued', function (file) {
			$shop_license_list.html('')
			$shop_license_list.append('<div id="' + file.id + '" class="item">' +
				'<h4 class="info">' + file.name + '</h4>' +
				'<p class="state">等待上传...</p>' +
				'</div>');
		});

		// 文件上传过程中创建进度条实时显示。
		shopLicenseUploader.on('uploadProgress', function (file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('.progress .progress-bar');

			// 避免重复创建
			if (!$percent.length) {
				$percent = $('<div class="progress progress-striped active">' +
					'<div class="progress-bar" role="progressbar" style="width: 0%">' +
					'</div>' +
					'</div>').appendTo($li).find('.progress-bar');
			}

			$li.find('p.state').text('上传中');

			$percent.css('width', percentage * 100 + '%');
		})

		shopLicenseUploader.on('uploadSuccess', function (file) {
			$('#' + file.id).find('p.state').text('已上传');
		});

		shopLicenseUploader.on('uploadError', function (file) {
			$('#' + file.id).find('p.state').text('上传出错');
		});

		shopLicenseUploader.on('uploadComplete', function (file) {
			$('#' + file.id).find('.progress').fadeOut();
		});
	}


	//提交检测
	var $main_form_sub = $('#main_form_sub')

	$main_form_sub.on('click', function () {
		var flag1 = true
		var flag2 = true

		for (var i in $shop_type_radios) {
			if ($shop_type_radios[i].checked) {
				flag1 = false
				break
			}
		}

		for (var j in $shop_business_checkbox) {
			if ($shop_business_checkbox[j].checked) {
				flag2 = false
				break
			}
		}
		if (flag1) {
			alert('您的店铺定位还未填写！')
			return false
		} else if (flag2) {
			alert('您的业务范围还未填写！')
			return false
		}
	})

})