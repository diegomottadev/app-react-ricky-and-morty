import {loginWithGoogle,signOutGoolge} from '../firebase';

let initialData = {
    loggedIn: false,
    fetching:false
}

let LOGIN = "LOGIN";
let LOGIN_SUCCESS = "LOGIN_SUCCESS";
let LOGIN_ERROR = "LOGIN_ERROR";
let LOG_OUT = "LOG_OUT";
export default  function reducer (state= initialData,action){
    switch (action.type){
        case LOG_OUT:
            return {...initialData};
        case LOGIN_SUCCESS:
            return {...state, fetching:false, ...action.payload, loggedIn: true};
        case LOGIN_ERROR:
            return {...state, fetching:false, error: action.payload};
        case LOGIN:
            return {...state, fetching:true};

        default:
            return state;
    }
}

function saveStorage(storage){
    localStorage.storage = JSON.stringify(storage)
}

export let logOutAction = ()=> (dispatch,getState) =>{
    signOutGoolge();
    dispatch({
        type: LOG_OUT
    });
    localStorage.removeItem('storage');
}

export let restoreSessionAction = ()=> (dispatch,getState) =>{
    let storage  = localStorage.getItem('storage');
    storage = JSON.parse(storage);
    if (storage && storage.user){
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        });
    }
}

export let doGoogleLoginAction = ()=> (dispatch,getState) =>{
    dispatch({
        type:LOGIN
    })
  return   loginWithGoogle()
            .then(user => {
                dispatch({
                    type: LOGIN_SUCCESS,
                    //me quedo con los datos que me interesan
                    payload: {
                        uid:user.uid,
                        displayName : user.displayName,
                        email: user.email,
                        photoUrl:user.photoUrl
                    }
                })
                saveStorage(getState())
            })
            .catch( e =>{
                dispatch({
                    type: LOGIN_ERROR,
                    payload: e.message
                })
            })
  
}