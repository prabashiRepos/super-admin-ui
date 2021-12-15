import {
  GET_PASTPAPER_ITEM,
  GET_PASTPAPER_ITEM_SUCCESS,
  GET_PASTPAPER_ITEM_FAIL,
  GET_PASTPAPER,
  GET_PASTPAPER_FAIL,
  GET_PASTPAPER_SUCCESS,
  ADD_PASTPAPER,
  ADD_PASTPAPER_SUCCESS,
  ADD_PASTPAPER_FAIL,
  UPDATE_PASTPAPER,
  UPDATE_PASTPAPER_SUCCESS,
  UPDATE_PASTPAPER_FAIL,
  DELETE_PASTPAPER,
  DELETE_PASTPAPER_SUCCESS,
  DELETE_PASTPAPER_FAIL,
} from "./actionTypes"

export const getItem = (data) => {
  return {
    type: GET_PASTPAPER_ITEM,
    payload: data,
    meta: {
      thunk: true
    }
  }
}

export const getItemSuccess = (users,{thunk}) => ({
  type: GET_PASTPAPER_ITEM_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getItemFail = (error, { thunk }) => ({
  type: GET_PASTPAPER_ITEM_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const getList = (data) => ({
  type: GET_PASTPAPER,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_PASTPAPER_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_PASTPAPER_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = data => {
  
  return {
  type: ADD_PASTPAPER,
  payload: data,
  meta: {
    thunk: true
  }
}}

export const addNewItemSuccess = (data,{ thunk }) => ({
  type: ADD_PASTPAPER_SUCCESS,
  payload: data,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_PASTPAPER_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = data => ({
  type: UPDATE_PASTPAPER,
  payload: data,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (data, { thunk }) => ({
  type: UPDATE_PASTPAPER_SUCCESS,
  payload: data,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_PASTPAPER_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = data => ({
  type: DELETE_PASTPAPER,
  payload: data,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (data,{ thunk }) => ({
  type: DELETE_PASTPAPER_SUCCESS,
  payload: data,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_PASTPAPER_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
