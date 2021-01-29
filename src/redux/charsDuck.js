import axios from "axios";
import {updateDB} from '../firebase';

let URL = "https://rickandmortyapi.com/api/character";

let GET_CHARACTERS  = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
let REMOVE_CHARACTER = "REMOVE_CHARACTER";
let ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
let initialData = {
    fetching: false,
    array:[],
    current:{},
    favorites: []
}


export default  function reducer (state= initialData,action){
    switch (action.type){
        case ADD_TO_FAVORITES:
            return {...state, ...action.payload};
        case REMOVE_CHARACTER:
            return {...state, array: action.array}
        case GET_CHARACTERS:
            return {...state, fetching: true}
        case GET_CHARACTERS_SUCCESS:
            return {...state, array: action.payload}
        case GET_CHARACTERS_ERROR:
            return {...state, fetching: false,error: action.payload}

        default:
            return state;
    }
}
//getState nos trae informacion del store
//actions (thunks);

export let addFavoritesAction = () => (dispatch,getState) =>{
    let {array, favorites} = getState().characters;
    let char = array.shift(); //quita el elemento 0 del arreay
    let {uid} = getState().user;
    favorites.push(char);
    updateDB(favorites,uid);
    dispatch({
        type: ADD_TO_FAVORITES,
        //descontruir para colocar los nuevos elementos en el store
        payload:  {array:[...array],favorites:[...favorites]}
    })
}

export let removeCharacterAction = () => (dispatch,getState) =>{

    let {array} = getState().characters;
    array.shift();
    dispatch({
        type : REMOVE_CHARACTER,
        payload: [...array]
    })
}
export let getCharactersAction = () => (dispatch,getState) =>{
    dispatch({
        type : GET_CHARACTERS,
    })
    return axios.get(URL)
                .then(res =>{
                    dispatch({
                        type : GET_CHARACTERS_SUCCESS,
                        payload:   res.data.results
                    })
                }).catch(err =>{
                    dispatch({
                        type : GET_CHARACTERS_ERROR,
                        payload:    err.response.message
                    })
                })
}