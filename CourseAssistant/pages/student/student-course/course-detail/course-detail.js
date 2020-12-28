// pages/student/student-course/course-detail/course-detail.js
var util = require("../../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    tab: [
      // "章节",
      "试卷",
      "资料",
      "话题"
    ]
  },



  //获取登录用户信息
  isLogin() {
    try {
      var loginuser = wx.getStorageSync('loginuser');
      // console.log(loginuser)
      if (loginuser) {
        this.setData({
          loginuser: loginuser
        })
      } else {
        wx.showToast({
          title: '未登录，请登录后重试',
          icon: 'none',
          duration: 3000
        })

        setTimeout(function () {
          wx.navigateTo({
            url: '../../login/login',
          })
        }, 3000);

      }
    } catch (e) {}
  },

  //打开资料
  openData(event) {
    var that = this;
    var datalink = event.currentTarget.dataset.datalink;
    var datatype = event.currentTarget.dataset.datatype;
    // console.log(datalink, datatype);
    if (datatype == 1) { //图片
      that.setData({
        imagePath: datalink
      })
      return;
    } else if (datatype == 3) { //视频
      that.setData({
        videoPath: datalink
      })
      return;
    }
    wx.showToast({
      title: datalink,
      icon: 'none'
    })
    const downloadTask = wx.downloadFile({
      url: datalink,
      success(res) {
        console.log(res);
        if (datatype == 2) { //文档
          wx.openDocument({
            filePath: res.tempFilePath,
            success(res) {
              wx.showToast({
                title: '打开成功',
              })
            },
            fail(res) {
              wx.showToast({
                title: '文档打开失败',
              })
            }
          })
        }
      },
      fail(res) {
        wx.showToast({
          title: '文档下载失败',
          icon: 'none'
        })
      }
    })
    downloadTask.onProgressUpdate((res) => {
      wx.showToast({
        title: "正在加载" + res.progress + "%",
        icon: 'none'
      })
      // console.log("下载进度",res.progress);
      // console.log("已经下载的数据长度",res.totalBytesWritten);
      // console.log("预期需要下载的数据总长度",res.totalBytesExpectedToWrite);
    })
  },
  //隐藏界面
  hideModel() {
    this.setData({
      imagePath: null,
      videoPath: null
    })
  },
  jumpToPaper(event) {
    var paper = event.currentTarget.dataset.paper;
    var currtime = new Date().getTime();
    if (currtime < paper.starttime || currtime > paper.endtime) {
      wx.showToast({
        title: '考试暂未开放',
        icon: 'none'
      })
      return
    }
    var paperid = paper.paperid;
    var papername = paper.papername;
    var starttime = paper.starttime;
    var endtime = paper.endtime;
    var start = paper.start;
    var end = paper.end;
    var choicescore = paper.choicepoints;
    var fillscore = paper.fillpoints;
    var judgescore = paper.judgepoints
    wx.navigateTo({
      url: '../../student-msg/student-paper/student-paper?paperid=' + encodeURIComponent(paperid) + '&papername=' + encodeURIComponent(papername)  + '&start=' + encodeURIComponent(start) + '&end=' + encodeURIComponent(end) + '&choicescore=' + encodeURIComponent(choicescore) + '&fillscore=' + encodeURIComponent(fillscore) + '&judgescore=' + encodeURIComponent(judgescore) + '&starttime=' + encodeURIComponent(starttime) + '&endtime=' + encodeURIComponent(endtime),
    })
  },

  jumpToChapter(event) {
    var chapterid = event.currentTarget.dataset.chapterid;
    wx.navigateTo({
      url: './student-question/student-question?chapterid=' + chapterid,
    })
  },

  jumpToTopic(event) {
    var topic = event.currentTarget.dataset.topic;
    wx.navigateTo({
      url: './student-topic/student-topic?topicid=' + encodeURIComponent(topic.topicid)  + '&title=' + encodeURIComponent(topic.topictitle)  + '&content=' + encodeURIComponent(topic.topiccontent)  + '&time=' + encodeURIComponent(topic.committime) ,
    })
  },
  //跳转到成绩页面
  jumpToScore(event) {
    var score = 0;
    var paperid = event.currentTarget.dataset.paperid;
    var url = "https://fengyezhan.xyz/Interface/paper/findscorebysnoandpaperid";
    var data = {
      studentid: this.data.loginuser.sno,
      paperid: paperid
    }
    util.myAjaxPost(url, data).then(res => {
      if (res.data.code != 200) {
        wx.showToast({
          title: res.data.message,
          icon: 'none'
        })
        return
      }
      score = res.data.data;
      wx.navigateTo({
        url: '../../student-msg/paper-score/paper-score?score=' + score + '&paperid=' + paperid,
      })
    });

  },

  getChapter() {
    //获取该课程的章节信息
    var that = this;
    var chapter_url = 'https://fengyezhan.xyz/Interface/chapter/getchapterbycourseid';
    var chapter_data = {
      courseid: that.data.courseid
    }
    util.myAjaxPost(chapter_url, chapter_data).then(res => {
      // console.log(res.data)
      if (res.data.code != 200) {
        return
      }
      that.setData({
        chapters: res.data.data
      })
    });
  },
  getPaper() {
    var that = this;
    //获取该课程的试卷信息
    var paper_url = 'https://fengyezhan.xyz/Interface/paper/getpaperbycourseidandsno';
    var paper_data = {
      courseid: that.data.courseid,
      studentid: that.data.loginuser.sno
    }
    util.myAjaxPost(paper_url, paper_data).then(res => {
      // console.log(res.data)
      if (res.data.code != 200) {
        return
      }
      var data = res.data.data;
      var len = data.length;
      //格式化时间
      for (var i = 0; i < len; i++) {
        // console.log(data[i].starttime)
        data[i].start = util.formatTime(data[i].starttime, 2);
        data[i].end = util.formatTime(data[i].endtime, 2);
      }
      that.setData({
        papers: data
      })
    });
  },
  getData() {
    var that = this;
    //获取该课程的资料信息
    var data_url = 'https://fengyezhan.xyz/Interface/data/getdatabycourseid';
    var data_data = {
      courseid: that.data.courseid
    }
    util.myAjaxPost(data_url, data_data).then(res => {
      // console.log(res.data)
      if (res.data.code != 200) {
        return
      }
      that.setData({
        datas: res.data.data
      })
    });
  },
  getTopic() {
    var that = this;
    //获取该课程的话题信息
    var topic_url = 'https://fengyezhan.xyz/Interface/topic/gettopicbycid';
    var topic_data = {
      courseid: that.data.courseid
    }
    util.myAjaxPost(topic_url, topic_data).then(res => {
      // console.log(res.data)
      if (res.data.code != 200) {
        return
      }
      that.setData({
        topics: res.data.data
      })
    });
  },
  //获取本页面需要的所有数据
  getAllData(options) {
    var that = this;
    var courseid = options.courseid;
    // console.log('courseid:' + courseid);
    this.setData({
      courseid: courseid
    })

    //获取该课程的章节信息
    this.getChapter();

    this.getPaper();

    this.getData();

    this.getTopic();

  },


  // longPressChapter() { 
  //   console.log('长按章节');
  // },

  // longPressPaper() {
  //   console.log('长按试卷');
  // },

  // longPressData() {
  //   console.log('长按资料');
  // },

  // longPressTopic() {
  //   console.log('长按话题');
  // },

  // 切换导航栏
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })

    // console.log('当前页面：' + this.data.tab[this.data.TabCur]);

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.isLogin();
    this.getAllData(options);
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
    //显示顶部刷新图标
    wx.showNavigationBarLoading();

    var Tabcur=this.data.TabCur;
    if(Tabcur==0){
      this.getPaper();
    }else if(Tabcur==1){
      this.getData();
    }else if(Tabcur==2){
      this.getTopic();
    }
    //隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    //停止下拉事件
    wx.stopPullDownRefresh();
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