
import React,{ Component } from 'react';


class Item extends Component{
	
	constructor(props){
		super(props);
		this.handleDelete = this.handleDelete.bind(this)
	}
	getDerivedStateFromProps(nextProps, prevState){
		if(!prevState == )

	}

	shouldComponentUpdate(nextProps, nextState){
	  //该方法返回布尔值,根据返回的布尔值决定是否执行后续的周期函数
       return this.props.value !== nextProps.value;
	}


    


	handleDelete(){
		const { handleDelete,index } = this.props;
		handleDelete(index);
	}

	render(){
		const { content } = this.props;
		return (
			<li onClick={this.handleDelete}>
				{content}
			</li>
		)
	}
}

export default Item;