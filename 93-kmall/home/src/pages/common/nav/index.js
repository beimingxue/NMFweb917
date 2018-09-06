require('./index.css');

var nav ={
    init:function(){
       this.bindEvent();
       this.loadUserInfo();
       this.loadCartInfo();
    },
    bindEvent:function(){
        $('#logout').on('click',function(){
        	
        })
    },
    loadUserInfo:function(){

    },
    loadCartInfo:function(){

    }
}

module.exports = nav;