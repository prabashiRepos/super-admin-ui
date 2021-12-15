import {
  GET_WORKSHEET_ITEM,
  GET_WORKSHEET_ITEM_SUCCESS,
  GET_WORKSHEET_ITEM_FAIL,
  GET_WORKSHEET,
  GET_WORKSHEET_FAIL,
  GET_WORKSHEET_SUCCESS,
  ADD_WORKSHEET,
  ADD_WORKSHEET_SUCCESS,
  ADD_WORKSHEET_FAIL,
  UPDATE_WORKSHEET,
  UPDATE_WORKSHEET_SUCCESS,
  UPDATE_WORKSHEET_FAIL,
  DELETE_WORKSHEET,
  DELETE_WORKSHEET_SUCCESS,
  DELETE_WORKSHEET_FAIL,
} from "./actionTypes"

export const getItem = (data) => {
  return {
    type: GET_WORKSHEET_ITEM,
    payload: data,
    meta: {
      thunk: true
    }
  }
}

export const getItemSuccess = (users,{thunk}) => ({
  type: GET_WORKSHEET_ITEM_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getItemFail = (error, { thunk }) => ({
  type: GET_WORKSHEET_ITEM_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const getList = (data) => ({
  type: GET_WORKSHEET,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_WORKSHEET_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_WORKSHEET_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = user => ({
  type: ADD_WORKSHEET,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (user,{ thunk }) => ({
  type: ADD_WORKSHEET_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_WORKSHEET_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = user => ({
  type: UPDATE_WORKSHEET,
  payload: user,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (user, { thunk }) => ({
  type: UPDATE_WORKSHEET_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_WORKSHEET_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = user => ({
  type: DELETE_WORKSHEET,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (user,{ thunk }) => ({
  type: DELETE_WORKSHEET_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_WORKSHEET_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
