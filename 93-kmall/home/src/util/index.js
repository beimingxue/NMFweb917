var _util = {
	request:function(params){
		var _this = this;
        $.ajax({
        	 url: params.url || '',
        	 method:params.method || 'get',
        	 datatype:params.datatype || 'json',
        	 data:params.data || '',
        	 success:function(result){
        	 	//请求成功
                if(result.code == 0 ){
                     params.success && params.success(result.data);
                }//没有登陆
                else if(result.code == 10){
                	_this.doLogin();
                }//请求失败
                else{ 
                    params.error && params.error(result.message);
                }
        	 },
        	 error:function(err){
        	 	 params.error && params.error(err.statusText);
        	 }
        })

	},
	showErrorMsg:function(msg){
		alert(msg)
	},
	doLogin:function(){
        window.location.href = './user-login.html';		
	}

} 


module.exports = _util;