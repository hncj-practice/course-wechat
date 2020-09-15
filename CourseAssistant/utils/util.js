function getCurrentPage() {
  var pages = getCurrentPages();
  var currentPage = pages[pages.length - 1];
  var url = currentPage.route;
  return url;
}

function myAjaxPost(url, data){
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: "POST",
      header:{
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: data,
      success: res => resolve(res)
    })
  })
}

function myAjaxGet (url){
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: "GET",
      success: res => resolve(res)
    })
  })
}

module.exports = {
  getCurrentPage: getCurrentPage,
  myAjaxPost: myAjaxPost,
  myAjaxGet: myAjaxGet,
}