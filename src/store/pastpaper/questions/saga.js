import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_PASTPAPER_QUESTIONS,
  ADD_PASTPAPER_QUESTIONS,
  DELETE_PASTPAPER_QUESTIONS,
  UPDATE_PASTPAPER_QUESTIONS
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

import { getPastPaperQuestions,addPastPaperQuestion,updatePastPaperQuestion,deletePastPaperQuestion } from "../../../helpers/api/sqillupApi"

function* fetchList({ payload,meta }) {
  try {
    const response = yield call(getPastPaperQuestions,payload)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: selftest, meta }) {
  try {
    const response = yield call(addPastPaperQuestion, selftest)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: selftest, meta }) {
  try {
    const response = yield call(updatePastPaperQuestion, selftest)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: selftest, meta }) {
  try {
    const response = yield call(deletePastPaperQuestion, selftest)
    yield put(deleteItemSuccess(selftest,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* PastPaperQuestionsSaga() {
  yield takeEvery(GET_PASTPAPER_QUESTIONS, fetchList)
  yield takeEvery(ADD_PASTPAPER_QUESTIONS, onaddNewItem)
  yield takeEvery(UPDATE_PASTPAPER_QUESTIONS, onupdateItem)
  yield takeEvery(DELETE_PASTPAPER_QUESTIONS, ondeleteItem)
}

export default PastPaperQuestionsSaga
