// pages/movies/movie.js
var util = require("../../../utils/util.js");
var app = getApp();

Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    // 请求电影集合
    util.getMovieListData(
      app.globalData.g_inTheaters.url,
      0, 3,
      app.globalData.g_inTheaters.key,
      app.globalData.g_inTheaters.value,
      this.callBack);
    util.getMovieListData(
      app.globalData.g_comingSoon.url,
      0, 3,
      app.globalData.g_comingSoon.key,
      app.globalData.g_comingSoon.value,
      this.callBack);
    util.getMovieListData(
      app.globalData.g_top250.url,
      0, 3,
      app.globalData.g_top250.key,
      app.globalData.g_top250.value,
      this.callBack);
  },

  callBack: function (movies, settedKey, categorytitle) {  // 请求电影集合的回调

    var readyData = {};
    readyData[settedKey] = {
      movies: movies,
      categorytitle: categorytitle
    };
    this.setData(readyData);

  },

  onMoreMovie: function (event) { // 点击更多
    console.log("movie-more click me! " + event.currentTarget.dataset.moviecategory);
    wx.navigateTo({
      url: '../movie-more/movie-more?movieCategory=' + event.currentTarget.dataset.moviecategory,
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onBindConfirm: function (event) { // 点击完成按钮时触发
    console.log("点击完成: " + event.detail.value);
  },

  onBindBlur: function (event) { // 输入框失去焦点时触发
    console.log("输入框失去焦点: " + event.detail.value);
  },

  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})