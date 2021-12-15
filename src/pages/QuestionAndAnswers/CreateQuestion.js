import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { withRouter, Link } from "react-router-dom"
import {
  Label,
  Input,
  Col,
  Row,
  Modal,
  Alert,
  Button,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"

import { showToastMessage } from "helpers/toaster"

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
} from "store/user-management/contacts/actions"
import {
  getList as obGetSubjects,
  addNewItem as onAddSubject,
  updateItem as onUpdateSubject,
} from "store/subject-management/subjects/actions"

import { pending, rejected, fulfilled, done, clean } from "redux-saga-thunk"

//redux
import { useSelector, useDispatch } from "react-redux"

const editorModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}

const CreateQuestion = ({ visible, isEdit, questionData = {}, onClose }) => {
  const dispatch = useDispatch()

  const [answer,setAnswer]=useState("")

  const {
    examboards,
    error,
    success,
    loading,
    error_message,
    form_errors,
    update_loading,
    update_error,
    update_success,
  } = useSelector(state => ({
    examboards: state.examboard.examboards,
    error_message: state.subjects.error,
    form_errors: state.subjects.form_errors,
    loading: pending(state, "ADD_SUBJECT"),
    error: rejected(state, "ADD_SUBJECT"),
    success: fulfilled(state, "ADD_SUBJECT"),
    done: done(state, "ADD_SUBJECT"),
    update_loading: pending(state, "UPDATE_SUBJECT"),
    update_error: rejected(state, "UPDATE_SUBJECT"),
    update_success: fulfilled(state, "UPDATE_SUBJECT"),
    update_done: done(state, "UPDATE_SUBJECT"),
  }))

  const [user, setUser] = useState({})

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
    setUser(questionData)
  }, [questionData])

  useEffect(() => {
      dispatch(obGetSubjects())
  }, [])

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_SUBJECT"))
      dispatch(clean("UPDATE_SUBJECT"))
      if (!isEdit) {
        setUser({})
      }
    }
  }, [visible])

  useEffect(() => {
    if (success) {
      onClose()
      showToastMessage("success", "Exam board successfully created")
      setUser({})
      dispatch(clean("ADD_SUBJECT"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Exam board successfully updated")
      dispatch(clean("UPDATE_SUBJECT"))
    }
  }, [success, update_success])

  const handleSubmit =async (e, values) => {
    if (isEdit) {
      const updatedSubject = {
        id: user.id,
        name: values.name,
        color: values.color,
      }
      dispatch(onUpdateSubject(updatedSubject))
    } else {
      const newSubject = {
        name: values["name"],
        color: values.color,
      }
      dispatch(onAddSubject(newSubject))
    }
  }

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

  const handleInvalidSubmit = (e, errors, values) => {
    if (error || update_error) {
      handleSubmit(e, values)
    }
  }

  const onOverviewChange = (value) => {
    setAnswer( value )
  }

  return (
    <Modal isOpen={visible} toggle={onClose} size="lg">
      <ModalHeader toggle={onClose} tag="h4">
        {!!isEdit ? "Edit Subject" : "Add Subject"}
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
                  name="question"
                  label="Question"
                  type="text"
                  errorMessage="The Question field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate,
                  }}
                  // value={user.name || ""}
                />
              </div>
            </Col>
            <Col xs={12}>
              <div className="mb-3">
                <label>Answer</label>
                <ReactQuill
                  value={answer}
                  onChange={onOverviewChange}
                  modules={editorModules}
                />
              </div>
            </Col>
          </Row>

          {/* {(error || update_error) && error_message && (
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
                {isEdit
                  ? "Exam-board Successfully updated"
                  : "Exam-board Successfully created"}
              </Alert>
            </Col>
          )} */}

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

export default withRouter(CreateQuestion)
