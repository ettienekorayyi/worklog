import * as actions from '../actions/actionTypes';

const initialState = {
    loading: false,
    payload: []
};

function activityReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_SEARCHED_JOB_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.GET_SEARCHED_JOB:
            return {
                ...state,
                payload: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export default activityReducer;


