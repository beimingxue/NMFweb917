require('./index.css');
var _user = require('service/user');
var _util = require('util')
/*$(function(){
    $('#logout').on('click',function(){
            console.log('aaaa');
            alert('aa')
        })
})*/
var nav ={
    init:function(){
       this.bindEvent();
       this.loadUsername();
       this.loadCartInfo();
       return this;
    },
    bindEvent:function(){
        $('#logout').on('click',function(){
            	_user.logout(function(result){
                    window.location.reload();   
                },function(message){
                    _util.showErrorMsg(message);
            });
        })
    },
    loadUsername:function(){
        _user.getUsername(function(user){
            $('.not-login').hide();
            $('.login')
            .show()
            .find('.username')
            .text(user.username)
        })
    },  
    loadCartInfo:function(){

    }
}

module.exports = nav.init();