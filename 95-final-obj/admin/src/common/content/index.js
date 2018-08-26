import React,{ Component } from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Content } = Layout;

class MyContent extends Component{

	render(){
		console.log('Content');
		return(
			<div>
			   <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
		          Content
		        </Content>
			</div>
		)
	}
}


export default MyContent;