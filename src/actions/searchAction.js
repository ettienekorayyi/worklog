import * as actions from './actionTypes';
import taskstechApi from '../api/taskstechApi';

export const search = (type = 'job',search_term = '') => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
        taskstechApi.post(`/search?type=${type}`, { 
            "search_term": search_term 
        }, config)
            .then(res => {
                dispatch({
                    type: actions.GET_SEARCHED_JOB_STARTED,
                    loading: true
                });
                if (res.data) {
                    dispatch({
                        type: actions.GET_SEARCHED_JOB,
                        payload: res.data,
                        loading: false
                    });
                }
            })
    } catch (error) {
        console.log(error.message)
    }
}
