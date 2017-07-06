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
		for(var i in $commodity_id){
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

	$open_comment.on('click',function () {
		var openComment = $(this).parents('.admin-user-comment-item').find('.admin-user-comment-item-all-comments')
		if(openComment.css('display') === 'block') {
			$(this).find('.comment-up').remove()
			openComment.hide()
		}else {
			var $span = $('<span class="comment-up">收起</span>')
			openComment.show()
			$(this).append($span)
		}
	})

	//阅读全文
	var $article_all = $('.admin-user-comment-item-article-all')
	$article_all.on('click',function () {
		var $father = $(this).siblings('.admin-user-comment-item-article-small')
		console.log($father)
		if($father.hasClass('admin-user-comment-item-article-big')){
			$father.removeClass('admin-user-comment-item-article-big')
			$(this).html('阅读全文')
		}else {
			$father.addClass('admin-user-comment-item-article-big')
			$(this).html('收起文章')
		}
	})

	//回复评论
	var $replay_comment = $('.admin-user-comment-item-all-comments-item-replay')
	$replay_comment.on('click',function () {
		$(this).siblings().hide()
		$(this).hide()
		var $father = $(this).parent('.admin-user-comment-item-all-comments-item-function')
		var $string = $('<div class="replay_father">' +
			'<div class="form-group clearfix">' +
			'<label class="sr-only">回复</label>' +
			'<input type="text" class="form-control">' +
			'</div>' +
			'<button class="pull-right btn admin-btn">回复</button>' +
			'<button class="pull-right btn cancel-btn replay_cancel">取消</button>' +
			'</div>')
		$father.append($string)

		//取消回复
		var $replay_cancel = $('.replay_cancel')
		$replay_cancel.on('click',function () {
			var $father = $(this).parent('.replay_father')
			$father.siblings().show()
			$father.remove()
		})
	})

	//门店图片删除
	var $shopCancel = $('#admin-img-shopImg-list').find('.admin-img-shopImg-item-cancel')
	$shopCancel.on('click',function () {
		console.log(1)
		var $father = $(this).parents('.admin-img-shopImg-item')
		if(confirm('确定删除该图片吗？')){
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
		var m = date.getMonth()+1;
		var d = date.getDate();
		m < 10 ? m = '0' + m : ''
		d < 10 ? d = '0' + d : ''
		$datePicker.val(y+"-"+m+"-"+d)
	}
	$dateDown.on('click',function () {
		dayChoose(-1)
	})
	$dateUp.on('click',function () {
		dayChoose(1)
	})


})