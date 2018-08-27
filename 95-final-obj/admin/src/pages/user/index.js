//alert('user')
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';

import { actionCreator } from './store';
import Layout from 'common/layout';

const columns = [
{
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
},
 {
  title: '是否管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render: isAdmin => (isAdmin ? '是' : '否')
},
{
  title: '邮箱',
  dataIndex: 'email',
  key: 'email',
},
{
  title: '手机',
  dataIndex: 'phone',
  key: 'phone',
},
{
  title: '注册时间',
  dataIndex: 'createAt',
  key: 'createAt',
},
];

const dataSource = [{
  key: '1',
  username: 'admin',
  isAdmin: true,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  username: 'test',
  isAdmin: false,
}];


//pagination 分页器 接收一个object
class User extends Component{

	componentDidMount(){
       this.props.handlePage();
	}
	render(){
		console.log('user-get')
		const data = [];
		for(let i=0;i<500;i++){
			data.push({
				key:i,
				username: 'test' + i,
				isAdmin: false
			})
		}
		return(
			<div>
			   <Layout>
			      <Table 
			      dataSource={data} 
			      columns={columns}
			      pagination={
			      	{
			      	 //current 当前页数 total数据总数 pageSize每页条数 defaultCurrent默认的当前页数
			      	 current:this.props.current,
			      	 defaultCurrent:this.props.current,
			      	 total:this.props.total,
			      	 pageSize:this.props.pageSize
			      	}
			      }
			      onChange = {(pagination)=>{
			      	console.log(pagination)
			      }}
			      loading = {
			      	{
			      	 spinning:this.props.isFetching,
			      	 tip:'数据正在请求喔~'
			      	}
			      }
			      />
			   </Layout>
			</div>
		)
	}
}
//redux管理登录数据 将数据传输 
const mapStateToProps = (state)=>{
   return{
     isFetching:state.get('user').get('isFetching'),
     current:state.get('user').get('current'),
     total:state.get('user').get('total'),
     pageSize:state.get('user').get('pageSize'),
   }
}
//方法(action实现业务逻辑)  dispatch 给 action 再给store
const mapDispatchToProps = (dispatch)=>{
   return{
     handlePage:(page)=>{
         dispatch(actionCreator.getPageAction(page));
     }
   }
}


//export default User;
export default connect(mapStateToProps,mapDispatchToProps)(User);
