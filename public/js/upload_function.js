/**
 * Created by Administrator on 2017/7/3.
 */
$(function () {

	//swf文件地址
	var swf = '../public/build/webuploader/Uploader.swf'
	//文件上传地址
	var host = 'http://webuploader.duapp.com/server/fileupload.php'
	// 'http://192.168.3.22:8080/upload'
	//允许的文件类型
	var accept = {
		title: 'Images',
		extensions: 'gif,jpg,jpeg,bmp,png',
		mimeTypes: 'image/gif,image/jpeg,image/jpg,image/png,image/bmp'
	}

	//递归上传函数

	function uploadFile(uploader, files, i) {
		if (files[i]) {
			uploader.upload(files[i])
			uploader.on('uploadSuccess', function () {
				uploadFile(files[i + 1])
			})
		} else {
			alert('文件已经全部上传')
		}
	}

	//	头像上传
	if ($('#avatarPicker').html()) {

		// 初始化Web Uploader
		var avatarUploader = WebUploader.create({

			// 选完文件后，是否自动上传。
			auto: false,

			fileVal: 'image',

			method: 'POST',

			// swf文件路径
			swf: swf,

			// 文件接收服务端。
			server: host,

			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			dnd: '#avatarPre',
			disableGlobalDnd: true,

			pick: {
				id: '#avatarPicker',
				multiple: false,
				innerHTML: '选择头像'
			},

			// 只允许选择图片文件。
			accept: accept,

			//预览图片大小
			thumb: {
				width: 300,
				height: 300,
				crop: true
			}
		});

		// 当有文件添加进来的时候
		var $avatarList = $('#avatarPre')
		var avatar = null
		avatarUploader.on('fileQueued', function (file) {
			$avatarList.html('')
			var $li = $(
					'<div id="' + file.id + '" class="admin-shopInfo-avatar-pre thumbnail">' +
					'<img>' +
					'<div class="shop-img-item-info">' + file.name + '</div>' +
					'</div>'
				),
				$img = $li.find('img');


			// $avatarList为容器jQuery实例
			$avatarList.append($li);

			// 创建缩略图
			// 如果为非图片文件，可以不用调用此方法。
			// thumbnailWidth x thumbnailHeight 为 100 x 100
			var thumbnailWidth = 300, thumbnailHeight = 300
			avatarUploader.makeThumb(file, function (error, src) {
				if (error) {
					$img.replaceWith('<span>不能预览</span>');
					return;
				}

				$img.attr('src', src);
			}, thumbnailWidth, thumbnailHeight);
			avatar = file
		});

		//上传结束时触发
		avatarUploader.on('uploadFinished', function () {
			alert("头像上传完毕！")
			avatarUploader.reset()
		})

		avatarUploader.on('uploadError', function (rs) {
			console.log(rs)
			console.log('错误')
		})

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		avatarUploader.on('uploadSuccess', function (file, res) {
			$('#' + file.id).addClass('upload-state-done');
			console.log(res)
		});

		// 文件上传失败，显示上传出错。
		avatarUploader.on('uploadError', function (file) {
			var $li = $('#' + file.id),
				$error = $li.find('div.error');

			// 避免重复创建
			if (!$error.length) {
				$error = $('<div class="error"></div>').appendTo($li);
			}

			$error.text('上传失败');
		});

		// 完成上传完了，成功或者失败，先删除进度条。
		avatarUploader.on('uploadComplete', function (file) {
			$('#' + file.id).find('.progress').remove();
		});

		// 文件上传过程中创建进度条实时显示。
		avatarUploader.on('uploadProgress', function (file, percentage) {
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
		});

		//上传头像
		var $avatarUpload = $('#avatarUpload')
		$avatarUpload.on('click', function () {
			avatarUploader.upload(avatar)
		})
	}

	//上传门店图片
	else if ($('#shopImgPicker').html()) {
		// 初始化Web Uploader
		var shopImgUploader = WebUploader.create({

			// 选完文件后，是否自动上传。
			auto: false,

			fileVal: 'shop_img',

			// swf文件路径
			swf: swf,

			// 文件接收服务端。
			server: host,

			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			dnd: '#shop_img_pre',
			disableGlobalDnd: true,

			pick: {
				id: '#shopImgPicker',
				multiple: true,
				innerHTML: ''
			},

			// 只允许选择图片文件。
			accept: accept,
			thumb: {
				width: 100,
				height: 100,
				crop: true
			},
		});

		// 当有文件添加进来的时候
		var $shop_img_pre = $('#shop_img_pre')
		var shop_img = new Array(0)
		shopImgUploader.on('fileQueued', function (file) {
			var $li = $(
					'<div id="' + file.id + '" class="shop-img-item thumbnail">' +
					'<img>' +
					'<div class="shop-img-item-info">' + file.name + '</div>' +
					'<span class="glyphicon glyphicon-remove-sign span-del"></span>' +
					'</div>'
				),
				$img = $li.find('img');


			// $shop_img_pre为容器jQuery实例
			$shop_img_pre.append($li);

			// 创建缩略图
			// 如果为非图片文件，可以不用调用此方法。
			var thumbnailWidth = 150, thumbnailHeight = 150
			shopImgUploader.makeThumb(file, function (error, src) {
				if (error) {
					$img.replaceWith('<span>不能预览</span>');
					return;
				}

				$img.attr('src', src);
			}, thumbnailWidth, thumbnailHeight);

			//判断当前文件位置
			shop_img.push(file)
			for (var i  in shop_img) {
				if (shop_img[i].name === file.name) {
					break
				}
			}
			//为新创建的图片添加事件
			var $span_del = $($('.span-del')[i])

			$span_del.on('click', function () {
				var $father = $(this).parent('.shop-img-item')
				var index = $father.index()
				shop_img.splice(index, 1)
				$father.remove()
				shopImgUploader.removeFile(file, true)
				shopImgUploader.cancelFile(file)
			})

		});

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		shopImgUploader.on('uploadSuccess', function (file, res) {
			$('#' + file.id).addClass('upload-state-done');
			console.log(res)
		});

		// 文件上传失败，显示上传出错。
		shopImgUploader.on('uploadError', function (file) {
			var $li = $('#' + file.id),
				$error = $li.find('div.error');

			// 避免重复创建
			if (!$error.length) {
				$error = $('<div class="error"></div>').appendTo($li);
			}

			$error.text('上传失败');
		});

		// 完成上传完了，成功或者失败，先删除进度条。
		shopImgUploader.on('uploadComplete', function (file) {
			$('#' + file.id).find('.progress').remove();
		});

		//上传结束时触发
		shopImgUploader.on('uploadFinished', function () {
			alert("文件上传结束！")
			shopImgUploader.reset()
			shop_img = []
			$shop_img_pre.empty()
		})

		shopImgUploader.on('uploadError', function (rs) {
			console.log(rs)
			console.log('错误')
		})

		// 文件上传过程中创建进度条实时显示。
		shopImgUploader.on('uploadProgress', function (file, percentage) {
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
		});

		//上传门店图片

		var $shopImgUpload = $('#shopImgUpload')
		$shopImgUpload.on('click', function () {
			uploadFile(shopImgUploader, shop_img, 0)
		})
	}

	//	商品上传
	else if ($('#commodityPicker').html()) {
		// 初始化Web Uploader
		var commodityUploader = WebUploader.create({

			// 选完文件后，是否自动上传。
			auto: false,

			fileVal: 'commodity',

			// swf文件路径
			swf: swf,

			// 文件接收服务端。
			server: host,

			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			dnd: '#commodityList',
			disableGlobalDnd: true,

			pick: {
				id: '#commodityPicker',
				multiple: true,
				innerHTML: '选择图片'
			},

			// 只允许选择图片文件。
			accept: accept,
			thumb: {
				width: 100,
				height: 100,
				crop: true
			},
		});

		// 当有文件添加进来的时候
		var $commodityList = $('#commodityList')
		var commodity = new Array(0)
		commodityUploader.on('fileQueued', function (file) {
			var $li = $(
					'<div id="' + file.id + '" class="shop-img-item thumbnail">' +
					'<img>' +
					'<div class="shop-img-item-info">' + file.name + '</div>' +
					'<span class="glyphicon glyphicon-remove-sign span-del"></span>' +
					'</div>'
				),
				$img = $li.find('img');


			// $commodityList为容器jQuery实例
			$commodityList.append($li);

			// 创建缩略图
			// 如果为非图片文件，可以不用调用此方法。
			// thumbnailWidth x thumbnailHeight 为 100 x 100
			var thumbnailWidth = 150, thumbnailHeight = 150
			commodityUploader.makeThumb(file, function (error, src) {
				if (error) {
					$img.replaceWith('<span>不能预览</span>');
					return;
				}

				$img.attr('src', src);
			}, thumbnailWidth, thumbnailHeight);
			commodity.push(file)

			for (var i  in commodity) {
				if (commodity[i].name === file.name) {
					break
				}
			}
			//为新创建的图片添加事件
			var $span_del = $($('.span-del')[i])

			$span_del.on('click', function () {
				var $father = $(this).parent('.shop-img-item')
				var index = $father.index()
				commodity.splice(index, 1)
				$father.remove()
				commodityUploader.removeFile(file, true)
				commodityUploader.cancelFile(file)
			})
		});

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		commodityUploader.on('uploadSuccess', function (file, res) {
			$('#' + file.id).addClass('upload-state-done');
			console.log(res)
		});

		// 文件上传失败，显示上传出错。
		commodityUploader.on('uploadError', function (file) {
			var $li = $('#' + file.id),
				$error = $li.find('div.error');

			// 避免重复创建
			if (!$error.length) {
				$error = $('<div class="error"></div>').appendTo($li);
			}

			$error.text('上传失败');
		});

		// 完成上传完了，成功或者失败，先删除进度条。
		commodityUploader.on('uploadComplete', function (file) {
			$('#' + file.id).find('.progress').remove();
		});

		// 文件上传过程中创建进度条实时显示。
		commodityUploader.on('uploadProgress', function (file, percentage) {
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
		});

		//上传结束时触发
		commodityUploader.on('uploadFinished', function () {
			alert("文件上传结束！")
			commodityUploader.reset()
			commodity = []
			$commodityList.empty()
		})

		commodityUploader.on('uploadError', function (rs) {
			console.log(rs)
			console.log('错误')
		})

		//上传
		var $commodityUpload = $('#commodityUpload')
		$commodityUpload.on('click', function () {
			uploadFile(commodityUploader, commodity, 0)
		})
	}

	//	动态上传
	else if ($('#userDynamicPicker').html()) {
		// 初始化Web Uploader
		var userDynamicUploader = WebUploader.create({

			// 选完文件后，是否自动上传。
			auto: false,

			fileVal: 'commodity',

			// swf文件路径
			swf: swf,

			// 文件接收服务端。
			server: host,

			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			dnd: '#user_dynamicList',
			disableGlobalDnd: true,

			pick: {
				id: '#userDynamicPicker',
				multiple: true,
				innerHTML: '选择图片'
			},

			// 只允许选择图片文件。
			accept: accept,
			thumb: {
				width: 150,
				height: 150,
				crop: true
			},
			withCredentials: true  // 支持CORS跨域带cookie
		});

		// 当有文件添加进来的时候
		var $user_dynamicList = $('#user_dynamicList')
		var userDynamic = new Array(0)
		userDynamicUploader.on('fileQueued', function (file) {
			var $li = $(
					'<div id="' + file.id + '" class="shop-img-item thumbnail">' +
					'<img>' +
					'<div class="shop-img-item-info">' + file.name + '</div>' +
					'<span class="glyphicon glyphicon-remove-sign span-del"></span>' +
					'</div>'
				),
				$img = $li.find('img');


			// $commodityList为容器jQuery实例
			$user_dynamicList.append($li);

			// 创建缩略图
			// 如果为非图片文件，可以不用调用此方法。
			// thumbnailWidth x thumbnailHeight 为 100 x 100
			var thumbnailWidth = 150, thumbnailHeight = 150
			userDynamicUploader.makeThumb(file, function (error, src) {
				if (error) {
					$img.replaceWith('<span>不能预览</span>');
					return;
				}

				$img.attr('src', src);
			}, thumbnailWidth, thumbnailHeight);
			userDynamic.push(file)

			for (var i  in userDynamic) {
				if (userDynamic[i].name === file.name) {
					break
				}
			}
			//为新创建的图片添加事件
			var $span_del = $($('.span-del')[i])

			$span_del.on('click', function () {
				var $father = $(this).parent('.shop-img-item')
				var index = $father.index()
				userDynamic.splice(index, 1)
				$father.remove()
				userDynamicUploader.removeFile(file, true)
				userDynamicUploader.cancelFile(file)
			})

		});

		//上传结束时触发
		userDynamicUploader.on('uploadFinished', function () {
			alert("文件上传结束！")
			userDynamicUploader.reset()
			userDynamic = []
			$user_dynamicList.empty()
		})

		userDynamicUploader.on('uploadError', function (rs) {
			console.log(rs)
			console.log('错误')
		})

		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		userDynamicUploader.on('uploadSuccess', function (file, res) {
			$('#' + file.id).addClass('upload-state-done');
			console.log(res)
		});

		// 文件上传失败，显示上传出错。
		userDynamicUploader.on('uploadError', function (file) {
			var $li = $('#' + file.id),
				$error = $li.find('div.error');

			// 避免重复创建
			if (!$error.length) {
				$error = $('<div class="error"></div>').appendTo($li);
			}

			$error.text('上传失败');
		});

		// 完成上传完了，成功或者失败，先删除进度条。
		userDynamicUploader.on('uploadComplete', function (file) {
			$('#' + file.id).find('.progress').remove();
		});

		var $userDynamicUpload = $('#userDynamicUpload')
		$userDynamicUpload.on('click', function () {
			uploadFile(userDynamicUploader, userDynamic, 0)
		})

		// 文件上传过程中创建进度条实时显示。
		userDynamicUploader.on('uploadProgress', function (file, percentage) {
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
		});
	}
})