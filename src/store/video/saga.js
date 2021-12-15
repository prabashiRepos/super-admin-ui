import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_VIDEO_ITEM,
  GET_VIDEOS,
  ADD_VIDEOS,
  DELETE_VIDEOS,
  UPDATE_VIDEOS,
  VERIFY_NEW_VIDEOS
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
  verifyVideoSuccess,
  verifyVideoFail
} from "./actions"

import { getVideos,addVideo,updateVideo,deleteVideo, verifyNewVideo } from "../../helpers/api/sqillupApi"

function* fetchItem({ payload, meta }) {
  try {
    const response = yield call(getVideos,payload)
    yield put(getItemSuccess(response, meta))
  } catch (error) {
    yield put(getItemFail(error, meta))
  }
}

function* fetchList({ meta }) {
  
  try {
    const response = yield call(getVideos)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: selftest, meta }) {
  try {
    const response = yield call(addVideo, selftest)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: selftest, meta }) {
  try {
    const response = yield call(updateVideo, selftest)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: selftest, meta }) {
  try {
    const response = yield call(deleteVideo, selftest)
    yield put(deleteItemSuccess(selftest,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* onVerifyVideo({ payload: selftest, meta }) {
  try {
    
    const response = yield call(verifyNewVideo, selftest)
    yield put(verifyVideoSuccess(selftest,meta))
  } catch (error) {
    yield put(verifyVideoFail(error,meta))
  }
}

function* VideoSaga() {
  yield takeEvery(GET_VIDEO_ITEM, fetchItem)
  yield takeEvery(GET_VIDEOS, fetchList)
  yield takeEvery(ADD_VIDEOS, onaddNewItem)
  yield takeEvery(UPDATE_VIDEOS, onupdateItem)
  yield takeEvery(DELETE_VIDEOS, ondeleteItem)
  yield takeEvery(VERIFY_NEW_VIDEOS, onVerifyVideo)
}

export default VideoSaga
