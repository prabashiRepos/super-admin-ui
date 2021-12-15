import {
  ADD_EXAM_BOARD_FAIL,
  ADD_EXAM_BOARD_SUCCESS,
  ADD_NEW_EXAM_BOARD,
  DELETE_EXAM_BOARD,
  DELETE_EXAM_BOARD_FAIL,
  DELETE_EXAM_BOARD_SUCCESS,
  GET_EXAM_BOARDS,
  GET_EXAM_BOARDS_FAIL,
  GET_EXAM_BOARDS_SUCCESS,
  UPDATE_EXAM_BOARD,
  UPDATE_EXAM_BOARD_FAIL,
  UPDATE_EXAM_BOARD_SUCCESS
} from "./actionTypes"

export const getExamBoards = () => ({
  type: GET_EXAM_BOARDS,
  meta: {
    thunk: true
  }
})

export const getExamBoardsSuccess = (users, { thunk }) => ({
  type: GET_EXAM_BOARDS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getExamBoardsFail = (error, { thunk }) => ({
  type: GET_EXAM_BOARDS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addNewExamBoard = user => ({
  type: ADD_NEW_EXAM_BOARD,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addExamBoardSuccess = (user, { thunk }) => ({
  type: ADD_EXAM_BOARD_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addExamBoardFail = (error, { thunk }) => ({
  type: ADD_EXAM_BOARD_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})

export const updateExamBoard = user => ({
  type: UPDATE_EXAM_BOARD,
  payload: user,
  meta: {
    thunk: true
  }
})

export const updateExamBoardSuccess = (user, { thunk }) => ({
  type: UPDATE_EXAM_BOARD_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateExamBoardFail = (error, { thunk }) => ({
  type: UPDATE_EXAM_BOARD_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})

export const deleteExamBoard = user => ({
  type: DELETE_EXAM_BOARD,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteExamBoardSuccess = (user, { thunk }) => ({
  type: DELETE_EXAM_BOARD_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const deleteExamBoardFail = (error, { thunk }) => ({
  type: DELETE_EXAM_BOARD_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})
