import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"

import { showToastMessage } from "helpers/toaster"
import {
  addNewItem as onAddSubject,
  getList as obGetSubjects,
  updateItem as onUpdateSubject
} from "store/subject-management/subjects/actions"

import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

const CreateSubject = ({ visible, isEdit, subjectData = {}, onClose }) => {
  const dispatch = useDispatch()

  const {
    examboards,
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
    error_message: state.subjects.error,
    form_errors: state.subjects.form_errors,
    create_loading: pending(state, "ADD_SUBJECT"),
    create_error: rejected(state, "ADD_SUBJECT"),
    create_success: fulfilled(state, "ADD_SUBJECT"),
    done: done(state, "ADD_SUBJECT"),
    update_loading: pending(state, "UPDATE_SUBJECT"),
    update_error: rejected(state, "UPDATE_SUBJECT"),
    update_success: fulfilled(state, "UPDATE_SUBJECT"),
    update_done: done(state, "UPDATE_SUBJECT")
  }))

  const [user, setUser] = useState({})
  const [selectedLogo, setSelectedLogo] = useState({})
  const [selectedImagePreview, setSelectedImagePreview] = useState("")
  const [imageSelected, setImageSelected] = useState(false)
  const [imageRequired, setImageRequired] = useState(true)

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
    setSelectedImagePreview(subjectData.logo)
    delete subjectData.logo
    setUser(subjectData)
    setImageRequired(false)
  }, [subjectData])

/*  useEffect(() => {
    dispatch(obGetSubjects())
  }, [])*/

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
    if (create_success) {
      onClose()
      showToastMessage("success", "Subject successfully created")
      setUser({})
      dispatch(clean("ADD_SUBJECT"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Subject successfully updated")
      dispatch(clean("UPDATE_SUBJECT"))
    }
  }, [create_success, update_success])

  const handleSubmit = async (e, values) => {
    if (isEdit) {
      const updatedSubject = {
        id: user.id,
        name: values.name,
        // logo: await toBase64(selectedLogo),
        color: values.color
      }
      if (imageSelected) {
        updatedSubject.logo = await toBase64(selectedLogo)
      }
      dispatch(onUpdateSubject(updatedSubject))
    } else {
      const newSubject = {
        name: values["name"],
        // logo: await toBase64(selectedLogo),
        color: values.color
      }
      if (imageSelected) {
        newSubject.logo = await toBase64(selectedLogo)
      }
      dispatch(onAddSubject(newSubject))
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

  const imageHandler = async (e) => {
    setSelectedLogo(e.target.files[0])
    setSelectedImagePreview(await toBase64(e.target.files[0]))
    setImageSelected(true)
  }

  return (
    <Modal isOpen={visible} toggle={onClose}>
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
              <div className="mb-3">
                <AvField
                  name="color"
                  label="Color"
                  type="color"
                  errorMessage="The Color field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={user.color || ""}
                  className="form-control form-control-md"
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
                {isEdit ? "Subject Successfully updated" : "Subject Successfully created"}
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

export default withRouter(CreateSubject)
