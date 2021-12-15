import {
  GET_CHAPTERS,
  GET_CHAPTERS_FAIL,
  GET_CHAPTERS_SUCCESS,
  FILTER_CHAPTER,
  FILTER_CHAPTER_SUCCESS,
  FILTER_CHAPTER_FAIL,
  ADD_CHAPTER,
  ADD_CHAPTER_SUCCESS,
  ADD_CHAPTER_FAIL,
  UPDATE_CHAPTER,
  UPDATE_CHAPTER_SUCCESS,
  UPDATE_CHAPTER_FAIL,
  DELETE_CHAPTER,
  DELETE_CHAPTER_SUCCESS,
  DELETE_CHAPTER_FAIL,
} from "./actionTypes"

export const getList = (data={}) => ( {
    type: GET_CHAPTERS,
    payload: data,
    meta: {
      thunk: true
    }
})

export const getListSuccess = (users,{thunk}) => ({
  type: GET_CHAPTERS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getListFail = (error, { thunk }) => ({
  type: GET_CHAPTERS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const filterChapter = () => ({
  type: FILTER_CHAPTER,
  meta: {
    thunk: true
  }
})

export const filterChapterSuccess = (users,{thunk}) => ({
  type: FILTER_CHAPTER_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const filterChapterFail = (error, { thunk }) => ({
  type: FILTER_CHAPTER_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewItem = chapter => ({
  type: ADD_CHAPTER,
  payload: chapter,
  meta: {
    thunk: true
  }
})

export const addNewItemSuccess = (chapter,{ thunk }) => ({
  type: ADD_CHAPTER_SUCCESS,
  payload: chapter,
  meta: {
    thunk
  }
})

export const addNewItemFail = (error,{ thunk }) => ({
  type: ADD_CHAPTER_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const updateItem = chapter => ({
  type: UPDATE_CHAPTER,
  payload: chapter,
  meta: {
    thunk:true
  }
})

export const updateItemSuccess = (chapter, { thunk }) => ({
  type: UPDATE_CHAPTER_SUCCESS,
  payload: chapter,
  meta: {
    thunk
  }
})

export const updateItemFail = (error,{ thunk }) => ({
  type: UPDATE_CHAPTER_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})

export const deleteItem = chapter => ({
  type: DELETE_CHAPTER,
  payload: chapter,
  meta: {
    thunk: true
  }
})

export const deleteItemSuccess = (chapter,{ thunk }) => ({
  type: DELETE_CHAPTER_SUCCESS,
  payload: chapter,
  meta: {
    thunk
  }
})

export const deleteItemFail = (error,{ thunk }) => ({
  type: DELETE_CHAPTER_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
