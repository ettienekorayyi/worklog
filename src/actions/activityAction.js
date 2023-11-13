import * as actions from './actionTypes';
import taskstechApi from '../api/taskstechApi';
import { push } from 'connected-react-router';


export const getActivities = (loading = true, id) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const job = { 
        "job_id": id
    };

    try {
        taskstechApi.post(`/get_all_activity`, job, config)
            .then(res => {
                dispatch({
                    type: actions.GET_ACTIVITIES_STARTED,
                    loading: loading
                });
                if (res.data.length !== 0) { // res.data
                    //console.log(res.data)
                    dispatch({
                        type: actions.GET_ACTIVITIES,
                        payload: res.data,
                        loading: false
                    });
                }
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const getActivity = (loading = true) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
        taskstechApi.get(`/activity/11`, config) 
            .then(res => {
                dispatch({
                    type: actions.GET_ACTIVITY_STARTED,
                    loading: loading
                });
                if (res.data) {
                    dispatch({
                        type: actions.GET_ACTIVITY,
                        payload: res.data,
                        loading: false
                    });
                }
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const addActivity = (activity) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const job = {
        "description": activity.description,
        "upload_photo": activity.image,
        "job_id": activity.jobId
    };
    
    try {
        taskstechApi.post(`/activity`, job, config)
            .then(res => {
                dispatch({
                    type: actions.ADD_ACTIVITY_STARTED,
                    loading: true
                });
                if (res.data) {
                    dispatch(push('/view/jobs'));
                }
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateActivity = (activity) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const job = {
        "description": activity.description,
        //"upload_photo": activity.image,
        "job_id": activity.job_id
    };
    
    try {
        taskstechApi
            .put(`/activity/${activity.id}`, job, config)
            .then(res => {
                dispatch({
                    type: actions.UPDATE_ACTIVITY_STARTED,
                    loading: true
                });
                if (res.data) {
                    dispatch(push('/view/jobs'));
                }
            })
    } catch (error) {
        console.log(error.message)
    }

}