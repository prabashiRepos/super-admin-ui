import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_CHAPTERS,
  ADD_CHAPTER,
  DELETE_CHAPTER,
  UPDATE_CHAPTER
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

import { getChapters,addChapter,updateChapter,deleteChapter } from "../../../helpers/api/sqillupApi"

function* fetchList({ payload, meta }) {
  try {
    const response = yield call(getChapters,payload)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: key_stage, meta }) {
  try {
    const response = yield call(addChapter, key_stage)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: key_stage, meta }) {
  try {
    const response = yield call(updateChapter, key_stage)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: key_stage, meta }) {
  try {
    const response = yield call(deleteChapter, key_stage)
    yield put(deleteItemSuccess(key_stage,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* ChaptersSaga() {
  yield takeEvery(GET_CHAPTERS, fetchList)
  yield takeEvery(ADD_CHAPTER, onaddNewItem)
  yield takeEvery(UPDATE_CHAPTER, onupdateItem)
  yield takeEvery(DELETE_CHAPTER, ondeleteItem)
}

export default ChaptersSaga
