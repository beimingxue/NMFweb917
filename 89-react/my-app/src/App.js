import React, { Component } from 'react';
import './App.css';

class App extends Component {

  //点击保存按钮时，输入框中的数据读取，可通过onChange绑定事件，获得输入框数据：e.target.value
  //自定义一个事件，输入数据后，点击保存按钮时，数据的存储操作交由该事件完成
  //当不断点击保存按钮时，数据应该是多个的，可选用数组来存储数据
  //数组中，数组的索引是唯一表示一个数据的方式，数据的操作可通过索引进行

  constructor(prop){
      super(prop);

      this.state = {
         value:'',
         list:[]
      }

  }

  handleClick(){ 
    //console.log('click');
   // console.log(this);
   //var val = this.state.val;
    this.setState({
       list:[this.state.value,...this.state.list]
    })
  }

  handleChange(e){
    //console.log('change');

    //获取输入value
    //console.log(e.target.value);
    this.setState({
       value:e.target.value
    })

  }
  handleDelete(){
    
  }
  render() {
    return (
      //<h1>hello</h1>

      <div className='box'>
        <input onChange={this.handleChange.bind(this)}/>
        <button onClick={this.handleClick.bind(this)}>提交</button>  
       
        <ul>
           {/*<li>1111</li>
           <li>2222</li>*/}
           {
            this.state.list.map((item,index)=>{
               return(
                  <li key={index} onDelete={this.handleDelete}>{item}
                  </li>
                ) 
            }) 
           }
        </ul>
      </div>
    );
  }
}

export default App;
