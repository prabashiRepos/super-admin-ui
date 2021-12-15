import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import { showToastMessage } from "helpers/toaster"

import { addKeyStage as onAddKeystage, updateKeyStage as onUpdateKeystage } from "store/settings/keystage/actions"

import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

const CreateKeystageModal = ({ visible, isEdit, keyStageData = {}, onClose }) => {
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
    error_message: state.examboard.error,
    form_errors: state.examboard.form_errors,
    loading: pending(state, "ADD_KEY_STAGE"),
    error: rejected(state, "ADD_KEY_STAGE"),
    success: fulfilled(state, "ADD_KEY_STAGE"),
    done: done(state, "ADD_KEY_STAGE"),
    update_loading: pending(state, "UPDATE_KEY_STAGE"),
    update_error: rejected(state, "UPDATE_KEY_STAGE"),
    update_success: fulfilled(state, "UPDATE_KEY_STAGE"),
    update_done: done(state, "UPDATE_KEY_STAGE")
  }))

  const [keystage, setKeystage] = useState({})

  const serverValidate = (value, context, input, callback) => {
    if (error || update_error) {
      let serverErrors = form_errors[input.props.name]
      if (typeof serverErrors == "undefined") serverErrors = true
      else serverErrors = callback(serverErrors[0])
      return serverErrors
    } else {
      callback(true)
    }
  }

  useEffect(() => {
    setKeystage(keyStageData)
  }, [keyStageData])

  /*useEffect(() => {
      dispatch(onGetKeyStages())
  }, [])*/

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_KEY_STAGE"))
      dispatch(clean("UPDATE_KEY_STAGE"))
      if (!isEdit) {
        setKeystage({})
      }
    }
  }, [visible])

  useEffect(() => {
    if (success) {
      onClose()
      showToastMessage("success", "Key stage successfully created.")
      setKeystage({})
      dispatch(clean("ADD_KEY_STAGE"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Key stage successfully updated.")
      dispatch(clean("UPDATE_KEY_STAGE"))
    }
  }, [success, update_success])

  const handleSubmit = (e, values) => {
    if (isEdit) {
      const updatedKeyStage = {
        id: keystage.id,
        name: values.name,
        display_name: values.display_name,
        description: values.description
      }
      dispatch(onUpdateKeystage(updatedKeyStage))
    } else {
      const newKeyStage = {
        name: values["name"],
        display_name: values["display_name"],
        description: values["description"]
      }
      dispatch(onAddKeystage(newKeyStage))
    }
  }

  const handleInvalidSubmit = (e, errors, values) => {
    if (error || update_error) {
      handleSubmit(e, values)
    }
  }

  return (
    <Modal isOpen={visible} toggle={onClose}>
      <ModalHeader toggle={onClose} tag="h4">
        {!!isEdit ? "Edit KeyStage" : "Add KeyStage"}
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={handleSubmit}
                onInvalidSubmit={handleInvalidSubmit}>
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <AvField
                  name="name"
                  label="Name"
                  type="text"
                  errorMessage="The Name field is invalid"
                  value={keystage.name || ""}
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="display_name"
                  label="Display Name"
                  type="text"
                  errorMessage="The Display Name field is invalid"
                  value={keystage.display_name || ""}
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="description"
                  label="Description"
                  type="text"
                  errorMessage="The Description field is invalid"
                  value={keystage.description || ""}
                  validate={{
                    server: serverValidate
                  }}
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

          {(success || update_success) && (
            <Col>
              <Alert color="success" role="alert">
                {isEdit ? "User Successfully updated" : "User Successfully created"}
              </Alert>
            </Col>
          )}

          <Row>
            <Col>
              <div className="text-end">
                {!loading && !update_loading && (
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                )}
                {(loading || update_loading) && (
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

export default withRouter(CreateKeystageModal)
