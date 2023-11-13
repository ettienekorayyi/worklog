import * as actions from '../actions/actionTypes';

const initialState = {
    loading: false,
    payload: [],
    showModal: false
};

function allJobsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_ALL_JOBS_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.GET_ALL_JOBS:
            return {
                ...state,
                payload: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export default allJobsReducer;


