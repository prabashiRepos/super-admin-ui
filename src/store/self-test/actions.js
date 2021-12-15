import {
  ADD_SELF_TEST,
  ADD_SELF_TEST_FAIL,
  ADD_SELF_TEST_SUCCESS,
  DELETE_SELF_TEST,
  DELETE_SELF_TEST_FAIL,
  DELETE_SELF_TEST_SUCCESS,
  GET_SELF_TEST,
  GET_SELF_TEST_FAIL,
  GET_SELF_TEST_SUCCESS,
  GET_SELF_TESTS,
  GET_SELF_TESTS_FAIL,
  GET_SELF_TESTS_SUCCESS,
  UPDATE_SELF_TEST,
  UPDATE_SELF_TEST_FAIL,
  UPDATE_SELF_TEST_SUCCESS
} from "./actionTypes"

export const getSelfTest = (data) => {
  return {
    type: GET_SELF_TEST,
    payload: data,
    meta: {
      thunk: true
    }
  }
}

export const getSelfTestsSuccess = (users, { thunk }) => ({
  type: GET_SELF_TESTS_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getSelfTestsFail = (error, { thunk }) => ({
  type: GET_SELF_TESTS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const getSelfTests = (data) => {
  return {
    type: GET_SELF_TESTS,
    payload: data,
    meta: {
      thunk: true
    }
  }
}

export const getSelfTestSuccess = (users, { thunk }) => ({
  type: GET_SELF_TEST_SUCCESS,
  payload: users,
  meta: {
    thunk
  }
})

export const getSelfTestFail = (error, { thunk }) => ({
  type: GET_SELF_TEST_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addSelfTest = user => ({
  type: ADD_SELF_TEST,
  payload: user,
  meta: {
    thunk: true
  }
})

export const addSelfTestSuccess = (user, { thunk }) => ({
  type: ADD_SELF_TEST_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const addSelfTestFail = (error, { thunk }) => ({
  type: ADD_SELF_TEST_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})

export const updateSelfTest = user => ({
  type: UPDATE_SELF_TEST,
  payload: user,
  meta: {
    thunk: true
  }
})

export const updateSelfTestSuccess = (user, { thunk }) => ({
  type: UPDATE_SELF_TEST_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const updateSelfTestFail = (error, { thunk }) => ({
  type: UPDATE_SELF_TEST_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})

export const deleteSelfTest = user => ({
  type: DELETE_SELF_TEST,
  payload: user,
  meta: {
    thunk: true
  }
})

export const deleteSelfTestSuccess = (user, { thunk }) => ({
  type: DELETE_SELF_TEST_SUCCESS,
  payload: user,
  meta: {
    thunk
  }
})

export const deleteSelfTestFail = (error, { thunk }) => ({
  type: DELETE_SELF_TEST_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})
