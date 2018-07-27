(function($){
   function getRandom(min,max){
     return Math.round(min+(max-min)*Math.random());
   }
    
   var $wall = $('.wall');
   //console.log($wall);
   var $wish = $('.wish');

   $wish.pep({ constrainTo :'.wall'}); 
   
   //获取墙的宽高和卡片的宽高
   var wallWidth = parseInt($wall.css('width'));
   //console.log(wallWidth);
   var wallHeight = parseInt($wall.css('height'));
   var wishWidth = parseInt($wish.css('width'));
   var wishHeight = parseInt($wish.css('height'));

   //随机显示卡片
   $wish.each(function(){
      $(this).css({
   	  	  transform:'matrix(1, 0, 0, 1, '+getRandom(0,wallWidth-wishWidth) +','+getRandom(0,wallHeight-wishHeight) +')'
   	  })
   })
   
   //监听删除事件
   $wall.on('click','.close',function(){
   	  //console.log(this);
   	  var $this = $(this);
   	  //console.log($this.data('id'));
   	  $.ajax({
   	  	url: '/del',
   	  	data: 'id=' + $this.data('id'),
   	  	dataType: 'json'
   	  })
   	  .done(function(data){

   	  })
   });

   //增加许愿卡
   $('.btn').on('click',function(){
   	  let val = $('#content').val();
   	  //console.log(val);
   	  $.ajax({
   	  	url: '/add',
   	  	data: {content:val},
   	  	dataType: 'json',
   	  	type: 'POST' 
   	  })
   	  .done(function(data){
         //填充数据  DOM节点 并且插入
         //console.log(data);
   	  })
   })
})(jQuery);