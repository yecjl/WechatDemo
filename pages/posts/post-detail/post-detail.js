var postsData = require("../../../data/posts-data.js");
var app = getApp(); // 获取全局应用程序

Page({
  data: {},
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var postId = options.id;
    var postData = postsData.postList[postId];
    console.log("post-detail postId:" + postId);
    // var postsCollectioned = {
    //   1:false,
    //   2:true,
    // };
    // 获取缓存中的收藏
    var postsCollected = wx.getStorageSync('posts_collected');
    if (!postsCollected) {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    // 设置数据
    this.setData({
      postId: postId,
      postData: postData,
      isCollected: postsCollected[postId],
      isPlay: app.globalData.g_currentMusicPostId == postId ? app.globalData.g_isPlayingMusic : false
    });

    // 设置音乐数据监听
    this.setMusicMonitor();
  },

  setMusicMonitor: function () { // 设置音乐数据监听
    var that = this;
    // wx.getBackgroundAudioPlayerState({
    //   success: function (res) {
    //     // success
    //     var status = res.status;
    //     that.setData({
    //       isPlay: status == 1 ? true : false
    //     });

    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // });

    // 监听后台是否播放音乐
    wx.onBackgroundAudioPlay(function () {
      // callback
      // 保存到全局变量中
      app.globalData.g_isPlayingMusic = true;
      that.setData({
        isPlay: app.globalData.g_currentMusicPostId == that.data.postId ? app.globalData.g_isPlayingMusic : false
      });
    });
    // 监听后台是否暂停播放音乐
    wx.onBackgroundAudioPause(function () {
      // callback
      app.globalData.g_isPlayingMusic = false;
      that.setData({
        isPlay: app.globalData.g_currentMusicPostId == that.data.postId ? app.globalData.g_isPlayingMusic : false
      });
    });
    // 监听后台是否音乐播放停止
    wx.onBackgroundAudioStop(function () {
      // callback
      app.globalData.g_isPlayingMusic = false;
      that.setData({
        isPlay: app.globalData.g_currentMusicPostId == that.data.postId ? app.globalData.g_isPlayingMusic : false
      });
    });
  },

  onCollectionTap: function (event) { // 收藏操作
    this.onCollectionSync();
    // this.onCollectionAsy();
  },

  onCollectionAsy: function () { // 异步方法
    var that = this;
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        // success
        var postsCollected = res.data;
        var isCollected = !postsCollected[that.data.postId];
        // 判断是否收藏和取消
        if (isCollected) {
          // 收藏
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 1000
          });
          that.onSaveStorage(isCollected, postsCollected);
        } else {
          // 取消
          wx.showModal({
            title: '取消',
            content: '是否取消该文章？',
            success: function (res) {
              if (res.confirm) {
                that.onSaveStorage(isCollected, postsCollected);
              }
            }
          });
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  onCollectionSync: function () { // 同步方法
    // 从缓存中获取数据
    var postsCollected = wx.getStorageSync('posts_collected');
    var isCollected = !postsCollected[this.data.postId];
    // 判断是否收藏和取消
    if (isCollected) {
      // 收藏
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration: 1000
      });
      this.onSaveStorage(isCollected, postsCollected);
    } else {
      // 取消
      var that = this;
      wx.showModal({
        title: '取消',
        content: '是否取消该文章？',
        success: function (res) {
          if (res.confirm) {
            that.onSaveStorage(isCollected, postsCollected);
          }
        }
      });
    }
  },

  onShareTap: function (event) { // 分享操作
    var itemList = ['分享给微信好友', '分享到朋友圈', '分享到QQ', '分享到微博'];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex != undefined) {
          wx.showToast({
            title: '分享' + itemList[res.tapIndex] + '成功',
            icon: 'success',
            duration: 1000
          });
        }

      }, fail: function (res) {
        console.log(res.errMsg)
      }
    });
  },

  onSaveStorage: function (isCollected, postsCollected) { // 重新将数据保存到缓存中
    postsCollected[this.data.postId] = isCollected;
    wx.setStorageSync('posts_collected', postsCollected);
    // 将数据保存到页面中,从而实现页面图片的切换
    this.setData({
      isCollected: isCollected,
    });
  },

  onMusicTap: function (event) {
    var isPlay = !this.data.isPlay;
    var that = this;
    if (isPlay) {
      wx.playBackgroundAudio({
        dataUrl: this.data.postData.music.url,
        title: this.data.postData.music.title,
        coverImgUrl: this.data.postData.music.coverImg,
        success: function (res) {
          // success
          that.setData({
            isPlay: isPlay
          });
          app.globalData.g_currentMusicPostId = that.data.postId;
        }
      });
    } else {
      wx.pauseBackgroundAudio({
        success: function (res) {
          // success
          that.setData({
            isPlay: isPlay
          });
          app.globalData.g_currentMusicPostId = that.data.postId;
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      });
    }
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
  },
})