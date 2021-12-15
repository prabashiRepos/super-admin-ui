import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { withRouter, Link } from "react-router-dom"
import {
  Col,
  Row,
  Modal,
  Alert,
  Button,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import {
  AvForm,
  AvField,
} from "availity-reactstrap-validation"

import { showToastMessage } from "helpers/toaster"

import {
  addNewRole as onAddNewRole,
  updateRole as onUpdateRole,
} from "store/user-management/roles/actions"

import { pending, rejected, fulfilled, done, clean } from "redux-saga-thunk"

//redux
import { useSelector, useDispatch } from "react-redux"

const CreateRoleModal = ({ visible, isEdit, roleData={},onClose }) => {
  const dispatch = useDispatch()

  const {
    error,
    success,
    loading,
    error_message,
    form_errors,
    update_loading,
    update_error,
    update_success
  } = useSelector(state => ({
    error_message: state.roles.error,
    form_errors: state.roles.form_errors,
    loading: pending(state, "ADD_NEW_ROLE"),
    error: rejected(state, "ADD_NEW_ROLE"),
    success: fulfilled(state, "ADD_NEW_ROLE"),
    done: done(state, "ADD_NEW_ROLE"),
    update_loading: pending(state, "UPDATE_ROLE"),
    update_error: rejected(state, "UPDATE_ROLE"),
    update_success: fulfilled(state, "UPDATE_ROLE"),
    update_done: done(state, "UPDATE_ROLE"),
  }))

  const [role, setRole] = useState({})
  
  const serverValidate = (value, context, input, callback) => {
    if (error || update_error) {
      let serverErrors = form_errors[input.props.name];
      if (typeof serverErrors == "undefined") serverErrors = true;
      else serverErrors = callback(serverErrors[0]);
      return serverErrors;
    }else{
      callback(true)
    }
  }

  useEffect(() => {
      setRole(roleData)
  }, [roleData])

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_NEW_ROLE"))
      dispatch(clean("UPDATE_ROLE"))
      if (!isEdit) {
        setRole({});
      }
    }
  }, [visible])
  
  useEffect(() => {
    if (success) {
      onClose();
      showToastMessage('success',"Role successfully created")
      setRole({});
      dispatch(clean("ADD_NEW_ROLE"))
    }
    if (update_success) {
      onClose();
      showToastMessage('success',"Role successfully updated")
      dispatch(clean("UPDATE_ROLE"))
    }
  }, [success, update_success])


  const handleSubmit = (e, values) => {
    if (isEdit) {
      const updateUser = {
        id: role.id,
        name: values.name,
        display_name: values.display_name,
        description: values.description,
      }
      dispatch(onUpdateRole(updateUser))
    } else {
      const newUser = {
        // id: Math.floor(Math.random() * (30 - 20)) + 20,
        name: values["name"],
        display_name: values["display_name"],
        description: values["description"],
      }
      dispatch(onAddNewRole(newUser))
    }
  }

  const handleInvalidSubmit = (e, errors,values) => {
    if (error || update_error) {
      handleSubmit(e, values)
    }
  }

  return (
    <Modal isOpen={visible} toggle={onClose}>
      <ModalHeader toggle={onClose} tag="h4">
        {!!isEdit ? "Edit Role" : "Add Role"}
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={handleSubmit} onInvalidSubmit={handleInvalidSubmit}>
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <AvField
                  name="name"
                  label="Name"
                  type="text"
                  errorMessage="Invalid name"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={role.name || ""}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="display_name"
                  label="Display Name"
                  type="text"
                  errorMessage="Invalid display name"
                  validate={{
                    required: { value: true },
                  }}
                  value={role.display_name || ""}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="description"
                  label="Description"
                  type="text"
                  errorMessage="Invalid Description"
                  validate={{
                    required: { value: true },
                  }}
                  value={role.description || ""}
                />
              </div>
            </Col>
          </Row>

          {(error || update_error) && error_message && (
            <Row>
              <Col>
                <Alert color="danger" role="alert">
                  {error_message}
                </Alert>
              </Col>
            </Row>
          )}

          {/* {error && Object.keys(form_errors).map((error, index) => (
            <Col>
              <Alert color="danger" role="alert">
                {form_errors[error].map(item => item)}
              </Alert>
            </Col>
          ))} */}

          {(success || update_success) && (
           <Col>
              <Alert color="success" role="alert">
                {isEdit ? "Role Successfully updated" : "Role Successfully created"}
              </Alert>
            </Col>
          )}


          <Row>
            <Col>
              <div className="text-end">
                {(!loading && !update_loading) && (
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                )}
                {(loading || update_loading) && (
                  <button
                    type="button"
                    className="btn btn-success "
                  >
                    <i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2"></i>{" "}
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

export default withRouter(CreateRoleModal)
