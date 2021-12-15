import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_QA,
  CREATE_QA,
  DELETE_QA,
  UPDATE_QA
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

import { getQuestions,addQuestion,updateQuestion,deleteQuestion } from "../../helpers/api/sqillupApi"

function* fetchList({ meta }) {
  try {
    const response = yield call(getQuestions)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: subject, meta }) {
  try {
    const response = yield call(addQuestion, subject)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: subject, meta }) {
  try {
    const response = yield call(updateQuestion, subject)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: plan, meta }) {
  try {
    const response = yield call(deleteQuestion, plan)
    yield put(deleteItemSuccess(plan,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* QuestionAndAnswerSaga() {
  yield takeEvery(GET_QA, fetchList)
  yield takeEvery(CREATE_QA, onaddNewItem)
  yield takeEvery(UPDATE_QA, onupdateItem)
  yield takeEvery(DELETE_QA, ondeleteItem)
}

export default QuestionAndAnswerSaga
