import * as actions from '../actions/actionTypes';

const initialState = {
    loading: false,
    payload: []
};

function activityReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_ACTIVITIES_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.GET_ACTIVITIES:
            return {
                ...state,
                payload: action.payload,
                loading: false
            };
        case actions.GET_ACTIVITY_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.GET_ACTIVITY:
            return {
                ...state,
                payload: action.payload,
                loading: false
            };
        case actions.ADD_ACTIVITY_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.ADD_ACTIVITY:
            return {
                ...state,
                payload: action.payload,
                loading: false
            };
        case actions.UPDATE_ACTIVITY_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.UPDATE_ACTIVITY:
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


