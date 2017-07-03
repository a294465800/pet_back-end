/**
 * Created by Administrator on 2017/7/1.
 */
$(function () {
	//后台导航点击，加active
	var $admin_navigation_li = $('.admin-navigation-li')
	var $admin_navigation_ul_ul = $('.admin-navigation-ul-ul')
	$admin_navigation_li.on('click', function () {
		if($(this).hasClass('active')){
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
	* 商品全选
	* */
	var $all_commodity = $('#all_commodity')
	var checkbox = true
	$all_commodity.on('click',function (e) {
		$('.commodity-id').attr('checked', checkbox)
		e.stopPropagation()
		checkbox = !checkbox
	})

	//商品删除
	var $commodityDel = $('#commodityDel')
	$commodityDel.on('click',function () {
		var $delCommodity = $('.admin-commodity-info-item input:checked')
		if($delCommodity.length > 0){
			if(confirm('确定删除这些商品吗？')){
				$delCommodity.parents('.admin-commodity-info-item').remove()
				alert('删除成功！')
			}
		}else {
			alert('请先选择要删除的商品！')
		}
	})

	//商品下架
	var $commodityDown = $('#commodityDown')
	$commodityDown.on('click',function () {
		var $delCommodity = $('.admin-commodity-info-item input:checked').parents('.admin-commodity-info-item')
		if($delCommodity.length > 0){
			if(confirm('确定下架这些商品吗？')){
				$delCommodity.find('.commodity_status').html('已下架')
				alert('下架成功！')
			}
		}else {
			alert('请先选择要下架的商品！')
		}
	})

	//商品上架
	var $commodityUp = $('#commodityUp')
	$commodityUp.on('click',function () {
		var $delCommodity = $('.admin-commodity-info-item input:checked').parents('.admin-commodity-info-item')
		if($delCommodity.length > 0){
			if(confirm('确定上架这些商品吗？')){
				$delCommodity.find('.commodity_status').html('出售中')
				alert('上架成功！')
			}
		}else {
			alert('请先选择要上架的商品！')
		}
	})

})