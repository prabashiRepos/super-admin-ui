import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_SUBJECTS,
  ADD_SUBJECT,
  DELETE_SUBJECT,
  UPDATE_SUBJECT
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

import { getSubjects,addSubject,updateSubject,deleteSubject } from "../../../helpers/api/sqillupApi"

function* fetchList({ meta }) {
  try {
    const response = yield call(getSubjects)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: subject, meta }) {
  try {
    const response = yield call(addSubject, subject)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: subject, meta }) {
  try {
    const response = yield call(updateSubject, subject)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: subject, meta }) {
  try {
    const response = yield call(deleteSubject, subject)
    yield put(deleteItemSuccess(subject,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* SubjectsSaga() {
  yield takeEvery(GET_SUBJECTS, fetchList)
  yield takeEvery(ADD_SUBJECT, onaddNewItem)
  yield takeEvery(UPDATE_SUBJECT, onupdateItem)
  yield takeEvery(DELETE_SUBJECT, ondeleteItem)
}

export default SubjectsSaga
