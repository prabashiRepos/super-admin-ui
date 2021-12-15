import { call, put, takeEvery } from "redux-saga/effects"

// KeyStages Redux States
import { ADD_KEY_STAGE, DELETE_KEY_STAGE, GET_KEY_STAGES, UPDATE_KEY_STAGE } from "./actionTypes"

import {
  addKeyStageFail,
  addKeyStageSuccess,
  deleteKeyStageFail,
  deleteKeyStageSuccess,
  getKeyStagesFail,
  getKeyStagesSuccess,
  updateKeyStageFail,
  updateKeyStageSuccess
} from "./actions"

import { addKeyStage, deleteKeyStage, getKeyStages, updateKeyStage } from "../../../helpers/api/sqillupApi"

function* onGetKeyStages({ meta }) {
  try {
    const response = yield call(getKeyStages)
    yield put(getKeyStagesSuccess(response, meta))
  } catch (error) {
    yield put(getKeyStagesFail(error, meta))
  }
}

function* onAddKeyStage({ payload: key_stage, meta }) {
  try {
    const response = yield call(addKeyStage, key_stage)
    yield put(addKeyStageSuccess(response, meta))
  } catch (error) {
    yield put(addKeyStageFail(error, meta))
  }
}

function* onUpdateKeyStage({ payload: key_stage, meta }) {
  try {
    const response = yield call(updateKeyStage, key_stage)
    yield put(updateKeyStageSuccess(response, meta))
  } catch (error) {
    yield put(updateKeyStageFail(error, meta))
  }
}

function* onDeleteKeyStage({ payload: key_stage, meta }) {
  try {
    const response = yield call(deleteKeyStage, key_stage)
    yield put(deleteKeyStageSuccess(key_stage, meta))
  } catch (error) {
    yield put(deleteKeyStageFail(error, meta))
  }
}

function* KeystageSaga() {
  yield takeEvery(GET_KEY_STAGES, onGetKeyStages)
  yield takeEvery(ADD_KEY_STAGE, onAddKeyStage)
  yield takeEvery(UPDATE_KEY_STAGE, onUpdateKeyStage)
  yield takeEvery(DELETE_KEY_STAGE, onDeleteKeyStage)
}

export default KeystageSaga
