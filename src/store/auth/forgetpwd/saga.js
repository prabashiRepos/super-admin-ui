import { takeEvery, fork, put, all, call } from "redux-saga/effects"

// Login Redux States
import { FORGET_PASSWORD, RESET_PASSWORD } from "./actionTypes"
import { userForgetPasswordSuccess, userForgetPasswordError, userResetPasswordSuccess, userResetPasswordError} from "./actions"

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper"
// import {
//   postFakeForgetPwd,
//   postJwtForgetPwd,
// } from "../../../helpers/fakebackend_helper"

import {
  forgotPassword,
  ResetPassword
} from "../../../helpers/api/sqillupApi"

const fireBaseBackend = getFirebaseBackend()

//If user is send successfully send mail link then dispatch redux action's are directly from here.
function* forgetUser({ payload: { user, history },meta }) {
  try {
    // if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
    //   const response = yield call(fireBaseBackend.forgetPassword, user.email)
    //   if (response) {
    //     yield put(
    //       userForgetPasswordSuccess(
    //         "Reset link are sended to your mailbox, check there first"
    //       )
    //     )
    //   }
    // } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
    //   const response = yield call(postJwtForgetPwd, "/jwt-forget-pwd", {
    //     email: user.email,
    //   })
    //   if (response) {
    //     yield put(
    //       userForgetPasswordSuccess(
    //         "Reset link are sended to your mailbox, check there first"
    //       )
    //     )
    //   }
    // } else {
      const response = yield call(forgotPassword, {
        email: user.email,
      })
      if (response) {
        yield put(
          userForgetPasswordSuccess(
            "Reset password link sent to your mail.",meta
          )
        )
      }
    // }
  } catch (error) {
    yield put(userForgetPasswordError(error,meta))
  }
}
function* resetPassword({ payload: { data, history },meta }) {
  try {
    const response = yield call(ResetPassword, data)
      if (response) {
        yield put(
          userResetPasswordSuccess(response,meta)
        )
      }
  } catch (error) {
    yield put(userResetPasswordError(error,meta))
  }
}

export function* watchUserPasswordForget() {
  yield takeEvery(FORGET_PASSWORD, forgetUser)
}
export function* watchUserPasswordReset() {
  yield takeEvery(RESET_PASSWORD, resetPassword)
}

function* forgetPasswordSaga() {
  yield all([fork(watchUserPasswordForget)])
  yield all([fork(watchUserPasswordReset)])
}

export default forgetPasswordSaga
