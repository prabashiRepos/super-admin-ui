import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { withRouter } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Media, Row } from "reactstrap"
import { Search } from "react-bootstrap-table2-toolkit"
import Breadcrumbs from "components/Common/Breadcrumb"
import QuestionsAccordion from "./QuestionsAccordion"
import { getItem as onPastPaperItem, getList as onGetPastPapers } from "store/pastpaper/actions"
import { deleteItem as onPastPaperQuestion, getList as onGetQuestions } from "store/pastpaper/questions/actions"
import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"
import { useDispatch, useSelector } from "react-redux"
import CreatePastPaperQuestion from "./CreatePastPaperQuestion"
import { showToastMessage } from "helpers/toaster"
import images from "assets/images"

const PastPaperQuestionHead = ({ data }) => {
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
                  <h5>Past Paper : {data.name || ""}</h5>
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

const PastPaperQuestions = props => {
  const dispatch = useDispatch()

  const {
    single_pastpaper,
    questions,
    get_loading,
    get_success,
    get_error,
    del_error,
    del_success,
    add_success,
    update_success
  } = useSelector(
    state => ({
      questions: state.pastPaperQuestions.questions,
      single_pastpaper: state.pastpaper.single_pastpaper,
      get_loading: pending(state, "GET_PASTPAPER_QUESTIONS"),
      get_error: rejected(state, "GET_PASTPAPER_QUESTIONS"),
      get_success: fulfilled(state, "GET_PASTPAPER_QUESTIONS"),
      // done: done(state, 'GET_YEARS'),
      // del_loading: pending(state, 'DELETE_EXAM_BOARD'),
      del_error: rejected(state, "DELETE_PASTPAPER_QUESTIONS"),
      del_success: fulfilled(state, "DELETE_PASTPAPER_QUESTIONS"),
      // del_done: done(state, 'DELETE_YEAR'),
      add_success: fulfilled(state, "ADD_PASTPAPER_QUESTIONS"),
      update_success: fulfilled(state, "UPDATE_PASTPAPER_QUESTIONS")
    })
  )

  const [pastPaperId, setPastPaperId] = useState()

  useEffect(() => {
    if (add_success || update_success) {
      dispatch(onGetQuestions({ past_paper_id: pastPaperId }))
    }
  }, [add_success, update_success])

  useEffect(() => {
    setPastPaperId(props.match.params.past_paper_id)
    dispatch(onPastPaperItem({ id: props.match.params.past_paper_id }))
    dispatch(onGetQuestions({ past_paper_id: props.match.params.past_paper_id }))
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Question successfully deleted")
      dispatch(clean("DELETE_PASTPAPER_QUESTIONS"))
      dispatch(onGetQuestions({ past_paper_id: pastPaperId }))
    }
    if (del_error) {
      showToastMessage("error", "Question failed to delete")
    }
  }, [del_success, del_error])

  const [questionData, setQuestionData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isSubQuestion, setIsSubQuestion] = useState(false)


  useEffect(() => {
    setQuestionData(questions)
    setIsEdit(false)
  }, [questions])

  useEffect(() => {
    if (!isEmpty(questions) && !!isEdit) {
      setQuestionData(questions)
      setIsEdit(false)
    }
  }, [questions])

  const onEditQuestion = arg => {
    const { from, data } = arg
    const questions = data
    // let answers = questions.answers.map(item => ({
    //   type: item.type,
    //   answer:item.answer,
    // }))
    setIsSubQuestion(from == "children" ? true : false)
    setEditData({
      id: questions.id,
      question_type: questions.question_type,
      test_referrer_id: pastPaperId,
      mark: questions.mark,
      question: questions["question"],
      answers: questions.answers,
      correct_answers: questions.correct_answers,
      solution: questions["solution"],
      status: questions["status"],
      video_explanation: questions["video_explanation"],
      lesson_id: questions["lesson_id"],
      question_content_type: questions["question_content_type"] == "image" ? "url" : questions["question_content_type"],
      question_number: questions["question_number"]
    })
    setIsEdit(true)
    setVisibleCreateModal(true)
  }

  const onDeleteQuestion = question => {
    dispatch(onPastPaperQuestion({ id: question.id }))
  }
  const onAddQuestion = question => {

    setEditData({
      id: question.id,
      question_type: question.question_type,
      test_referrer_id: pastPaperId,
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
      // parent_question_id:question.id
    })
    setIsSubQuestion(true)
    setVisibleCreateModal(true)
  }


  const handleCreateQuestionClick = () => {
    setQuestionData("")
    setIsEdit(false)
    setVisibleCreateModal(true)
    setIsSubQuestion(false)
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Past Paper Questions | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Past Paper" breadcrumbItem="Questions" />
          <PastPaperQuestionHead data={single_pastpaper} />
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
                  <CreatePastPaperQuestion selfTestId={pastPaperId} workSheetData={single_pastpaper}
                                           isSubQuestion={isSubQuestion} isEdit={isEdit} visible={visibleCreateModal}
                                           editData={editData} onClose={() => {
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
                        onEdit={(data) => onEditQuestion(data)}
                        onDelete={(data) => onDeleteQuestion(data)}
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

export default withRouter(PastPaperQuestions)
