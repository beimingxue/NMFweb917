import React,{ Component } from 'react';
//引入css
import './index.css';
//引入layout
import { Layout,Menu, Dropdown, Icon } from 'antd';
//引入管理员名
import { request,getUserName,removeUserName } from 'util';
//
import { USER_LOGOUT } from 'api';
//从layouty引入header
const { Header } = Layout;

class MyHeader extends Component{
	constructor(props){
		 super(props);
		 this.handleLogout = this.handleLogout.bind(this);
	}

  handleLogout(){
  	 request({
  	 	  url:USER_LOGOUT
  	 })
  	 .then((result)=>{
  	 	  console.log('aa');
  	 		removeUserName();
		  	window.location.href = '/login'
  	 })
  }

	render(){
		//console.log('header');
		const menu = (
		  <Menu>
		    <Menu.Item key="0">
		      <a onClick={this.handleLogout}>退出</a>
		    </Menu.Item>
		  </Menu>
		);
		return(
			<div className="Header">
			   <Header className="header">
			      <div className="logo">KMALL</div> 
            <Dropdown className="userinfo" overlay={menu} trigger={['click']}>
					    <a className="ant-dropdown-link" href="#">
					      { getUserName() } <Icon type="down" />
					    </a>
					  </Dropdown>,
			    </Header>
			</div>
		)
	}
}



export default MyHeader;
