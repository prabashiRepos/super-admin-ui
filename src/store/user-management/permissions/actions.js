import {
  GET_PERMISSIONS,
  GET_PERMISSIONS_SUCCESS,
  GET_PERMISSIONS_FAIL,
  ASSIGN_PERMISSION,
  ASSIGN_PERMISSION_SUCCESS,
  ASSIGN_PERMISSION_FAIL
  // ADD_NEW_ROLE,
  // ADD_ROLE_SUCCESS,
  // ADD_ROLE_FAIL,
  // UPDATE_ROLE,
  // UPDATE_ROLE_SUCCESS,
  // UPDATE_ROLE_FAIL,
  // DELETE_ROLE,
  // DELETE_ROLE_SUCCESS,
  // DELETE_ROLE_FAIL,
} from "./actionTypes"

export const getPermissions = () => ({
  type: GET_PERMISSIONS,
})

export const getPermissionsSuccess = permissions => ({
  type: GET_PERMISSIONS_SUCCESS,
  payload: permissions,
})

export const getPermissionsFail = permissions => ({
  type: GET_PERMISSIONS_FAIL,
  payload: permissions,
})

export const assignPermission = data => ({
  type: ASSIGN_PERMISSION,
  payload: data,
  meta: {
    thunk:true
  } 
})

export const assignPermissionSuccess = (data, { thunk }) => ({
  type: ASSIGN_PERMISSION_SUCCESS,
  payload: data,
  meta: {
    thunk
  }
})

export const assignPermissionFail = (error, { thunk }) => ({
  type: ASSIGN_PERMISSION_FAIL,
  payload: error,
  error:true,
  meta: {
    thunk
  }
})
// export const addNewRole = role => ({
//   type: ADD_NEW_ROLE,
//   payload: role,
// })

// export const addRoleSuccess = role => ({
//   type: ADD_ROLE_SUCCESS,
//   payload: role,
// })

// export const addRoleFail = error => ({
//   type: ADD_ROLE_FAIL,
//   payload: error,
// })

// export const updateRole = role => ({
//   type: UPDATE_ROLE,
//   payload: role,
// })

// export const updateRoleSuccess = role => ({
//   type: UPDATE_ROLE_SUCCESS,
//   payload: role,
// })

// export const updateRoleFail = error => ({
//   type: UPDATE_ROLE_FAIL,
//   payload: error,
// })

// export const deleteRole = role => ({
//   type: DELETE_ROLE,
//   payload: role,
// })

// export const deleteRoleSuccess = role => ({
//   type: DELETE_ROLE_SUCCESS,
//   payload: role,
// })

// export const deleteRoleFail = error => ({
//   type: DELETE_ROLE_FAIL,
//   payload: error,
// })
