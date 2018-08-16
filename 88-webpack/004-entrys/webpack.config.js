const path = require('path');

module.exports = {
	  mode:'development',
	  //入口 使用哪个模块
	  entry: './src/index.js',
	  //输出
	  output: {
		 filename: 'bundle.js',
		 path: path.resolve(__dirname, 'dist')
	  },
	  //配置loader
	  module:{
	  	rules:[
	  	   {
	  	   	 test:/\.css$/,
	  	   	 use:[
                'style-loader',
                'css-loader'
	  	   	 ]
	  	   },
	  	   {
		        test:/\.(png|jpg|gif)$/,
		        use:[
		          'url-loader'
	        ]
	       }
	  	]
		  	
	  }
};