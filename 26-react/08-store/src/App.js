import React,{ Component } from 'react';

import { Input,Button,Row,Col,List } from 'antd';

import store from './store'; 

import { CHANGE_VALUE,ADD_ITEM,DELETE_ITEM } from './store/actionTypes.js';

//引入css
import './App.css';
//引入store

const data = [
  
];


class App extends Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
		/*this.state = {
			value:'haha',
			list:['aaa!','bbb!']
		}*/
        //console.log(store);

        //getState与store→reducer 内最后一个返回值相同
        //从store中获取初始化数据
		this.state = store.getState(); //返回store→reducer里面的值
        
        //当store里面的 state发送改变时 执行subcribe函数
        store.subscribe(()=>{
        	//console.log(store.getState())
        	this.setState(store.getState())
        })
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        
        
	}
	handleChange(e){   
       const action={
       	 type: CHANGE_VALUE,
       	 payload: e.target.value
       }
       //dispatch使用getState传入的结果和传入的action
       //以同步方式调用 store 里面的 reduce函数
       //它的返回值会作为下一个state
       store.dispatch(action); //把定义的action传入到store 同时调用reduce函数

	}
	handleAdd(){
		const action={
			type: ADD_ITEM,
		}
		store.dispatch(action);
	}
	handleDelete(index){
        const action={
        	type: DELETE_ITEM,
        	payload: index
        }
        store.dispatch(action);
	}

	render(){
		//return 只能返回一个
		return(
			<div className="App">
			    <Row>
			      <Col span={18} >
			      <Input 
			      value = {this.state.value}
			      onChange = {this.handleChange}
			      /> 
			      </Col>
			      <Col span={6} ><Button type="primary" onClick={this.handleAdd}>增加</Button></Col>
			    </Row>
			    <List
			      style={{ marginTop: 10 }}
			      bordered
			      dataSource={this.state.list }
			      renderItem={(item,index) => (<List.Item onClick={this.handleDelete.bind(this,index)}>{item}</List.Item>)}
			    />			    			
			</div>				
		)
	}
}
export default App;