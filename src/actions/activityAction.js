import * as actions from './actionTypes';
import taskstechApi from '../api/taskstechApi';
import { push } from 'connected-react-router';


export const getActivities = (loading = true, id) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const job = {
        "jobId": id
    };
    taskstechApi.get(`/worklog/jobId?jobId=${job.jobId}`, config)
        .then(res => {
            dispatch({
                type: actions.GET_ACTIVITIES_STARTED,
                loading: loading
            });
            if (res.data.length !== 0) {
                dispatch({
                    type: actions.GET_ACTIVITIES_SUCCESS,
                    payload: res.data,
                    hasError: false,
                    loading: false
                });
            }
        }).catch((error) => {
            dispatch({
                type: actions.GET_ACTIVITIES_FAILED,
                errorMessage: error.message,
                status: error.response.status,
                hasError: true,
                loading: false
            });
        });
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
        "createdOn": activity.createdOn,
        "lastUpdated": activity.lastUpdated, //
        "lastUpdatedBy": activity.lastUpdatedBy, //
        "jobId": activity.jobId
    };

    try {
        taskstechApi.post(`/worklog/createworklog`, job, config)
            .then(res => {
                dispatch({
                    type: actions.ADD_ACTIVITY_STARTED,
                    loading: true
                });
                if (res.data) {
                    dispatch({
                        type: actions.ADD_ACTIVITY_SUCCESS,
                        loading: false
                    });
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
        "worklogId": activity.worklogId,
        "description": activity.description,
        "createdOn": activity.createdOn,
        "lastUpdated": activity.lastUpdated,
        "lastUpdatedBy": activity.lastUpdatedBy,
        "jobId": activity.jobId
    };

    try {
        taskstechApi
            .put(`/worklog/updateworklog/`, job, config)
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