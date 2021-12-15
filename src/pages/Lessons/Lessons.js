import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Badge, Button, Card, CardBody, Col, Container, Row } from "reactstrap"
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import { AvField, AvForm } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Permission from "components/Common/Permission"

import { deleteItem as onDeleteLesson, getList as onGetLessons } from "store/subject-management/lessons/actions"

import { getList as onGetChapters } from "store/subject-management/chapters/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreateLesson from "./CreateLesson"
import UploadVideo from "./UploadVideo"
import PlayVideoModal from "./PlayVideoModal"
import { showToastMessage } from "helpers/toaster"

const Lessons = props => {
  const dispatch = useDispatch()

  const {
    lessons,
    chapters,
    subjects,
    get_loading,
    get_error,
    get_success,
    del_error,
    del_success
  } = useSelector(state => ({
    lessons: state.lessons.lessons,
    chapters: state.chapters.chapters,
    subjects: state.subjects.subjects,
    get_loading: pending(state, "GET_LESSONS"),
    get_error: rejected(state, "GET_LESSONS"),
    get_success: fulfilled(state, "GET_LESSONS"),
    // done: done(state, 'GET_LESSONS'),
    // del_loading: pending(state, 'DELETE_LESSON'),
    del_error: rejected(state, "DELETE_LESSON"),
    del_success: fulfilled(state, "DELETE_LESSON")
    // del_done: done(state, 'DELETE_LESSON'),
  }))

  useEffect(() => {
    return () => {
      dispatch(clean("DELETE_LESSON"))
    }
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Lesson successfully deleted")
    }
    if (del_error) {
      showToastMessage("error", "Lesson failed to delete")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [videoData, setVideoData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [visibleUploadModal, setVisibleUploadModal] = useState(false)
  const [visiblePlayVideoModal, setVisiblePlayVideoModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: lessons.length,
    custom: true
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc"
    }
  ]

  const playModalHandler = (video_info) => {
    setVideoData(video_info)
    setVisiblePlayVideoModal(true)
  }

  const tableColumnsList = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, year) => <>{year.id}</>
    },
    {
      dataField: "img",
      text: "#",
      formatter: (cellContent, chapter) => (
        <>
          {!chapter.logo ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {chapter.name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={chapter.logo}
                alt={chapter.name}
              />
            </div>
          )}
        </>
      )
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      formatter: (cellContent, chapter) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {chapter.name}
            </Link>
          </h5>
        </>
      )
    },
    {
      dataField: "number",
      text: "Number",
      sort: true
    },
    {
      dataField: "video_url",
      text: "Video",
      sort: true,
      formatter: (cellContent, lesson) => {
        const video_info = lesson.video_url
        return (
          <div>
            {(video_info && video_info.link) && (
              <Button className="m-1" color="danger" onClick={() => playModalHandler(video_info)}>
                <i className="bx bx-play" />
              </Button>
            )}
            {(!video_info || !video_info?.link) && (
              <Badge className="bg-warning">
                No video
              </Badge>
            )}
          </div>
        )
      }
    },
    {
      dataField: "chapter_id",
      text: "Chapter",
      sort: true,
      formatter: (cellContent, chapter) => (
        <>
          <span className="avatar-title" style={{ width: "150px" }}>
            {chapter?.chapter?.name}
          </span>
        </>
      )
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, lesson) => (
        <div className="d-flex gap-3">
          <Permission permission="update-lesson">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(lesson)}
              />
            </Link>
          </Permission>
          <Permission permission="update-lesson">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-upload font-size-18"
                id="edittooltip"
                onClick={() => handleUploadClick(lesson)}
              />
            </Link>
          </Permission>
          <Permission permission="delete-lesson">
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => handleDeleteUser(lesson)}
              />
            </Link>
          </Permission>

        </div>
      )
    }
  ]

  useEffect(() => {
    dispatch(onGetLessons())
    dispatch(onGetChapters())
    setIsEdit(false)
  }, [])


  useEffect(() => {
    setUserData(lessons)
    setIsEdit(false)
  }, [lessons])

  useEffect(() => {
    if (!isEmpty(lessons) && !!isEdit) {
      setUserData(lessons)
      setIsEdit(false)
    }
  }, [lessons])

  const handleUploadClick = (arg) => {
    const year = arg
    setVisibleUploadModal(true)
    setEditData({
      id: year.id,
      name: year.name,
      number: year.number,
      chapter_id: year.chapter_id,
      overview: year.overview
    })
  }

  const handleUserClick = arg => {
    const lesson = arg
    setEditData({
      id: lesson.id,
      name: lesson.name,
      number: lesson.number,
      chapter_id: lesson.chapter_id,
      subject_id: lesson.chapter.subject_id,
      overview: lesson.overview,
    })
    setIsEdit(true)
    setVisibleCreateModal(true)
  }

  const handleDeleteUser = lesson => {
    dispatch(onDeleteLesson(lesson))
  }

  const handleUserClicks = () => {
    setUserData("")
    setIsEdit(false)
    setVisibleCreateModal(true)
  }

  const [filter, setFilter] = useState({ chapter_id: "", subject_id: "" })

  const onChangeFilter = (e) => {
    const value = { [e.target.name]: e.target.value }

    setFilter({ ...filter, ...value })
    if (e.target.name == "subject_id") {
      setFilter({ ...filter, chapter_id: "" })
      dispatch(onGetChapters(value))
      dispatch(onGetLessons({ ...filter, ...value, chapter_id: "" }))
      return
    }
    dispatch(onGetLessons({ ...filter, ...value }))
  }


  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Lessons List | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Lessons" breadcrumbItem="Lessons List" />
          <Row>
            <Col lg="12">

              <PaginationProvider
                pagination={paginationFactory(pageOptions)}
                keyField="id"
                columns={tableColumnsList}
                data={lessons}
              >
                {({ paginationProps, paginationTableProps }) => (
                  <ToolkitProvider
                    keyField="id"
                    data={lessons}
                    columns={tableColumnsList}
                    bootstrap4
                    search
                  >
                    {toolkitProps => (
                      <React.Fragment>
                        <Card>
                          <CardBody>
                            <AvForm>
                              <Row>
                                <Col sm="2">
                                  <div className="search-box ms-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="3">
                                  <AvField
                                    name="subject_id"
                                    type="select"
                                    value={filter.subject_id || ""}
                                    onChange={onChangeFilter}
                                  >
                                    <option value="">Select Subject</option>
                                    {subjects.map(item => (
                                      <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                  </AvField>
                                </Col>
                                <Col sm="3">
                                  <AvField
                                    name="chapter_id"
                                    type="select"
                                    value={filter.chapter_id || ""}
                                    onChange={onChangeFilter}

                                  >
                                    <option value="">Select Chapter</option>
                                    {chapters.map(item => (
                                      <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                  </AvField>
                                </Col>
                                <Col sm="4">
                                  <Permission permission="create-lesson">
                                    <div className="text-sm-end">
                                      <Button
                                        color="primary"
                                        className="font-16 btn-block btn btn-primary"
                                        onClick={handleUserClicks}
                                      >
                                        <i className="mdi mdi-plus-circle-outline me-1" />
                                        Create New Lesson
                                      </Button>
                                    </div>
                                  </Permission>
                                </Col>
                              </Row>
                            </AvForm>
                          </CardBody>
                        </Card>
                        <Row>
                          <Col xl="12">
                            <div className="table-responsive">
                              <BootstrapTable
                                {...toolkitProps.baseProps}
                                {...paginationTableProps}
                                defaultSorted={defaultSorted}
                                classes={
                                  "project-list-table table-nowrap align-middle table-borderless table "
                                }
                                bordered={false}
                                striped={false}
                                responsive
                              />

                              <CreateLesson visible={visibleCreateModal}
                                            isEdit={isEdit}
                                            lessonData={editData}
                                            onClose={() => {
                                              setVisibleCreateModal(!visibleCreateModal)
                                            }} />
                              <UploadVideo editData={editData}
                                           visible={visibleUploadModal}
                                           lessonData={editData}
                                           onClose={() => {
                                             setVisibleUploadModal(!visibleUploadModal)
                                           }} />
                              {visiblePlayVideoModal && (
                                <PlayVideoModal videoData={videoData} visible={visiblePlayVideoModal} onClose={() => {
                                  setVisiblePlayVideoModal(!visiblePlayVideoModal)
                                }} />
                              )}
                            </div>
                          </Col>
                        </Row>
                        <Row className="align-items-md-center mt-30">
                          <Col className="pagination pagination-rounded justify-content-end mb-2">
                            <PaginationListStandalone
                              {...paginationProps}
                            />
                          </Col>
                        </Row>
                      </React.Fragment>
                    )}
                  </ToolkitProvider>
                )}
              </PaginationProvider>
              <Row>
                <Col>
                  {get_loading && (
                    <div className="text-center text-success">
                      <i className="bx bx-loader bx-spin bx-lg font-size-25 align-middle me-2" />
                    </div>
                  )}
                </Col>
              </Row>

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Lessons)
