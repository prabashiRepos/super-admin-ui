import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_PERMISSIONS, ASSIGN_PERMISSION} from "./actionTypes"

import {
  getPermissionsSuccess,
  getPermissionsFail,
  assignPermissionSuccess,
  assignPermissionFail
} from "./actions"

//Include Both Helper File with needed methods
import { getPermissions,assignPermission } from "../../../helpers/api/sqillupApi"

function* fetchPermissions() {
  try {
    const response = yield call(getPermissions)
    yield put(getPermissionsSuccess,response)
  } catch (error) {
    yield put(getPermissionsFail(error))
  }
}
function* assignPermissions({ payload: permissions, meta }) {
  try {
    const response = yield call(assignPermission,permissions)
    yield put(assignPermissionSuccess(response, meta))
  } catch (error) {
    yield put(assignPermissionFail(error, meta))
  }
}

function* PermissionSaga() {
  yield takeEvery(GET_PERMISSIONS, fetchPermissions)
  yield takeEvery(ASSIGN_PERMISSION, assignPermissions)
}

export default PermissionSaga;
