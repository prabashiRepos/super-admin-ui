import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import {
  GET_PLANS,
  ADD_PLAN,
  DELETE_PLAN,
  UPDATE_PLAN
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

import { getPlans,addPlan,updatePlan,deletePlan } from "../../helpers/api/sqillupApi"

function* fetchList({ meta }) {
  try {
    const response = yield call(getPlans)
    yield put(getListSuccess(response, meta))
  } catch (error) {
    yield put(getListFail(error, meta))
  }
}

function* onaddNewItem({ payload: subject, meta }) {
  try {
    const response = yield call(addPlan, subject)
    yield put(addNewItemSuccess(response, meta))
  } catch (error) {
    yield put(addNewItemFail(error, meta))
  }
}

function* onupdateItem({ payload: subject, meta }) {
  try {
    const response = yield call(updatePlan, subject)
    yield put(updateItemSuccess(response, meta))
  } catch (error) {
    yield put(updateItemFail(error, meta))
  }
}

function* ondeleteItem({ payload: plan, meta }) {
  try {
    const response = yield call(deletePlan, plan)
    yield put(deleteItemSuccess(plan,meta))
  } catch (error) {
    yield put(deleteItemFail(error,meta))
  }
}

function* planAndPricesSaga() {
  yield takeEvery(GET_PLANS, fetchList)
  yield takeEvery(ADD_PLAN, onaddNewItem)
  yield takeEvery(UPDATE_PLAN, onupdateItem)
  yield takeEvery(DELETE_PLAN, ondeleteItem)
}

export default planAndPricesSaga
