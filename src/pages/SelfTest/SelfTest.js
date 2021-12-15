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

import { deleteSelfTest as onDeleteSelfTest, getSelfTests as onGetSelfTests } from "store/self-test/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, rejected, pending } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreateSelfTest from "./CreateSelfTest"

import { showToastMessage } from "helpers/toaster"

import images from "assets/images"


const SelfTest = props => {
  const dispatch = useDispatch()

  const { selftest, get_loading, get_error, get_success, del_error, del_success } = useSelector(state => ({
    selftest: state.selfTest.selftest,
    get_loading: pending(state, "GET_SELFTEST"),
    get_error: rejected(state, "GET_SELFTEST"),
    get_success: fulfilled(state, "GET_SELFTEST"),
    // done: done(state, 'GET_YEARS'),
    // del_loading: pending(state, 'DELETE_EXAM_BOARD'),
    del_error: rejected(state, "DELETE_SELFTEST"),
    del_success: fulfilled(state, "DELETE_SELFTEST")
    // del_done: done(state, 'DELETE_YEAR'),
  }))

  useEffect(() => {
    return () => {
      dispatch(clean("DELETE_SELFTEST"))
    }
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Self test successfully deleted")
      dispatch(clean("DELETE_SELFTEST"))
    }
    if (del_error) {
      showToastMessage("error", "Self test failed to delete")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: selftest.length,
    custom: true
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc"
    }
  ]
  const history = useHistory()

  const handleQuestionRedirect = selftest => {
    history.push({
      pathname: `/self-test/${selftest.id}`,
      search: "",
      state: {
        selftest: selftest
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
      formatter: (cellContent, selftest) => (
        <div>
          {selftest.lesson.name}
        </div>
      )
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: (cellContent, selftest) => (
        <h5>
          <Badge className={`${selftest.status == "publish" ? "bg-success" : "badge-soft-secondary"}`}>
            {selftest.status}
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
      formatter: (cellContent, selftest) => (
        <div>
          {`${selftest.user.first_name} ${selftest.user.last_name}`}
        </div>
      )
    },
    {
      dataField: "duration",
      text: "Duration",
      sort: true,
      formatter: (cellContent, selftest) => (
        <div>
          {`${selftest.duration} ${selftest.duration_type}`}
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
          <Permission permission="create-selftest">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(data)}
              />
            </Link>
          </Permission>
          <Permission permission="update-selftest">
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
    dispatch(onGetSelfTests())
    setIsEdit(false)
  }, [])


  useEffect(() => {
    setUserData(selftest)
    setIsEdit(false)
  }, [selftest])

  useEffect(() => {
    if (!isEmpty(selftest) && !!isEdit) {
      setUserData(selftest)
      setIsEdit(false)
    }
  }, [selftest])


  const handleUserClick = arg => {
    const selftest = arg
    setEditData({
      id: selftest.id,
      name: selftest.name,
      lesson_id: selftest.lesson_id,
      // time_required: selftest.time_required=="true"?true:false,
      duration: selftest.duration,
      duration_type: selftest.duration_type,
      status: selftest.status
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const handleDeleteUser = selftest => {
    dispatch(onDeleteSelfTest(selftest))
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
          <title>Self Test List | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Self Test" breadcrumbItem="Self Test List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={tableColumnsList}
                    data={selftest}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={selftest}
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
                                <Permission permission="create-selftest">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New Self Test
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

                                  <CreateSelfTest visible={visibleCreateModal}
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

export default withRouter(SelfTest)
