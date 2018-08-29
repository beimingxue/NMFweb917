//alert('cateory')
//console.log('aa');
import React,{ Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from 'common/layout';
//import MySider from 'common/sider';

class CategoryList extends Component{
	render(){
		//console.log('category-get...');
		return(
			    <Layout>  	
			       <div>
			         <Link to='/category/add'>add</Link>
			       </div>
			    </Layout>
  			)
	}
}
 

export default CategoryList;

