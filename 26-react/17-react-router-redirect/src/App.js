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

//引入css
import './App.css';
class A extends Component{
	render(){
		return(
          <div>
             Component A      
          </div>
 		) 
	}
}
class Login extends Component{
   constructor(props){
	   super(props);
	   this.state = {
          isLogin: true
	   }
   }

   render(){
       const ProtectedRoute = ({ component: Component, ...rest }) => (
	      <Route {...rest} render={props => (
	         this.state.isLogin
	        ? (
	          <Component {...props}/>
	         ) 
	        : (
	          <Redirect to={'/login'}/>
	        )
	       )}
	      />
	    )

   }



}
class App extends Component{ 
	render(){
		return(
		    <Router>
				<div className="App">
				   	<ul>
				   	    <li><Link to="/todolist">a-todolist</Link></li>
				   	    <li><Link to="/a">a-comment-param-none</Link></li>
				        <li><Link to="/b">b!!!</Link></li>
				    </ul>
				
					<ul>
					    <Route path={'/todolist'} component={ TodoList }/>
					    <Route path={'/a'} component={ A }/>
					    <Route path={'/b'} render={()=>(<h1>b!!!x</h1>)} />
					    <Redirect path={'/login'} component={ Login }/>
					</ul>		
				</div>
			</Router>				
		)
	}
}

export default App;