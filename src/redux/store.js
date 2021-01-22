// este archivo sirve para conectar React con Redux
import {createStore,combineReducers,compose,applyMiddleware} from 'redux';
import userReducer from './userDuck';
import charsReducer , {getCharactersAction}from './charsDuck';

import thunk from 'redux-thunk';

let rootReducer = combineReducers({
    user: userReducer,
    characters: charsReducer
})
//Ver herramientas de desarrollador
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//applyMiddleware // usar la herramienta soportar promesas
export default function generateStore(){
    let store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(thunk))
    )
    //retorna los personajes por primera vez
    getCharactersAction()(store.dispatch,store.getState);
    return store;
}