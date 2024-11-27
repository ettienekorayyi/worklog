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
        case actions.GET_ACTIVITIES_SUCCESS:
            return {
                ...state,
                payload: action.payload,
                hasError: action.hasError,
                loading: false
            };
        case actions.GET_ACTIVITIES_FAILED:
            return {
                ...state,
                status: action.status,
                errorMessage: action.errorMessage,
                hasError: action.hasError,
                loading: false
            };
        case actions.GET_ACTIVITY_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.GET_ACTIVITY_SUCCESS:
            return {
                ...state,
                payload: action.payload,
                loading: false
            };
        case actions.GET_ACTIVITY_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false
            };
        case actions.ADD_ACTIVITY_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.ADD_ACTIVITY_SUCCESS:
            return {
                ...state,
                payload: action.payload,
                loading: false
            };
        case actions.ADD_ACTIVITY_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false
            };
        case actions.UPDATE_ACTIVITY_STARTED:
            return {
                ...state,
                loading: true
            };
        case actions.UPDATE_ACTIVITY_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case actions.UPDATE_ACTIVITY_FAILED:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false
            };
        default:
            return state;
    }
}

export default activityReducer;


