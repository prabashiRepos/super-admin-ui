import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_LESSONS,
  ADD_LESSON,
  DELETE_LESSON,
  UPDATE_LESSON,
  GET_ACCESS_TOKEN,
  CREATE_VIDEO,
  VERIFY_VIDEO
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
  getAccessTokenSuccess,
  getAccessTokenFail,
  createVideoSuccess,
  createVideoFail,
  VerifyVideoSuccess,
  VerifyVideoFail
} from "./actions"

import { getLessons,addLesson,updateLesson,deleteLesson,getAccessToken,createVideo,verifyVideo  } from "../../../helpers/api/sqillupApi"

function* fetchList({payload ,meta }) {
  try {
    const response = yield call(getLessons,payload)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: key_stage, meta }) {
  try {
    const response = yield call(addLesson, key_stage)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: key_stage, meta }) {
  try {
    const response = yield call(updateLesson, key_stage)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: key_stage, meta }) {
  try {
    const response = yield call(deleteLesson, key_stage)
    yield put(deleteItemSuccess(key_stage,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* onGetAccessToken({ payload: key_stage, meta }) {
  try {
    const response = yield call(getAccessToken, key_stage)
    yield put(getAccessTokenSuccess(key_stage,meta))
  } catch (error) {
    yield put(getAccessTokenFail(error,meta))
  }
}
function* onCreateVideo({ payload: data, meta }) {
  try {
    const response = yield call(createVideo, data)
    yield put(createVideoSuccess(response,meta))
  } catch (error) {
    yield put(createVideoFail(error,meta))
  }
}
function* onVerifyVideo({ payload: data, meta }) {
  try {
    const response = yield call(verifyVideo, data)
    yield put(VerifyVideoSuccess(data,meta))
  } catch (error) {
    yield put(VerifyVideoFail(error,meta))
  }
}

function* LessonsSaga() {
  yield takeEvery(GET_LESSONS, fetchList)
  yield takeEvery(ADD_LESSON, onaddNewItem)
  yield takeEvery(UPDATE_LESSON, onupdateItem)
  yield takeEvery(DELETE_LESSON, ondeleteItem)
  yield takeEvery(GET_ACCESS_TOKEN, onGetAccessToken)
  yield takeEvery(CREATE_VIDEO, onCreateVideo)
  yield takeEvery(VERIFY_VIDEO, onVerifyVideo)
}

export default LessonsSaga
