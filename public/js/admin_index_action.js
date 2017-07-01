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
})