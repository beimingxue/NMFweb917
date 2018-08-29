import React,{ Component } from 'react';
import { Breadcrumb,Form, Input,Select,Button } from 'antd';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import Layout from 'common/layout';


const FormItem = Form.Item;
const Option = Select.Option;

class NormalCategoryAdd extends Component{
	constructor(props){
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	/*componentDidMount(){
		this.props.getLevelOneCategories();
	}*/
	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
		  if (!err) {
		  	console.log(values);
		    //this.props.handleAdd(values);
		  }
		});
	}

	render(){
		//console.log('category-add');
        const { getFieldDecorator } = this.props.form;
	    const formItemLayout = {
	      labelCol: {
	        xs: { span: 24 },
	        sm: { span: 8 },
	      },
	      wrapperCol: {
	        xs: { span: 24 },
	        sm: { span: 16 },
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
	          offset: 8,
	        },
	      },
	    };		
		return(  
			   <Layout>
			       <div>
				        <Breadcrumb>
							<Breadcrumb.Item>分类管理</Breadcrumb.Item>
							<Breadcrumb.Item>添加分类</Breadcrumb.Item>
						</Breadcrumb>
			       </div>
			       <Form>
				        <FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('name', {
				            rules: [
				            {
				              required: true, message: '请输入分类名称',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="分类名称"
				        >
				          {getFieldDecorator('pid', {
				            rules: [
				            {
				              required: true, message: '请输选择父级分类',
				            }],
				          })(
						    <Select initialValue="0" style={{ width: 300 }}>
						      <Option value="0">根分类</Option>
						      <Option value="1">一级分类</Option>
						      {/*{
						      	this.props.levelOneCategories.map((category)=>{
						      		return <Option key={category.get('_id')} value={category.get('_id')}>根分类/{category.get('name')}</Option>
						      	})
						      }*/}
						    </Select>
				          )}
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
const CategoryAdd = Form.create()(NormalCategoryAdd);

//redux管理登录数据 将数据传输 
const mapStateToProps = (state)=>{
   return{
     isFetching:state.get('category').get('isAddFetching')
   }
}
//方法(action实现业务逻辑)  dispatch 给 action 再给store
/*const mapDispatchToProps = (dispatch)=>{
   return{
     handleLogin:(values)=>{
         const action = actionCreator.getLoginAction(values);
         dispatch(action);
     }
   }
}*/

export default connect(mapStateToProps,null)(CategoryAdd);


