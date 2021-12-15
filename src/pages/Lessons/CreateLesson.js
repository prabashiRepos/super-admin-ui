import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

import { showToastMessage } from "helpers/toaster"
import { addNewItem as onAddLesson, updateItem as onUpdateLesson } from "store/subject-management/lessons/actions"
import { getList as onFilterChapter } from "store/subject-management/chapters/actions"
import { getList as onGetSubjects } from "store/subject-management/subjects/actions"
import { getExamBoards as onGetExamboard } from "store/settings/examboard/actions"
import { getYears as onGetYears } from "store/settings/years/actions"

import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

const editorModules = {
  toolbar: [
    [{ "header": [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }],
    ["link", "image"],
    ["clean"]
  ]
}

const CreateLesson = ({ visible, isEdit, lessonData = {}, onClose }) => {
  const dispatch = useDispatch()

  const {
    chapters,
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
    chapters: state.chapters.chapters,
    examboards: state.examboard.examboards,
    subjects: state.subjects.subjects,
    years: state.years.years,
    error_message: state.chapters.error,
    form_errors: state.chapters.form_errors,
    create_loading: pending(state, "ADD_LESSON"),
    create_error: rejected(state, "ADD_LESSON"),
    create_success: fulfilled(state, "ADD_LESSON"),
    done: done(state, "ADD_LESSON"),
    update_loading: pending(state, "UPDATE_LESSON"),
    update_error: rejected(state, "UPDATE_LESSON"),
    update_success: fulfilled(state, "UPDATE_LESSON"),
    update_done: done(state, "UPDATE_LESSON")
  }))

  const [lesson, setLesson] = useState({})
  const [overView, setOverView] = useState("")

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
    setLesson(lessonData)
    setOverView(lessonData.overview)
  }, [lessonData])

  useEffect(() => {
    dispatch(onGetSubjects())
    dispatch(onGetExamboard())
    dispatch(onGetYears())
    if (!isEdit) {
      setOverView("")
    }
  }, [])

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_LESSON"))
      dispatch(clean("UPDATE_LESSON"))
      if (!isEdit) {
        setLesson({})
      }
    }
  }, [visible])

  useEffect(() => {
    if (create_success) {
      onClose()
      showToastMessage("success", "Lesson successfully created")
      setLesson({})
      dispatch(clean("ADD_LESSON"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Lesson successfully updated")
      dispatch(clean("UPDATE_LESSON"))
    }
  }, [create_success, update_success])

  const handleSubmit = async (e, values) => {
    if (isEdit) {
      const updatedLesson = {
        id: lesson.id,
        name: values.name,
        number: values.number,
        subject_id: values.subject_id,
        chapter_id: values.chapter_id,
        overview: overView
      }
      dispatch(onUpdateLesson(updatedLesson))
    } else {
      const newLesson = {
        name: values["name"],
        number: values["number"],
        subject_id: values["subject_id"],
        chapter_id: values["chapter_id"],
        overview: overView
      }
      dispatch(onAddLesson(newLesson))
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


  const onOverviewChange = (value) => {
    setOverView(value)
  }

  const filterChapter = (e) => {
    dispatch(onFilterChapter({ subject_id: e.target.value }))
  }

  return (
    <Modal isOpen={visible} size="xl">
      <ModalHeader toggle={onClose} tag="h4">
        {!!isEdit ? "Edit Lesson" : "Add Lesson"}
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
                  value={lesson.name || ""}
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="number"
                  label="Number"
                  type="text"
                  errorMessage="The Number field is invalid"
                  value={lesson.number || ""}
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="subject_id"
                  label="Subject"
                  type="select"
                  errorMessage="The Subject field is invalid"
                  value={lesson.subject_id || ""}
                  validate={{
                    server: serverValidate
                  }}
                  onChange={(val) => {
                    filterChapter(val)
                  }}>
                  <option value="">Select Subject</option>
                  {subjects.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </AvField>
              </div>
              <div className="mb-3">
                <AvField
                  name="chapter_id"
                  label="Chapter"
                  type="select"
                  errorMessage="The Chapter field is invalid"
                  value={lesson.chapter_id || ""}
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}>
                  <option value="">Select Chapter</option>
                  {chapters.map(item => (
                    <option key={item.id} value={item.id}>{item.name} - {item.year.name} -
                      ({item.exam_board.name})</option>
                  ))}
                </AvField>
              </div>
              <div className="mb-3">
                <label>Overview</label>
                <ReactQuill
                  value={overView}
                  onChange={onOverviewChange}
                  modules={editorModules}
                />
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
                  ? "Lesson Successfully updated."
                  : "Lesson Successfully created."}
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

export default withRouter(CreateLesson)
