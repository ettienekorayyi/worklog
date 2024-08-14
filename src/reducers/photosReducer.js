import * as actions from '../actions/actionTypes';
import unknownPhoto from '../common/assets/images/blank-profile-picture.png';

const initialState = {
    "filename": "",
    "filename_thumb": "",
    "payload": [],
};

function photosReducer(state = initialState, action) {
    switch (action.type) {
        case actions.UPLOAD_PHOTO_STARTED:
            return {
                ...state,
                loading: true,
                showModal: false
            };
        case actions.UPLOAD_PHOTO_SUCCESS:
            return {
                ...state,
                payload: action.payload,
                filename: action.payload,//.filename
                thumbnail: action.payload?.thumbnail,
                loading: false,
                showModal: true
            };
        case actions.GET_PHOTO_STARTED:
            return {
                ...state,
                filename: unknownPhoto,
                loading: true
            };
        case actions.GET_PHOTO_SUCCESS:
            return {
                ...state,
                payload: action.payload,
                fileData: action.fileData,
                loading: false
            };
        case actions.GET_PHOTO_FAILED:
            return {
                ...state,
                filename: unknownPhoto,
                payload: action.payload,
                loading: false
            };
        default:
            return state;
    }
}

export default photosReducer;


