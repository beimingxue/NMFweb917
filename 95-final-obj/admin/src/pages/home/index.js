import React,{ Component } from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';

import { actionCreator } from './store';
import './index.css';
import Layout from 'common/layout';


class Home extends Component{
	componentDidMount(){
		this.props.handleCount();
	}
	render(){
		//console.log('aaa')
		return(
			<div className='Home'>
			   <Layout>
			      <Card title="用户数"  hoverable={true}>
                      <p>{this.props.usernum}</p>
			      </Card>
			      <Card title="订单数"  hoverable={true}>
                      <p>{this.props.ordernum}</p>
			      </Card>
			      <Card title="商品数"  hoverable={true}>
                      <p>{this.props.productnum}</p>
			      </Card>
			   </Layout>
			</div>
		)
	}
}

//redux管理数据 将数据传输  reducer
const mapStateToProps = (state)=>{
   return{
     usernum:state.get('home').get('usernum'),
     ordernum:state.get('home').get('ordernum'),
     productnum:state.get('home').get('productnum')
   }
}
//方法(action实现业务逻辑)  dispatch 给 action 再给store
const mapDispatchToProps = (dispatch)=>{
   return{
   	//????????????
      handleCount:()=>{
      	const action = actionCreator.getCountAction();
      	dispatch(action);
      }
   }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);