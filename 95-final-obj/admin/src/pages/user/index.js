import React,{ Component } from 'react';
import { Table } from 'antd';
import Layout from 'common/layout';

const columns = [{
  title: '用户名',
  dataIndex: 'username',
  key: 'username',
}, {
  title: '是否管理员',
  dataIndex: 'isAdmin',
  key: 'isAdmin',
  render: isAdmin => (isAdmin ? '是' : '否')
}];

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
	render(){
		//console.log('aaa')
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
			      	 /*defaultCurrent:1,
			      	 total:500,
			      	 pageSize:10*/
			      	}

			      }
			      />
			   </Layout>
			</div>
		)
	}
}


export default User;