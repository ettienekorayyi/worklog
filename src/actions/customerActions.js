import * as actions from './actionTypes';
import taskstechApi from '../api/taskstechApi';
import { push } from 'connected-react-router';

export const getCustomers = (loading = true) => async dispatch => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
        taskstechApi.get(`/users/customer`, config)
            .then(res => {
                
                dispatch({
                    type: actions.GET_CUSTOMERS_STARTED,
                    loading: loading
                });
                if (res.data) {
                    dispatch({
                        type: actions.GET_CUSTOMERS,
                        payload: res.data,
                        loading: false
                    });
                }
               /*console.log(res.data); */
               
            })
    } catch (error) {
        console.log(error.message)
    }
}



export const customerRegistration = (firstname, lastname, email,  address, phone) => {
    return async (dispatch) => {
        const customerRegistrationData = {
            email: email,
            first_name: firstname,
            last_name: lastname,
            address:address,
            phone: phone,
            password:"Password"
        }
        console.log(customerRegistrationData)
            taskstechApi.post('users/customer', customerRegistrationData)
                .then(() => {
                    alert("Customer registered successfully!")
                    dispatch(push('/view/customers'))
                }). catch ((error) => {
                    alert(error.response.data.message)
        })
    }
}


//Update Customer

export const updateCustomer = (customerData, id) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token');
        try {
            taskstechApi.put(`/users/customer/${id}`, customerData, {
                headers: { authorization: `Bearer ${token}` }
            })

                .then(() => {
                    alert("Customer's Profile has been updated!")
                    dispatch(push('/view/customers'))
                })
        } catch (error) {
            console.log(error.message)
        }
    }
}