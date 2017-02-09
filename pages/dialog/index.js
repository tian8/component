// pages/dialog/index.js

var app = getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.dialog = app.wxui(this).dialog;
    //console.log(ddddd);
  },
  showChange(){
      this.dialog.show({
        title: '弹窗标题',
			  content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
			  confirm: () => console.log('confirm'),
			  cancel: () => console.log('cancel'),
      })
  },
  showMessage(){
        this.dialog.show({
        showCancel: !1,
        title: '弹窗标题',
			  content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内',
			  confirm: () => console.log('confirm'),
      })
  }
})