//alert('cateory')
//console.log('cateory111');
import React,{ Component } from 'react';
import { Route,Switch } from 'react-router-dom';

import Layout from 'common/layout';
import CategoryList from './list.js';

class Category extends Component{
	render(){
		console.log('category-get');
		return(
                 <div>
                    <Route path="/cateory" component={ CategoryList } />
                    {/*<Route path="/cateory/add" component={ CategoryAdd } />*/}
                 </div>
  			)
	}
}


export default Category;


