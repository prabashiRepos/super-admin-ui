import { call, put, take, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_ROLES,
  ADD_NEW_ROLE,
  DELETE_ROLE,
  UPDATE_ROLE,
} from "./actionTypes"

import {
  getRolesSuccess,
  getRolesFail,
  addRoleFail,
  addRoleSuccess,
  updateRoleSuccess,
  updateRoleFail,
  deleteRoleSuccess,
  deleteRoleFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getRoles,
  addNewRole,
  updateRole,
  deleteRole,
} from "../../../helpers/api/sqillupApi"

function* fetchRoles({ meta }) {
  try {
    const response = yield call(getRoles)
    yield put(getRolesSuccess(response, meta))
  } catch (error) {
    yield put(getRolesFail(error, meta))
  }
}

function* onUpdateRole({ payload: user, meta }) {
  try {
    const response = yield call(updateRole, user)
    yield put(updateRoleSuccess(response, meta))
  } catch (error) {
    yield put(updateRoleFail(error, meta))
  }
}

function* onDeleteRole({ payload: role ,meta}) {
  try {
    const response = yield call(deleteRole, role)
    yield put(deleteRoleSuccess(role,meta))
  } catch (error) {
    yield put(deleteRoleFail(error,meta))
  }
}

function* onAddNewRole({ payload: role, meta }) {
  try {
    const response = yield call(addNewRole, role)
    yield put(addRoleSuccess(response, meta))
  } catch (error) {
    yield put(addRoleFail(error, meta))
  }
}

function* rolesSaga() {
  yield takeEvery(GET_ROLES, fetchRoles)
  yield takeEvery(ADD_NEW_ROLE, onAddNewRole)
  yield takeEvery(UPDATE_ROLE, onUpdateRole)
  yield takeEvery(DELETE_ROLE, onDeleteRole)
}

export default rolesSaga
