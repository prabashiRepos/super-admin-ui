import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_WORKSHEET_ITEM,
  GET_WORKSHEET,
  ADD_WORKSHEET,
  DELETE_WORKSHEET,
  UPDATE_WORKSHEET
} from "./actionTypes"

import {
  getItemSuccess,
  getItemFail,
  getListSuccess,
  getListFail,
  addNewItemFail,
  addNewItemSuccess,
  updateItemSuccess,
  updateItemFail,
  deleteItemSuccess,
  deleteItemFail,
} from "./actions"

import { getWorksheet,addWorksheet,updateWorksheet,deleteWorksheet } from "../../helpers/api/sqillupApi"

function* fetchItem({ payload, meta }) {
  try {
    const response = yield call(getWorksheet,payload)
    yield put(getItemSuccess(response, meta))
  } catch (error) {
    yield put(getItemFail(error, meta))
  }
}

function* fetchList({ meta }) {
  
  try {
    const response = yield call(getWorksheet)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: selftest, meta }) {
  try {
    const response = yield call(addWorksheet, selftest)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: selftest, meta }) {
  try {
    const response = yield call(updateWorksheet, selftest)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: selftest, meta }) {
  try {
    const response = yield call(deleteWorksheet, selftest)
    yield put(deleteItemSuccess(selftest,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* WorksheetSaga() {
  yield takeEvery(GET_WORKSHEET_ITEM, fetchItem)
  yield takeEvery(GET_WORKSHEET, fetchList)
  yield takeEvery(ADD_WORKSHEET, onaddNewItem)
  yield takeEvery(UPDATE_WORKSHEET, onupdateItem)
  yield takeEvery(DELETE_WORKSHEET, ondeleteItem)
}

export default WorksheetSaga
