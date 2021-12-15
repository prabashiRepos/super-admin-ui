import {
  GET_VIDEO_ITEM,
  GET_VIDEO_ITEM_SUCCESS,
  GET_VIDEO_ITEM_FAIL,
  GET_VIDEOS,
  GET_VIDEOS_FAIL,
  GET_VIDEOS_SUCCESS,
  ADD_VIDEOS,
  ADD_VIDEOS_SUCCESS,
  ADD_VIDEOS_FAIL,
  UPDATE_VIDEOS,
  UPDATE_VIDEOS_SUCCESS,
  UPDATE_VIDEOS_FAIL,
  DELETE_VIDEOS,
  DELETE_VIDEOS_SUCCESS,
  DELETE_VIDEOS_FAIL,
  VERIFY_NEW_VIDEOS,
  VERIFY_NEW_VIDEOS_SUCCESS,
  VERIFY_NEW_VIDEOS_FAIL
} from "./actionTypes"

export const getItem = (data) => {
  return {
    type: GET_VIDEO_ITEM,
    payload: data,
    meta: {
      thunk: true
    }
  }
}

export const getItemSuccess = (users,{thunk}) => ({
  type: GET_VIDEO_ITEM_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getItemFail = (error, { thunk }) => ({
  type: GET_VIDEO_ITEM_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const getList = (data) => ({
  type: GET_VIDEOS,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_VIDEOS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_VIDEOS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = video => ({
  type: ADD_VIDEOS,
  payload: video,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (video,{ thunk }) => ({
  type: ADD_VIDEOS_SUCCESS,
  payload: video,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_VIDEOS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = user => ({
  type: UPDATE_VIDEOS,
  payload: user,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (user, { thunk }) => ({
  type: UPDATE_VIDEOS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_VIDEOS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = user => ({
  type: DELETE_VIDEOS,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (user,{ thunk }) => ({
  type: DELETE_VIDEOS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_VIDEOS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const verifyVideo = video => {
  
  return {
    type: VERIFY_NEW_VIDEOS,
    payload: video,
    meta: {
      thunk: true
    }
  }
}

export const verifyVideoSuccess = (user,{ thunk }) => ({
  type: VERIFY_NEW_VIDEOS_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const verifyVideoFail = (error,{ thunk }) => ({
  type: VERIFY_NEW_VIDEOS_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
