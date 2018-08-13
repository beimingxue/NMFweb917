//前台注册逻辑
(function($){
     var $register = $('#register');
     var $login = $('#login');
     var $userInfo = $('#user-info');
     var $logout = $('#logout');
     //console.log($userInfo);
    
     $('#go-register').on('click',function(){
     	$login.hide();
     	$register.show();
     });
     $('#go-login').on('click',function(){
     	$register.hide();
     	$login.show();
     });
     /*$('#logout').on('click',function(){
          $userInfo.hide();
          $register.show();
     })*/
     
     //验证的正则
     var usernameReg = /^[a-z][a-z|0-9|_]{2,9}$/i;
     var passwordReg = /^\w{3,10}$/;


     //用户注册处理
     $('#sub-register').on('click',function(){
          //获取数据
          var username = $register.find("[name='username']").val();
          var password = $register.find("[name='password']").val();
          var repassword = $register.find("[name='repassword']").val();

          var errMsg = '';
          //验证
          //用户名:以字母开头包含数字字母和下划线,3-10个字符
          if(!usernameReg.test(username)){
               errMsg = '用户名以字母开头包含数字字母和下划线,3-10个字符'
          }
          //密码:3-10个字符
          else if(!passwordReg.test(password)){
               errMsg = '密码为3-10个字符'
          }
          else if(password != repassword){
               errMsg = '两次密码不一致'
          }

          if(errMsg){//验证不通过
               //显示错误信息
               $register.find('.err').html(errMsg);
               return;
          }else{
               $register.find('.err').html('');
               //发送数据到后端(ajax)
               $.ajax({
                    url:"/user/register",
                    data:{
                         username:username,
                         password:password
                    },
                    type:'post',
                    dataType:'json'       //指定类型为json
               })
               .done(function(result){
                    if(result.code === 0){//注册成功
                         $('#go-login').trigger('click')  //登录面板显示 注册面板消失
                    }else{
                         $register.find('.err').html(result.message)
                    }
               })
               .fail(function(err){
                    console.log(err)
               })
          }    
     })

     //用户登录 (未完成)

          $('#sub-login').on('click',function(){
               //console.log('aa');
          //获取数据
          var username = $login.find("[name='username']").val();
          var password = $login.find("[name='password']").val();

          var errMsg = '';
          var $err = $login.find('.err');
          //验证
          //用户名:以字母开头包含数字字母和下划线,3-10个字符
          if(!usernameReg.test(username)){
               errMsg = '用户名以字母开头包含数字字母和下划线,3-10个字符'
          }
          //密码:3-10个字符
          else if(!passwordReg.test(password)){
               errMsg = '密码为3-10个字符'
          }

          if(errMsg){//验证不通过
               //显示错误信息
               $err.html(errMsg)
               return;
          }else{
               $err.html('')
               //发送数据到后端(ajax)
               $.ajax({
                    url:"/user/login",
                    data:{
                         username:username,
                         password:password
                    },
                    type:'post',
                    dataType:'json'
               })
               .done(function(result){
                    console.log(result);
                    if(result.code === 0){//登录成功
                         //console.log(result.username);
                         $login.hide();
                         $userInfo.find('span').html(result.username)
                         $userInfo.show(); 
                         
                         //刷新当前页面(首页)
                         //window.location.reload();
                    }else{
                         $err.html(result.message)
                    }
               })
               .fail(function(err){
                    console.log(err)
               })
          }              
     })
     //用户退出
     $('#logout').on('click',function(){
          console.log('aa');
          $.ajax({
               url:"/user/logout",
               dataType:'json',
               type:'get'
          })
          .done(function(result){
               if(result.code == 0){
                    $userInfo.hide();
                    $login.show();
                    //window.location.reload();
               }
          })
          .fail(function(err){
               console.log(err)
          })        
     });

   //发送文章列表的请求
   $('#page').on('click','a',function(){
       //console.log(this);
       //let page = $(this).html();
       let $this = $(this);
       //console.log('10::',page);
       let page = 1;
       let currentPage = $('#page').find('.active a').html();
       console.log('25',currentPage);
       let label = $this.attr('aria-label');
       //attr() 方法设置或返回被选元素的属性值
       if(label == 'Previous'){ //上一页
             page = currentPage - 1;
       }else if(label == 'Next'){ //下一页
             //console.log('hb');
             page = currentPage*1 + 1;
       }else{
          page = $(this).html();
       }

       var query = 'page=' + page;

       var category = $('#cate-id').val();

          if(category){
               query += "&category="+category;
          }

       $.ajax({
          url:'/articles?'+ query,
          //url:'/articles',
          type:'get',
          dataType:'json',

       })
       .done(function(result){
          if(result.code == 0){
               buildArticleList(result.data.docs);
          }
           console.log(result);
       })
       .fail(function(err){
          console.log(err);
       })
   })
   function buildArticleList(articles){
       var html = '';

       for(var i=0;i<articles.length;i++){
          var data = moment(articles[i].createdAt).format('YYYY年MM月DD日 HH:mm:ss ');
          html += `<div class="panel panel-default content-item">
                 <div class="panel-heading">
                   <h3 class="panel-title">
                    <a href="/view/${articles[i]._id}" class="link" target="_blank">${ articles[i].title }</a>
                    </h3>
                 </div>
                 <div class="panel-body">
                    ${ articles[i].intro }
                 </div>
                 <div class="panel-footer">
                    <span class="glyphicon glyphicon-user"></span>
                    <span class="panel-footer-text text-muted">
                         ${ articles[i].user.username }
                    </span>
                    <span class="glyphicon glyphicon-th-list"></span>
                    <span class="panel-footer-text text-muted">
                         ${ articles[i].category.name }
                    </span>
                    <span class="glyphicon glyphicon-time"></span>
                    <span class="panel-footer-text text-muted">
                         ${ data }
                    </span>
                    <span class="glyphicon glyphicon-eye-open"></span>
                    <span class="panel-footer-text text-muted">
                         <em>${ articles[i].click }</em>已阅读
                    </span>
                 </div>
               </div>`
       }
     $('#article-list').html(html);  
   }
})(jQuery)