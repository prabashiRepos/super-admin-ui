import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_USERS,
  GET_USER_PROFILE,
  ADD_NEW_USER,
  DELETE_USER,
  UPDATE_USER
} from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  // getUsers,
  getUserProfile,
  // addNewUser,
  // updateUser,
  // deleteUser
} from "../../../helpers/fakebackend_helper"

import { getUsers,addNewUser,updateUser,deleteUser } from "../../../helpers/api/sqillupApi"

function* fetchUsers({ meta }) {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess(response, meta))
  } catch (error) {
    yield put(getUsersFail(error, meta))
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
  }
}

function* onAddNewUser({ payload: user, meta }) {
  try {
    const response = yield call(addNewUser, user)
    yield put(addUserSuccess(response, meta))
  } catch (error) {
    yield put(addUserFail(error, meta))
  }
}

function* onUpdateUser({ payload: user, meta }) {
  try {
    const response = yield call(updateUser, user)
    yield put(updateUserSuccess(response, meta))
  } catch (error) {
    yield put(updateUserFail(error, meta))
  }
}

function* onDeleteUser({ payload: user, meta }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(user,meta))
  } catch (error) {
    yield put(deleteUserFail(error,meta))
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default contactsSaga
