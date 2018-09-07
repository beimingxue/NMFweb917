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
       this.loadUserInfo();
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
    loadUserInfo:function(){

    },  
    loadCartInfo:function(){

    }
}

module.exports = nav.init();