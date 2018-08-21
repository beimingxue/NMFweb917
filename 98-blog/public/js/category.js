//console.log('nmf::::');
(function($){
	 $('#btn-sub').on('click',function(){
          //验证
          
            //trim删除字符串开始和末尾的空格 
          var cateName = $('[name="name"]').val();
          if(cateName.trim() == ''){
               //console.log('bh2::');
               $('.err').html('分类名称不能为空')
               return false;
          }
          $('.err').html('')
     });
})(jQuery)