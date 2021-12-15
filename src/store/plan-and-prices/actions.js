import {
  GET_PLANS,
  GET_PLANS_FAIL,
  GET_PLANS_SUCCESS,
  ADD_PLAN,
  ADD_PLAN_SUCCESS,
  ADD_PLAN_FAIL,
  UPDATE_PLAN,
  UPDATE_PLAN_SUCCESS,
  UPDATE_PLAN_FAIL,
  DELETE_PLAN,
  DELETE_PLAN_SUCCESS,
  DELETE_PLAN_FAIL,
} from "./actionTypes"

export const getList = () => ({
  type: GET_PLANS,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_PLANS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_PLANS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = user => ({
  type: ADD_PLAN,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (user,{ thunk }) => ({
  type: ADD_PLAN_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_PLAN_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = user => ({
  type: UPDATE_PLAN,
  payload: user,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (user, { thunk }) => ({
  type: UPDATE_PLAN_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_PLAN_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = user => ({
  type: DELETE_PLAN,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (plan,{ thunk }) => ({
  type: DELETE_PLAN_SUCCESS,
  payload: plan,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_PLAN_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
