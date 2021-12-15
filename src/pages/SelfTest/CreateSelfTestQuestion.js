import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { withRouter, Link } from "react-router-dom"
import {
  Col,
  Row,
  Modal,
  Alert,
  Label,
  Input,
  Button,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import { AvForm, AvField } from "availity-reactstrap-validation"
import Switch from "react-switch"

import { showToastMessage } from "helpers/toaster"

// import {
// getList as onGetItems,
//   addNewItem as onAddItem,
//   updateItem as onUpdateItem,
// } from "store/self-test/actions"

import {
  addNewItem as onAddQuestion,
  updateItem as onUpdateQuestion,
  deleteItem as onDeleteQuestion,
} from "store/self-test/questions/actions"

import { pending, rejected, fulfilled, done, clean } from "redux-saga-thunk"

//redux
import { useSelector, useDispatch } from "react-redux"

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
        paddingRight: 2,
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
        paddingRight: 2,
      }}
    >
      {" "}
      Yes
    </div>
  )
}

const rowData = {
  id: '1',
  type: 'string',
  answer: '',
  isCorrect:false
}

const AnswerManage = ({ onChange, answers=null}) => {
  const [row, setRow] = useState([rowData])

  useEffect(() => {
    if (answers) {
      setRow(answers.map(answer => {
        return {
          ...answer,
          type: answer.type == "image" ? answer.type = "url" : answer.type
        }
      }
      ))
    }
  }, [])
  
  useEffect(() => {
    onChange(row)
  },[row])

  const handleAddRowNested=()=> {
    const modifiedRows = [...row]
    modifiedRows.push({ ...rowData, id: modifiedRows.length + 1, })
    setRow(modifiedRows)
  }

  const handleRemoveRow=(id) => {
    if (id !== 1) {
      var modifiedRows = [...row]
      modifiedRows = modifiedRows.filter(x => x["id"] !== id)
      setRow(modifiedRows)
    }
  }

  const onChangeType = (e,formRow) => {
    const { value } = e.target
    var modifiedRows = [...row]
    modifiedRows = modifiedRows.map(x => {
      if (x["id"] === formRow.id) {
        x.type=value
      }
      return x
    })
    setRow(modifiedRows)
  }
  
  const onChangeText = (e,formRow) => {
    const { value } = e.target
    var modifiedRows = [...row]
    modifiedRows = modifiedRows.map(x => {
      if (x["id"] === formRow.id) {
        x.answer=value
      }
      return x
    })
    setRow(modifiedRows)
    onChange(modifiedRows)
  }

  const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
   });
  
  const onChangeImage = async (e,formRow) => {
    const { files } = e.target
    const base64Image=await toBase64(files[0])
    var modifiedRows = [...row]
    
    modifiedRows = modifiedRows.map(x => {
      if (x["id"] === formRow.id) {
        x.answer=base64Image
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
        x.isCorrect=value
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
                        onChange={(e)=>onChangeType(e,formRow)}
                        value={formRow.type}
                      >
                        <option value="string">Text</option>
                        <option value="image">Image</option>
                        {formRow.type == "url" && (
                          <option value="url">URL</option>
                        )}
                      </Input>
                    </Col>
                    <Col md="7">
                      {formRow.type == "string" && (
                        <Input
                          type="text"
                          className="inner form-control"
                          placeholder="Enter your answer"
                          value={formRow.answer}
                          onChange={(e)=>onChangeText(e,formRow)}
                        />
                      )}
                      {formRow.type == "image" && (
                        <Input
                          type="file"
                          className="inner form-control"
                          onChange={(e)=>onChangeImage(e,formRow)}
                        />
                      )}
                      {formRow.type == "url" && (
                        <img src={formRow.answer} height="50"/>
                      )}
                    </Col>
                    <Col md="1">
                      <Switch
                        uncheckedIcon={<Offsymbol />}
                        checkedIcon={<OnSymbol />}
                        className="ms-3"
                        onColor="#626ed4"
                        onChange={(e)=>onChangeCorrectAnswer(e,formRow)}
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
                          }}
                        >
                          {" "}
                          Delete{" "}
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
          className="mt-1"
        >
          Add Answer
        </Button>
      </div>
  )
}

