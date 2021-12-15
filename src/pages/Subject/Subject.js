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

import { deleteItem as onDeleteSubject, getList as onGetSubjects } from "store/subject-management/subjects/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreateSubject from "./CreateSubject"

import { showToastMessage } from "helpers/toaster"


const Subject = props => {
  const dispatch = useDispatch()

  const { subjects, get_loading, get_error, get_success, del_error, del_success } = useSelector(state => ({
    subjects: state.subjects.subjects,
    get_loading: pending(state, "GET_SUBJECTS"),
    get_error: rejected(state, "GET_SUBJECTS"),
    get_success: fulfilled(state, "GET_SUBJECTS"),
    // done: done(state, 'GET_SUBJECTS'),
    // del_loading: pending(state, 'DELETE_SUBJECT'),
    del_error: rejected(state, "DELETE_SUBJECT"),
    del_success: fulfilled(state, "DELETE_SUBJECT")
    // del_done: done(state, 'DELETE_SUBJECT'),
  }))

  useEffect(() => {
    return () => {
      dispatch(clean("DELETE_SUBJECT"))
    }
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Subject successfully deleted")
    }
    if (del_error) {
      showToastMessage("error", "Subject failed to delete")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: subjects.length,
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
      dataField: "color",
      text: "Color",
      sort: true,
      formatter: (cellContent, subject) => (
        <>
          <span className="avatar-title"
                style={{ backgroundColor: subject.color, height: "15px", width: "100px", borderRadius: "10px" }}>
          </span>
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
          <Permission permission="update-subject">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(examboard)}
              />
            </Link>
          </Permission>
          <Permission permission="delete-subject">
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
    dispatch(onGetSubjects())
    setIsEdit(false)
  }, [])


  useEffect(() => {
    setUserData(subjects)
    setIsEdit(false)
  }, [subjects])

  useEffect(() => {
    if (!isEmpty(subjects) && !!isEdit) {
      setUserData(subjects)
      setIsEdit(false)
    }
  }, [subjects])


  const handleUserClick = arg => {
    const year = arg
    setEditData({
      id: year.id,
      name: year.name,
      logo: "",
      // logo:year.logo,
      color: year.color
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const handleDeleteUser = subject => {
    dispatch(onDeleteSubject(subject))
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
          <title>Subject List | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Subject" breadcrumbItem="Subject List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={tableColumnsList}
                    data={subjects}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={subjects}
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
                                <Permission permission="create-subject">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New Subject
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

                                  <CreateSubject visible={visibleCreateModal} isEdit={isEdit} subjectData={editData}
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

export default withRouter(Subject)
