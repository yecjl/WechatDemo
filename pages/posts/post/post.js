var postsData = require("../../../data/posts-data.js");

Page({
  data: {
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log("onLoad");

    this.setData({
      post_key: postsData.postList,
    });
  },

  onDetailTap: function (event) { // 跳转详情
    var postId = event.currentTarget.dataset.postid;
    console.log("post-detail click me! "
      + "postId: " + event.currentTarget.dataset.postid
      + ", postName: " + event.currentTarget.dataset.postName);
    wx.navigateTo({
      url: '../post-detail/post-detail?id=' + postId,
      success: function (res) {
        // success
        console.log("post-detail success")
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onSwiperTap: function (event) { // swiper 跳转详情
    // target指的是当前点击的组件，currentTarget指的是事件捕获的组件。
    // target这里指的是image, currentTarget这里指的是swiper组件。
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: '../post-detail/post-detail?id=' + postId,
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

  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    console.log("onReady");
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    console.log("onShow");
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    console.log("onHide");
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    console.log("onUnload");
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    console.log("onPullDownRefresh");
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    console.log("onReachBottom");
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})