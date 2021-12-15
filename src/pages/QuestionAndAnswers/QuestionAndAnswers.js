import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import { Badge, Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"

import { useDispatch, useSelector } from "react-redux"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"
import {
  addNewItem as onCreateQA,
  deleteItem as onDeleteQA,
  getList as onGetQuestions,
  updateItem as onUpdateQA
} from "store/question-and-answer/actions"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import Permission from "components/Common/Permission"

import { showToastMessage } from "helpers/toaster"

// import images

const ChatBox = ({ className, addReply, defaultMessage = "" }) => {
  const [message, setMessage] = useState(defaultMessage)
  return (
    <Row className={className}>
      <Col>
        <div className="position-relative">
          <input
            value={message}
            type="text"
            onKeyPress={() => {
            }}
            onChange={e => setMessage(e.target.value)}
            className="form-control chat-input"
            placeholder="Enter Message..."
          />
          {/* <div className="chat-input-links">
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <Link to="#">
                <i
                  className="mdi mdi-emoticon-happy-outline"
                  id="Emojitooltip"
                />
                <UncontrolledTooltip
                  placement="top"
                  target="Emojitooltip"
                >
                  Emojis
                </UncontrolledTooltip>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="#">
                <i
                  className="mdi mdi-file-image-outline"
                  id="Imagetooltip"
                />
                <UncontrolledTooltip
                  placement="top"
                  target="Imagetooltip"
                >
                  Images
                </UncontrolledTooltip>
              </Link>
            </li>
            <li className="list-inline-item">
              <Link to="#">
                <i
                  className="mdi mdi-file-document-outline"
                  id="Filetooltip"
                />
                <UncontrolledTooltip
                  placement="top"
                  target="Filetooltip"
                >
                  Add Files
                </UncontrolledTooltip>
              </Link>
            </li>
          </ul>
        </div> */}
        </div>
      </Col>
      <Col className="col-auto">
        <Button
          type="button"
          color="primary"
          onClick={() =>
            addReply(message)
          }
          className="btn btn-primary btn-rounded chat-send w-md "
        >
          <span className="d-none d-sm-inline-block me-2">Send</span>{" "}
          <i className="mdi mdi-send" />
        </Button>
      </Col>
    </Row>
  )
}

const MessageBox = ({
                      key,
                      chapter,
                      lesson,
                      username,
                      date,
                      message,
                      children,
                      onRemove,
                      onEdit,
                      isEdit,
                      onUpdateReply
                    }) => (
  <>
    <div className="media ms-3" key={key}>
      <div className="avatar-xs me-3">
        <div className="avatar-title rounded-circle bg-light text-primary">
          <i className="bx bxs-user"/>
        </div>
      </div>
      <div className="media-body">
        <h6 className="mb-1 font-size-15">

          <Badge className="mx-1 bg-warning">{username}</Badge>
          <small className="text-muted font-size-15 float-end">{date}</small>
        </h6>
        <p className="text-muted ">
          {!isEdit && message}

          {isEdit && (
            <ChatBox addReply={(message) => onUpdateReply(message)} defaultMessage={message} />
          )}
          {!isEdit && (
            <>
              <Permission permission="update-qa">
                <div
                  onClick={() => onEdit()}
                  className="btn btn-sm btn-light ms-3">
                  <i className="bx bx-x text-warning" />
                  Edit
                </div>
              </Permission>
              <Permission permission="delete-qa">
                <div
                  onClick={() => onRemove()}
                  className="btn btn-sm btn-light">
                  <i className="bx bx-x text-danger" />
                  Remove
                </div>
              </Permission>
            </>
          )}
        </p>
      </div>
    </div>
  </>
)

const QuestionAndAnswers = () => {
  const dispatch = useDispatch()
  const [activeTab, setactiveTab] = useState("1")
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [replyIndex, setReplyIndex] = useState(-1)

  const [edit, setEdit] = useState()
  const [indexofEdit, setIndexofEdit] = useState()
  const [childIndexofEdit, setChildIndexofEdit] = useState()

  const {
    questions,
    loading,
    failed,
    success,
    del_loading,
    del_success,
    del_failed,
    add_failed,
    add_success,
    update_loading,
    update_failed,
    update_success
  } = useSelector(state => ({

    questions: state.questionAndAnswer.questions,
    loading: pending(state, "GET_QA"),
    failed: rejected(state, "GET_QA"),
    success: fulfilled(state, "GET_QA"),
    // done: done(state, 'GET_QA'),
    add_loading: pending(state, "CREATE_QA"),
    add_failed: rejected(state, "CREATE_QA"),
    add_success: fulfilled(state, "CREATE_QA"),
    update_loading: pending(state, "UPDATE_QA"),
    update_failed: rejected(state, "UPDATE_QA"),
    update_success: fulfilled(state, "UPDATE_QA"),
    del_success: fulfilled(state, "DELETE_QA"),
    del_failed: rejected(state, "DELETE_QA")
  }))

  const createQuestionHandler = () => {
    setVisibleCreateModal(!visibleCreateModal)
  }

  useEffect(() => {
    dispatch(onGetQuestions())
  }, [])

  useEffect(() => {
    if (add_success || update_success) {
      dispatch(onGetQuestions())
      setReplyIndex(-1)
      setEdit({})
      setIndexofEdit(-1)
      setChildIndexofEdit(-1)
    }
  }, [add_success, update_success])

  useEffect(() => {
    if (del_success) {
      dispatch(onGetQuestions())
      showToastMessage("success", "Message successfully deleted")
      dispatch(clean("DELETE_QA"))
    }
    if (del_failed) {
      showToastMessage("error", "Message failed to delete")
      dispatch(clean("DELETE_QA"))
    }
  }, [del_success, del_failed])

  const addReply = (item, message) => {
    const data = {
      user_id: item.user_id,
      lesson_id: item.lesson_id,
      parent_q_a_id: item.id,
      contant: message
    }
    dispatch(onCreateQA(data))
  }

  const onUpdateReply = (message, item) => {
    const data = {
      id: item.id,
      user_id: item.user_id,
      lesson_id: item.lesson_id,
      // parent_q_a_id:item.id,
      contant: message
    }
    dispatch(onUpdateQA(data))
  }

  const onSetReplyIndex = (index) => {
    setReplyIndex(index)
    setEdit({})
    setIndexofEdit({})
    setChildIndexofEdit({})
  }

  const onRemoveMessage = (item) => {
    dispatch(onDeleteQA({ id: item.id }))
  }


  const onEditMessage = (item, index, child_index) => {
    setReplyIndex(-1)
    setEdit(item)
    setIndexofEdit(index)
    setChildIndexofEdit(child_index)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Q&A | SqillUp</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Q&A" breadcrumbItem="Questions and Answers" />

          <div>
            <div>
              {questions.map((item, index) => (
                <Card>
                  <CardHeader className="bg-transparent border-bottom text-uppercase">
                    <div className="media">
                      <div className="avatar-xs me-3">
                        <div className="avatar-title rounded-circle bg-light text-primary">
                          <i className="bx bxs-user"/>
                        </div>
                      </div>
                      <div className="media-body mt-1">
                        <h4 className="font-size-15">
                          <Badge className="mx-1 bg-info">
                            {`${item.user.first_name} ${item.user.last_name}`}{" "}
                          </Badge>
                          <Badge className="bg-light">
                            <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"/>{" "}
                            {item.chapter.name} - {item.lesson.name}
                          </Badge>
                          <small className="text-muted float-end">
                            {dayjs(item.created_at).format(
                              "DD MMMM YYYY hh:mm A"
                            )}
                          </small>
                        </h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div className="media">
                      {/* <div className="avatar-xs me-3">
                        <div className="avatar-title rounded-circle bg-light text-primary">
                          <i className="bx bxs-user"></i>
                        </div>
                      </div> */}
                      <div className="media-body">
                        {/* <h4 className="font-size-16 mb-1  font-size-12">
                          <Badge className="bg-light">
                            <i className="bx bx-purchase-tag-alt align-middle text-muted me-1"></i>{" "}
                            {item.chapter.name} - {item.lesson.name}
                          </Badge>
                          <Badge className="mx-1 bg-info">
                            {`${item.user.first_name} ${item.user.last_name}`}{" "}
                          </Badge>
                          <small className="text-muted float-end">
                            {dayjs(item.created_at).format(
                              "DD MMMM YYYY hh:mm A"
                            )}
                          </small>
                        </h4> */}
                        <p className="text-muted">{item.contant}</p>
                        {(item.children.length != 0) &&
                        item.children.map((reply, children_index) => (
                          <MessageBox
                            key={`messagebox_${children_index}`}
                            // chapter={reply.chapter.name}
                            // lesson={reply.lesson.name}
                            username={`${reply.user?.first_name} ${reply.user?.last_name}`}
                            date={dayjs(reply.created_at).format(
                              "DD MMMM YYYY hh:mm A"
                            )}
                            message={reply.contant}
                            children={reply.children}
                            onRemove={() => onRemoveMessage(reply)}
                            onEdit={() => onEditMessage(reply, index, children_index)}
                            isEdit={indexofEdit == index && childIndexofEdit == children_index}
                            onUpdateReply={(message) => onUpdateReply(message, reply)}
                          />
                        ))}
                        <div>
                          <Permission permission="create-qa">
                            {replyIndex != index && (
                              <Link
                                onClick={() => onSetReplyIndex(index)}
                                to="#"
                                className="text-success"
                              >
                                <i className="mdi mdi-reply"></i> Reply
                              </Link>
                            )}
                            {replyIndex != -1 && replyIndex == index && (
                              <ChatBox addReply={(message) => addReply(item, message)} className="mt-2" />
                            )}
                          </Permission>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default QuestionAndAnswers
