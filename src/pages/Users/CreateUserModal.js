import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"
import PasswordField from "components/Common/PasswordField"
import { showToastMessage } from "helpers/toaster"

import { addNewUser as onAddNewUser, updateUser as onUpdateUser } from "store/user-management/contacts/actions"
import { getRoles as onGetRoles } from "store/user-management/roles/actions"

import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

const CreateUserModal = ({ visible, isEdit, userData = {}, onClose }) => {
  const dispatch = useDispatch()

  const {
    roles,
    create_error,
    create_success,
    create_loading,
    error_message,
    form_errors,
    update_loading,
    update_error,
    update_success
  } = useSelector(state => ({
    roles: state.roles.roles,
    error_message: state.contacts.error,
    form_errors: state.contacts.form_errors,
    create_loading: pending(state, "ADD_NEW_USER"),
    create_error: rejected(state, "ADD_NEW_USER"),
    create_success: fulfilled(state, "ADD_NEW_USER"),
    done: done(state, "ADD_NEW_USER"),
    update_loading: pending(state, "UPDATE_USER"),
    update_error: rejected(state, "UPDATE_USER"),
    update_success: fulfilled(state, "UPDATE_USER"),
    update_done: done(state, "UPDATE_USER")
  }))

  const [user, setUser] = useState({})

  const serverValidate = (value, context, input, callback) => {
    if (create_error || update_error) {
      let serverErrors = form_errors[input.props.name]
      if (typeof serverErrors == "undefined") serverErrors = true
      else serverErrors = callback(serverErrors[0])
      return serverErrors
    } else {
      callback(true)
    }
  }

  useEffect(() => {
    setUser(userData)
  }, [userData])

  useEffect(() => {
    dispatch(onGetRoles())
  }, [])

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_NEW_USER"))
      dispatch(clean("UPDATE_USER"))
      if (!isEdit) {
        setUser({})
      }
    }
  }, [visible])

  useEffect(() => {
    if (create_success) {
      onClose()
      showToastMessage("success", "User successfully created")
      setUser({})
      dispatch(clean("ADD_NEW_USER"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "User successfully updated")
      dispatch(clean("UPDATE_USER"))
    }
  }, [create_success, update_success])

  const handleSubmit = (e, values) => {
    if (isEdit) {
      const updateUser = {
        id: user.id,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        country_code: values.country_code,
        phone: values.phone,
        role_id: values.role_id,
        password: values.password
      }
      dispatch(onUpdateUser(updateUser))
    } else {
      const newUser = {
        first_name: values["first_name"],
        last_name: values["last_name"],
        email: values["email"],
        country_code: values["country_code"],
        phone: values["phone"],
        role_id: values["role_id"],
        password: values["password"]
      }
      dispatch(onAddNewUser(newUser))
    }
  }

  const handleInvalidSubmit = (e, errors, values) => {
    if (create_error || update_error) {
      handleSubmit(e, values)
    }
  }

  return (
    <Modal isOpen={visible} toggle={onClose}>
      <ModalHeader toggle={onClose} tag="h4">
        {!!isEdit ? "Edit User" : "Add User"}
      </ModalHeader>
      <ModalBody>
        <AvForm
          onValidSubmit={handleSubmit}
          onInvalidSubmit={handleInvalidSubmit}
        >
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <AvField
                  name="first_name"
                  label="First Name"
                  type="text"
                  errorMessage="The First Name field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={user.first_name || ""}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="last_name"
                  label="Last Name"
                  type="text"
                  errorMessage="The Last Name field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={user.last_name || ""}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="email"
                  label="Email"
                  type="email"
                  errorMessage="The Email field is invalid"
                  validate={{
                    required: { value: true },
                    email: { value: true },
                    server: serverValidate
                  }}
                  value={user.email || ""}
                />
              </div>
              {/* <Select
                value={countryCode}
                onChange={(value) => {
                  handleCountryCode(value)
                }}
                options={countryCodesList}
              /> */}
              <div className="mb-3 row">
                <div className="form-group">
                  <Row>
                    <Col md="4">
                      <AvField
                        name="country_code"
                        label="Country Code"
                        type="select"
                        errorMessage="The Country Code field is invalid"
                        validate={{
                          required: { value: true },
                          server: serverValidate
                        }}
                        value={user.country_code || ""}
                      >
                        <option value="">Select Country</option>
                        <option value="44">United Kingdom (+44)</option>
                        <option value="94">Srilanka (+94)</option>
                      </AvField>
                    </Col>
                    <Col md="8">
                      <AvField
                        name="phone"
                        type="text"
                        label="Phone"
                        errorMessage="The Phone field is invalid"
                        validate={{
                          required: { value: true },
                          pattern: {
                            value: "^[0-9]+$",
                            errorMessage: "Only Digits"
                          },
                          server: serverValidate
                        }}
                        value={user.phone || ""}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              <div className="mb-3">
                <AvField
                  name="role_id"
                  label="Role"
                  type="select"
                  errorMessage="The Role field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={user.role_id || ""}
                  multiple
                >
                  {roles.map(item => (
                    <option key={item.id} value={item.id}>{item.display_name}</option>
                  ))}
                </AvField>
              </div>
            </Col>
            <Col xs={12}>
              <div className="mb-3">
                <PasswordField
                  name="password"
                  label="Password"
                  errorMessage="The Password field is invalid"
                  validate={{
                    // required: { value: !isEdit },
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={user.password || ""}
                />
              </div>
            </Col>
          </Row>
          {/* {create_error && (
            <Row>
              <Col>
                <Alert color="danger" role="alert">
                  {create_error}
                </Alert>
              </Col>
            </Row>
          )} */}

          {(create_error || update_error) && error_message && (
            <Row>
              <Col>
                <Alert color="danger" role="alert">
                  {error_message}
                </Alert>
              </Col>
            </Row>
          )}

          {/* {create_error && Object.keys(form_errors).map((error, index) => (
            <Col>
              <Alert color="danger" role="alert">
                {form_errors[error].map(item => item)}
              </Alert>
            </Col>
          ))} */}

          {(create_success || update_success) && (
            <Col>
              <Alert color="success" role="alert">
                {isEdit
                  ? "User Successfully updated"
                  : "User Successfully created"}
              </Alert>
            </Col>
          )}

          <Row>
            <Col>
              <div className="text-end">
                {!create_loading && !update_loading && (
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                )}
                {(create_loading || update_loading) && (
                  <button type="button" className="btn btn-success ">
                    <i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2"/>{" "}
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

export default withRouter(CreateUserModal)
