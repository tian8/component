// pages/rater/index.js
var app = getApp();
Page({
  data:{},
  onLoad:function(options){
    this.rater = app.wxui(this).rater;

		var s = this.rater.render('star', {
			value: 5, 
		});
		this.rater.render('changeColor', {
			value: 4, 
			activeColor: '#04BE02', 
		});
		this.rater.render('loving', {
			value: 3, 
			star: '♡', 
		});
		this.rater.render('airplane', {
			value: 2, 
			star: '✈',
		});
		this.rater.render('smilies', {
			value: 1, 
			star: '☻', 
		});
		console.log(this.data.wxui.rater.star);
  },
})