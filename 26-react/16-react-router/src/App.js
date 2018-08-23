import React,{ Component } from 'react';
import TodoList from './pages/todolist';

//react-router 只更新变化的部分从而减少DOM性能消耗 按需更新
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

//引入css
import './App.css';
class A extends Component{
	render(){
		return(
          <div>
             Component A
             {/* Switch渲染第一个被location匹配到的并且作为子元素的Router */}
             {/* {this.props.match.params.id} */}
             <Switch>
                 <Route exact path={'/a'} render={()=>(<h1>no param</h1>)}/>
                 <Route path={'/a/:id'} render={(route)=>(<h1> param{route.match.params.id}</h1>)}/>
             </Switch>
          </div>
 		) 
	}
}
class App extends Component{

	render(){
		return(
		    <Router>
				<div className="App">
				   	<ul>
				   	    {/*link 实现跳转 避免不必要的渲染*/}
				   	    {/*<li><a herf=''>通过a标签跳转</a></li>*/}
				   	    <li><Link to="/todolist">a-todolist</Link></li>
				   	    <li><Link to="/a">a-comment-param-none</Link></li>
				        <li><Link to="/a/123">a-comment-param</Link></li>
				        <li><Link to="/b">b!!!</Link></li>
				    </ul>
				
					<ul>
					    <Route path={'/todolist'} component={ TodoList }/>
					    <Route path={'/a'} component={ A }/>
					    <Route path={'/b'} render={()=>(<h1>b!!!x</h1>)} />
					</ul>		
				</div>
			</Router>				
		)
	}
}

export default App;