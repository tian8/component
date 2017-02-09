// pages/background/background.js

const app = getApp();
Page({
  data:{
      lock:0
  },
  onLoad:function(options){
    this.background = app.wxui(this).background;
    console.log("ssssssssssssss");
  },
  retain(){
    this.background.retain();
    this.setData({
        lock:this.background.backgroundHolds
    });
  },
  release(){
    this.background.release();
    this.setData({
        lock:this.background.backgroundHolds
    });
  }
})