import {
  ADD_YEAR,
  ADD_YEAR_FAIL,
  ADD_YEAR_SUCCESS,
  DELETE_YEAR,
  DELETE_YEAR_FAIL,
  DELETE_YEAR_SUCCESS,
  GET_YEARS,
  GET_YEARS_FAIL,
  GET_YEARS_SUCCESS,
  UPDATE_YEAR,
  UPDATE_YEAR_FAIL,
  UPDATE_YEAR_SUCCESS
} from "./actionTypes"

export const getYears = () => ({
  type: GET_YEARS,
  meta: {
    thunk: true
  }
})

export const getYearsSuccess = (years, { thunk }) => ({
  type: GET_YEARS_SUCCESS,
  payload: years,
  meta: {
    thunk
  }
})

export const getYearsFail = (error, { thunk }) => ({
  type: GET_YEARS_FAIL,
  payload: error,
  meta: {
    thunk
  }
})

export const addYear = year => ({
  type: ADD_YEAR,
  payload: year,
  meta: {
    thunk: true
  }
})

export const addYearSuccess = (year, { thunk }) => ({
  type: ADD_YEAR_SUCCESS,
  payload: year,
  meta: {
    thunk
  }
})

export const addYearFail = (error, { thunk }) => ({
  type: ADD_YEAR_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})

export const updateYear = year => ({
  type: UPDATE_YEAR,
  payload: year,
  meta: {
    thunk: true
  }
})

export const updateYearSuccess = (year, { thunk }) => ({
  type: UPDATE_YEAR_SUCCESS,
  payload: year,
  meta: {
    thunk
  }
})

export const updateYearFail = (error, { thunk }) => ({
  type: UPDATE_YEAR_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})

export const deleteYear = year => ({
  type: DELETE_YEAR,
  payload: year,
  meta: {
    thunk: true
  }
})

export const deleteYearSuccess = (year, { thunk }) => ({
  type: DELETE_YEAR_SUCCESS,
  payload: year,
  meta: {
    thunk
  }
})

export const deleteYearFail = (error, { thunk }) => ({
  type: DELETE_YEAR_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  }
})
