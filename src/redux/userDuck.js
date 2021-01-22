let initialData = {
    loggedIn: false
}

let LOGIN = "LOGIN";

export default  function reducer (state= initialData,action){
    switch (action.type){
        case LOGIN:
        default:
            return state;
    }
}