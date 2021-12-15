import React, { useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import { Alert, Button, Col, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"
import Switch from "react-switch"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { showToastMessage } from "helpers/toaster"
import UploadVideo from "./UploadVideo"
import { addNewItem as onAddQuestion, updateItem as onUpdateQuestion } from "store/pastpaper/questions/actions"
import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"

//redux
import { useDispatch, useSelector } from "react-redux"

const OffSymbol = () => {
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
      }}>{" "} No
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
      }}> {" "} Yes
    </div>
  )
}

const rowData = {
  id: "1",
  type: "string",
  answer: "",
  isCorrect: false
}

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => resolve(reader.result)
  reader.onerror = error => reject(error)
})

const AnswerManage = ({ onChange, answers = null }) => {
  const [row, setRow] = useState([rowData])

  useEffect(() => {
    if (answers) {
      setRow(answers)
    }
  }, [])
  useEffect(() => {
    onChange(row)
  }, [row])

  const handleAddRowNested = () => {
    const modifiedRows = [...row]
    modifiedRows.push({ ...rowData, id: modifiedRows.length + 1, answer: '' })
    setRow(modifiedRows)
  }

  const handleRemoveRow = (id) => {
    if (id !== 1) {
      var modifiedRows = [...row]
      modifiedRows = modifiedRows.filter(x => x["id"] !== id)
      setRow(modifiedRows)
    }
  }

  const onChangeType = (e, formRow) => {
    const { value } = e.target
    var modifiedRows = [...row]
    modifiedRows = modifiedRows.map(x => {
      if (x["id"] === formRow.id) {
        x.type = value
      }
      return x
    })
    setRow(modifiedRows)
  }

  const onChangeText = (e, formRow) => {
    const { value } = e.target
    var modifiedRows = [...row]
    modifiedRows = modifiedRows.map(x => {
      if (x["id"] === formRow.id) {
        x.answer = value
      }
      return x
    })
    setRow(modifiedRows)
    onChange(modifiedRows)
  }


  const onChangeImage = async (e, formRow) => {
    const { files } = e.target
    const base64Image = await toBase64(files[0])
    var modifiedRows = [...row]

    modifiedRows = modifiedRows.map(x => {
      if (x["id"] === formRow.id) {
        x.answer = base64Image
      }
      return x
    })
    setRow(modifiedRows)
    onChange(modifiedRows)
  }

  const onChangeCorrectAnswer = async (value, formRow) => {
    var modifiedRows = [...row]

    modifiedRows = modifiedRows.map(x => {
      if (x["id"] === formRow.id) {
        x.isCorrect = value
      }
      return x
    })
    setRow(modifiedRows)
    onChange(modifiedRows)
  }

  return (
    <div className="inner-repeater mb-4">
      <table style={{ width: "100%" }}>
        <tbody>
        {(row || []).map((formRow, key) => (
          <tr key={key}>
            <td>
              <Row className="mb-2">
                <Col md="2">
                  <Input
                    type="select"
                    className="inner form-control"
                    onChange={(e) => onChangeType(e, formRow)}
                    value={formRow.type}
                  >
                    <option value="string">Text</option>
                    <option value="image">Image</option>
                    {formRow.type === "url" && (
                      <option value="url">URL</option>
                    )}
                  </Input>
                </Col>
                <Col md="7">
                  {formRow.type === "string" && (
                    <Input
                      type="text"
                      className="inner form-control"
                      placeholder="Enter your answer"
                      value={formRow.answer}
                      onChange={(e) => onChangeText(e, formRow)}
                    />
                  )}
                  {formRow.type === "image" && (
                    <Input
                      type="file"
                      className="inner form-control"
                      onChange={(e) => onChangeImage(e, formRow)}
                    />
                  )}
                  {formRow.type === "url" && (
                    <img height="60" src={formRow.answer} />
                  )}
                </Col>
                <Col md="1">
                  <Switch
                    uncheckedIcon={<OffSymbol />}
                    checkedIcon={<OnSymbol />}
                    className="ms-3"
                    onColor="#626ed4"
                    onChange={(e) => onChangeCorrectAnswer(e, formRow)}
                    checked={formRow.isCorrect}
                  />
                </Col>
                {key != 0 && (
                  <Col md="2">
                    <Button
                      color="primary"
                      className="btn-block inner"
                      id="unknown-btn"
                      style={{ width: "100%" }}
                      onClick={e => {
                        handleRemoveRow(formRow.id)
                      }}>
                      {" "} Delete {" "}
                    </Button>
                  </Col>
                )}
              </Row>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
      <Button
        onClick={() => {
          handleAddRowNested()
        }}
        color="success"
        className="mt-1">Add Answer
      </Button>
    </div>
  )
}

const editorModules = {
  toolbar: [
    [{ "header": [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }],
    ["link", "image"],
    ["clean"]
  ]
}

const CreatePastPaperQuestion = ({
                                   visible,
                                   isEdit,
                                   editData = {},
                                   onClose,
                                   selfTestId,
                                   workSheetData,
                                   isSubQuestion
                                 }) => {
  const dispatch = useDispatch()

  const {
    questions,
    video_info,
    error,
    success,
    loading,
    error_message,
    form_errors,
    update_loading,
    update_error,
    update_success
  } = useSelector(state => ({
    questions: state.selfTestQuestions.questions,
    video_info: state.video.createdVideo,
    error_message: state.selfTestQuestions.error,
    form_errors: state.selfTestQuestions.form_errors,
    loading: pending(state, "ADD_PASTPAPER_QUESTIONS"),
    error: rejected(state, "ADD_PASTPAPER_QUESTIONS"),
    success: fulfilled(state, "ADD_PASTPAPER_QUESTIONS"),
    done: done(state, "ADD_PASTPAPER_QUESTIONS"),
    update_loading: pending(state, "UPDATE_PASTPAPER_QUESTIONS"),
    update_error: rejected(state, "UPDATE_PASTPAPER_QUESTIONS"),
    update_success: fulfilled(state, "UPDATE_PASTPAPER_QUESTIONS"),
    update_done: done(state, "UPDATE_PASTPAPER_QUESTIONS")
  }))

  const [question, setQuestion] = useState({})
  const [answers, setAnswers] = useState({})
  const [correctAnswers, setCorrectAnswers] = useState({})
  const [customAnswer, setCustomAnswer] = useState("")
  // const [timeRequired, setTimeRequired] = useState(false)
  const [selfTestImageQuestion, setSelfTestImageQuestion] = useState("")

  // Variables for - Edit Purpose
  const [newVideoUploaded, setNewVideoUploaded] = useState(false)
  const [newVideoInfo, setNewVideoInfo] = useState({})

  const onVideoUpload = (video_info) => {
    const { isEdit, data } = video_info
    setNewVideoUploaded(isEdit || false)
    setNewVideoInfo(data || {})
  }

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

  const isCorrectAnswer = (answerId) => {
    let correct = false
    editData.correct_answers.forEach(ans => {
      if (ans.id == answerId) {
        correct = true
      }
    })
    return correct
  }

  useEffect(() => {
    let answers = editData?.answers?.map((item, index) => ({
      id: item.id,
      type: item.type,
      answer: item.answer,
      isCorrect: isCorrectAnswer(item.id)
    }))
    setAnswers(answers)
    setCorrectAnswers(editData.correct_answers)

    setQuestion({ ...editData, answers })
    if (editData.question_type == "custom") {
      setCustomAnswer(editData?.answers[0]?.answer || "")
    }
  }, [editData])


  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_PASTPAPER_QUESTIONS"))
      dispatch(clean("UPDATE_PASTPAPER_QUESTIONS"))
      if (!isEdit) {
        setQuestion({ question_content_type: "string" })
      }
    }
  }, [visible])

  useEffect(() => {
    if (success) {
      onClose()
      showToastMessage("success", "Question successfully created")
      setQuestion({})
      dispatch(clean("ADD_PASTPAPER_QUESTIONS"))
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Question successfully updated")
      dispatch(clean("UPDATE_PASTPAPER_QUESTIONS"))
    }
  }, [success, update_success])

  const handleSubmit = (e, values) => {

    const common = {
      test_type: "past_paper",
      test_referrer_id: "",
      question_type: "mcq",
      question: "",
      // answers:"",
      // correct_answers:"",
      solution: "",
      status: ""
    }
    if (isEdit) {
      const updatedSelfTest = {
        ...common,
        id: values.id,
        test_referrer_id: selfTestId,
        question_type: values.question_type,
        question: values.question_content_type == "image" ? selfTestImageQuestion : values.question,
        mark: values.mark,
        answers: values.question_type === "custom" ? [{ id: 1, type: "string", answer: customAnswer }] : answers,
        correct_answers: values.question_type === "custom" ? [{ id: 1, type: "string", answer: customAnswer }] : correctAnswers,
        solution: question.solution || "",
        status: values.question_status,
        video_explanation: newVideoUploaded ? video_info : newVideoInfo,
        lesson_id: values.lesson_id,
        question_content_type: values.question_content_type,
        question_number: values.question_number
        // parent_question_id
      }
      if (isSubQuestion) {
        updatedSelfTest.parent_question_id = editData.id
      }

      dispatch(onUpdateQuestion(updatedSelfTest))
    } else {
      const newSelfTest = {
        ...common,
        test_referrer_id: selfTestId,
        question_type: values["question_type"],
        question: values.question_content_type === "image" ? selfTestImageQuestion : values.question,
        mark: values["mark"],
        answers: values.question_type === "custom" ? [{ id: 1, type: "string", answer: customAnswer }] : answers,
        correct_answers: values.question_type === "custom" ? [{ id: 1, type: "string", answer: customAnswer }] : correctAnswers,
        solution: question.solution || "",
        status: values["question_status"],
        video_explanation: newVideoUploaded ? video_info : newVideoInfo,
        lesson_id: values.lesson_id,
        question_content_type: values.question_content_type,
        question_number: values.question_number
      }
      if (isSubQuestion) {
        newSelfTest.parent_question_id = editData.id
      }
      dispatch(onAddQuestion(newSelfTest))
    }
  }

  const handleInvalidSubmit = (e, errors, values) => {
    if (error || update_error) {
      handleSubmit(e, values)
    }
  }

  const onSetAnswers = (answers) => {
    setAnswers(answers.map((item, index) => ({
      id: item.id,
      type: item.type,
      answer: item.answer
    })))
    let correct_answers = answers.filter(item => item.isCorrect)
    setCorrectAnswers(correct_answers)
  }

  const QuestionTypeHandler = (e) => {
    const { value } = e.target

    if (value === "custom") {
      setQuestion({ ...question, question_type: value, correct_answers: [] })
    } else {
      setQuestion({ ...question, question_type: value })
    }
  }
  const QuestionContentTypeHandler = (e) => {
    const { value } = e.target

    // if (value == "custom") {
    //   setSelftest({...selftest,question_content_type:value, correct_answers:[]})
    // } else {
    setQuestion({ ...question, question_content_type: value })
    // }
  }

  const onSetSolution = (value) => {
    setQuestion({ ...question, solution: value })
  }

  const onChangeQuestionImage = async (e) => {
    const { files } = e.target
    const base64Image = await toBase64(files[0])
    setQuestion({ ...question, question: base64Image })
    setSelfTestImageQuestion(base64Image)
  }

  return (
    <Modal isOpen={visible} toggle={onClose} size="xl">
      <ModalHeader toggle={onClose} tag="h4">
        {!!isEdit ? "Edit Past Paper Question" : "Add Past Paper Question"}
      </ModalHeader>
      <ModalBody>
        <AvForm onValidSubmit={handleSubmit} onInvalidSubmit={handleInvalidSubmit}>
          <Row>
            <Col xs={12}>
              <div className="mb-3">
                <AvField
                  name="id"
                  type="hidden"
                  value={question.id || ""}
                />
              </div>
            </Col>

            <Col xs={6}>
              <div className="mb-3">
                <AvField
                  name="question_number"
                  label="Question Number"
                  type="text"
                  errorMessage="The Question Number field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={question.question_number || ""}
                  onChange={(e) => QuestionTypeHandler(e)}
                />
              </div>
            </Col>
            <Col xs={6}>
              <div className="mb-3">
                <AvField
                  name="question_type"
                  label="Question Type"
                  type="select"
                  errorMessage="The Question Type field is invalid"
                  value={question.question_type || ""}
                  onChange={(e) => QuestionTypeHandler(e)}
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}>
                  <option value="">Select Question Type</option>
                  <option value="mcq">MCQ</option>
                  <option value="custom">Custom</option>
                </AvField>
              </div>
            </Col>
            <Col xs={2}>
              <div className="mb-3">
                <AvField
                  name="question_content_type"
                  label="Type"
                  type="select"
                  errorMessage="The Question Content Type field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={question?.question_content_type || "string"}
                  onChange={(e) => QuestionContentTypeHandler(e)}
                >
                  <option value="string">Text</option>
                  <option value="image">Image</option>
                  {question.question_content_type == "url" && (
                    <option value="url">URL</option>
                  )}
                </AvField>
              </div>
            </Col>
            <Col xs={10}>
              <div className="mb-3">
                {question.question_content_type == "string" && (
                  <AvField
                    name="question"
                    label="Question"
                    type="text"
                    errorMessage="The Question field is invalid"
                    validate={{
                      required: { value: true },
                      server: serverValidate
                    }}
                    value={question.question || ""}
                  />
                )}
                {question.question_content_type == "image" && (
                  <>
                    <Label>Question</Label>
                    <Input
                      type="file"
                      label="Question"
                      className="inner form-control"
                      onChange={(e) => onChangeQuestionImage(e)}
                    />
                  </>
                )}
                {question.question_content_type == "url" && (
                  <>
                    <Label>Question</Label>
                    <div>
                      <img src={question.question} height="100" />
                      <AvField
                        name="question"
                        label="Question"
                        type="text"
                        hidden
                        value={question.question || ""}
                      />
                    </div>
                  </>
                )}
              </div>
            </Col>
            {/* MCQ Question Begin */}
            {question.question_type == "mcq" && (
              <>

                <Col>
                  <label>Answers</label>
                  <AnswerManage answers={question.answers} onChange={(answers) => {
                    onSetAnswers(answers)
                  }} />
                </Col>
              </>
            )}
            {/* MCQ Question End */}

            {/* Custom Question Begin */}
            {question.question_type == "custom" && (
              <>
                <Col>
                  <div className="mb-3">
                    <label>Answers</label>
                    {/* <AnswerManage answers={selftest.answers} onChange={(answers)=>{onSetAnswers(answers) }}/> */}
                    <ReactQuill
                      value={customAnswer}
                      onChange={setCustomAnswer}
                      modules={editorModules}
                    />
                  </div>
                </Col>
              </>
            )}
            {/* MCQ Question End */}

            <Col xl="12" lg="12" md="12">
              <div className="mb-3">
                <label>Solution</label>
                <ReactQuill
                  value={question.solution || ""}
                  onChange={onSetSolution}
                  modules={editorModules}
                />
              </div>
            </Col>
            <Col xl="12" lg="12" md="12">
              <div className="mb-3">
                <label>Explanation Video</label>
                <UploadVideo onVideoUpload={onVideoUpload} editData={question.video_explanation} visible
                             worksheetData={workSheetData} onClose={() => {
                }} />

              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <div className="mb-3">
                <AvField
                  name="mark"
                  label="Marks"
                  type="number"
                  errorMessage="The Marks is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={question.mark || ""}
                />
              </div>
            </Col>
            <Col xl="6" lg="6" md="6">
              <div className="mb-3">
                <AvField
                  name="question_status"
                  label="Status"
                  type="select"
                  errorMessage="The Status field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate
                  }}
                  value={question.status || ""}
                >
                  <option value="">Select Status</option>
                  <option value="draft">Draft</option>
                  <option value="publish">Publish</option>
                </AvField>
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
                {isEdit
                  ? "Past Paper  Successfully updated"
                  : "Past Paper  Successfully created"}
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

export default withRouter(CreatePastPaperQuestion)
