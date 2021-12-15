import {
  GET_PASTPAPER_QUESTIONS,
  GET_PASTPAPER_QUESTIONS_FAIL,
  GET_PASTPAPER_QUESTIONS_SUCCESS,
  ADD_PASTPAPER_QUESTIONS,
  ADD_PASTPAPER_QUESTIONS_SUCCESS,
  ADD_PASTPAPER_QUESTIONS_FAIL,
  UPDATE_PASTPAPER_QUESTIONS,
  UPDATE_PASTPAPER_QUESTIONS_SUCCESS,
  UPDATE_PASTPAPER_QUESTIONS_FAIL,
  DELETE_PASTPAPER_QUESTIONS,
  DELETE_PASTPAPER_QUESTIONS_SUCCESS,
  DELETE_PASTPAPER_QUESTIONS_FAIL,
} from "./actionTypes"


export const getList = (data) => ({
  type: GET_PASTPAPER_QUESTIONS,
  payload:data,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_PASTPAPER_QUESTIONS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_PASTPAPER_QUESTIONS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = user => ({
  type: ADD_PASTPAPER_QUESTIONS,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (user,{ thunk }) => ({
  type: ADD_PASTPAPER_QUESTIONS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_PASTPAPER_QUESTIONS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = user => ({
  type: UPDATE_PASTPAPER_QUESTIONS,
  payload: user,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (user, { thunk }) => ({
  type: UPDATE_PASTPAPER_QUESTIONS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_PASTPAPER_QUESTIONS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = user => ({
  type: DELETE_PASTPAPER_QUESTIONS,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (user,{ thunk }) => ({
  type: DELETE_PASTPAPER_QUESTIONS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_PASTPAPER_QUESTIONS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
