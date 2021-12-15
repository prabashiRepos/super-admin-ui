import { call, put, takeEvery } from "redux-saga/effects"

// SELF TEST Redux States
import { ADD_SELF_TEST, DELETE_SELF_TEST, GET_SELF_TEST, GET_SELF_TESTS, UPDATE_SELF_TEST } from "./actionTypes"

import {
  addSelfTestFail,
  addSelfTestSuccess,
  deleteSelfTestFail,
  deleteSelfTestSuccess,
  getSelfTestFail,
  getSelfTestsFail,
  getSelfTestsSuccess,
  getSelfTestSuccess,
  updateSelfTestFail,
  updateSelfTestSuccess
} from "./actions"

import { addSelfTest, deleteSelfTest, getSelfTests, updateSelfTest } from "../../helpers/api/sqillupApi"

function* onGetSelfTest({ payload, meta }) {
  try {
    const response = yield call(getSelfTests, payload)
    yield put(getSelfTestSuccess(response, meta))
  } catch (error) {
    yield put(getSelfTestFail(error, meta))
  }
}

function* onGetSelfTests({ meta }) {
  try {
    const response = yield call(getSelfTests)
    yield put(getSelfTestsSuccess(response, meta))
  } catch (error) {
    yield put(getSelfTestsFail(error, meta))
  }
}

function* onAddSelfTest({ payload: selftest, meta }) {
  try {
    const response = yield call(addSelfTest, selftest)
    yield put(addSelfTestSuccess(response, meta))
  } catch (error) {
    yield put(addSelfTestFail(error, meta))
  }
}

function* onUpdateSelfTest({ payload: selftest, meta }) {
  try {
    const response = yield call(updateSelfTest, selftest)
    yield put(updateSelfTestSuccess(response, meta))
  } catch (error) {
    yield put(updateSelfTestFail(error, meta))
  }
}

function* onDeleteSelfTest({ payload: selftest, meta }) {
  try {
    const response = yield call(deleteSelfTest, selftest)
    yield put(deleteSelfTestSuccess(selftest, meta))
  } catch (error) {
    yield put(deleteSelfTestFail(error, meta))
  }
}

function* SelfTestSaga() {
  yield takeEvery(GET_SELF_TEST, onGetSelfTest)
  yield takeEvery(GET_SELF_TESTS, onGetSelfTests)
  yield takeEvery(ADD_SELF_TEST, onAddSelfTest)
  yield takeEvery(UPDATE_SELF_TEST, onUpdateSelfTest)
  yield takeEvery(DELETE_SELF_TEST, onDeleteSelfTest)
}

export default SelfTestSaga
