import {
  GET_ROLES,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAIL,
  ADD_NEW_ROLE,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAIL,
  UPDATE_ROLE,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_FAIL,
  DELETE_ROLE,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_FAIL,
} from "./actionTypes"

export const getRoles = () => ({
  type: GET_ROLES,
  meta: {
    thunk: true,
  },
})

export const getRolesSuccess = (roles, { thunk }) => {
  return {
    type: GET_ROLES_SUCCESS,
    payload: roles,
    meta: {
      thunk,
    },
  }
}

export const getRolesFail = (roles, { thunk }) => ({
  type: GET_ROLES_FAIL,
  payload: roles,
  error: true,
  meta: {
    thunk,
  },
})

export const addNewRole = role => ({
  type: ADD_NEW_ROLE,
  payload: role,
  meta: {
    thunk: true,
  },
})

export const addRoleSuccess = (role, { thunk }) => ({
  type: ADD_ROLE_SUCCESS,
  payload: role,
  meta: {
    thunk,
  },
})

export const addRoleFail = (error, { thunk }) => ({
  type: ADD_ROLE_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk
  },
})

export const updateRole = role => ({
  type: UPDATE_ROLE,
  payload: role,
  meta: {
    thunk: true,
  },
})

export const updateRoleSuccess = (role, { thunk }) => ({
  type: UPDATE_ROLE_SUCCESS,
  payload: role,
  meta: {
    thunk,
  },
})

export const updateRoleFail = (error, { thunk }) => ({
  type: UPDATE_ROLE_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk,
  },
})

export const deleteRole = role => ({
  type: DELETE_ROLE,
  payload: role,
  meta: {
    thunk: true,
  },
})

export const deleteRoleSuccess = (role, { thunk }) => ({
  type: DELETE_ROLE_SUCCESS,
  payload: role,
  meta: {
    thunk,
  },
})

export const deleteRoleFail = (error, { thunk }) => ({
  type: DELETE_ROLE_FAIL,
  payload: error,
  error: true,
  meta: {
    thunk,
  },
})
