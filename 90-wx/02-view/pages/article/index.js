// pages/article/index.js
var { articles } = require('../../data/db.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log('onLoad')
   
    //var _this = this;
    this.setData({
       articles: articles
    })
    //console.log('a:::',this.data);
  },
   /**
   * 点击跳转到详细页面
   */
  tapArticleItem:function(event){
     //console.log(event);
    var articleId = event.currentTarget.dataset.articleId;
     wx.navigateTo({
       url: 'article-detail/article-detail?articleId=' + articleId,
     })
  }
 
})