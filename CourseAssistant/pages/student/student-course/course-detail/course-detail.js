// pages/student/student-course/course-detail/course-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tab: [
      "章节",
      "试卷",
      "资料",
      "话题"
    ],

    // 模拟数据
    chapters: [{
      chapterid: 1,
      courseid: 1,
      chaptername: '第一章：测试章节'
    }, {
      chapterid: 2,
      courseid: 1,
      chaptername: '第二章：斗气大陆'
    }],
    papers: [{
      paperid: 1,
      courseid: 1,
      papername: '这是一张测试试卷！！！',
      choicepoints: 3,
      judgepoints: 2,
      fillpoints: 1,
      starttime: 1600784923293,
      endtime: 1600784923293,
      status: 1
    }],
    datas: [{
      dataid: 1,
      courseid: 1,
      dataname: '这是一个图片资料',
      datalink: 'https://fyz1522426323.oss-cn-beijing.aliyuncs.com/bg.png',
      datatype: 1,
      total: 3
    }],
    topics: [{
      topicid: 1,
      courseid: 1,
      topictitle: '测试话题',
      topiccontent: '仅供测试',
      committime: 1600784923293,
      topicstatus: 1
    }]
  },



  jumpToChapter() {
    console.log('跳转到章节');
  },

  jumpToPaper() {
    console.log('跳转到试卷');
  },

  downloadData() {
    console.log('跳转到资料');
  },

  jumpToTopic() {
    console.log('跳转到话题');
  },

  longPressChapter() {
    console.log('长按章节');
  },

  longPressPaper() {
    console.log('长按试卷');
  },

  longPressData() {
    console.log('长按资料');
  },

  longPressTopic() {
    console.log('长按话题');
  },

  // 切换导航栏
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })

    console.log('当前页面：' + this.data.tab[this.data.TabCur]);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})