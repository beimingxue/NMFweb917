import React,{ Component } from 'react';
import Simditor from 'simditor';
import $ from 'jquery';

import 'simditor/styles/simditor.css';

class RichEditor extends Component{

    constructor(props){
    	super(props);
    	this.toolbar = [
			  'title',
			  'bold',
			  'italic',
			  'underline',
			  'strikethrough',
			  'fontScale',
			  'color',
			  'ol',            
			  'ul',             
			  'blockquote',
			  'code',          
			  'table',
			  'link',
			  'image',
			  'hr',            
			  'indent',
			  'outdent',
			  'alignment'
		]
        //jquery ajax跨域携带cookie设置
		$.ajaxSetup({
			xhrFields:{
				withCredentials:true
			}
		})
    }
   
	componentDidMount(){//一级分类  
		this.editor = new Simditor({
			textarea:$(this.textarea),
			toolbar:this.toolbar,
			upload:{
				url:this.props.url,
				fileKey:'upload'
			}
		})
		this.editor.on('valuechanged',()=>{
			//console.log(this.editor.getValue());
			this.props.getRichEditorValue(this.editor.getValue())
		})
	}

   render(){
   	//console.log('1:',$);
   	 return(
   	 	   <div>
   	 	   	 <textarea ref={(textarea)=>{ this.textarea=textarea }}></textarea>
   	 	   </div>
   	 	)
   }
}

export default RichEditor;