import { call, put, takeEvery } from "redux-saga/effects"

// SELF TEST QUESTION Redux States
import {
  GET_SELFTEST_QUESTIONS,
  ADD_SELFTEST_QUESTIONS,
  DELETE_SELFTEST_QUESTIONS,
  UPDATE_SELFTEST_QUESTIONS
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

import { getSelfTestQuestions,addSelfTestQuestion,updateSelfTestQuestion,deleteSelfTestQuestion } from "../../../helpers/api/sqillupApi"

function* onGetSelfTestQuestions({ payload,meta }) {
  try {
    const response = yield call(getSelfTestQuestions,payload)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onAddSelfTestQuestion({ payload: selftest, meta }) {
  try {
    const response = yield call(addSelfTestQuestion, selftest)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onUpdateSelfTestQuestion({ payload: selftest, meta }) {
  try {
    const response = yield call(updateSelfTestQuestion, selftest)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* onDeleteSelfTestQuestion({ payload: selftest, meta }) {
  try {
    const response = yield call(deleteSelfTestQuestion, selftest)
    yield put(deleteItemSuccess(selftest,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* SelfTestQuestionsSaga() {
  yield takeEvery(GET_SELFTEST_QUESTIONS, onGetSelfTestQuestions)
  yield takeEvery(ADD_SELFTEST_QUESTIONS, onAddSelfTestQuestion)
  yield takeEvery(UPDATE_SELFTEST_QUESTIONS, onUpdateSelfTestQuestion)
  yield takeEvery(DELETE_SELFTEST_QUESTIONS, onDeleteSelfTestQuestion)
}

export default SelfTestQuestionsSaga
