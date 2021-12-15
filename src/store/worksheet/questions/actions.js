import {
  GET_WORKSHEET_QUESTIONS,
  GET_WORKSHEET_QUESTIONS_FAIL,
  GET_WORKSHEET_QUESTIONS_SUCCESS,
  ADD_WORKSHEET_QUESTIONS,
  ADD_WORKSHEET_QUESTIONS_SUCCESS,
  ADD_WORKSHEET_QUESTIONS_FAIL,
  UPDATE_WORKSHEET_QUESTIONS,
  UPDATE_WORKSHEET_QUESTIONS_SUCCESS,
  UPDATE_WORKSHEET_QUESTIONS_FAIL,
  DELETE_WORKSHEET_QUESTIONS,
  DELETE_WORKSHEET_QUESTIONS_SUCCESS,
  DELETE_WORKSHEET_QUESTIONS_FAIL,
} from "./actionTypes"


export const getList = (data) => ({
  type: GET_WORKSHEET_QUESTIONS,
  payload:data,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_WORKSHEET_QUESTIONS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_WORKSHEET_QUESTIONS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = user => ({
  type: ADD_WORKSHEET_QUESTIONS,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (user,{ thunk }) => ({
  type: ADD_WORKSHEET_QUESTIONS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_WORKSHEET_QUESTIONS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = user => ({
  type: UPDATE_WORKSHEET_QUESTIONS,
  payload: user,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (user, { thunk }) => ({
  type: UPDATE_WORKSHEET_QUESTIONS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_WORKSHEET_QUESTIONS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = user => ({
  type: DELETE_WORKSHEET_QUESTIONS,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (user,{ thunk }) => ({
  type: DELETE_WORKSHEET_QUESTIONS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_WORKSHEET_QUESTIONS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
