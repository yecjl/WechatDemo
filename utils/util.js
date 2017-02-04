/**
 * 转换为星星评分数组
 */
function convertToStarsArray(stars) {
    var starsArray = [0, 0, 0, 0, 0]; // 初始化全灰星
    var starsFirst = stars.toString().substring(0, 1);
    var starsSeconde = stars.toString().substring(1);
    for (var i = 0; i < 5; i++) {
        if (i < starsFirst) {
            starsArray[i] = 1; // 表示全星
        } else if (i == starsFirst && starsSeconde == 5) {
            starsArray[i] = 2; // 表示半颗星
        }
    }

    return starsArray;
}

/**
 * 发起Http 请求
 */
function http(url, method, data, callBack) {
    wx.request({
        url: url,
        data: data,
        method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
            "Content-Type": "json"
        }, // 设置请求的 header
        success: function (res) {
            // success
            console.log(res);
            callBack(res.data);
        },
        fail: function (error) {
            // fail
            console.log(error);
        },
        complete: function () {
            // complete
        }
    })
}

function httpGet(url, data, callBack) {
    http(url, 'GET', data, callBack);
}

/**
 * 获取电影列表数据
 */
function getMovieListData(url, start, count, settedKey, categorytitle, callBack) {
    httpGet(url, {
        "start": start,
        "count": count
    }, function callBackHttp(res) {
        callBack(processDoubanData(res), settedKey, categorytitle);
    });
}

/**
 * 处理豆瓣的数据
 */
function processDoubanData(moviesDouban) {
    var movies = [];

    for (var index in moviesDouban.subjects) {
        var movieDouban = moviesDouban.subjects[index];

        // 获取id
        var movieId = movieDouban.id;

        // 获取标题
        var movieTitle = movieDouban.title;
        if (movieTitle.length >= 6) {
            movieTitle = movieTitle.substring(0, 6) + "...";
        }

        // 获取图片
        var coverageUrl = movieDouban.images.large;

        // 获取评分
        var average = movieDouban.rating.average;

        // 获取星星分数
        var stars = convertToStarsArray(movieDouban.rating.stars);

        var movie = {
            movieId: movieId,
            movieTitle: movieTitle,
            coverageUrl: coverageUrl,
            average: average,
            stars: stars,
        };
        movies.push(movie);
    }

    return movies;
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    getMovieListData: getMovieListData,
}