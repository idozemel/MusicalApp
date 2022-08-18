import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { userLoginReducer, userRegisterReducer, getUserReducer } from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import { allSongsReducer } from './reducers/songReducer';
const reducer = combineReducers({
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    getAllSongs: allSongsReducer,
    getUser: getUserReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;