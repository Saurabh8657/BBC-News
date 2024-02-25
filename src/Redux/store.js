import { applyMiddleware, combineReducers, legacy_createStore  } from 'redux'
import {thunk} from 'redux-thunk';
import {  DashBoardReducer, LoginReducer, searchReducer } from './reducers'
import DashBoard from '../Pages/DashBoard';


const rootReducer = combineReducers({
    login: LoginReducer ,
    search: searchReducer,
    dashboard: DashBoardReducer
})


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


