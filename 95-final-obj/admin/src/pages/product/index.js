//alert('cateory')
//console.log('cateory111');
import React,{ Component } from 'react';
import { Route,Switch } from 'react-router-dom';

import ProductList from './list.js';
import ProductSave from './save.js';


class Product extends Component{
	render(){
		console.log('product-get');
		return(
                 
                <Switch>
                   <Route path="/product/save" component={ ProductSave } />
                   <Route path="/product" component={ ProductList } />
                </Switch>
                 
  			)
	}
}


export default Product;