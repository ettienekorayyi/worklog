import * as actions from '../actions/actionTypes';

const initialState = {
   trader:{
       firstname:"",
       lastname:"",
       email:"",
       password:"",
       phone:"",
       description:"",
       isSignedIn:false,
       id:"",
   }
};

function traderReducer(state = initialState.trader, action) {
    switch (action.type) {
        case actions.SIGN_IN:
            return {
                ...state,
                ...action.payload,
            }
        case actions.SIGN_OUT:
            return {
                ...action.payload,
                loading: action.loading
            }
        case actions.SET_TRADER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}

export default traderReducer;