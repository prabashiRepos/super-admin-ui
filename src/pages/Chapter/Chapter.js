import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap"
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import { AvField, AvForm } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Permission from "components/Common/Permission"

import { deleteItem as onDeleteChapter, getList as onGetChapters } from "store/subject-management/chapters/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreateChapter from "./CreateChapter"

import { showToastMessage } from "helpers/toaster"

const Chapter = props => {
  const dispatch = useDispatch()

  const {
    chapters,
    examboards,
    years,
    subjects,
    get_loading,
    get_error,
    get_success,
    del_error,
    del_success
  } = useSelector(state => ({
    chapters: state.chapters.chapters,
    subjects: state.subjects.subjects,
    examboards: state.examboard.examboards,
    years: state.years.years,
    get_loading: pending(state, "GET_CHAPTERS"),
    get_error: rejected(state, "GET_CHAPTERS"),
    get_success: fulfilled(state, "GET_CHAPTERS"),
    // done: done(state, 'GET_CHAPTERS'),
    // del_loading: pending(state, 'DELETE_CHAPTER'),
    del_error: rejected(state, "DELETE_CHAPTER"),
    del_success: fulfilled(state, "DELETE_CHAPTER")
    // del_done: done(state, 'DELETE_CHAPTER'),
  }))

  useEffect(() => {
    return () => {
      dispatch(clean("DELETE_CHAPTER"))
    }
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Chapter successfully deleted")
    }
    if (del_error) {
      showToastMessage("error", "Chapter failed to delete")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: chapters.length,
    custom: true
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc"
    }
  ]

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
      dataField: "subject_id",
      text: "Subject",
      sort: true,
      formatter: (cellContent, chapter) => (
        <>
          <span className="avatar-title" style={{
            backgroundColor: chapter.subject.color,
            height: "15px",
            width: "100px",
            borderRadius: "10px",
            padding: "5px"
          }}>
            {chapter?.subject?.name}
          </span>
        </>
      )
    },
    {
      dataField: "year_id",
      text: "Year",
      sort: true,
      formatter: (cellContent, chapter) => (
        <>
          {chapter?.year?.name}
        </>
      )
    },
    {
      dataField: "exam_board_id",
      text: "Exam Board",
      sort: true,
      formatter: (cellContent, chapter) => (
        <>
          {chapter?.exam_board?.name}
        </>
      )
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, examboard) => (
        <div className="d-flex gap-3">
          <Permission permission="update-chapter">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(examboard)}
              />
            </Link>
          </Permission>
          <Permission permission="delete-chapter">
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => handleDeleteUser(examboard)}
              />
            </Link>
          </Permission>

        </div>
      )
    }
  ]

  useEffect(() => {
    dispatch(onGetChapters())
    setIsEdit(false)
  }, [])


  useEffect(() => {
    setUserData(chapters)
    setIsEdit(false)
  }, [chapters])

  useEffect(() => {
    if (!isEmpty(chapters) && !!isEdit) {
      setUserData(chapters)
      setIsEdit(false)
    }
  }, [chapters])


  const handleUserClick = arg => {
    const year = arg
    setEditData({
      id: year.id,
      name: year.name,
      number: year.number,
      subject_id: year.subject_id,
      year_id: year.year_id,
      exam_board_id: year.exam_board_id
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const handleDeleteUser = examboard => {
    dispatch(onDeleteChapter(examboard))
  }

  const handleUserClicks = () => {
    setUserData("")
    setIsEdit(false)
    setVisibleCreateModal(true)
  }

  const [filter, setFilter] = useState({ exam_board_id: "", subject_id: "", year_id: "" })

  const onChangeFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value })
    dispatch(onGetChapters({ ...filter, [e.target.name]: e.target.value }))
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Chapter List | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Chapter" breadcrumbItem="Chapter List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={tableColumnsList}
                    data={chapters}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={chapters}
                        columns={tableColumnsList}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <AvForm>

                              <Row className="mb-2">
                                <Col sm="2">
                                  <div className="search-box ms-2 mb-2 d-inline-block">
                                    <div className="position-relative">
                                      <SearchBar {...toolkitProps.searchProps} />
                                      <i className="bx bx-search-alt search-icon" />
                                    </div>
                                  </div>
                                </Col>
                                <Col sm="2">
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
                                <Col sm="2">
                                  <AvField
                                    name="year_id"
                                    type="select"
                                    value={filter.year_id || ""}
                                    onChange={onChangeFilter}
                                  >
                                    <option value="">Select Year</option>
                                    {years.map(item => (
                                      <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                  </AvField>
                                </Col>
                                <Col sm="3">
                                  <AvField
                                    name="exam_board_id"
                                    type="select"
                                    value={filter.exam_board_id || ""}
                                    onChange={onChangeFilter}
                                  >
                                    <option value="">Select Exam-Board</option>
                                    {examboards.map(item => (
                                      <option key={item.id} value={item.id}>{item.name}</option>
                                    ))}
                                  </AvField>
                                </Col>
                                <Col sm="3">
                                  <Permission permission="create-chapter">
                                    <div className="text-sm-end">
                                      <Button
                                        color="primary"
                                        className="font-16 btn-block btn btn-primary"
                                        onClick={handleUserClicks}
                                      >
                                        <i className="mdi mdi-plus-circle-outline me-1" />
                                        Create New Chapter
                                      </Button>
                                    </div>
                                  </Permission>
                                </Col>
                              </Row>
                            </AvForm>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    {...toolkitProps.baseProps}
                                    {...paginationTableProps}
                                    defaultSorted={defaultSorted}
                                    classes={
                                      "table align-middle table-nowrap table-hover"
                                    }
                                    bordered={false}
                                    striped={false}
                                    responsive
                                  />

                                  <CreateChapter visible={visibleCreateModal} isEdit={isEdit} chapterData={editData}
                                                 onClose={() => {
                                                   setVisibleCreateModal(!visibleCreateModal)
                                                 }} />

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

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(Chapter)