const CreateSelfTestQuestion = ({ visible, isEdit, editData = {}, onClose,selfTestId }) => {
  const dispatch = useDispatch()

  const {
    questions,
    error,
    success,
    loading,
    error_message,
    form_errors,
    update_loading,
    update_error,
    update_success,
  } = useSelector(state => ({
    questions: state.selfTestQuestions.questions,
    error_message: state.selfTestQuestions.error,
    form_errors: state.selfTestQuestions.form_errors,
    loading: pending(state, "ADD_SELFTEST_QUESTIONS"),
    error: rejected(state, "ADD_SELFTEST_QUESTIONS"),
    success: fulfilled(state, "ADD_SELFTEST_QUESTIONS"),
    done: done(state, "ADD_SELFTEST_QUESTIONS"),
    update_loading: pending(state, "UPDATE_SELFTEST_QUESTIONS"),
    update_error: rejected(state, "UPDATE_SELFTEST_QUESTIONS"),
    update_success: fulfilled(state, "UPDATE_SELFTEST_QUESTIONS"),
    update_done: done(state, "UPDATE_SELFTEST_QUESTIONS"),
  }))

  const [selftest, setSelftest] = useState({})
  const [answers, setAnswers] = useState({})
  const [correctAnswers, setCorrectAnswers] = useState({})
  // const [timeRequired, setTimeRequired] = useState(false)

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
    let correct=false
    editData?.correct_answers?.forEach(ans => {
      if (ans.id == answerId) {
        correct= true
      }
    })
    return correct;
  }

  useEffect(() => {
    let answers = editData?.answers?.map((item,index) => ({
      id: item.id,
      type: item.type,
      answer: item.answer,
      isCorrect:isCorrectAnswer(item.id)
    }))
    
    setAnswers(answers)
    setCorrectAnswers(editData.correct_answers)

    setSelftest({...editData,answers})
  }, [editData])


  useEffect(() => {
    if (visible) {
      dispatch(clean("ADD_SELFTEST_QUESTIONS"))
      dispatch(clean("UPDATE_SELFTEST_QUESTIONS"))
      if (!isEdit) {
        setSelftest({})
      }
    }
  }, [visible])

  useEffect(() => {
    if (success) {
      onClose()
      showToastMessage("success", "Question successfully created")
      dispatch(clean("ADD_SELFTEST_QUESTIONS"))
      setSelftest({})
    }
    if (update_success) {
      onClose()
      showToastMessage("success", "Question successfully updated")
      dispatch(clean("UPDATE_SELFTEST_QUESTIONS"))
    }
  }, [success, update_success])

  const handleSubmit = (e, values) => {
    const common = {
      test_type:"self_test",
      test_referrer_id:"",
      question_type:"mcq",
      question:"",
      answers:"",
      correct_answers:"",
      solution:"",
      status:""
    }
    if (isEdit) {
      const updatedSelfTest = {
        ...common,
        id: values.id,
        test_referrer_id: selfTestId,
        question: values.question,
        mark: values.mark,
        answers:answers,
        correct_answers:correctAnswers,
        solution:values.solution,
        status:values.question_status,
      }
      dispatch(onUpdateQuestion(updatedSelfTest))
    } else {
      const newSelfTest = {
        ...common,
        test_referrer_id: selfTestId,
        question: values["question"],
        mark: values['mark'],
        answers:answers,
        correct_answers:correctAnswers,
        solution:values["solution"],
        status:values["question_status"],
      }
      dispatch(onAddQuestion(newSelfTest))
    }
  }

  const handleInvalidSubmit = (e, errors, values) => {
    if (error || update_error) {
      handleSubmit(e, values)
    }
  }

  const onSetAnswers=(answers)=>{
    setAnswers(answers.map(item => ({
      id:item.id,
      type:item.type,
      answer:item.answer,
    })))
    let correct_answers=answers.filter(item=>item.isCorrect)
    setCorrectAnswers(correct_answers)
  }

  return (
    <Modal isOpen={visible} toggle={onClose} size="xl">
      <ModalHeader toggle={onClose} tag="h4">
        {!!isEdit ? "Edit Self Test" : "Add Self Test Question"}
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
                  name="id"
                  type="hidden"
                  value={selftest.id || ""}
                />
              </div>
            </Col>
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
                  value={selftest.question || ""}
                />
              </div>
            </Col>
            <Col>
              <label>Answers</label>
              <AnswerManage answers={selftest.answers} onChange={(answers)=>{onSetAnswers(answers) }}/>
            </Col>
             <Col>
              <div className="mb-3">
                <AvField
                  name="mark"
                  label="Marks"
                  type="number"
                  errorMessage="The Marks is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate,
                  }}
                  value={selftest.mark || ""}
                />
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <AvField
                  name="solution"
                  label="Solution"
                  type="text"
                  errorMessage="The Solution field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate,
                  }}
                  value={selftest.solution || ""}
                />
              </div>
            </Col>
            <Col>
              <div className="mb-3">
                <AvField
                  name="question_status"
                  label="Status"
                  type="select"
                  errorMessage="The Status field is invalid"
                  validate={{
                    required: { value: true },
                    server: serverValidate,
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
                  ? "Self Test Successfully updated"
                  : "Self Test Successfully created"}
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

export default withRouter(CreateSelfTestQuestion)
