import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap"
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Permission from "components/Common/Permission"

import {
  deleteExamBoard as onDeleteExamBoard,
  getExamBoards as onGetExamBoards
} from "store/settings/examboard/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreateExamBoard from "./CreateExamBoardModal"

import { showToastMessage } from "helpers/toaster"


const Examboard = props => {
  const dispatch = useDispatch()

  const { examboards, get_loading, get_error, get_success, del_error, del_success } = useSelector(state => ({
    examboards: state.examboard.examboards,
    get_loading: pending(state, "GET_EXAM_BOARDS"),
    get_error: rejected(state, "GET_EXAM_BOARDS"),
    get_success: fulfilled(state, "GET_EXAM_BOARDS"),
    // done: done(state, 'GET_EXAM_BOARDS'),
    // del_loading: pending(state, 'DELETE_EXAM_BOARD'),
    del_error: rejected(state, "DELETE_EXAM_BOARD"),
    del_success: fulfilled(state, "DELETE_EXAM_BOARD")
    // del_done: done(state, 'DELETE_EXAM_BOARD'),
  }))

  useEffect(() => {
    return () => {
      dispatch(clean("DELETE_EXAM_BOARD"))
    }
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Exam Board successfully deleted.")
    }
    if (del_error) {
      showToastMessage("error", "Exam Board failed to delete.")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: examboards.length,
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
      formatter: (cellContent, examboard) => <>{examboard.id}</>
    },
    {
      dataField: "img",
      text: "#",
      formatter: (cellContent, examboard) => (
        <>
          {!examboard.logo ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {examboard.name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={examboard.logo}
                alt={examboard.name}
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
      formatter: (cellContent, examboard) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {examboard.name}
            </Link>
          </h5>
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
          <Permission permission="update-examboard">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(examboard)}
              />
            </Link>
          </Permission>
          <Permission permission="delete-examboard">
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
    dispatch(onGetExamBoards())
    setIsEdit(false)
  }, [])


  useEffect(() => {
    setUserData(examboards)
    setIsEdit(false)
  }, [examboards])

  useEffect(() => {
    if (!isEmpty(examboards) && !!isEdit) {
      setUserData(examboards)
      setIsEdit(false)
    }
  }, [examboards])


  const handleUserClick = arg => {
    const examboard = arg

    setEditData({
      id: examboard.id,
      name: examboard.name,
      logo: examboard.logo
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const handleDeleteUser = examboard => {
    dispatch(onDeleteExamBoard(examboard))
  }

  const handleUserClicks = () => {
    setUserData("")
    setIsEdit(false)
    setVisibleCreateModal(true)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Exam Board List | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Exam Board" breadcrumbItem="Exam Board List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={tableColumnsList}
                    data={examboards}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={examboards}
                        columns={tableColumnsList}
                        bootstrap4
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col sm="4">
                                <div className="search-box ms-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                              <Col sm="8">
                                <Permission permission="create-examboard">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New Exam-Board
                                    </Button>
                                  </div>
                                </Permission>
                              </Col>
                            </Row>
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

                                  <CreateExamBoard visible={visibleCreateModal}
                                                   isEdit={isEdit}
                                                   examBoardData={editData}
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
                        <div className="text-lg-center text-success">
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

export default withRouter(Examboard)
