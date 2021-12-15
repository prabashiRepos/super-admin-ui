import {
  GET_SUBJECTS,
  GET_SUBJECTS_FAIL,
  GET_SUBJECTS_SUCCESS,
  ADD_SUBJECT,
  ADD_SUBJECT_SUCCESS,
  ADD_SUBJECT_FAIL,
  UPDATE_SUBJECT,
  UPDATE_SUBJECT_SUCCESS,
  UPDATE_SUBJECT_FAIL,
  DELETE_SUBJECT,
  DELETE_SUBJECT_SUCCESS,
  DELETE_SUBJECT_FAIL,
} from "./actionTypes"

export const getList = () => ({
  type: GET_SUBJECTS,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_SUBJECTS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_SUBJECTS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = user => ({
  type: ADD_SUBJECT,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (user,{ thunk }) => ({
  type: ADD_SUBJECT_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_SUBJECT_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = user => ({
  type: UPDATE_SUBJECT,
  payload: user,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (user, { thunk }) => ({
  type: UPDATE_SUBJECT_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_SUBJECT_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = user => ({
  type: DELETE_SUBJECT,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (user,{ thunk }) => ({
  type: DELETE_SUBJECT_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_SUBJECT_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
