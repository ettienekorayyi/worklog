import * as actions from './actionTypes';

export const signInAction = (userState) => {
    return {
        type:actions.SIGN_IN,
        payload:{
            isSignedIn:true,
            id:userState.id,
        }
    }
};

export const signOutAction = () => {
    return {
        type:actions.SIGN_OUT,
        payload:{
            firstname:"",
            lastname:"",
            email:"",
            password:"",
            phone:"",
            description:"",
            isSignedIn:false,
            id:"",
        }
    }
};

export const setTraderData = (trader) => {
    return {
        type:actions.SET_TRADER_DATA,
        payload:{
            firstname:trader.firstname,
            lastname:trader.lastname,
            email:trader.email,
            password:"",
            phone:trader.phone,
            description:trader.description,
            isSignedIn:true,
            id:trader.id,
        }
    }
}
