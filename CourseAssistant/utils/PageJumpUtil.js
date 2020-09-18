/**
 * tabbar跳转工具类
 */

let util = require('../utils/util.js');

function jump(isteacher, page) {
  console.log('当前页面：' + util.getCurrentPage());
  // 教师用户跳转
  if (isteacher) {
    console.log('跳转至：' + 'teacher - ' + page);
    // 拼接当前路径
    let path = 'pages/teacher/teacher-' + page + '/teacher-' + page;
    if (util.getCurrentPage() === path) {
      return;
    }
    // 拼接跳转路径
    path = '../teacher-' + page + '/teacher-' + page;
    wx.redirectTo({
      url: path,
    })
  }
  // 学生用户跳转
  else {
    console.log('跳转至：' + 'student - ' + page);
    // 拼接跳转路径
    let path = 'pages/student/student-' + page + '/student-' + page;
    if (util.getCurrentPage() === path) {
      return;
    }
    // 拼接跳转路径
    path = '../student-' + page + '/student-' + page;
    wx.redirectTo({
      url: path,
    })
  }
}


module.exports = {
  jump: jump,
}