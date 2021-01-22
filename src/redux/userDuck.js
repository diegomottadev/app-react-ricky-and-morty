import {loginWithGoogle} from '../firebase';

let initialData = {
    loggedIn: false,
    fetching:false
}

let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";

export default  function reducer (state= initialData,action){
    switch (action.type){
        case LOGIN_SUCCESS:
            return {...state, fetching:false, ...action.payload};
        case LOGIN_ERROR:
            return {...state, fetching:false, error: action.payload};
        case LOGIN:
            return {...state, fetching:true};

        default:
            return state;
    }
}


export let doLoginWithGoogle = ()=> dispatch =>{
    dispatch({
        type:LOGIN
    })
  return   loginWithGoogle()
            .then(user => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: {...user}
                })
            .catch( e =>{
                dispatch({
                    type: LOGIN_ERROR,
                    payload: e.message
                })
            })
  })
}