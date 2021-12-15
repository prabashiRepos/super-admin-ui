import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { withRouter } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Media, Row } from "reactstrap"
import { Search } from "react-bootstrap-table2-toolkit"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

import QuestionsAccordion from "./QuestionsAccordion"

import { getSelfTest as onGetSelfTestItem } from "store/self-test/actions"

import { deleteItem as onDeleteSelfTestQuestion, getList as onGetQuestions } from "store/self-test/questions/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreateSelfTestQuestion from "./CreateSelfTestQuestion"

import { showToastMessage } from "helpers/toaster"

import images from "assets/images"

const SelfTestHead = ({ data }) => {
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardBody>
            <Media>
              <div className="me-3">
                <img src={images.avatar1} alt=""
                     className="avatar-md rounded-circle img-thumbnail" />
              </div>
              <Media body className="align-self-center">
                <div className="text-muted">
                  <h5>Self Test : {data.name || ""}</h5>
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

const SelfTestQuestions = props => {
  const dispatch = useDispatch()

  const { single_selftest, questions, get_loading, get_error, get_success, del_loading, del_error, del_success } = useSelector(
    state => ({
      questions: state.selfTestQuestions.questions,
      single_selftest: state.selfTest.single_selftest,
      get_loading: pending(state, "GET_SELFTEST_QUESTIONS"),
      get_error: rejected(state, "GET_SELFTEST_QUESTIONS"),
      get_success: fulfilled(state, "GET_SELFTEST_QUESTIONS"),
      // done: done(state, 'GET_SELFTEST_QUESTIONS'),
      del_loading: pending(state, 'DELETE_SELFTEST_QUESTIONS'),
      del_error: rejected(state, "DELETE_SELFTEST_QUESTIONS"),
      del_success: fulfilled(state, "DELETE_SELFTEST_QUESTIONS")
      // del_done: done(state, 'DELETE_SELFTEST_QUESTIONS'),
    })
  )

  const [selfTestId, setSelfTestId] = useState()
  const [activeAccordion, setActiveAccordion] = useState(-1)

  useEffect(() => {
    setSelfTestId(props.match.params.self_test_id)
    dispatch(onGetSelfTestItem({ id: props.match.params.self_test_id }))
    dispatch(onGetQuestions({ self_test_id: props.match.params.self_test_id }))
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Question successfully deleted")
      dispatch(clean("DELETE_SELFTEST_QUESTIONS"))
      dispatch(onGetQuestions({ self_test_id: selfTestId }))

    }
    if (del_error) {
      showToastMessage("error", "Question failed to delete")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: questions.length,
    custom: true
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc"
    }
  ]

  const handleQuestionRedirect = questions => {
    props.history.push({
      pathname: `/self-test/${questions.id}`,
      search: "",
      state: {
        questions
      }
    })
  }


  /*  useEffect(() => {
      dispatch(onGetSelfTests())
      setIsEdit(false)
    }, [])*/

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
    // let answers = questions.answers.map(item => ({
    //   type: item.type,
    //   answer:item.answer,
    // }))
    setEditData({
      id: questions.id,
      test_referrer_id: selfTestId,
      mark: questions.mark,
      question: questions["question"],
      answers: questions.answers,
      correct_answers: questions.correct_answers,
      solution: questions["solution"],
      status: questions["status"]
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const onDeleteQuestion = question => {
    dispatch(onDeleteSelfTestQuestion({ id: question.id }))
  }

  const handleUserClicks = () => {
    setUserData("")
    setIsEdit(false)
    setVisibleCreateModal(true)
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
          <title>Self Test List | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Self Test" breadcrumbItem="Questions" />
          <SelfTestHead data={single_selftest} />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <div className="text-sm-end mb-2">
                    <Button
                      color="primary"
                      className="font-16 btn-block btn btn-primary"
                      onClick={handleUserClicks}>
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      Create New Questions
                    </Button>
                  </div>
                  <CreateSelfTestQuestion selfTestId={selfTestId}
                                          isEdit={isEdit}
                                          visible={visibleCreateModal}
                                          editData={editData}
                                          onClose={() => {
                                            setVisibleCreateModal(!visibleCreateModal)
                                          }} />
                  {questions.length === 0 && !get_loading && (
                    <div className="text-center">No Questions</div>
                  )}
                  {questions.map((item, index) => (
                    <div key={item.id}>
                      <QuestionsAccordion
                        index={index + 1}
                        data={item}
                        collapsed={activeAccordion == index}
                        onClick={() => onSetAccordion(index)}
                        onEdit={() => onEditQuestion(item)}
                        onDelete={() => onDeleteQuestion(item)}
                      />
                    </div>
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

export default withRouter(SelfTestQuestions)
