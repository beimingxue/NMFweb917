
(function($){
	$.fn.extend({
		pagination:function(){
            //console.log('ceshi')
			var self = this;
			this.on('click','a',function(){
			 	var $this = $(this);

			 	var page = 1;
			 	var currentPage = self.find('.active a').html();
			 	var label = $this.attr('aria-label');

			 	if(label == 'Previous'){//上一页
			 		page = currentPage - 1;
			 	}else if(label == 'Next'){//下一页
			 		page = currentPage*1 + 1;
			 	}else{
			 		page = $(this).html();
			 	} 

			 	var query = self.data('url')+'?page='+page;

			 	var id = self.data('id');

			 	if(id){
			 		query += "&id="+id;
			 	}

			 	$.ajax({
			 		url:query,
			 		type:'get',
			 		dataType:'json'
			 	})
			 	.done(function(result){
			 		if(result.code == 0){
						self.trigger('get-data',[result])
			 		}
			 	})
			 	.fail(function(err){
			 		console.log(err)
			 	})

			 })
		}
	})
})(jQuery);