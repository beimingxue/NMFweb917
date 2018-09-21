// pages/article/article-detail/article-detail.js
var { articles } = require('../../../data/db.js');
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
     //console.log(options);
     var articleId = options.articleId;

     //设置文章的详细内容
     var article = articles[articleId];
     this.setData(article)

     //设置收藏状态
     /*
      {
        0:'false',
        1:'true
      }
     */
    var articlesCollection = wx.getStorageSync('articles_collection');
    var currentIsCollected = false;
    if(articlesCollection){

       var currentIsCollected = !!articlesCollection[articleId];
    }else{
        var data = {};
        data[articleId] = false;
        wx.setStorageSync('articles_collection',data)
    }
    this.setData({
        currentIsCollected:currentIsCollected
    })
  },
  
  /** 
   * 处理收藏
   */
  tapCollection:function(){
    var articlesCollection = wx.getStorageSync('articles_collection');
    var currentIsCollected = articlesCollection[this.data.articleId];
    console.log(currentIsCollected);
    //改变storage里面的值
    articlesCollection[this.data.articleId] = !currentIsCollected;
    wx.setStorageSync('articles_collection', articlesCollection);
    //改变页面总图片显示
    this.setData({
      currentIsCollected: !currentIsCollected
    })
    wx.showToast({
      title: currentIsCollected ? '取消成功' : '收藏成功'
    })

  },
  /** 
   * 处理分享
   */
  tapShare:function(){
     var itemList = ['分享微信','分享微博','分享QQ'];
     wx.showActionSheet({
        itemList:itemList,
        success:function(res){
          //console.log(res);
          wx.showToast({
             title:itemList[res.tapIndex] + '成功'
          })
        }
     })
  },
    /** 
   * 处理分享
   */
  tapMusic:function(){
    console.log('a')
  }


})
