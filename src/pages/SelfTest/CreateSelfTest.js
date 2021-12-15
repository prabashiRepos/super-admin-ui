import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import { showToastMessage } from "helpers/toaster"

import { addSelfTest as onAddItem, updateSelfTest as onUpdateItem } from "store/self-test/actions"

import { getList as onGetLessons } from "store/subject-management/lessons/actions"

import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

const Offsymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2
      }}
    >
      {" "}
      No
    </div>
  )
}

const OnSymbol = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        fontSize: 12,
        color: "#fff",
        paddingRight: 2
      }}
    >
      {" "}
      Yes
    </div>
  )
}

const CreateSelfTest = ({ visible, isEdit, examBoardData = {}, onClose }) => {
  const dispatch = useDispatch()

  const {
    lessons,
    create_error,
    create_success,
    create_loading,
    error_message,
    form_errors,
    update_loading,
    update_error,
    update_success
  } = useSelector(state => ({
    lessons: state.lessons.lessons,
    error_message: state.years.error,
    form_errors: state.years.form_errors,
    create_loading: pending(state, "ADD_SELFTEST"),
    create_error: rejected(state, "ADD_SELFTEST"),
    create_success: fulfilled(state, "ADD_SELFTEST"),
    done: done(state, "ADD_SELFTEST"),
    update_loading: pending(state, "UPDATE_SELFTEST"),
    update_error: rejected(state, "UPDATE_SELFTEST"),
    update_success: fulfilled(state, "UPDATE_SELFTEST"),
    update_done: done(state, "UPDATE_SELFTEST")
  }))

  const [selftest, setSelftest] = useState({})

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
    setSelftest(examBoardData)
  }, [examBoardData])

  useEffect(() => {
    dispatch(onGetLessons())
  }, [])

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_SELFTEST"))
      dispatch(clean("UPDATE_SELFTEST"))
      if (!isEdit) {
        setSelftest({})
      }
    }
  }, [visible])

  useEffect(() => {
    if (create_success) {
      onClose()
      showToastMessage("success", "Self test successfully created")
      setSelftest({})
      dispatch(clean("ADD_SELFTEST"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Self test successfully updated")
      dispatch(clean("UPDATE_SELFTEST"))
    }
  }, [create_success, update_success])

  const handleSubmit = (e, values) => {
    if (isEdit) {
      const updatedSelfTest = {
        id: selftest.id,
        name: values.name,
        lesson_id: values.lesson_id,
        time_required: "true",
        duration: values.duration,
        duration_type: values.duration_type,
        status: values.selftest_status
      }
      dispatch(onUpdateItem(updatedSelfTest))
    } else {
      const newSelfTest = {
        name: values["name"],
        lesson_id: values["lesson_id"],
        time_required: "true",
        duration: values["duration"],
        duration_type: values["duration_type"],
        status: values["selftest_status"]
      }
      dispatch(onAddItem(newSelfTest))
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
        {!!isEdit ? "Edit Self Test" : "Add Self Test"}
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
                  name="name"
                  label="Name"
                  type="text"
                  errorMessage="The Name field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={selftest.name || ""}
                />
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <AvField
                  name="lesson_id"
                  label="Lesson"
                  type="select"
                  errorMessage="The Lesson field is invalid"
                  value={selftest.lesson_id || ""}
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}>
                  <option value="">Select Lesson</option>
                  {lessons.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} - {item.chapter.name} - {item.chapter.year.name} - {item.chapter.exam_board.name}</option>
                  ))}
                </AvField>
              </div>
            </Col>
            {/* <Col>
              <div className="mb-3">
                <Label>Time Required</Label>
                <Switch
                  uncheckedIcon={<Offsymbol />}
                  checkedIcon={<OnSymbol />}
                  className="ms-3"
                  onColor="#626ed4"
                  onChange={() => {
                    setTimeRequired(!timeRequired)
                  }}
                  checked={timeRequired}
                />
              </div>
            </Col> */}
            <Col>
              <div className="mb-3">
                <AvField
                  name="duration"
                  label="Duration"
                  type="text"
                  errorMessage="The Duration field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={selftest.duration || ""}
                />
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <AvField
                  name="duration_type"
                  label="Duration Type"
                  type="select"
                  errorMessage="The Duration Type field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={selftest.duration_type || ""}
                >
                  <option value="">Select Duration Type</option>
                  <option value="minutes">Minutes</option>
                  <option value="hours">Hours</option>
                </AvField>
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <AvField
                  name="selftest_status"
                  label="Status"
                  type="select"
                  errorMessage="The Status field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={selftest.status || ""}
                >
                  <option value="">Select Status</option>
                  <option value="draft">Draft</option>
                  <option value="publish">Publish</option>
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
                {isEdit ? "Self Test Successfully updated" : "Self Test Successfully created"}
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

export default withRouter(CreateSelfTest)
