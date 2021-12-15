import {
  ADD_SELFTEST_QUESTIONS,
  ADD_SELFTEST_QUESTIONS_FAIL,
  ADD_SELFTEST_QUESTIONS_SUCCESS,
  DELETE_SELFTEST_QUESTIONS,
  DELETE_SELFTEST_QUESTIONS_FAIL,
  DELETE_SELFTEST_QUESTIONS_SUCCESS,
  GET_SELFTEST_QUESTIONS,
  GET_SELFTEST_QUESTIONS_FAIL,
  GET_SELFTEST_QUESTIONS_SUCCESS,
  UPDATE_SELFTEST_QUESTIONS,
  UPDATE_SELFTEST_QUESTIONS_FAIL,
  UPDATE_SELFTEST_QUESTIONS_SUCCESS
} from "./actionTypes"


export const getList = (data) => ({
  type: GET_SELFTEST_QUESTIONS,
  payload:data,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_SELFTEST_QUESTIONS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_SELFTEST_QUESTIONS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = user => ({
  type: ADD_SELFTEST_QUESTIONS,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (user,{ thunk }) => ({
  type: ADD_SELFTEST_QUESTIONS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_SELFTEST_QUESTIONS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = user => ({
  type: UPDATE_SELFTEST_QUESTIONS,
  payload: user,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (user, { thunk }) => ({
  type: UPDATE_SELFTEST_QUESTIONS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_SELFTEST_QUESTIONS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = user => ({
  type: DELETE_SELFTEST_QUESTIONS,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (user,{ thunk }) => ({
  type: DELETE_SELFTEST_QUESTIONS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_SELFTEST_QUESTIONS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
