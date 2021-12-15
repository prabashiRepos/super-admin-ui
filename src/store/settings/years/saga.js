import { call, put, takeEvery } from "redux-saga/effects"

// Year Redux States
import { ADD_YEAR, DELETE_YEAR, GET_YEARS, UPDATE_YEAR } from "./actionTypes"

import {
  addYearFail,
  addYearSuccess,
  deleteYearFail,
  deleteYearSuccess,
  getYearsFail,
  getYearsSuccess,
  updateYearFail,
  updateYearSuccess
} from "./actions"

import { addYear, deleteYear, getYears, updateYear } from "../../../helpers/api/sqillupApi"

function* onGetYears({ meta }) {
  try {
    const response = yield call(getYears)
    yield put(getYearsSuccess(response, meta))
  } catch (error) {
    yield put(getYearsFail(error, meta))
  }
}

function* onAddYear({ payload: year, meta }) {
  try {
    const response = yield call(addYear, year)
    yield put(addYearSuccess(response, meta))
  } catch (error) {
    yield put(addYearFail(error, meta))
  }
}

function* onUpdateYear({ payload: year, meta }) {
  try {
    const response = yield call(updateYear, year)
    yield put(updateYearSuccess(response, meta))
  } catch (error) {
    yield put(updateYearFail(error, meta))
  }
}

function* onDeleteYear({ payload: year, meta }) {
  try {
    const response = yield call(deleteYear, year)
    yield put(deleteYearSuccess(year, meta))
  } catch (error) {
    yield put(deleteYearFail(error, meta))
  }
}

function* YearsSaga() {
  yield takeEvery(GET_YEARS, onGetYears)
  yield takeEvery(ADD_YEAR, onAddYear)
  yield takeEvery(UPDATE_YEAR, onUpdateYear)
  yield takeEvery(DELETE_YEAR, onDeleteYear)
}

export default YearsSaga
