import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"
import dayjs from "dayjs"
import { showToastMessage } from "helpers/toaster"

import { addNewItem as onAddItem, updateItem as onUpdateItem } from "store/pastpaper/actions"

import { getYears as onGetYears } from "store/settings/years/actions"

import { getList as onGetChapters } from "store/subject-management/chapters/actions"

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

const years_list = () => {
  const year = parseInt(dayjs().format("YYYY"))
  var years_list = []
  for (var i = year; i >= year - 20; i--) {
    years_list.push(i)
  }
  return years_list
}

const CreatePastPaper = ({ visible, isEdit, examBoardData = {}, onClose }) => {
  const dispatch = useDispatch()

  const {
    lessons,
    years,
    chapters,
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
    years: state.years.years,
    chapters: state.chapters.chapters,
    error_message: state.pastpaper.error,
    form_errors: state.pastpaper.form_errors,
    create_loading: pending(state, "ADD_PASTPAPER"),
    create_error: rejected(state, "ADD_PASTPAPER"),
    create_success: fulfilled(state, "ADD_PASTPAPER"),
    done: done(state, "ADD_PASTPAPER"),
    update_loading: pending(state, "UPDATE_PASTPAPER"),
    update_error: rejected(state, "UPDATE_PASTPAPER"),
    update_success: fulfilled(state, "UPDATE_PASTPAPER"),
    update_done: done(state, "UPDATE_PASTPAPER")
  }))

  const [selftest, setSelftest] = useState({})
  // const [timeRequired, setTimeRequired] = useState(false)

  const [passPaperYears, setPassPaperYears] = useState(years_list)

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
    dispatch(onGetChapters())
    dispatch(onGetLessons())
    dispatch(onGetYears())
  }, [])

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_PASTPAPER"))
      dispatch(clean("UPDATE_PASTPAPER"))
      if (!isEdit) {
        setSelftest({})
      }
    }
  }, [visible])

  useEffect(() => {
    if (create_success) {
      onClose()
      showToastMessage("success", "Past paper successfully created")
      setSelftest({})
      dispatch(clean("ADD_PASTPAPER"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Past paper successfully updated")
      dispatch(clean("UPDATE_PASTPAPER"))
    }
  }, [create_success, update_success])

  const handleSubmit = (e, values) => {

    if (isEdit) {
      const updatedPastPaper = {
        id: selftest.id,
        name: values.name,
        // lesson_id: values.lesson_id,
        time_required: "true",
        duration: values.duration,
        duration_type: values.duration_type,
        status: values.selftest_status,
        year: values.year,
        paper_type: values.paper_type == "" ? null : values.paper_type,
        chapter_id: values.chapter_id
      }
      dispatch(onUpdateItem(updatedPastPaper))
    } else {
      const newPastPaper = {
        name: values["name"],
        // lesson_id: values["lesson_id"],
        time_required: "true",
        duration: values["duration"],
        duration_type: values["duration_type"],
        status: values["selftest_status"],
        year: values["year"],
        paper_type: values["paper_type"] == "" ? null : values["paper_type"],
        chapter_id: values["chapter_id"]
      }
      dispatch(onAddItem(newPastPaper))
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
        {!!isEdit ? "Edit Past Paper" : "Add Past Paper"}
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
            <Col xs={12}>
              <div className="mb-3">
                <AvField
                  name="paper_type"
                  label="Paper Type"
                  type="select"
                  errorMessage="The Paper Type field is invalid"
                  validate={{
                    // required: { value: true },
                    server: serverValidate
                  }}
                  value={selftest.paper_type || ""}
                >
                  <option value="">Select Paper Type</option>
                  <option value="higher">higher</option>
                  <option value="foundation">foundation</option>
                </AvField>
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <AvField
                  name="year"
                  label="Year"
                  type="select"
                  errorMessage="The Year field is invalid"
                  value={selftest.year || ""}
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}>
                  <option value="">Select Year</option>
                  {passPaperYears.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </AvField>
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <AvField
                  name="chapter_id"
                  label="Chapter"
                  type="select"
                  errorMessage="The Chapter field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={selftest.chapter_id || ""}
                >
                  <option value="">Select Chapter</option>
                  {chapters.map(item => (
                    <option key={item.id} value={item.id}>{item.name} - {item.subject?.name || ""} -
                      Year {item.year?.year || ""}</option>
                  ))}
                </AvField>
              </div>
            </Col>
            {/* <Col>
              <div className="mb-3">
                <AvField
                  name="lesson_id"
                  label="Lesson"
                  type="select"
                  errorMessage="The Lesson field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate,
                  }}
                  value={selftest.lesson_id || ""}
                >
                  <option value="">Select Lesson</option>
                  {lessons.map(item => (
                    <option value={item.id}>{item.name}</option>
                  ))}
                </AvField>
              </div>
            </Col> */}
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
                {isEdit
                  ? "Past Paper Successfully updated"
                  : "Past Paper Successfully created"}
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

export default withRouter(CreatePastPaper)
