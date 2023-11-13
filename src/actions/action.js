import * as actions from './actionTypes';
import taskstechApi from '../api/taskstechApi';
import { fetchInventoryAction } from './inventoryActions'
import { signInAction, signOutAction, setTraderData } from './traderActions';
import { push } from 'connected-react-router';

export const getJob = (id) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
        dispatch({ type: actions.GET_JOB_STARTED, loading: true });
        
        await taskstechApi
            .get(`/job/${id}`, config)
            .then((res) => {
                dispatch({ type: actions.GET_JOB, payload: res.data, loading: false });
            }).catch(e => {
                console.log(e)
            });
    } catch (error) {
        console.log(error.message)
    }
}

export const getAllJobs = () => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
        taskstechApi.get(`/job`, config)
            .then(res => {
                dispatch({
                    type: actions.GET_ALL_JOBS_STARTED,
                    loading: true
                });
                if (res.data) {
                    dispatch({
                        type: actions.GET_ALL_JOBS,
                        payload: res.data,
                        loading: false
                    });
                }
            })
    } catch (error) {
        console.log(error.message)
    }
}

export const createJob = (job) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
        dispatch({ 
            type: actions.CREATE_JOB_STARTED, 
            loading: true, 
            showModal: false 
        });        
        
        await taskstechApi
            .post('/job', job, config)
            .then((res) => {
                console.log(res)
                dispatch({ 
                    type: actions.CREATE_JOB_SUCCESS, 
                    loading: false, 
                    showModal: true 
                });        
            }).catch(e => {
                console.log(e)
            });
    } catch (error) {
        console.log(error.message)
    }
}

export const updateJob = (job) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
        dispatch({ type: actions.UPDATE_JOB_STARTED, loading: true, showModal: false });
        
        await taskstechApi
            .put(`/job/${job.id}`, job, config)
            .then((res) => {
                console.log(res)
                dispatch({ type: actions.UPDATE_JOB_SUCCESS, payload: job, loading: false, showModal: true });
            }).catch(e => {
                console.log(e)
            });
    } catch (error) {
        console.log(error.message)
    }
}





export const getStatus = () => async dispatch => {
    const { data } = await taskstechApi.get('/lists');

    dispatch({ type: actions.GET_JOB_STATUS_STARTED, loading: true });

    if (data) {
        dispatch({ type: actions.GET_JOB_STATUS, payload: data.job_status, loading: false });
    }
}

// Authentication Action
export const listenAuthState = (matches) => {
    const renderedInMobile = matches ? '/mobile-login-menu' : '/login';
    
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        if (!token) {
            dispatch(push(renderedInMobile))
        }
        dispatch(signInAction({
            isSignedIn: true,
        }))
    }
}


//Inventory Actions

export const fetchInventory = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        try {
            taskstechApi.get(`/inventory`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    console.log(res)
                    if (res.data) {
                        const items = res.data
                        const inventoryList = []
                        items.forEach(item => {
                            const inventoryItem = {
                                name: item.name,
                                description: item.description,
                                supplier: item.supplier,
                                model_no: item.model_no,
                                price: item.price,
                                id: item.id,
                                notes: item.notes,
                                inventory_details: item.inventory_details,
                                quantity: item.inventory_details.length
                            }
                            inventoryList.push(inventoryItem)
                        })
                        dispatch(fetchInventoryAction(inventoryList))
                    }
                })
        } catch (error) {
            console.log(error.message)
        }
    }
}


export const createInventory = (inventoryData) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        try {
            taskstechApi.post(`/inventory`, inventoryData, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    console.log(res)
                    alert("Item created successfully!")
                    dispatch(push('/list/inventory'))
                })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const updateInventory = (inventoryData, iid) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        try {
            taskstechApi.put(`/inventory/${iid}`, inventoryData, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    console.log(res)
                    alert("Item updated successfully!")
                    dispatch(push('/list/inventory'))
                })
        } catch (error) {
            console.log(error.message)
        }
    }
}
export const deleteInventory = (iid) => {
    return async () => {
        const token = localStorage.getItem('token');
        try {
            taskstechApi.delete(`/inventory/${iid}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => {
                    console.log(res)
                    // alert ("Item deleted successfully!");
                    // dispatch(push('/inventory/list'))

                })
        } catch (error) {
            console.log(error.message)
        }
    }
}




// Traders Actions

export const signUp = (firstname, lastname, email, password, confirmPassword, description, phone) => {
    return async (dispatch) => {
        const traderSignUpData = {
            email: email,
            password: password,
            first_name: firstname,
            last_name: lastname,
            description: description,
            phone: phone
        }
        console.log(traderSignUpData)
        taskstechApi.post('users/tradesperson', traderSignUpData)
            .then((res) => {
                console.log(res)
                alert("Your account has been successfully created. \n\nWelcome!")
                dispatch(push('/login'))
            }).catch((error) => {
                console.log(error.response)
                alert(error.response.data.message)
            })
    }
}

export const signIn = (email, password) => {
    return async (dispatch) => {
        taskstechApi.post(`/tokens`, {},
            {
                auth: {
                    username: email,
                    password: password,
                }
            }
        )
            .then(res => {
                localStorage.setItem("token", res.data.token)
                localStorage.setItem("id", res.data.user_id)
                dispatch(signInAction({
                    isSignedIn: true,
                    id: res.data.user_id,
                }))
                getTraderData()
                dispatch(push('/view/jobs'))
            }).catch((error) => {
                console.log(error.response)
                alert("Email and Password does not match. \n\nPlease try again.")
            })
    }
}

export const getTraderData = () => {
    return async (dispatch) => {
        //  const selector = useSelector(state => state.trader)
        //  const id = getTraderId(selector)
        const id = localStorage.getItem('id')
        const token = localStorage.getItem('token');
        try {
            taskstechApi.get(`/users/tradesperson/${id}`, {
                headers: { authorization: `Bearer ${token}` }
            })
                .then(res => {
                    dispatch(setTraderData({
                        firstname: res.data.first_name,
                        lastname: res.data.last_name,
                        email: res.data.email,
                        phone: res.data.phone,
                        description: res.data.description,
                    })
                    )
                })
        } catch (error) {
            console.log(error.message)
        }
    }
}

export const updateTrader = (firstname, lastname, email, password, description, phone) => {
    return async () => {
        // const selector = useSelector(state => state)
        // const id = getTraderId(selector)
        const id = localStorage.getItem('id')
        const token = localStorage.getItem('token');
        const traderSignUpData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            password: password,
            description: description,
            phone: phone
        }
        try {
            taskstechApi.put(`/users/tradesperson/${id}`, traderSignUpData, {
                headers: { authorization: `Bearer ${token}` }
            })

                .then(res => {
                    console.log(res)
                    alert("Your Profile has been updated!")
                })
        } catch (error) {
            console.log(error.message)
        }
    }
}


export const signOut = () => { // matches
    //const renderedInMobile = matches ? '/mobile-login-menu' : '/login';
    const logout = "/login";
    return async (dispatch) => {
        dispatch(signOutAction());
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        dispatch(push(logout)); //renderedInMobile
    }
}


