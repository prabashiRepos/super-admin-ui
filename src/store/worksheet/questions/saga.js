import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_WORKSHEET_QUESTIONS,
  ADD_WORKSHEET_QUESTIONS,
  DELETE_WORKSHEET_QUESTIONS,
  UPDATE_WORKSHEET_QUESTIONS
} from "./actionTypes"

import {
  getListSuccess,
  getListFail,
  addNewItemFail,
  addNewItemSuccess,
  updateItemSuccess,
  updateItemFail,
  deleteItemSuccess,
  deleteItemFail,
} from "./actions"

import { getWorksheetQuestions,addWorksheetQuestion,updateWorksheetQuestion,deleteWorksheetQuestion } from "../../../helpers/api/sqillupApi"

function* fetchList({ payload,meta }) {
  try {
    const response = yield call(getWorksheetQuestions,payload)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: selftest, meta }) {
  try {
    const response = yield call(addWorksheetQuestion, selftest)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: selftest, meta }) {
  try {
    const response = yield call(updateWorksheetQuestion, selftest)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: selftest, meta }) {
  try {
    const response = yield call(deleteWorksheetQuestion, selftest)
    yield put(deleteItemSuccess(selftest,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* WorkSheetQuestionsSaga() {
  yield takeEvery(GET_WORKSHEET_QUESTIONS, fetchList)
  yield takeEvery(ADD_WORKSHEET_QUESTIONS, onaddNewItem)
  yield takeEvery(UPDATE_WORKSHEET_QUESTIONS, onupdateItem)
  yield takeEvery(DELETE_WORKSHEET_QUESTIONS, ondeleteItem)
}

export default WorkSheetQuestionsSaga
