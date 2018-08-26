import React,{ Component } from 'react';
//import { NavLink } from 'react-router-dom';
import { Layout,Menu,Icon } from 'antd';

const { Sider } = Layout;

class MySider extends Component{

	render(){
		console.log('sider');
		return(
			<div>
			   <Sider width={200} style={{ background: '#fff' }}>
		        <Menu
		          mode="inline"
		          style={{ minHeight: 680, borderRight: 0 }}
		        >
		            <Menu.Item key="1">option1
		            	{/*<NavLink exact to="/"><Icon type="home" />首页</NavLink>*/}
		            </Menu.Item>
		            <Menu.Item key="2">option1
		            	{/*<NavLink to="/user"><Icon type="user" />用户列表</NavLink>*/}
		            </Menu.Item>
		            <Menu.Item key="3">option1
		            	{/*<NavLink to="/category"><Icon type="bars" />分类管理</NavLink>*/}
		            </Menu.Item>
		            <Menu.Item key="4">option1
		            	{/*<NavLink to="/product"><Icon type="book" />商品管理</NavLink>*/}
		            </Menu.Item>
		         </Menu>
		      </Sider>
			</div>
		)
	}
}


export default MySider;