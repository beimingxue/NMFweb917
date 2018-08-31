//alert('cateory')
//console.log('cateory111');
import React,{ Component } from 'react';
import { Route,Switch } from 'react-router-dom';

//import MyLayout from 'common/layout';
import CategoryList from './list.js';
import CategoryAdd from './add.js';


class Category extends Component{
	render(){
		//console.log('category-get');
		return(
                 
                <Switch>
                   <Route path="/category/add" component={ CategoryAdd } />
                   <Route path="/category/:pid?" component={ CategoryList } />
                </Switch>
                 
  			)
	}
}


export default Category;


