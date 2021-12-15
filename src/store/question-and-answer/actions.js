import {
  GET_QA,
  GET_QA_FAIL,
  GET_QA_SUCCESS,
  CREATE_QA,
  CREATE_QA_SUCCESS,
  CREATE_QA_FAIL,
  UPDATE_QA,
  UPDATE_QA_SUCCESS,
  UPDATE_QA_FAIL,
  DELETE_QA,
  DELETE_QA_SUCCESS,
  DELETE_QA_FAIL,
} from "./actionTypes"

export const getList = () => ({
  type: GET_QA,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_QA_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_QA_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = user => ({
  type: CREATE_QA,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (user,{ thunk }) => ({
  type: CREATE_QA_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: CREATE_QA_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = user => ({
  type: UPDATE_QA,
  payload: user,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (user, { thunk }) => ({
  type: UPDATE_QA_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_QA_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = user => ({
  type: DELETE_QA,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (plan,{ thunk }) => ({
  type: DELETE_QA_SUCCESS,
  payload: plan,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_QA_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
