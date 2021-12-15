import {
  ADD_USER_LOADING,
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
} from "./actionTypes"

export const getUsers = () => ({
  type: GET_USERS,
  meta: {
    thunk: true
  }
})

export const getUsersSuccess = (users,{thunk}) => ({
  type: GET_USERS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getUsersFail = (error, { thunk }) => ({
  type: GET_USERS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
  meta: {
    thunk: true
  }
})

export const getUserProfileSuccess = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
  meta: {
    thunk: true
  }
})

export const getUserProfileFail = error => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
  meta: {
    thunk: true
  }
})

export const addNewUser = user => ({
  type: ADD_NEW_USER,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addUserSuccess = (user,{ thunk }) => ({
  type: ADD_USER_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addUserFail = (error,{ thunk }) => ({
  type: ADD_USER_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
  meta: {
    thunk:true
  }
})

export const updateUserSuccess = (user, { thunk }) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateUserFail = (error,{ thunk }) => ({
  type: UPDATE_USER_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteUserSuccess = (user,{ thunk }) => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const deleteUserFail = (error,{ thunk }) => ({
  type: DELETE_USER_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
