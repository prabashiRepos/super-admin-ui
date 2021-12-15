import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_PASTPAPER_ITEM,
  GET_PASTPAPER,
  ADD_PASTPAPER,
  DELETE_PASTPAPER,
  UPDATE_PASTPAPER
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

import { getPastPaper,addPastPaper,updatePastPaper,deletePastPaper } from "../../helpers/api/sqillupApi"

function* fetchItem({ payload, meta }) {
  try {
    const response = yield call(getPastPaper,payload)
    yield put(getItemSuccess(response, meta))
  } catch (error) {
    yield put(getItemFail(error, meta))
  }
}

function* fetchList({ meta }) {
  
  try {
    const response = yield call(getPastPaper)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: selftest, meta }) {
  try {
    
    const response = yield call(addPastPaper, selftest)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: selftest, meta }) {
  try {
    const response = yield call(updatePastPaper, selftest)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: selftest, meta }) {
  try {
    const response = yield call(deletePastPaper, selftest)
    yield put(deleteItemSuccess(selftest,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* PastPaperSaga() {
  yield takeEvery(GET_PASTPAPER_ITEM, fetchItem)
  yield takeEvery(GET_PASTPAPER, fetchList)
  yield takeEvery(ADD_PASTPAPER, onaddNewItem)
  yield takeEvery(UPDATE_PASTPAPER, onupdateItem)
  yield takeEvery(DELETE_PASTPAPER, ondeleteItem)
}

export default PastPaperSaga
