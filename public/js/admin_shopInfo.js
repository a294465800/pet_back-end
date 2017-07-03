/**
 * Created by Administrator on 2017/7/3.
 */
$(function () {

	//swf文件地址
	var swf = '../public/build/webuploader/Uploader.swf'
	//文件上传地址
	var host = 'http://webuploader.duapp.com/server/fileupload.php'
//	头像上传
// 初始化Web Uploader
	var avatarUploader = WebUploader.create({

		// 选完文件后，是否自动上传。
		auto: false,

		fileVal: 'avatar',

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
		},
		formData: {
			name: 'ad',
			b: 1,
			c: 2
		}
	});

	// 当有文件添加进来的时候
	var $list = $('#avatarPre')
	var avatar = null
	avatarUploader.on('fileQueued', function (file) {
		$list.html('')
		var $li = $(
				'<div id="' + file.id + '" class="admin-shopInfo-avatar-pre thumbnail">' +
				'<img>' +
				'</div>'
			),
			$img = $li.find('img');


		// $list为容器jQuery实例
		$list.append($li);

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

	//上传商店图片
// 初始化Web Uploader
		var shopImgUpload = WebUploader.create({

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
	var $shop_list = $('#shop_img_pre')
	var shop_img = new Array(0)
	shopImgUpload.on('fileQueued', function (file) {
		var $li = $(
				'<div id="' + file.id + '" class="shop-img-item thumbnail">' +
				'<img>' +
				'<div class="shop-img-item-info">' + file.name + '</div>' +
				'</div>'
			),
			$img = $li.find('img');


		// $shop_list为容器jQuery实例
		$shop_list.append($li);

		// 创建缩略图
		// 如果为非图片文件，可以不用调用此方法。
		// thumbnailWidth x thumbnailHeight 为 100 x 100
		var thumbnailWidth = 150, thumbnailHeight = 150
		shopImgUpload.makeThumb(file, function (error, src) {
			if (error) {
				$img.replaceWith('<span>不能预览</span>');
				return;
			}

			$img.attr('src', src);
		}, thumbnailWidth, thumbnailHeight);
		shop_img.push(file)
	});

	//上传结束时触发
	shopImgUpload.on('uploadFinished', function () {
		console.log('finish')
	})

	shopImgUpload.on('uploadError', function (rs) {
		console.log(rs)
		console.log('错误')
	})

	shopImgUpload.on('uploadSuccess', function (rs) {
		console.log(rs)
		console.log('success')
	})

	//上传头像
	var $shopImgUpload = $('#shopImgUpload')
	$shopImgUpload.on('click', function () {
		shopImgUpload.upload(shop_img)
	})
})