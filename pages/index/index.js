//index.js
//获取应用实例
var app = getApp()
Page({
    data: {
		components: [
			{
				title: '背景幂', 
				url: '/pages/background/background', 
			},
			{
				title: '弹出框', 
				url: '/pages/dialog/index', 
			},
			{
				title: '评分组件', 
				url: '/pages/rater/index', 
			}
		]
	}
})
