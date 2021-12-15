import {
  GET_LESSONS,
  GET_LESSONS_FAIL,
  GET_LESSONS_SUCCESS,
  ADD_LESSON,
  ADD_LESSON_SUCCESS,
  ADD_LESSON_FAIL,
  UPDATE_LESSON,
  UPDATE_LESSON_SUCCESS,
  UPDATE_LESSON_FAIL,
  DELETE_LESSON,
  DELETE_LESSON_SUCCESS,
  DELETE_LESSON_FAIL,
  GET_ACCESS_TOKEN,
  GET_ACCESS_TOKEN_SUCCESS,
  GET_ACCESS_TOKEN_FAIL,
  CREATE_VIDEO,
  CREATE_VIDEO_SUCCESS,
  CREATE_VIDEO_FAIL,
  VERIFY_VIDEO,
  VERIFY_VIDEO_SUCCESS,
  VERIFY_VIDEO_FAIL
} from "./actionTypes"

export const getList = (payload={}) => ({
  type: GET_LESSONS,
  payload,
  meta: {
    thunk: true
  }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_LESSONS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_LESSONS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = lesson => ({
  type: ADD_LESSON,
  payload: lesson,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (lesson,{ thunk }) => ({
  type: ADD_LESSON_SUCCESS,
  payload: lesson,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_LESSON_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = lesson => ({
  type: UPDATE_LESSON,
  payload: lesson,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (lesson, { thunk }) => ({
  type: UPDATE_LESSON_SUCCESS,
  payload: lesson,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_LESSON_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = lesson => ({
  type: DELETE_LESSON,
  payload: lesson,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (lesson,{ thunk }) => ({
  type: DELETE_LESSON_SUCCESS,
  payload: lesson,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_LESSON_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const getAccessToken = data => ({
  type: GET_ACCESS_TOKEN,
  payload: data,
  meta: {
    thunk: true
  }
})

export const getAccessTokenSuccess = (data,{ thunk }) => ({
  type: GET_ACCESS_TOKEN_SUCCESS,
  payload: data,
  meta: {
    thunk
  }
})

export const getAccessTokenFail = (error,{ thunk }) => ({
  type: GET_ACCESS_TOKEN_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const createVideo = data => ({
  type: CREATE_VIDEO,
  payload: data,
  meta: {
    thunk: true
  }
})

export const createVideoSuccess = (data,{ thunk }) => ({
  type: CREATE_VIDEO_SUCCESS,
  payload: data,
  meta: {
    thunk
  }
})

export const createVideoFail = (error,{ thunk }) => ({
  type: CREATE_VIDEO_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const VerifyVideo = data => ({
  type: VERIFY_VIDEO,
  payload: data,
  meta: {
    thunk: true
  }
})

export const VerifyVideoSuccess = (data,{ thunk }) => ({
  type: VERIFY_VIDEO_SUCCESS,
  payload: data,
  meta: {
    thunk
  }
})

export const VerifyVideoFail = (error,{ thunk }) => ({
  type: VERIFY_VIDEO_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
