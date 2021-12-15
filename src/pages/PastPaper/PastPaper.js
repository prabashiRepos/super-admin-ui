import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Link, useHistory, withRouter } from "react-router-dom"
import { Badge, Button, Card, CardBody, Col, Container, Row } from "reactstrap"
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Permission from "components/Common/Permission"

import { deleteItem as onDeleteWorksheet, getList as onGetWorksheet } from "store/pastpaper/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreatePastPaper from "./CreatePastPaper"

import { showToastMessage } from "helpers/toaster"

import images from "assets/images"

const PastPaper = props => {
  const dispatch = useDispatch()

  const { worksheet, get_loading, get_error, get_success, del_error, del_success } = useSelector(state => ({
    worksheet: state.pastpaper.pastpaper,
    get_loading: pending(state, "GET_PASTPAPER"),
    get_error: rejected(state, "GET_PASTPAPER"),
    get_success: fulfilled(state, "GET_PASTPAPER"),
    // done: done(state, 'GET_YEARS'),
    // del_loading: pending(state, 'DELETE_PASTPAPER'),
    del_error: rejected(state, "DELETE_PASTPAPER"),
    del_success: fulfilled(state, "DELETE_PASTPAPER")
    // del_done: done(state, 'DELETE_YEAR'),
  }))

  useEffect(() => {
    return () => {
      dispatch(clean("DELETE_PASTPAPER"))
    }
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Past Paper successfully deleted")
      dispatch(clean("DELETE_PASTPAPER"))
    }
    if (del_error) {
      showToastMessage("error", "Past Paper failed to delete")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: worksheet.length,
    custom: true
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc"
    }
  ]
  const history = useHistory()

  const handleQuestionRedirect = worksheet => {
    history.push({
      pathname: `/pastpaper/${worksheet.id}`,
      search: "",
      state: {
        worksheet: worksheet
      }
    })
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
      formatter: (cellContent, year) => (
        <>
          {!year.img ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {year.name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={images[year.logo]}
                alt=""
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
      dataField: "lesson_id",
      text: "Lesson",
      sort: true,
      formatter: (cellContent, worksheet) => (
        <div>
          {worksheet.lesson?.name || ""}
        </div>
      )
    },
    {
      dataField: "chapter_id",
      text: "Chapter",
      sort: true,
      formatter: (cellContent, worksheet) => (
        <div>
          {worksheet.chapter?.name || ""}
        </div>
      )
    },
    {
      dataField: "year",
      text: "Year",
      sort: true,
      formatter: (cellContent, worksheet) => (
        <div>
          {worksheet.year || ""}
        </div>
      )
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cellContent, worksheet) => (
        <h5>
          <Badge className={`${worksheet.status == "publish" ? "bg-success" : "badge-soft-secondary"}`}>
            {worksheet.status}
          </Badge>
        </h5>
      )
    },
    {
      dataField: "questions_count",
      text: "Questions",
      sort: true
    },
    {
      dataField: "user_id",
      text: "User",
      sort: true,
      formatter: (cellContent, worksheet) => (
        <div>
          {`${worksheet.user.first_name} ${worksheet.user.last_name}`}
        </div>
      )
    },
    {
      dataField: "duration",
      text: "Duration",
      sort: true,
      formatter: (cellContent, worksheet) => (
        <div>
          {`${worksheet.duration ? worksheet.duration : "0"} ${worksheet.duration_type}`}
        </div>
      )
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, data) => (
        <div className="d-flex gap-3">
          <Permission permission="update-pastpaper">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(data)}
              />
            </Link>
          </Permission>
          <Permission permission="delete-pastpaper">
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => handleDeleteUser(data)}
              />
            </Link>
          </Permission>
          <Permission permission="view-question">
            <Link className="text-danger align-items-center" to="#">
              <i
                className="mdi mdi-eye font-size-18"
                id="viewtooltip"
                onClick={() => handleQuestionRedirect(data)}
              />
            </Link>
          </Permission>
        </div>
      )
    }
  ]

  useEffect(() => {
    dispatch(onGetWorksheet())
    setIsEdit(false)
  }, [])


  useEffect(() => {
    setUserData(worksheet)
    setIsEdit(false)
  }, [worksheet])

  useEffect(() => {
    if (!isEmpty(worksheet) && !!isEdit) {
      setUserData(worksheet)
      setIsEdit(false)
    }
  }, [worksheet])


  const handleUserClick = arg => {
    const worksheet = arg
    setEditData({
      id: worksheet.id,
      name: worksheet.name,
      lesson_id: worksheet.lesson_id,
      // time_required: worksheet.time_required=="true"?true:false,
      duration: worksheet.duration,
      duration_type: worksheet.duration_type,
      status: worksheet.status,
      paper_type: worksheet.paper_type,
      chapter_id: worksheet.chapter_id,
      year: worksheet.year
    })
    setIsEdit(true)
    setVisibleCreateModal(true)
  }

  const handleDeleteUser = worksheet => {
    dispatch(onDeleteWorksheet(worksheet))
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
          <title>Worksheet | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Past Paper" breadcrumbItem="Past Paper List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={tableColumnsList}
                    data={worksheet}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={worksheet}
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
                                <Permission permission="create-pastpaper">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New Past Paper
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

                                  <CreatePastPaper visible={visibleCreateModal} isEdit={isEdit} examBoardData={editData}
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

export default withRouter(PastPaper)
