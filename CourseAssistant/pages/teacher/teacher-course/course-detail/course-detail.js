// pages/teacher-course/course-detail/course-detail.js
var util = require("../../../../utils/util.js");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 当前选中页面
    TabCur: 0,
    scrollLeft: 0,
    tab: [
      "章节",
      "试卷",
      "资料",
      "话题"
    ],
    addChapter: false,
    addPaper: false,
    addData: false,
    addTopic: false,

    modalName: null,


    // 当前选择的资料
    currData: 0
  },

  getChapter(){
    //获取该课程的章节信息
    var that=this;
    var chapter_url = 'https://fengyezhan.xyz/Interface/chapter/getchapterbycourseid';
    var chapter_data = {
      courseid: that.data.courseid
    }
    util.myAjaxPost(chapter_url, chapter_data).then(res => {
      console.log(res.data)
      if (res.data.code != 200) {
        return
      }
      that.setData({
        chapters: res.data.data
      })
    });
  },
  getPaper(){
    var that=this;
    //获取该课程的试卷信息
    var paper_url = 'https://fengyezhan.xyz/Interface/paper/getpaperbycourseid';
    var paper_data = {
      courseid: that.data.courseid
    }
    util.myAjaxPost(paper_url, paper_data).then(res => {
      console.log(res.data)
      if (res.data.code != 200) {
        return
      }
      that.setData({
        papers: res.data.data
      })
    });
  },
  getData(){
    var that=this;
    //获取该课程的资料信息
    var data_url = 'https://fengyezhan.xyz/Interface/data/getdatabycourseid';
    var data_data = {
      courseid: that.data.courseid
    }
    util.myAjaxPost(data_url, data_data).then(res => {
      console.log(res.data)
      if (res.data.code != 200) {
        return
      }
      that.setData({
        datas: res.data.data
      })
    });
  },
  getTopic(){
    var that=this;
    //获取该课程的话题信息
    var topic_url = 'https://fengyezhan.xyz/Interface/topic/gettopicbycid';
    var topic_data = {
      courseid: that.data.courseid
    }
    util.myAjaxPost(topic_url, topic_data).then(res => {
      console.log(res.data)
      if (res.data.code != 200) {
        return
      }
      that.setData({
        topics: res.data.data
      })
    });
  },

  /**
   * 获取本页面需要的所有数据
   * @param {} options 
   */
  getAllData(options) {
    var that = this;
    var courseid = options.courseid;
    console.log('courseid:' + courseid);
    this.setData({
      courseid: courseid
    })

    //获取该课程的章节信息
    this.getChapter();

    this.getPaper();

    this.getData();

    this.getTopic();
    
  },

  jumpToPaper(event) {
    var paperid = event.currentTarget.dataset.paperid;
    wx.navigateTo({
      url: './teacher-paper/teacher-paper?paperid=' + paperid,
    })
  },

  jumpToChapter(event) {
    var chapterid = event.currentTarget.dataset.chapterid;
    wx.navigateTo({
      url: './teacher-question/teacher-question?chapterid=' + chapterid,
    })
  },

  jumpToTopic(event) {
    var topic = event.currentTarget.dataset.topic;
    wx.navigateTo({
      url: './teacher-topic/teacher-topic?topicid=' + topic.topicid + '&title=' + topic.topictitle + '&content=' + topic.topiccontent,
    })
  },


  // 显示模态框
  showWsModel(name) {
    this.setData({
      modalName: name
    });
  },

  // 隐藏模态框
  hideWsModel() {
    this.setData({
      modalName: null,
      currData: 0
    });
  },

  // 长按章节
  longPressChapter(e) {


    let id = e.currentTarget.dataset.id;
    // console.log('长按资料 ' + id);
    this.setData({
      currData: id
    });
    // 弹出对话框
    this.showWsModel('chapter');

  },

  // 长按试卷
  longPressPaper(e) {
    this.showWsModel('paper');
  },

  // 长按资料
  longPressData(e) {
    let id = e.currentTarget.dataset.id;
    // console.log('长按资料 ' + id);
    this.setData({
      currData: id
    });
    // 弹出对话框确认删除
    this.showWsModel('data');
  },

  // 删除资料
  deleteData() {
    let id = this.data.currData;
    if (!id) {
      return;
    }
    console.log('删除资料' + id);
    // 调用接口删除

    // 刷新页面

    // 隐藏掉模态框
    this.hideWsModel();
  },

  // 长按话题
  longPressTopic(e) {
    let item = e.currentTarget.dataset.topic;
    // 弹出模态框
    this.showWsModel('topic');
  },

  downloadData(event) {
    var that = this;
    var datalink = event.currentTarget.dataset.datalink;
    var datatype = event.currentTarget.dataset.datatype;
    console.log(datalink, datatype);
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
  /**
   * 实现图片预览
   */
  previewImg: function (event) {
    var img = this.data.imagePath;
    var imgs = [img, ]
    wx.previewImage({
      current: img,
      urls: imgs,
    })
  },
  /**
   * 发布试卷
   */
  releasePaper(event) {
    var that = this;
    var paperidx = event.currentTarget.dataset.paperidx;
    var courseid = that.data.courseid;
    var papers = that.data.papers;
    if (papers[paperidx].status == 1) {
      wx.showToast({
        title: '该试卷已发布,请勿重复发布',
        icon: 'none'
      })
      return;
    } else if (papers[paperidx].status == 2) {
      wx.showToast({
        title: '该试卷已结束,不允许发布',
        icon: 'none'
      })
      return;
    }

    var url = "https://fengyezhan.xyz/Interface/paper/releasepaper";
    var data = {
      paperid: papers[paperidx].paperid,
      courseid: courseid
    }
    util.myAjaxPost(url, data).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      if (res.data.code != 200) {
        return;
      }

      papers[paperidx].status = 1;
      that.setData({
        papers: papers
      })
    })

  },
  /**
   * 添加话题
   */
  addTopic(event) {
    var that = this;
    var title = event.detail.value.title;
    var content = event.detail.value.content;
    var courseid = parseInt(this.data.courseid);
    var time = new Date().getTime();
    var loginuser = that.data.loginuser;
    var url = "https://fengyezhan.xyz/Interface/topic/addtopic";
    var data = {
      user: loginuser.tno,
      pwd: loginuser.pwd,
      courseid: courseid,
      topictitle: title,
      topiccontent: content,
      committime: time,
      topicstatus: 0
    }
    console.log(data)
    util.myAjaxPost(url, data).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      that.setData({
        addTopic: !that.data.addTopic
      })
      if (res.data.code != 200) {
        return;
      }
      //更新数据
      this.getTopic();


    })
  },
  /**
   * 发布话题
   */
  releaseTopic(event) {
    var that = this;
    var loginuser = that.data.loginuser;
    var idx = event.currentTarget.dataset.idx;
    var topics = that.data.topics;
    // console.log(topics);
    // console.log(idx)
    if (topics[idx].topicstatus == 1) {
      wx.showToast({
        title: '该话题已发布,请勿重复发布',
        icon: 'none'
      })
      return;
    }

    var url = "http://fengyezhan.xyz/Interface/topic/updatetopic";
    var data = {
      user: loginuser.tno,
      pwd: loginuser.pwd,
      topicid: topics[idx].topicid,
      status: 1
    }
    util.myAjaxPost(url, data).then(res => {
      wx.showToast({
        title: res.data.message,
        icon: 'none'
      })
      if (res.data.code != 200) {
        return;
      }

      topics[idx].topicstatus = 1;
      that.setData({
        topics: topics
      })
    })

  },


  /**
   * 显示或隐藏界面
   */
  showOrhidenModel(event) {
    var type = event.currentTarget.dataset.type;
    if (type == 1) {
      this.setData({
        addChapter: !this.data.addChapter
      })
    } else if (type == 2) {
      this.setData({
        addPaper: !this.data.addPaper
      })
    } else if (type == 3) {
      this.setData({
        addData: !this.data.addData
      })
    } else if (type == 4) {
      this.setData({
        addTopic: !this.data.addTopic
      })
    }

  },
  /**
   * 隐藏界面
   */
  hideModel() {
    this.setData({
      imagePath: null,
      videoPath: null
    })
  },

  /**
   * 获取登录用户信息
   */
  isLogin() {
    try {
      var loginuser = wx.getStorageSync('loginuser');
      console.log(loginuser)
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