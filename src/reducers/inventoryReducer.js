import * as actions from '../actions/actionTypes';

const initialState = {
    trader:{},
   inventory:{
       list:[]
   }
};

function inventoryReducer(state = initialState.inventory, action) {
    switch (action.type) {
        case actions.FETCH_INVENTORY:
            return {
                ...state,
                list:[...action.payload] ,
            };
        default:
            return state;
    }
}

export default inventoryReducer;