import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import { showToastMessage } from "helpers/toaster"
import {
  addYear as onAddYear,
  getYears as onGetYears,
  updateYear as onUpdateYear
} from "store/settings/years/actions"
import { getKeyStages as onGetKeyStages } from "store/settings/keystage/actions"

import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

const CreateYear = ({ visible, isEdit, editYearData = {}, onClose }) => {
  const dispatch = useDispatch()

  const {
    keystages,
    error_message,
    form_errors,
    create_error,
    create_success,
    create_loading,
    update_loading,
    update_error,
    update_success
  } = useSelector(state => ({
    keystages: state.keystage.keystages,
    error_message: state.years.error,
    form_errors: state.years.form_errors,
    create_loading: pending(state, "ADD_YEAR"),
    create_error: rejected(state, "ADD_YEAR"),
    create_success: fulfilled(state, "ADD_YEAR"),
    create_done: done(state, "ADD_YEAR"),
    update_loading: pending(state, "UPDATE_YEAR"),
    update_error: rejected(state, "UPDATE_YEAR"),
    update_success: fulfilled(state, "UPDATE_YEAR"),
    update_done: done(state, "UPDATE_YEAR")
  }))

  const [yearData, setYearData] = useState({})

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
    setYearData(editYearData)
  }, [editYearData])

/*  useEffect(() => {
    dispatch(onGetYears())
    dispatch(onGetKeyStages())
  }, [])*/

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_YEAR"))
      dispatch(clean("UPDATE_YEAR"))
      if (!isEdit) {
        setYearData({})
      }
    }
  }, [visible])

  useEffect(() => {
    if (create_success) {
      onClose()
      showToastMessage("success", "Year successfully created")
      setYearData({})
      dispatch(clean("ADD_YEAR"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Year successfully updated")
      dispatch(clean("UPDATE_YEAR"))
    }
  }, [create_success, update_success])

  const handleSubmit = (e, values) => {
    if (isEdit) {
      const updateYear = {
        id: yearData.id,
        name: values.name,
        description: values.description,
        year: values.year,
        key_stage_id: values.key_stage_id
      }
      dispatch(onUpdateYear(updateYear))
    } else {
      const newYear = {
        name: values["name"],
        description: values["description"],
        year: values["year"],
        key_stage_id: values["key_stage_id"]
      }
      dispatch(onAddYear(newYear))
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
        {!!isEdit ? "Edit Year" : "Add Year"}
      </ModalHeader>
      <ModalBody>
        <AvForm
          onValidSubmit={handleSubmit}
          onInvalidSubmit={handleInvalidSubmit}>
          <Row form>
            <Col xs={12}>
              <div className="mb-3">
                <AvField
                  name="name"
                  label="Name"
                  type="text"
                  errorMessage="The Name field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={yearData.name || ""}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="description"
                  label="Description"
                  type="text"
                  errorMessage="The Description field is invalid"
                  validate={{
                    server: serverValidate
                  }}
                  value={yearData.description || ""}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="year"
                  label="Year"
                  type="select"
                  errorMessage="The Year field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={yearData.year || ""}>
                  <option value="">Select Year</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </AvField>
              </div>
              <div className="mb-3">
                <AvField
                  name="key_stage_id"
                  label="Key Stage"
                  type="select"
                  errorMessage="The Keystage field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={yearData.key_stage_id || ""}
                  multiple>
                  {keystages.length && keystages.map(item => (
                    <option key={item.id} value={item.id}>{item.display_name}</option>
                  ))}
                </AvField>
              </div>
            </Col>
          </Row>

          {(create_error || update_error) && error_message && (
            <Row>
              <Col>
                <Alert color="danger" role="alert">
                  {error_message}
                </Alert>
              </Col>
            </Row>
          )}

          {(create_success || update_success) && (
            <Col>
              <Alert color="success" role="alert">
                {isEdit
                  ? "Year Successfully updated"
                  : "Year Successfully created"}
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

export default withRouter(CreateYear)
