//alert('cateory')
//console.log('aa');
import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actionCreator } from './store';
import { Breadcrumb,Button,Table,Divider,InputNumber } from 'antd';

import Layout from 'common/layout';
//import MySider from 'common/sider';

const columns = [
{
  title: 'id',
  dataIndex: 'id',
  key: 'id',
},
 {
  title: '分类名称',
  dataIndex: 'name',
  key: 'name',
  
},
{
  title: '排序',
  dataIndex: 'order',
  key: 'order',
  render:(order,record)=>{
  	 return <InputNumber defaultValue={order}  />
  }
},
{
	title: '操作',
	key: 'action',
	render: (text, record) => (
		<span>
		  <a href="javascript:;">
		  	更新名称
		  </a>
		  <Divider type="vertical" />
	      <Link to={"/category/"+record.id} >查看子分类</Link>
		</span>
    ),
}

];

const data = [{
  key: '1',
  id: '111',
  name: 'tom',
  order: 22
}, {
  key: '2',
  id:'222',
  name: 'amy',
  order: 33
},
{
  key: '3',
  name: 'red',
  order: 44
}];

class CategoryList extends Component{
	constructor(props){
		super(props);
		//console.log(this.props.match.params)
		this.state = {
			pid:this.props.match.params.pid || 0
		}
	}
	//
     componentDidMount(){
		//第一个参数是父级ID,第二个参数是页码
		this.props.handlePage(this.state.pid,1);
	}

	componentDidUpdate(preProps,preState){
		//console.log('CategoryList componentDidUpdate');
		//console.log('前面的值:',preProps);
		//console.log('当前的值:',this.props);
		let oldpath = preProps.location.pathname;
		let newpath = this.props.location.pathname;
		//console.log('path',oldpath,newpath)
		if(oldpath != newpath){
		   console.log('updata pid');
		   let newPid = this.props.match.params.pid || 0;
		   this.setState({
		   	  pid:newPid
		   })
		}

	}
	render(){
		//console.log('category-get...');
		const pid = this.state.pid;
		/*const data  = this.props.list.map((category)=>{
			return {
				key:category.get('_id'),
				id:category.get('_id'),
				name:category.get('name'),
				order:category.get('order'),
				pid:category.get('pid'),
			}
		}).toJS();	*/
		return(
			    <Layout>  	
			       <div>
				       <div>
					        <Breadcrumb>
								<Breadcrumb.Item>分类管理</Breadcrumb.Item>
								<Breadcrumb.Item>添加分类</Breadcrumb.Item>
							</Breadcrumb>
				       </div>
				       <div style={{marginTop:10}} className="clearfix">
				       	  <h4 style={{ float:'left' }} >父类id:{pid}</h4>
				       	  <Link to='/category/add'>
				       	        <Button type='primary' style={{ float:'right' }}>新增分类</Button>
				       	  </Link>
				       </div>
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
						      // loading = {
						      // 	{
						      // 	 spinning:this.props.isPageFetching,
						      // 	 tip:'数据正在请求喔~'
						      // 	}
						      // }
						      />
			       </div>
			    </Layout>
  			)
	}
}

//redux管理登录数据 将数据传输 
const mapStateToProps = (state)=>{
   return{
     isPageFetching:state.get('category').get('isPageFetching'),
     current:state.get('category').get('current'),
     total:state.get('category').get('total'),
     pageSize:state.get('category').get('pageSize'),
   }
}
//方法(action实现业务逻辑)  dispatch 给 action 再给store
const mapDispatchToProps = (dispatch)=>{
   return{
     handlePage:(pid,page)=>{
         dispatch(actionCreator.getPageAction(pid,page));
     }
   }
}



export default connect(mapStateToProps,mapDispatchToProps)(CategoryList); 



