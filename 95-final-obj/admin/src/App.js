import React,{ Component } from 'react';

//react-router 只更新变化的部分从而减少DOM性能消耗 按需更新
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

//引入login
import Login from 'pages/login/index.js';
import Home from 'pages/home';
import User from 'pages/user';
import Category from 'pages/category';

import ErrorPage from 'common/error-page';
import { getUserName } from 'util';

//引入css
import './App.css';





class App extends Component{ 
	render(){
		//console.log(Login);
		//访问根路径 如果有值 渲染home 没有渲染 login
		const ProtectedRoute = ({component:Component,...rest})=>(
			<Route 
				{...rest}
				render = {props=>(
					getUserName()
					? <Component {...props} />
					: <Redirect to="/login" />
				)}
			/>
		)
		const LoginRoute =({component:Component,...rest})=>{
			if(getUserName()){
				return <Redirect to="/" />
			}else{
				return <Route {...rest} component={Component} />
			}
		}

		return(
		    <Router>
				<div className="App">
				    <Switch>
					    <ProtectedRoute exact path='/' component={ Home }/>
					    <ProtectedRoute path='/user' component={ User }/>
					    <ProtectedRoute path='/category' component={ Category }/>
						<LoginRoute path='/login' component={ Login }/>
						<Route component={ ErrorPage } />
					</Switch>
				</div>
			</Router>				
		)
	}
}

export default App;