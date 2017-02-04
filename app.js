App({
    globalData: {
        g_isPlayingMusic: false,
        g_currentMusicPostId: null,
        g_doubanBaseUrl: "https://api.douban.com",
        g_inTheaters: {
            key: "inTheaters",
            value: "正在上映",
            url: "https://api.douban.com" + "/v2/movie/in_theaters"
        },
        g_comingSoon: {
            key: "comingSoon",
            value: "即将上映",
            url: "https://api.douban.com" + "/v2/movie/coming_soon"
        },
        g_top250: {
            key: "top250",
            value: "豆瓣Top250",
            url: "https://api.douban.com" + "/v2/movie/top250"
        }
    },
    onLaunch: function () {
        console.log("App onLaunch");
    },
    onShow: function () {
        console.log("App onShow");
    },
    onHide: function () {
        console.log("App onHide");
    },
    onError: function (msg) {
        console.log("App onError" + msg);
    }
})