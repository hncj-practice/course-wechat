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
    ]
  },

  /**
   * 获取本页面需要的所有数据
   * @param {} options 
   */
  getData(options) {
    var that = this;
    var courseid = options.courseid;
    console.log('courseid:' + courseid);
    this.setData({
      courseid: courseid
    })

    //获取该课程的章节信息
    var chapter_url = 'https://fengyezhan.xyz/Interface/chapter/getchapterbycourseid';
    var chapter_data = {
      courseid: courseid
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

    //获取该课程的试卷信息
    var paper_url = 'https://fengyezhan.xyz/Interface/paper/getpaperbycourseid';
    var paper_data = {
      courseid: courseid
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

    //获取该课程的资料信息
    var data_url = 'https://fengyezhan.xyz/Interface/data/getdatabycourseid';
    var data_data = {
      courseid: courseid
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

    //获取该课程的话题信息
    var topic_url = 'https://fengyezhan.xyz/Interface/topic/gettopicbycid';
    var topic_data = {
      courseid: courseid
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
      url: './teacher-topic/teacher-topic?topicid=' + topic.topicid+'&title='+topic.topictitle+'&content='+topic.topiccontent,
    })
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
    if(papers[paperidx].status==1){
      wx.showToast({
        title: '该试卷已发布,请勿重复发布',
        icon:'none'
      })
      return;
    }else if(papers[paperidx].status==2){
      wx.showToast({
        title: '该试卷已结束,不允许发布',
        icon:'none'
      })
      return;
    }

    var url = "http://fengyezhan.xyz/Interface/paper/releasepaper";
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
   * 隐藏图片
   */
  hideModel() {
    this.setData({
      imagePath: null,
      videoPath: null
    })
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
    this.getData(options);
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