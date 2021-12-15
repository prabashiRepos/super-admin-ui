import { call, put, takeEvery } from "redux-saga/effects"

// Exam Board Redux States
import { ADD_NEW_EXAM_BOARD, DELETE_EXAM_BOARD, GET_EXAM_BOARDS, UPDATE_EXAM_BOARD } from "./actionTypes"

import {
  addExamBoardFail,
  addExamBoardSuccess,
  deleteExamBoardFail,
  deleteExamBoardSuccess,
  getExamBoardsFail,
  getExamBoardsSuccess,
  updateExamBoardFail,
  updateExamBoardSuccess
} from "./actions"

import { addNewExamBoard, deleteExamBoard, getExamBoards, updateExamBoard } from "../../../helpers/api/sqillupApi"

function* onGetExamBoards({ meta }) {
  try {
    const response = yield call(getExamBoards)
    yield put(getExamBoardsSuccess(response, meta))
  } catch (error) {
    yield put(getExamBoardsFail(error, meta))
  }
}

function* onAddExamBoard({ payload: examBoard, meta }) {
  try {
    const response = yield call(addNewExamBoard, examBoard)
    yield put(addExamBoardSuccess(response, meta))
  } catch (error) {
    yield put(addExamBoardFail(error, meta))
  }
}

function* onUpdateExamBoard({ payload: user, meta }) {
  try {
    const response = yield call(updateExamBoard, user)
    yield put(updateExamBoardSuccess(response, meta))
  } catch (error) {
    yield put(updateExamBoardFail(error, meta))
  }
}

function* onDeleteExamBoard({ payload: user, meta }) {
  try {
    const response = yield call(deleteExamBoard, user)
    yield put(deleteExamBoardSuccess(user, meta))
  } catch (error) {
    yield put(deleteExamBoardFail(error, meta))
  }
}

function* ExamBoardSaga() {
  yield takeEvery(GET_EXAM_BOARDS, onGetExamBoards)
  yield takeEvery(ADD_NEW_EXAM_BOARD, onAddExamBoard)
  yield takeEvery(UPDATE_EXAM_BOARD, onUpdateExamBoard)
  yield takeEvery(DELETE_EXAM_BOARD, onDeleteExamBoard)
}

export default ExamBoardSaga
