// import { combineReducers } from 'redux';
//redux-immutable中的combineReducers方法生成的store中的state数据是immutable对象
import { combineReducers } from 'redux-immutable';

//配置别名之后
import { reducer as loginReducer } from 'pages/login/store';
import { reducer as HomeReducer } from 'pages/home/store'

export default combineReducers({
	login:loginReducer,
	home:HomeReducer
})