//alert('cateory')
//console.log('aa');
import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from 'common/layout';
//import MySider from 'common/sider';

class ProductList extends Component{
	render(){
		//console.log('category-get...');
		return(
			    <Layout>  	
			       <div>
			         <Link to='/product/save'>save</Link>
			       </div>
			    </Layout>
  			)
	}
}
 

export default ProductList;

