import taskstechApi from '../api/taskstechApi';
import * as actions from './actionTypes';

export const addPhoto = (media) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    try {
        dispatch({
            type: actions.UPLOAD_PHOTO_STARTED,
            loading: true,
            showModal: false
        });
        
        taskstechApi.post(`/media`, media, config)
            .then((res) => { 
                dispatch({
                    type: actions.UPLOAD_PHOTO_SUCCESS,
                    payload: res.data,
                    loading: false
                })
            });
    } catch (error) {
        console.log(error.message)
    }
}


export const getPhoto = (worklogId) => async dispatch => {
    const base64 = 'data:image/jpeg;charset=utf-8;base64,';

    dispatch({
        type: actions.GET_PHOTO_STARTED,
        loading: true
    });

    let response = await taskstechApi.get(`/media/id?id=${worklogId}`);

    if (response.data.length !== 0) {
        dispatch({
            type: actions.GET_PHOTO_SUCCESS,
            payload: response.data,
            fileData: `${base64}${response.data[0].fileData}`,
            loading: false
        });
    }
    else {
        dispatch({ type: actions.GET_PHOTO_FAILED, payload: [], loading: false });
    }

}