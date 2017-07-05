/**
 * Created by Administrator on 2017/7/3.
 */
$(function () {

	//swf文件地址
	var swf = '../public/build/webuploader/Uploader.swf'
	//文件上传地址
	var host = 'http://192.168.3.22:8080/upload'

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
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			},
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
			console.log('finish')
		})

		avatarUploader.on('uploadError', function (rs) {
			console.log(rs)
			console.log('错误')
		})

		avatarUploader.on('uploadSuccess', function (rs) {
			console.log(rs)
			console.log('success')
		})

		//上传头像
		var $avatarUpload = $('#avatarUpload')
		$avatarUpload.on('click', function () {
			avatarUploader.upload(avatar)
		})
	}

	//上传门店图片
	else if($('#shopImgPicker').html()){
		console.log($('#shopImgPicker').html())
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
				innerHTML: '选择图片'
			},

			// 只允许选择图片文件。
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			},
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
			for (var i  in shop_img){
				if(shop_img[i].name === file.name){
					break
				}
			}
			//为新创建的图片添加事件
			var $span_del = $('.span-del')
			var $span_del2 = $($span_del[i])

			$span_del2.on('click',function () {
				var $father = $(this).parent('.shop-img-item')
				var index = $father.index()
				shop_img.splice(index-1,1)
				$father.remove()
				shopImgUploader.removeFile(file)
			})

		});

		//上传结束时触发
		shopImgUploader.on('uploadFinished', function () {
			console.log('finish')
		})

		shopImgUploader.on('uploadError', function (rs) {
			console.log(rs)
			console.log('错误')
		})

		shopImgUploader.on('uploadSuccess', function (rs) {
			console.log(rs)
			console.log('success')
		})

		//上传门店图片
		var $shopImgUpload = $('#shopImgUpload')
		$shopImgUpload.on('click', function () {
			console.log(shop_img)
			shopImgUploader.upload(shop_img)
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
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			},
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
		});

		//上传结束时触发
		commodityUploader.on('uploadFinished', function () {
			console.log('finish')
		})

		commodityUploader.on('uploadError', function (rs) {
			console.log(rs)
			console.log('错误')
		})

		commodityUploader.on('uploadSuccess', function (rs) {
			console.log(rs)
			console.log('success')
		})

		//上传头像
		var $commodityUpload = $('#commodityUpload')
		$commodityUpload.on('click', function () {
			commodityUploader.upload(commodity)
		})
	}

	//	动态上传
	else if($('#userDynamicPicker').html()){
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
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			},
			thumb: {
				width: 150,
				height: 150,
				crop: true
			},
		});

		// 当有文件添加进来的时候
		var $user_dynamicList = $('#user_dynamicList')
		var userDynamic = new Array(0)
		userDynamicUploader.on('fileQueued', function (file) {
			var $li = $(
					'<div id="' + file.id + '" class="shop-img-item thumbnail">' +
					'<img>' +
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
		});

		//上传结束时触发
		userDynamicUploader.on('uploadFinished', function () {
			console.log('finish')
		})

		userDynamicUploader.on('uploadError', function (rs) {
			console.log(rs)
			console.log('错误')
		})

		userDynamicUploader.on('uploadSuccess', function (rs) {
			console.log(rs)
			console.log('success')
		})

		//上传动态图片
		var $userDynamicUpload = $('#userDynamicUpload')
		$userDynamicUpload.on('click', function () {
			userDynamicUploader.upload(userDynamic)
		})
	}
})