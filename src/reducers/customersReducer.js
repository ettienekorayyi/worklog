import * as actions from '../actions/actionTypes';

const initialState = {
    loading: false,
    payload: []
};

function customersReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_CUSTOMERS_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.GET_CUSTOMERS:
            return {
                ...state,
                payload: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export default customersReducer;


