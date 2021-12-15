import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import { showToastMessage } from "helpers/toaster"
import { addNewItem as onAddChapter, updateItem as onUpdateChapter } from "store/subject-management/chapters/actions"
import { getList as onGetSubjects } from "store/subject-management/subjects/actions"
import { getExamBoards as onGetExamboard } from "store/settings/examboard/actions"
import { getYears as onGetYears } from "store/settings/years/actions"

import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

const CreateChapter = ({ visible, isEdit, chapterData = {}, onClose }) => {
  const dispatch = useDispatch()

  const {
    examboards,
    subjects,
    years,
    create_error,
    create_success,
    create_loading,
    error_message,
    form_errors,
    update_loading,
    update_error,
    update_success
  } = useSelector(state => ({
    examboards: state.examboard.examboards,
    subjects: state.subjects.subjects,
    years: state.years.years,
    error_message: state.chapters.error,
    form_errors: state.chapters.form_errors,
    create_loading: pending(state, "ADD_CHAPTER"),
    create_error: rejected(state, "ADD_CHAPTER"),
    create_success: fulfilled(state, "ADD_CHAPTER"),
    done: done(state, "ADD_CHAPTER"),
    update_loading: pending(state, "UPDATE_CHAPTER"),
    update_error: rejected(state, "UPDATE_CHAPTER"),
    update_success: fulfilled(state, "UPDATE_CHAPTER"),
    update_done: done(state, "UPDATE_CHAPTER")
  }))

  const [chapter, setChapter] = useState({})

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
    setChapter(chapterData)
  }, [chapterData])

  useEffect(() => {
    dispatch(onGetSubjects())
    dispatch(onGetExamboard())
    dispatch(onGetYears())
  }, [])

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_CHAPTER"))
      dispatch(clean("UPDATE_CHAPTER"))
      if (!isEdit) {
        setChapter({})
      }
    }
  }, [visible])

  useEffect(() => {
    if (create_success) {
      onClose()
      showToastMessage("success", "Chapter successfully created")
      setChapter({})
      dispatch(clean("ADD_CHAPTER"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Chapter successfully updated")
      dispatch(clean("UPDATE_CHAPTER"))
    }
  }, [create_success, update_success])

  const handleSubmit = async (e, values) => {
    if (isEdit) {
      const updatedChapter = {
        id: chapter.id,
        name: values.name,
        number: values.number,
        subject_id: values.subject_id,
        year_id: values.year_id,
        exam_board_id: values.exam_board_id
      }
      dispatch(onUpdateChapter(updatedChapter))
    } else {
      const newChapter = {
        name: values["name"],
        number: values["number"],
        subject_id: values["subject_id"],
        year_id: values["year_id"],
        exam_board_id: values["exam_board_id"]
      }
      dispatch(onAddChapter(newChapter))
    }
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

  const handleInvalidSubmit = (e, errors, values) => {
    if (create_error || update_error) {
      handleSubmit(e, values)
    }
  }


  return (
    <Modal isOpen={visible} toggle={onClose}>
      <ModalHeader toggle={onClose} tag="h4">
        {!!isEdit ? "Edit Chapter" : "Add Chapter"}
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
                  value={chapter.name || ""}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="number"
                  label="Number"
                  type="text"
                  errorMessage="The Number field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={chapter.number || ""}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="subject_id"
                  label="Subject"
                  type="select"
                  errorMessage="The Subject field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={chapter.subject_id || ""}
                >
                  <option value="">Select Subject</option>
                  {subjects.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </AvField>
              </div>
              <div className="mb-3">
                <AvField
                  name="year_id"
                  label="Year"
                  type="select"
                  errorMessage="The Year field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={chapter.year_id || ""}
                >
                  <option value="">Select Year</option>
                  {years.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </AvField>
              </div>
              <div className="mb-3">
                <AvField
                  name="exam_board_id"
                  label="Exam Board"
                  type="select"
                  errorMessage="The Exam Board field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={chapter.exam_board_id || ""}
                >
                  <option value="">Select Exam Board</option>
                  {examboards.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
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
                  ? "Chapter Successfully updated"
                  : "Chapter Successfully created"}
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

export default withRouter(CreateChapter)
