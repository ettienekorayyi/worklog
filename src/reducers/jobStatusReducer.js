import * as actions from '../actions/actionTypes';

const initialState = {
    job: []
};

function jobStatusReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_JOB_STATUS_STARTED:
            return {
                ...state,
                loading: action.loading
            }
        case actions.GET_JOB_STATUS:
            return {
                job: action.payload,
                loading: action.loading
            }
        default:
            return state;
    }
}

export default jobStatusReducer;