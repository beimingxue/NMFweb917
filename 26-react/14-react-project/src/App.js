import React,{ Component } from 'react';

import { Input,Button,Row,Col,List } from 'antd';

import axios from 'axios';

import store from './store';


import { chageValueAction,addItemAction,deleteItemAction,getInitDataAction } from './store/actionCreator.js'
import { connect } from 'react-redux';
import AppUI from './AppUI.js'
//引入css
import './App.css';

//处理业务逻辑 - 容器组件
class App extends Component{
	/*constructor(props){
		super(props);
		//从store中获取初始化数据
		this.state = store.getState();
		
		//当store里面的state发送改变时执行subscribe里面的函数
		store.subscribe(()=>{
			this.setState(store.getState())
		});
		this.handleChange = this.handleChange.bind(this)
		this.handleAdd = this.handleAdd.bind(this)
		this.handleDelete = this.handleDelete.bind(this)
	}*/
	/*handleChange(e){
		const action = chageValueAction(e.target.value)
		store.dispatch(action)
	}
	handleAdd(){
		const action = addItemAction();
		store.dispatch(action);
	}
	handleDelete(index){
		const action = deleteItemAction(index);
		store.dispatch(action)
	}*/
	/*componentDidMount(){
		
		//axios
		//.get('http://127.0.0.1:3000/')
		//.then((data)=>{
		//	const action = loadInitDataAction(data.data);
		//	store.dispatch(action)
		//})
		//.catch((e)=>{
		//	console.log(e)
		//})
		
		//action是一个函数
		const action = getInitDataAction();
		store.dispatch(action)		
	}*/
	render(){
		return (
			<div className="App">
			    <Row>
			      <Col span={18} >
			      	<Input 
			      		value={this.props.value}	
			      		onChange={this.props.handleChange}	
			      	/> 
			      </Col>
			      <Col span={6} >
			      	<Button type="primary" onClick={this.props.handleAdd}>
			      		增加
			      	</Button>
			      </Col>
			    </Row>
			    <List
			      style={{ marginTop: 10 }}
			      bordered
			      dataSource={this.props.list}
			      renderItem={(item,index) => (<List.Item onClick={()=>{this.props.handleDelete(index)}}>{item}</List.Item>)}
			    />			    			
			</div>				
		);
	}	
}
//将store里面的state映射到组建的props
//组件监听redux store的变化
const mapStateToPros=(state)=>{
	//console.log('da');
	return{
		value:state.value,
        list:state.list
	}
}
//将dispatch映射到pros
const mapDispatchToPros=(dispatch)=>{
	//console.log('#@@',dispatch);
	return {
       handleChange:(e)=>{   //每次执行都会开发一个action
          //console.log('aaaaa');
          const action = chageValueAction(e.target.value);
		  dispatch(action);
		  //console.log('#1',dispatch(action));
       },
       handleAdd:()=>{
       	  const action = addItemAction();
		  dispatch(action);
       },
       handleDelete:(index)=>{
		  const action = deleteItemAction(index);
		  dispatch(action)
	   },
	   componentDidMount:()=>{
          const action = getInitDataAction();
		  dispatch(action)
	   }
	}
}

//connect连接操作不会改变原来的组件类，反而返回一个新的已与 Redux store 连接的组件类
export default connect(mapStateToPros,mapDispatchToPros)(App);