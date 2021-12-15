import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import { showToastMessage } from "helpers/toaster"
import {
  addNewExamBoard as onAddExamBoard,
  updateExamBoard as onUpdateExamBoard
} from "store/settings/examboard/actions"

import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

const CreateExamBoard = ({ visible, isEdit, examBoardData = {}, onClose }) => {
  const dispatch = useDispatch()

  const {
    examboards,
    error,
    success,
    loading,
    error_message,
    form_errors,
    update_loading,
    update_error,
    update_success
  } = useSelector(state => ({
    examboards: state.examboard.examboards,
    error_message: state.examboard.error,
    form_errors: state.examboard.form_errors,
    loading: pending(state, "ADD_NEW_EXAM_BOARD"),
    error: rejected(state, "ADD_NEW_EXAM_BOARD"),
    success: fulfilled(state, "ADD_NEW_EXAM_BOARD"),
    done: done(state, "ADD_NEW_EXAM_BOARD"),
    update_loading: pending(state, "UPDATE_EXAM_BOARD"),
    update_error: rejected(state, "UPDATE_EXAM_BOARD"),
    update_success: fulfilled(state, "UPDATE_EXAM_BOARD"),
    update_done: done(state, "UPDATE_EXAM_BOARD")
  }))

  const [user, setUser] = useState({})
  const [selectedLogo, setSelectedLogo] = useState({})
  const [selectedImagePreview, setSelectedImagePreview] = useState("")
  const [imageSelected, setImageSelected] = useState(false)
  const [imageRequired, setImageRequired] = useState(true)

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
    setSelectedImagePreview(examBoardData.logo)
    delete examBoardData.logo
    setUser(examBoardData)
    setImageRequired(false)
  }, [examBoardData])

  /*  useEffect(() => {
      dispatch(onGetExamBoards())
    }, [])*/

  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_NEW_EXAM_BOARD"))
      dispatch(clean("UPDATE_EXAM_BOARD"))
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
      dispatch(clean("ADD_NEW_EXAM_BOARD"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Exam board successfully updated")
      dispatch(clean("UPDATE_EXAM_BOARD"))
    }
  }, [success, update_success])

  const handleSubmit = async (e, values) => {
    if (isEdit) {
      const updatedExamboard = {
        id: user.id,
        name: values.name
      }
      if (imageSelected) {
        updatedExamboard.logo = await toBase64(selectedLogo)
      }
      dispatch(onUpdateExamBoard(updatedExamboard))
    } else {
      const newExamboard = {
        name: values["name"]
      }
      if (imageSelected) {
        newExamboard.logo = await toBase64(selectedLogo)
      }

      dispatch(onAddExamBoard(newExamboard))
    }
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })

  const handleInvalidSubmit = (e, errors, values) => {
    if (error || update_error) {
      handleSubmit(e, values)
    }
  }

  const imageHandler = async (e) => {
    setSelectedLogo(e.target.files[0])
    setSelectedImagePreview(await toBase64(e.target.files[0]))
    setImageSelected(true)
  }

  return (
    <Modal isOpen={visible} toggle={onClose}>
      <ModalHeader toggle={onClose} tag="h4">
        {!!isEdit ? "Edit Exam Board" : "Add Exam Board"}
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
                  value={user.name || ""}
                />
              </div>
              <div className="mb-3">
                <AvField
                  name="logo"
                  label="Logo"
                  type="file"
                  errorMessage="The Logo field is invalid"
                  validate={{
                    required: { value: imageRequired },
                    server: serverValidate
                  }}
                  value={user.logo || ""}
                  className="form-control form-control-md"
                  onChange={imageHandler}
                />
              </div>
              {selectedImagePreview !== "" && (
                <div className="text-center">
                  <img
                    className="rounded ms-2"
                    alt={user.name}
                    width="200"
                    src={selectedImagePreview}
                  />
                </div>
              )}
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
                {isEdit
                  ? "Exam-board Successfully updated"
                  : "Exam-board Successfully created"}
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

export default withRouter(CreateExamBoard)
