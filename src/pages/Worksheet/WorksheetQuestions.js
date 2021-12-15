import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { withRouter } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Media, Row } from "reactstrap"
import Breadcrumbs from "components/Common/Breadcrumb"
import QuestionsAccordion from "./QuestionsAccordion"
import { getItem as onGetWorkSheetItem, getList as onGetSelfTest } from "store/worksheet/actions"
import { deleteItem as onDeleteSelfTestQuestion, getList as onGetQuestions } from "store/worksheet/questions/actions"
import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"
import { useDispatch, useSelector } from "react-redux"
import CreateWorksheetQuestion from "./CreateWorksheetQuestion"
import { showToastMessage } from "helpers/toaster"
import images from "assets/images"

const WorkSheetQuestionHead = ({ data }) => {
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardBody>
            <Media>
              <div className="me-3">
                <img
                  src={images.avatar1}
                  alt=""
                  className="avatar-md rounded-circle img-thumbnail"
                />
              </div>
              <Media body className="align-self-center">
                <div className="text-muted">
                  <h5>Worksheet : {data.name || ""}</h5>
                  <p className="mb-0">{data.lesson?.name || ""}</p>
                  <p className="mb-0">
                    {data.duration} {data.duration_type || ""}
                  </p>
                  <p className="mb-0">{data.status || ""}</p>
                  <p className="mb-0">{data.questions_count || "0"} Questions</p>
                </div>
              </Media>
            </Media>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

const WorksheetQuestions = props => {
  const dispatch = useDispatch()

  const { single_worksheet, questions, get_loading, get_error, get_success, del_error, del_success, add_success, update_success } = useSelector(
    state => ({
      questions: state.worksheetQuestions.questions,
      single_worksheet: state.worksheet.single_worksheet,
      get_loading: pending(state, "GET_WORKSHEET_QUESTIONS"),
      get_error: rejected(state, "GET_WORKSHEET_QUESTIONS"),
      get_success: fulfilled(state, "GET_WORKSHEET_QUESTIONS"),
      // done: done(state, 'GET_YEARS'),
      // del_loading: pending(state, 'DELETE_EXAM_BOARD'),
      del_error: rejected(state, "DELETE_WORKSHEET_QUESTIONS"),
      del_success: fulfilled(state, "DELETE_WORKSHEET_QUESTIONS"),
      // del_done: done(state, 'DELETE_YEAR'),
      add_success: fulfilled(state, "ADD_WORKSHEET_QUESTIONS"),
      update_success: fulfilled(state, "UPDATE_WORKSHEET_QUESTIONS")
    })
  )

  const [workSheetId, setWorkSheetId] = useState()
  const [activeAccordion, setActiveAccordion] = useState(-1)

  useEffect(() => {
    setWorkSheetId(props.match.params.work_sheet_id)
    dispatch(onGetWorkSheetItem({ id: props.match.params.work_sheet_id }))
    dispatch(onGetQuestions({ work_sheet_id: props.match.params.work_sheet_id }))
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Question successfully deleted")
      dispatch(clean("DELETE_WORKSHEET_QUESTIONS"))
      dispatch(onGetQuestions({ work_sheet_id: workSheetId }))
    }
    if (del_error) {
      showToastMessage("error", "Question failed to delete")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isSubQuestion, setIsSubQuestion] = useState(false)

  useEffect(() => {
    if (add_success || update_success) {
      dispatch(onGetQuestions({ work_sheet_id: workSheetId }))
    }
  }, [add_success, update_success])

  useEffect(() => {
    dispatch(onGetSelfTest())
    setIsEdit(false)
  }, [])

  useEffect(() => {
    setUserData(questions)
    setIsEdit(false)
  }, [questions])

  useEffect(() => {
    if (!isEmpty(questions) && !!isEdit) {
      setUserData(questions)
      setIsEdit(false)
    }
  }, [questions])

  const onEditQuestion = arg => {
    const questions = arg
    setEditData({
      id: questions.id,
      question_type: questions.question_type,
      test_referrer_id: workSheetId,
      mark: questions.mark,
      question: questions["question"],
      answers: questions.answers,
      correct_answers: questions.correct_answers,
      solution: questions["solution"],
      status: questions["status"],
      video_explanation: questions["video_explanation"]
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const onAddQuestion = question => {
    setEditData({
      id: question.id,
      question_type: question.question_type,
      test_referrer_id: workSheetId,
      mark: question.mark,
      question: question["question"],
      answers: question.answers,
      correct_answers: question.correct_answers,
      solution: question["solution"],
      status: question["status"],
      video_explanation: question["video_explanation"],
      lesson_id: question["lesson_id"],
      question_content_type: question["question_content_type"] == "image" ? "url" : question["question_content_type"],
      question_number: question["question_number"]
    })
    setIsSubQuestion(true)
    setVisibleCreateModal(true)
  }


  const onDeleteQuestion = question => {
    dispatch(onDeleteSelfTestQuestion({ id: question.id }))
  }

  const handleCreateQuestionClick = () => {
    setUserData("")
    setIsEdit(false)
    setVisibleCreateModal(true)
    setIsSubQuestion(false);
  }

  const onSetAccordion = index => {
    setActiveAccordion(index)
    if (index == activeAccordion) {
      setActiveAccordion(-1)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Worksheet Questions | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Work Sheet" breadcrumbItem="Questions" />
          <WorkSheetQuestionHead data={single_worksheet} />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="text-sm-end mb-2">
                    <Button
                      color="primary"
                      className="font-16 btn-block btn btn-primary"
                      onClick={handleCreateQuestionClick}>
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      Create New Question
                    </Button>
                  </div>
                  <CreateWorksheetQuestion selfTestId={workSheetId} workSheetData={single_worksheet}
                                           isSubQuestion={isSubQuestion} isEdit={isEdit} visible={visibleCreateModal} editData={editData} onClose={() => {
                    setVisibleCreateModal(!visibleCreateModal)
                  }} />
                  {questions.length === 0 && !get_loading && (
                    <div className="text-center">No Questions</div>
                  )}
                  {questions.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <QuestionsAccordion
                        index={index + 1}
                        data={item}
                        onEdit={() => onEditQuestion(item)}
                        onDelete={() => onDeleteQuestion(item)}
                        onAddQuestion={() => onAddQuestion(item)}
                      />
                    </React.Fragment>
                  ))}
                  <Row>
                    <Col>
                      {get_loading && (
                        <div className="text-center text-success">
                          <i className="bx bx-loader bx-spin bx-lg font-size-25 align-middle me-2" />
                        </div>
                      )}
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(WorksheetQuestions)
