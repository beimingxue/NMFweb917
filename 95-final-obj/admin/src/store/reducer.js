// import { combineReducers } from 'redux';
//redux-immutable中的combineReducers方法生成的store中的state数据是immutable对象
import { combineReducers } from 'redux-immutable';

//配置别名之后 login/home/user里的reducer和store绑定起来
import { reducer as loginReducer } from 'pages/login/store';
import { reducer as HomeReducer } from 'pages/home/store';
import { reducer as userReducer } from 'pages/user/store';
import { reducer as categoryReducer } from 'pages/category/store';
import { reducer as productReducer } from 'pages/product/store';

export default combineReducers({
	login:loginReducer,
	home:HomeReducer,
	user:userReducer,
	category:categoryReducer,
    product:productReducer
})