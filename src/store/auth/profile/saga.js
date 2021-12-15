import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { GET_PROFILE, EDIT_PROFILE } from "./actionTypes"
import { getProfileSuccess, getProfileError, profileSuccess, profileError } from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
import {
  postFakeProfile,
  postJwtProfile,
} from "../../../helpers/fakebackend_helper"

const fireBaseBackend = getFirebaseBackend()

import { getProfile as getProfileData, updateProfile } from "../../../helpers/api/sqillupApi"

function* getProfile({ payload, meta }) {
  try {
      const response = yield call(getProfileData, payload)
      yield put(getProfileSuccess(response,meta))
  } catch (error) {
    yield put(getProfileError(error,meta))
  }
}

function* editProfile({ payload, meta }) {
  try {
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(
        fireBaseBackend.editProfileAPI,
        user.username,
        user.idx
      )
      yield put(profileSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
      const response = yield call(postJwtProfile, "/post-jwt-profile", {
        username: user.username,
        idx: user.idx,
      })
      yield put(profileSuccess(response))
    } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
      const response = yield call(updateProfile, payload)
      yield put(profileSuccess(response,meta))
    }
  } catch (error) {
    yield put(profileError(error,meta))
  }
}

export function* watchProfile() {
  yield takeEvery(GET_PROFILE, getProfile)
  yield takeEvery(EDIT_PROFILE, editProfile)
}

function* ProfileSaga() {
  yield all([fork(watchProfile)])
}

export default ProfileSaga
