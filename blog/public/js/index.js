(function($){
     var $register = $('#register');
     var $login = $('#login');
     //console.log($login);
     
     $('#go-register').on('click',function(){
     	$login.hide();
     	$register.show();
     });
     $('#go-login').on('click',function(){
     	$register.hide();
     	$login.show();
     })


     //用户注册处理

})(jQuery)