import React,{ Component } from 'react';
import TodoList from './pages/todolist';

//react-router 只更新变化的部分从而减少DOM性能消耗 按需更新
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

import Login from './index'
//引入css
import './App.css';





class App extends Component{ 
	render(){
		return(
		    <Router>
				<div className="App">
				   	<ul>
				   	    <li><Link to="/todolist">a-todolist</Link></li>
				    </ul>
				   
					<ul>
					    <Redirect path={'/login'} component={ Login }/>
					</ul>		
				</div>
			</Router>				
		)
	}
}

export default App;