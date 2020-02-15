import { combineReducers } from 'redux'

const initialState = {
    id: "",
    name: "",
    token: ""
}

export const loginInfo = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN": {
            return {...action.payload};
        }
        default : return state;
    }
}

export default combineReducers({loginInfo})


