import {FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './userTypes'
import axios from 'axios';

export const  fetchUsersRequest = () => {
    return {
        type: FETCH_USERS_REQUEST
    }
}

export const  fetchUsersSuccess = (users) => {
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
};



export const  fetchUsersFailure = (error) => {
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

export const fetchUsers = () => {
    return (dispatch) => {
        dispatch(fetchUsersRequest)
        axios.get('http://localhost:5000/user')
            .then(res => {
                const users = res.data;
                dispatch(fetchUsersSuccess(users))
            })
            .catch(err => {
                const errorMessage = "api not found...";
                dispatch(fetchUsersFailure(errorMessage))
            })
    }
}

export const addNewUser = (user) => {
    return (dispatch) => {
        dispatch(fetchUsersRequest)
        axios.post('http://localhost:5000/user', user)
            .then(res => {
                const users = res.data;
                // dispatch(fetchUsersSuccess(users))
                dispatch(fetchUsers())
            })
            .catch(err => {
                const errorMessage = "wrong data... try again";
                dispatch(fetchUsersFailure(errorMessage))
            })
    }
}

export  const updateUser = (userId, obj) => {

    return (dispatch) => {
        dispatch(fetchUsersRequest)
        axios.patch('http://localhost:5000/user/'+ userId, obj )
            .then(res => {
                dispatch(fetchUsers())
                console.log('successfully updated: ', obj)
            })
            .catch(err => {
                const errorMessage = "wrong data... try again";
                console.log(errorMessage)
                dispatch(fetchUsersFailure(errorMessage))
            })
    }
}


export const getCurrentUser = (userId) => {
    return async (dispatch) => {
        dispatch(fetchUsersRequest);
      await   axios.get(`http://localhost:5000/user/${userId}`)
        .then(res => {
            dispatch(fetchUsers())
            console.log('successfully fetched current user')
        })
        .catch(err => {
            const errorMessage = "wrong data... try again";
            console.log(errorMessage)
            dispatch(fetchUsersFailure(errorMessage))
        })
    }
}

export const deleteUser = (userId) => {
    return  (dispatch) => {
        dispatch(fetchUsersRequest);
        axios.delete(`http://localhost:5000/user/${userId}`)
            .then(res => {
                dispatch(fetchUsers());
                console.log('User deleted successfully')
            })
            .catch( err => {
                const errMessage = "failed to delete the current user";
                console.log(errMessage);
                dispatch(fetchUsersFailure(errMessage));
            })
    }
}

