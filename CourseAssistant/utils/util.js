function getCurrentPage() {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var url = currentPage.route;
  return url;
}

function myAjaxPost(url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: res => resolve(res)
    })
  })
}

function myAjaxGet(url) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: "GET",
      success: res => resolve(res)
    })
  })
}

function add0(m) {
  return m < 10 ? '0' + m : m
}

function format(timestamp) {
  //shijianchuo是整数，否则要parseInt转换
  var time = new Date(parseInt(timestamp));
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  var h = time.getHours();
  var mm = time.getMinutes();
  var s = time.getSeconds();
  return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}

module.exports = {
  getCurrentPage: getCurrentPage,
  myAjaxPost: myAjaxPost,
  myAjaxGet: myAjaxGet,
  formatTime:format
}