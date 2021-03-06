/**
 * Created by Administrator on 2017/7/1.
 */
$(function () {
	//后台导航点击，加active
	var $admin_navigation_li = $('.admin-navigation-li')
	var $admin_navigation_ul_ul = $('.admin-navigation-ul-ul')
	$admin_navigation_li.on('click', function () {
		if ($(this).hasClass('active')) {
			return
		}
		$admin_navigation_li.removeClass('active')
		$admin_navigation_ul_ul.removeClass('in')
		$(this).addClass('active')
	})

	//导航内容点击，阻止冒泡
	var $admin_navigation_function = $('.admin-navigation-function')
	$admin_navigation_function.on('click', function (event) {
		$admin_navigation_function.removeClass('active')
		event.stopPropagation()
		$(this).addClass('active')
	})

	/*
	 * 商品类别选中
	 * */
	var $commodity_category = $('.admin-commodity-form .checkbox-inline')
	$commodity_category.on('click', function (e) {
		e.stopPropagation()
		if ($(this).find('input:checked').length > 0) {
			$(this).find('.glyphicon').removeClass('glyphicon-unchecked').addClass('glyphicon-check')
			$(this).css('color', '#ff963d')
		} else {
			$(this).find('.glyphicon').removeClass('glyphicon-check').addClass('glyphicon-unchecked')
			$(this).css('color', '#3d3d3d')
		}
	})

	/*
	 * 商品全选
	 * */
	var $all_commodity = $('#all_commodity')
	var checkbox = true
	$all_commodity.on('click', function (e) {

		var $commodity_id = $('.commodity-id')
		$all_commodity.find('input[name="all_commodity"]')[0].checked = checkbox
		for (var i in $commodity_id) {
			$commodity_id[i].checked = checkbox
		}

		e.stopPropagation()
		checkbox = !checkbox
	})

	//商品删除
	var $commodityDel = $('#commodityDel')
	$commodityDel.on('click', function () {
		var $delCommodity = $('.admin-commodity-info-item input:checked')
		if ($delCommodity.length > 0) {
			if (confirm('确定删除这些商品吗？')) {
				$delCommodity.parents('.admin-commodity-info-item').remove()
				alert('删除成功！')
			}
		} else {
			alert('请先选择要删除的商品！')
		}
	})

	//商品下架
	var $commodityDown = $('#commodityDown')
	$commodityDown.on('click', function () {
		var $delCommodity = $('.admin-commodity-info-item input:checked').parents('.admin-commodity-info-item')
		if ($delCommodity.length > 0) {
			if (confirm('确定下架这些商品吗？')) {
				$delCommodity.find('.commodity_status').html('已下架')
				alert('下架成功！')
			}
		} else {
			alert('请先选择要下架的商品！')
		}
	})

	//商品上架
	var $commodityUp = $('#commodityUp')
	$commodityUp.on('click', function () {
		var $delCommodity = $('.admin-commodity-info-item input:checked').parents('.admin-commodity-info-item')
		if ($delCommodity.length > 0) {
			if (confirm('确定上架这些商品吗？')) {
				$delCommodity.find('.commodity_status').html('出售中')
				alert('上架成功！')
			}
		} else {
			alert('请先选择要上架的商品！')
		}
	})

	//评论展开事件
	var $open_comment = $('.admin-user-comment-item-comment-num')

	$open_comment.on('click', function () {
		var openComment = $(this).parents('.admin-user-comment-item').find('.admin-user-comment-item-all-comments')
		if (openComment.css('display') === 'block') {
			$(this).find('.comment-up').remove()
			openComment.hide()
		} else {
			var $span = $('<span class="comment-up">收起</span>')
			openComment.show()
			$(this).append($span)
		}
	})

	//阅读全文
	var $article_all = $('.admin-user-comment-item-article-all')
	$article_all.on('click', function () {
		var $father = $(this).siblings('.admin-user-comment-item-article-small')
		console.log($father)
		if ($father.hasClass('admin-user-comment-item-article-big')) {
			$father.removeClass('admin-user-comment-item-article-big')
			$(this).html('阅读全文')
		} else {
			$father.addClass('admin-user-comment-item-article-big')
			$(this).html('收起文章')
		}
	})

	//动态回复评论
	var $replay_comment = $('.admin-user-comment-item-all-comments-item-replay')
	var $replay_comment_body = $('.admin-user-comment-item-all-comments-body')
	$replay_comment.on('click', function () {
		$(this).siblings().hide()
		$(this).hide()
		var $father = $(this).parent('.admin-user-comment-item-all-comments-item-function')
		var $string = $('<div class="replay_father">' +
			'<div class="form-group clearfix">' +
			'<label class="sr-only">回复</label>' +
			'<input type="text" class="form-control">' +
			'</div>' +
			'<button class="pull-right btn admin-btn replay_now">回复</button>' +
			'<button class="pull-right btn cancel-btn replay_cancel">取消</button>' +
			'</div>')
		$father.append($string)

		//取消回复
		var $replay_cancel = $('.replay_cancel')
		$replay_cancel.on('click', function () {
			var $father = $(this).parent('.replay_father')
			$father.siblings().show()
			$father.remove()
		})

		//回复
		var $replay_now = $('.replay_now')
		$replay_now.on('click', function () {
			var $father = $(this).parent('.replay_father')

			var value = $father.find('input').val()
			if (!value) {
				alert('请输入回复内容！')
				return false
			}
			var $new_comment = $(`
                            <div class="admin-user-comment-item-all-comments-item">
                                <div class="admin-user-comment-item-all-comments-item-user clearfix">
                                    <div class="pull-left">
                                        <span class="admin-user-comment-item-all-comments-item-user-name"></span>
                                    </div>
                                    <div class="pull-right admin-user-comment-item-time"></div>
                                </div>
                                <div class="admin-user-comment-item-all-comments-item-content"></div>
                            </div>
							`)

			$new_comment.find('.admin-user-comment-item-all-comments-item-user-name').html('商家：')
			$new_comment.find('.admin-user-comment-item-all-comments-item-content').html(value)
			$new_comment.find('.admin-user-comment-item-time').html('1分钟前')
			$replay_comment_body.prepend($new_comment)
			$father.siblings().show()
			$father.remove()

		})
	})

	//门店图片删除
	var $img_list = $('#admin-img-shopImg-list')
	var $shopCancel = $img_list.find('.admin-img-shopImg-item-cancel')
	$shopCancel.on('click', function () {
		console.log(1)
		var $father = $(this).parents('.admin-img-shopImg-item')
		if (confirm('确定删除该图片吗？')) {
			$father.remove()
		}
	})

	//预约信息下一天、前一天
	var $dateDown = $('#dateDown')
	var $dateUp = $('#dateUp')
	var $datePicker = $('#datePicker')

	function dayChoose(num) {
		var day = $datePicker.val().split('-')[2]
		var today = $datePicker.val().replace(/-/g, '/')
		var date = new Date(today)
		date.setDate(parseInt(day) + num)
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		var d = date.getDate();
		m < 10 ? m = '0' + m : ''
		d < 10 ? d = '0' + d : ''
		$datePicker.val(y + "-" + m + "-" + d)
	}

	$dateDown.on('click', function () {
		dayChoose(-1)
	})
	$dateUp.on('click', function () {
		dayChoose(1)
	})

	//添加商品类别
	//删除提示
	var $commodity_category_delete = $('.admin-commodity-category-delete')

	$commodity_category_delete.on('click', function () {
		if (confirm("确定删除该类别吗？")) {
		} else {
			return false
		}
	})

	//修改类别
	var $commodity_category_change = $('.admin-commodity-category-change')

	$commodity_category_change.on('click', function () {
		var div = $(this).parent().prev().find('div')
		var input = $(this).parent().prev().find('input')

		if ($(this).text() === '修改') {
			div.addClass('hidden')
			input.removeClass('hidden')
			$(this).text('保存')
		} else {
			var value = input.val()
			if (!value) {
				alert('请输入修改后的类名！')
				return false
			}
			div.text(value)
			div.removeClass('hidden')
			input.addClass('hidden')
			$(this).text('修改')
		}
	})

	//评论管理回复
	var $commodity_comment_reply = $('.commodity_comment_reply')

	$commodity_comment_reply.on('click', function () {
		var $father = $(this).parents('.admin-commodity-comment-wrap')
		var value = $father.find('input').val()
		var $add_div = $father.find('.admin-commodity-comment-part')
		if (!value) {
			alert('请输入回复内容！')
			return false
		}
		if (confirm("是否回复该用户？")) {
			var $add = $('<div class="shop_comment">商家：' + value + '</div>')
			$add_div.append($add)
		} else {
			return false
		}
	})

	/*
	 * 图片箭头查看
	 * */
	var $img_left = $('#img_left'),
		$img_right = $('#img_right'),
		$groupImg = $('.admin-img-shopImg-item'),
		width = parseInt($($groupImg[0]).css('width'))

	function imgMove(x) {
		var $father_width = parseInt($('#admin-img-shopImg-list').css('width')),
			$son_width = (width + 20) * ($('.admin-img-shopImg-item').length),
			left = parseInt($($groupImg[0]).css('left')) + x

		if (left < 0 && ($son_width + left + 200 < $father_width)) {
			return false
		}
		if (left > 0) {
			left = 0
		}
		$groupImg.animate({
			left: left + 'px',
		}, 400)
		return true
	}

	$img_left.on('click', function () {
		if (!imgMove(200)) {
			return false
		}
	})

	$img_right.on('click', function () {
		if (!imgMove(-200)) {
			return false
		}
	})

	//鼠标滑动图片位置变化
	function touchMove(x) {
		var $father_width = parseInt($('#admin-img-shopImg-list').css('width')),
			$son_width = (width + 20) * ($('.admin-img-shopImg-item').length),
			newLeft = x + parseInt($($groupImg[0]).css('left'))

		if (newLeft < 0 && newLeft < ($father_width - $son_width - 200)) {
			return false
		}
		if (newLeft > 0) {
			return false
		}
		$groupImg.css('left', newLeft + 'px')
	}

	var $img_move = $('#admin-img-wrap')

	$img_move.mousedown(function (e) {
		var x = e.pageX

		e.stopPropagation()
		$img_move.on('mousemove.a', function (event) {
			var moveX = event.pageX,
				realX = moveX-x,
				limit = 20
			if(realX > limit){
				realX = limit
			}else if(realX < -limit) {
				realX = -limit
			}
			touchMove(realX)
		})
	})
	$img_move.on('mouseout',function () {
		$img_move.off('mousemove.a')
	})
	$img_move.mouseup(function (events) {
		var newleft = parseInt($($groupImg[0]).css('left')) + 10,
			$father_width = parseInt($('#admin-img-shopImg-list').css('width')),
			$son_width = (width + 20) * ($('.admin-img-shopImg-item').length)
		events.stopPropagation()
		$img_move.off('mousemove.a')
		if (newleft < 0 && ($son_width + newleft + 200 < $father_width)) {
			return false
		}
		if (newleft > 0) {
			return false
		}
		if( newleft > -50){
			newleft = 0
		}
		$groupImg.animate({
			left: newleft + 'px'
		}, 500)
	})


	//拼团商品删除
	var $groupDel = $('#groupDel')
	$groupDel.on('click', function () {
		var $delCommodity = $('.admin-commodity-info-item input:checked')
		if ($delCommodity.length > 0) {
			if (confirm('确定删除这些商品吗？')) {
				$delCommodity.parents('.admin-commodity-info-item').remove()
				alert('删除成功！')
			}
		} else {
			alert('请先选择要删除的商品！')
		}
	})

	//拼团商品下架
	var $groupDown = $('#groupDown')
	$groupDown.on('click', function () {
		var $delGroup = $('.admin-commodity-info-item input:checked').parents('.admin-commodity-info-item')
		if ($delGroup.length > 0) {
			if (confirm('确定下架这些商品吗？')) {
				$delGroup.find('.commodity_status').html('已下架')
				alert('下架成功！')
			}
		} else {
			alert('请先选择要下架的商品！')
		}
	})

	//拼团商品上架
	var $groupUp = $('#groupUp')
	$groupUp.on('click', function () {
		var $delGroup = $('.admin-commodity-info-item input:checked').parents('.admin-commodity-info-item')
		if ($delGroup.length > 0) {
			if (confirm('确定上架这些商品吗？')) {
				$delGroup.find('.commodity_status').html('出售中')
				alert('上架成功！')
			}
		} else {
			alert('请先选择要上架的商品！')
		}
	})

})