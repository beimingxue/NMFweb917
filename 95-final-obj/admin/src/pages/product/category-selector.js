import React,{ Component } from 'react';
import { Select } from 'antd';

import { request } from 'util';
import { GET_CATEGORIES } from 'api';

const Option = Select.Option;

class CategorySelector extends Component{
   constructor(props){
   	   super(props);
   	   this.state = {
   	   	  levelOneCategories:[],
   	   	  levelOneCategoryId:'',
   	   	  levelTwoCategories:[],
   	   	  levelTwoCategoryId:''
   	   }
   	   this.handleLevelOneChange = this.handleLevelOneChange.bind(this)
   	   this.handleLevelTwoChange = this.handleLevelTwoChange.bind(this)
   }
   
   componentDidMount(){
		this.loadLevelOneCategory();
	}
	
	loadLevelOneCategory(){
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{
				pid:0
			}
		})
		.then(result=>{
			if(result.code == 0){
				this.setState({
					levelOneCategories:result.data
				})
			}
		})
	}
	//事件===选择一级分类的ID 再选择二级分类的id
    handleLevelOneChange(value){
         //console.log(value)
         this.setState({
			levelOneCategoryId:value,
			levelTwoCategories:[],
			levelTwoCategoryId:''			
		 },()=>{
			this.loadLevelTwoCategory();
			//this.onValueChange()
		 })
    }
    handleLevelTwoChange(value){
        //console.log(value)
        this.setState({
        	levelTwoCategoryId:value
        },()=>{
        	this.onValueChange()
        })
    }
    loadLevelTwoCategory(){
		request({
			method:'get',
			url:GET_CATEGORIES,
			data:{
				pid:this.state.levelOneCategoryId
			}
		})
		.then(result=>{
			if(result.code == 0){
				this.setState({
					levelTwoCategories:result.data
				})
			}
		})		
	}
    onValueChange(){
    	const {levelOneCategoryId,levelTwoCategoryId} = this.state;
    	//console.log(levelOneCategoryId,levelTwoCategoryId);

    	//如果选择了二级分类
		if(levelTwoCategoryId){
			this.props.getCategoryId(levelOneCategoryId,levelTwoCategoryId)
		}else{
			this.props.getCategoryId(0,levelOneCategoryId)
		}
    }


   render(){
	   	const {levelOneCategories,levelOneCategoryId,levelTwoCategories,levelTwoCategoryId} = this.state;
		const levelOneOptions = levelOneCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
		const levelTwoOptions = levelTwoCategories.map(category => <Option key={category._id} value={category._id}>{category.name}</Option>);
   	  return(
   	  	   <div>
		        <Select 
		        //defaultValue={provinceData[0]} 
		        style={{ width: 250,marginRight:10 }}
		        onChange={this.handleLevelOneChange}
		        >
		          {levelOneOptions}
		        </Select>
		        {
		        	levelTwoOptions.length
		        	? 
		        	<Select 
				        defaultValue={levelTwoCategoryId}
				        value={levelTwoCategoryId} 
				        style={{ width: 250 }} 
				        onChange={this.handleLevelTwoChange}>
				          {levelTwoOptions}
			        </Select>
		            : null
		        }
		        
           </div>
   	  	)
   }
}

export default CategorySelector