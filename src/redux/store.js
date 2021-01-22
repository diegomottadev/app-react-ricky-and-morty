// este archivo sirve para conectar React con Redux
import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import userReducer from './userDuck';
import thunk from 'redux-thunk';

let rootReducer = combineReducers({
    user: userReducer
})
//Ver herramientas de desarrollador
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//applyMiddleware // usar la herramienta soportar promesas
export default function generateStore(){
    let store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    )
    return store;
}