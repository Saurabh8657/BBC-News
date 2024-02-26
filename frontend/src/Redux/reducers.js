
const initialLoginState = {
    isAuth: false,
}

export const LoginReducer = (state = initialLoginState, action) => {
    switch (action.type) {
        case "LOGIN":
            return { ...state, isAuth: true}
        case "LOGOUT":
            return { ...state, isAuth: false};
        default:
            return state;
    }
}

export const searchReducer = (state = "" , action) => {
    switch(action.type){
        case "SEARCH" :
            return action.payload
        default :
            return state ;
    }
}
export const DashBoardReducer = (state = [] , action) => {
    switch(action.type){
        case "LOAD_DASHBOARD": 
            return action.payload
        default :
            return state ;
    }
}