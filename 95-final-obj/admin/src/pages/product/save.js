import React,{ Component } from 'react';
import { Breadcrumb,Form, Input,Select,Button,InputNumber } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Layout from 'common/layout';
import CategorySelector from './category-selector.js';
import UploadImage from 'common/upload-image';
import RichEditor from 'common/rich-editor';

import { UPLOAD_PRODUCT_IMAGE,UPLOAD_PRODUCT_DETAIL_IMAGE } from 'api';

const FormItem = Form.Item;
const Option = Select.Option;

class NormalProductSave extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	//生命周期 在第一次渲染后调用，只在客户端
	componentDidMount(){//一级分类  
		this.props.getLevelOneCategories();
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		  	//console.log(values);
		    this.props.handleSave(values);
		  }
		});
	}

	render(){
		//console.log('category-add');
        const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 2 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 22 },
	      },
	    };
	    const tailFormItemLayout = {
	      wrapperCol: {
	        xs: {
	          span: 24,
	          offset: 0,
	        },
	        sm: {
	          span: 16,
	          offset: 2,
	        },
	      },
	    };		
		return(  
			   <Layout>
			       <div>
				        <Breadcrumb>
							<Breadcrumb.Item>商品管理</Breadcrumb.Item>
							<Breadcrumb.Item>添加商品</Breadcrumb.Item>
						</Breadcrumb>
			       </div>
			       <Form style={{ marginTop:30 }}>
				        <FormItem
				          {...formItemLayout}
				          label="商品名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [
				            {
				              required: true, message: '请输入商品名称',
				            }],
				          })(
				            <Input 
				            placeholder="商品名称"
				            />
				          )}
				        </FormItem>
				         <FormItem
				          {...formItemLayout}
				          label="商品描述"
				        >
				          {getFieldDecorator('description', {
				            rules: [
				            {
				              required: true, message: '请输入商品描述',
				            }],
				          })(
				            <Input 
				            	placeholder="商品描述"
				            />
				          )}
				        </FormItem>	
				        
				        <FormItem
				          {...formItemLayout}
				          label="所属分类"
				          required={true}
				          validateStatus={this.props.categoryIdValidateStatus}
				          help={this.props.categoryIdHelp}
				        >
				          <CategorySelector 
				                getCategoryId={(parentCategoryId,categoryId)=>{
				        			 //console.log(pid,id)
				        			 this.props.handleCategory(parentCategoryId,categoryId)
				        		}}
				          />
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品价格"
				        >
				          {getFieldDecorator('price', {
				            rules: [
				            {
				              required: true, message: '请输入商品价格',
				            }],
				          })(
				            <InputNumber 
				            	style={{width:150}}
				            	min={0}
								formatter={value => `${value}元`}
      							parser={value => value.replace('元', '')}				            	
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品库存"
				        >
				          {getFieldDecorator('stock', {
				            rules: [
				            {
				              required: true, message: '请输入商品库存',
				            }],
				          })(
				            <InputNumber 
				            	style={{width:150}}
				            	min={0}
								formatter={value => `${value}件`}
      							parser={value => value.replace('件', '')}				            	
				            />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="商品图片"
				        >
				          <UploadImage
				             action={UPLOAD_PRODUCT_IMAGE}
				             max={3} 
				             getFileList={
                                 (fileList)=>{
                                     //console.log('save:',fileList);
                                     this.props.handleImages(fileList);
                                 }
				             }
				          />
				        </FormItem>	
				        <FormItem
				          {...formItemLayout}
				          label="商品详情"
				        >
				         <RichEditor
				            url={UPLOAD_PRODUCT_DETAIL_IMAGE} 
				            getRichEditorValue = {(value)=>{
                               //console.log(value);
                               this.props.handleDetail(value);
				            }}
				         />
				        </FormItem>


				        <FormItem {...tailFormItemLayout}>
				        	<Button
                               type="primary"
			          		   onClick={this.handleSubmit}
			          		   loading={this.props.isAddFetching}
				        	>
				          	提交
				        	</Button>
				        </FormItem>				        					
					</Form>
			    </Layout>
  			)
	}
}
const ProductSave = Form.create()(NormalProductSave);

//redux管理登录数据 将数据传输 
const mapStateToProps = (state)=>{
   return{
   	 categoryIdValidateStatus:state.get('product').get('categoryIdValidateStatus'),
	 categoryIdHelp:state.get('product').get('categoryIdHelp'),
     isFetching:state.get('category').get('isAddFetching'),
     levelOneCategories:state.get('category').get('levelOneCategories')
   }
}
//方法(action实现业务逻辑)  dispatch 给 action 再给store
const mapDispatchToProps = (dispatch)=>{
   return{
     handleSave:(values)=>{
         dispatch(actionCreator.getSaveAction(values));
     },
     handleCategory:(parentCategoryId,categoryId)=>{
         dispatch(actionCreator.getSetCategoryAction(parentCategoryId,categoryId));
     },
     handleImages:(fileList)=>{
     	 dispatch(actionCreator.getSetImagesAction(fileList));
     },
     handleDetail:(value)=>{
     	 dispatch(actionCreator.getSetDetailAction(value));
     },
     getLevelOneCategories:()=>{
		 dispatch(actionCreator.getLevelOneCategoriesAction());
	 }
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductSave);



