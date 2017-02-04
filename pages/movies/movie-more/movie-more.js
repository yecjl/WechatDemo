var util = require("../../../utils/util.js");
var app = getApp();

Page({
  data: {
    movies: {},
    isEmpty: true,
    currentPage: 0,
    currentUrl: "",
    currentCategory: ""
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.data.currentCategory = options.movieCategory;
    // 页面初始化 options为页面跳转所带来的参数
    switch (this.data.currentCategory) {
      case app.globalData.g_inTheaters.value:
        this.data.currentUrl = app.globalData.g_inTheaters.url;
        break;
      case app.globalData.g_comingSoon.value:
        this.data.currentUrl = app.globalData.g_comingSoon.url;
        break;
      case app.globalData.g_top250.value:
        this.data.currentUrl = app.globalData.g_top250.url;
        break;
    }

    // 动态设置Title
    wx.setNavigationBarTitle({
      title: this.data.currentCategory
    });

    // 请求电影集合
    util.getMovieListData(this.data.currentUrl, this.data.currentPage, 20, "movieData", this.data.currentCategory, this.callBack);
  },

  callBack: function (movies, settedKey, categorytitle) {  // 请求电影集合的回调
    // 判断当前的总数据集合是否空，如果为空就赋值，否者就追加。
    var totalMovies = {};
    if (this.data.isEmpty) {
      totalMovies = movies;
      this.data.isEmpty = false;
    } else {
      totalMovies = this.data.movies.concat(movies);
    }
    this.setData({
      movies: totalMovies
    });
    this.data.currentPage = this.data.currentPage + movies.length;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },

  onPullDownRefresh: function (event) { // 下拉刷新(MINA在Page里还提供了一个onPullDownRefresh)
    console.log("下拉刷新");
    util.getMovieListData(this.data.currentUrl, this.data.currentPage = 0, 20, "movieData", this.data.currentCategory, this.callBack);
    this.data.movies = {};
    this.data.isEmpty = true;
    wx.showNavigationBarLoading();
  },

  onReachBottom: function (event) { // 上拉加载(MINA在Page里还提供了一个onReachBottom)
    console.log("上拉加载");
    util.getMovieListData(this.data.currentUrl, this.data.currentPage, 20, "movieData", this.data.currentCategory, this.callBack);
    wx.showNavigationBarLoading();
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