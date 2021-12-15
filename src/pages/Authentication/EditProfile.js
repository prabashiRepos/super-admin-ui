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
import { AvForm, AvField } from "availity-reactstrap-validation"
import PasswordField from "components/Common/PasswordField"
import { showToastMessage } from "helpers/toaster"

import {
  getProfile as onGetProfile,
  editProfile as onUpdateUser,
} from "store/auth/profile/actions"

import { pending, rejected, fulfilled, done, clean } from "redux-saga-thunk"

//redux
import { useSelector, useDispatch } from "react-redux"

const EditProfile = ({ visible, isEdit, userData = {}, onClose }) => {
  const dispatch = useDispatch()

  const {
    error_message,
    form_errors,
    update_loading,
    update_error,
    update_success,
  } = useSelector(state => ({
    error_message: state.Profile.error,
    form_errors: state.Profile.form_errors,
    update_loading: pending(state, "EDIT_PROFILE"),
    update_error: rejected(state, "EDIT_PROFILE"),
    update_success: fulfilled(state, "EDIT_PROFILE"),
    update_done: done(state, "EDIT_PROFILE"),
  }))

  const [user, setUser] = useState({})

  const serverValidate = (value, context, input, callback) => {
    if (update_error) {
      let serverErrors = form_errors[input.props.name]
      if (typeof serverErrors == "undefined") serverErrors = true
      else serverErrors = callback(serverErrors[0])
      return serverErrors
    } else {
      callback(true)
    }
  }

  useEffect(() => {
    dispatch(onGetProfile())
  }, [])

  useEffect(() => {
    setUser(userData)
  }, [userData])

  useEffect(() => {
    if (visible) {
      dispatch(clean("EDIT_PROFILE"))
    }
  }, [visible])

  useEffect(() => {
    if (update_success) {
      onClose()
      showToastMessage("success", "Profile successfully updated")
      dispatch(clean("EDIT_PROFILE"))
    }
  }, [update_success])

  const handleSubmit = (e, values) => {
      const updateUser = {
        id: user.id,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        country_code: values.country_code,
        phone: values.phone,
      }
   /* if (updateUser.password != "" || updateUser.new_password != "" || updateUser.confirm_new_password != "") {
      updateUser.old_password=values.old_password;
      updateUser.new_password=values.new_password;
      updateUser.confirm_new_password=values.confirm_new_password;
    }*/
    dispatch(onUpdateUser(updateUser))
  }

  const handleInvalidSubmit = (e, errors, values) => {
    if ( update_error) {
      handleSubmit(e, values)
    }
  }

  return (
    <Modal isOpen={visible} toggle={onClose}>
      <ModalHeader toggle={onClose} tag="h4">
        Edit Profile
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
                    server: serverValidate,
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
                    server: serverValidate,
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
                    server: serverValidate,
                  }}
                  value={user.email || ""}
                />
              </div>
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
                          server: serverValidate,
                        }}
                        value={user.country_code || ""}
                      >
                        <option value="">Select Country</option>
                        <option value="44">United Kingdom (+44)</option>
                        <option value="94">Sri Lanka (+94)</option>
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
                            errorMessage: "Only Digits",
                          },
                          server: serverValidate,
                        }}
                        value={user.phone || ""}
                      />
                    </Col>
                  </Row>
                </div>
              </div>
              </Col>
              {/*<Col xs={12}>
                 <div className="mb-3">
                  <PasswordField
                    name="old_password"
                    label="Password"
                    errorMessage="The Password field is invalid"
                    validate={{
                      // required: { value: !isEdit },
                      // required: { value: true },
                      server: serverValidate,
                    }}
                    value={user.password || ""}
                />
                </div>
              </Col>*/}
              {/*<Col xs={12}>
                 <div className="mb-3">
                  <PasswordField
                    name="new_password"
                    label="Confirm Password"
                    errorMessage="The Confirm Password field is invalid"
                    validate={{
                      // required: { value: !isEdit },
                      // required: { value: true },
                      server: serverValidate,
                    }}
                    value={user.password || ""}
                />
                </div>
              </Col>*/}
{/*
              <Col xs={12}>
                 <div className="mb-3">
                  <PasswordField
                    name="confirm_new_password"
                    label="Confirm New Password"
                    errorMessage="The Password field is invalid"
                    validate={{
                      // required: { value: !isEdit },
                      // required: { value: true },
                      server: serverValidate,
                    }}
                    value={user.password || ""}
                />
                </div>
              </Col>
*/}
          </Row>

          {update_error && error_message && (
            <Row>
              <Col>
                <Alert color="danger" role="alert">
                  {error_message}
                </Alert>
              </Col>
            </Row>
          )}

          {(update_success) && (
            <Col>
              <Alert color="success" role="alert">
                  Profile Successfully created
              </Alert>
            </Col>
          )}

          <Row>
            <Col>
              <div className="text-end">
                {!update_loading && (
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                )}
                {update_loading && (
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

export default withRouter(EditProfile)
