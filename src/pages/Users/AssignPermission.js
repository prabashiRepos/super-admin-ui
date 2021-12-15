import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvCheckbox, AvCheckboxGroup, AvForm } from "availity-reactstrap-validation"

import { assignPermission as onAssignPermissions } from "store/user-management/permissions/actions"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

import { showToastMessage } from "helpers/toaster"


const AssignPermission = ({ visible, onClose, RoleData }) => {
  const dispatch = useDispatch()

  const [rolePermissions, setRolePermissions] = useState({})

  useEffect(() => {
    setRolePermissions(RoleData)
  }, [RoleData])

  const { roles, loading, success, error } = useSelector(state => ({
    roles: state.roles.roles,
    loading: pending(state, "ASSIGN_PERMISSION"),
    error: rejected(state, "ASSIGN_PERMISSION"),
    success: fulfilled(state, "ASSIGN_PERMISSION")
  }))

  useEffect(() => {
    if (visible) {
      dispatch(clean("ASSIGN_PERMISSION"))
    }
  }, [visible])

  useEffect(() => {
    if (success) {
      onClose()
      showToastMessage("success", "Permissions successfully updated")
      dispatch(clean("ASSIGN_PERMISSION"))
    }
    if (error) {
      showToastMessage("error", "Permissions updation failed")
    }
  }, [success, error])

  const handleSubmit = (e, values) => {
    var selectedPermissions = []
    var permissions = rolePermissions.permissions.map(item => {
      return item.map(i => {
        if (i.hasPermission) {
          selectedPermissions.push(i.id)
          return i.id
        }
        return 0
      })
    })
    const permissionData = {
      role_id: RoleData.id,
      permission_id: selectedPermissions
    }
    dispatch(onAssignPermissions(permissionData))
  }

  const onChangeHandler = (permission) => {
    const RoleData = rolePermissions?.permissions.map(item => {
      return item.map(i => {
        if (i.id == permission.id) {
          i.hasPermission = !i.hasPermission
          return i
        }
        return i
      })
    })
    setRolePermissions({ ...RoleData, permissions: RoleData })
  }

  return (
    <Modal size="lg" isOpen={visible} toggle={onClose}>
      <ModalHeader toggle={onClose} tag="h4">
        Assign Permission
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={handleSubmit}>
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                {(rolePermissions && rolePermissions?.permissions) && rolePermissions?.permissions.map(item => (
                  <AvCheckboxGroup
                    inline
                    name={item.length && item[0].description}
                    // label={item.length && item[0].description}
                  >
                    <div className="mb-3">
                      <h4 className="mb-3">{item.length && item[0].description}</h4>
                      <Row>
                        {item && item.map(permission => (
                          <Col md="3">
                            <AvCheckbox label={permission.name} value={permission.id} checked={permission.hasPermission}
                                        onChange={() => {
                                          onChangeHandler(permission)
                                        }} />
                          </Col>
                        ))}
                      </Row>
                    </div>
                  </AvCheckboxGroup>
                ))}
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <div className="text-end">
                {!loading && (
                  <button type="submit" className="btn btn-success save-user">
                    Assign Permission
                  </button>
                )}

                {loading && (
                  <button
                    type="button"
                    className="btn btn-success ">
                    <i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />{" "}
                    Loading
                  </button>
                )}
              </div>
            </Col>
          </Row>
        </AvForm>
      </ModalBody>
    </Modal>
  )
}

export default withRouter(AssignPermission)
