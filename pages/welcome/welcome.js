Page({
    data: {

    },
    onTap: function (event) {
        console.log("post click me!");
        wx.switchTab({
            url: '../posts/post/post',
            success: function (res) {
                // success
            },
            fail: function () {
                // fail
            },
            complete: function () {
                // complete
            }
        });
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        console.log("onLoad");
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
    onShareAppMessage: function () {
        // 用户点击右上角分享
        return {
            title: 'title', // 分享标题
            desc: 'desc', // 分享描述
            path: 'path' // 分享路径
        }
    }
})