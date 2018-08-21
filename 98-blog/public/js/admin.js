(function($){
	 $('#logout').on('click',function(){
          console.log('aa');
          $.ajax({
               url:"/user/logout",
               dataType:'json',
               type:'get'
          })
          .done(function(result){
               if(result.code == 0){
                    /*$userInfo.hide();
                    $login.show();*/
                    //window.location.reload();

                    //当前浏览器指向跟
                    window.location.href = '/'  
               }
          })
          .fail(function(err){
               console.log(err)
          })        
     });
})(jQuery)