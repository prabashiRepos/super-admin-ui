import {
  ADD_KEY_STAGE,
  ADD_KEY_STAGE_FAIL,
  ADD_KEY_STAGE_SUCCESS,
  DELETE_KEY_STAGE,
  DELETE_KEY_STAGE_FAIL,
  DELETE_KEY_STAGE_SUCCESS,
  GET_KEY_STAGES,
  GET_KEY_STAGES_FAIL,
  GET_KEY_STAGES_SUCCESS,
  UPDATE_KEY_STAGE,
  UPDATE_KEY_STAGE_FAIL,
  UPDATE_KEY_STAGE_SUCCESS
} from "./actionTypes"

export const getKeyStages = () => ({
  type: GET_KEY_STAGES,
  meta: {
    thunk: true
  }
})

export const getKeyStagesSuccess = (keyStages, { thunk }) => ({
  type: GET_KEY_STAGES_SUCCESS,
  payload: keyStages,
  meta: {
    thunk
  }
})

export const getKeyStagesFail = (error, { thunk }) => ({
  type: GET_KEY_STAGES_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addKeyStage = keyStage => ({
  type: ADD_KEY_STAGE,
  payload: keyStage,
  meta: {
    thunk: true
  }
})

export const addKeyStageSuccess = (keyStage, { thunk }) => ({
  type: ADD_KEY_STAGE_SUCCESS,
  payload: keyStage,
  meta: {
    thunk
  }
})

export const addKeyStageFail = (error, { thunk }) => ({
  type: ADD_KEY_STAGE_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})

export const updateKeyStage = keyStage => ({
  type: UPDATE_KEY_STAGE,
  payload: keyStage,
  meta: {
    thunk: true
  }
})

export const updateKeyStageSuccess = (keyStage, { thunk }) => ({
  type: UPDATE_KEY_STAGE_SUCCESS,
  payload: keyStage,
  meta: {
    thunk
  }
})

export const updateKeyStageFail = (error, { thunk }) => ({
  type: UPDATE_KEY_STAGE_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})

export const deleteKeyStage = keyStage => ({
  type: DELETE_KEY_STAGE,
  payload: keyStage,
  meta: {
    thunk: true
  }
})

export const deleteKeyStageSuccess = (keyStage, { thunk }) => ({
  type: DELETE_KEY_STAGE_SUCCESS,
  payload: keyStage,
  meta: {
    thunk
  }
})

export const deleteKeyStageFail = (error, { thunk }) => ({
  type: DELETE_KEY_STAGE_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})
