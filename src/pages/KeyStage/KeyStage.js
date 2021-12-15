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

import { deleteKeyStage as onDeleteKeyStage, getKeyStages as onGetKeyStages } from "store/settings/keystage/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreateKeystageModal from "./CreateKeystageModal"

import { showToastMessage } from "helpers/toaster"

import images from "assets/images"


const KeyStage = props => {
  const dispatch = useDispatch()

  const { keystages, get_loading, get_error, get_success, del_error, del_success } = useSelector(state => ({
    keystages: state.keystage.keystages,
    get_loading: pending(state, "GET_KEY_STAGES"),
    get_error: rejected(state, "GET_KEY_STAGES"),
    get_success: fulfilled(state, "GET_KEY_STAGES"),
    // done: done(state, 'GET_KEY_STAGES'),
    // del_loading: pending(state, 'DELETE_KEY_STAGE'),
    del_error: rejected(state, "DELETE_KEY_STAGE"),
    del_success: fulfilled(state, "DELETE_KEY_STAGE")
    // del_done: done(state, 'DELETE_KEY_STAGE'),
  }))

  useEffect(() => {
    return () => {
      dispatch(clean("DELETE_KEY_STAGE"))
    }
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Key Stage successfully deleted.")
    }
    if (del_error) {
      showToastMessage("error", "Key Stage failed to delete.")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: keystages.length,
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
          {!examboard.img ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {examboard.name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={images[examboard.logo]}
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
      dataField: "display_name",
      text: "Display Name",
      sort: true
    },
    {
      dataField: "description",
      text: "Description",
      sort: true
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, examboard) => (
        <div className="d-flex gap-3">
          <Permission permission="update-keystage">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(examboard)}
              ></i>
            </Link>
          </Permission>
          <Permission permission="delete-keystage">
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => handleDeleteUser(examboard)}
              ></i>
            </Link>
          </Permission>

        </div>
      )
    }
  ]

  useEffect(() => {
    dispatch(onGetKeyStages())
    setIsEdit(false)
  }, [])

  useEffect(() => {
    setUserData(keystages)
    setIsEdit(false)
  }, [keystages])

  useEffect(() => {
    if (!isEmpty(keystages) && !!isEdit) {
      setUserData(keystages)
      setIsEdit(false)
    }
  }, [keystages])


  const handleUserClick = arg => {
    const examboard = arg

    setEditData({
      id: examboard.id,
      name: examboard.name,
      display_name: examboard.display_name,
      description: examboard.description
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const handleDeleteUser = keyStage => {
    dispatch(onDeleteKeyStage(keyStage))
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
          <title>Users List | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Keystage" breadcrumbItem="Keystage List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={tableColumnsList}
                    data={keystages}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={keystages}
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
                                <Permission permission="create-keystage">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New Keystage
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

                                  <CreateKeystageModal visible={visibleCreateModal} isEdit={isEdit}
                                                       keyStageData={editData} onClose={() => {
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

export default withRouter(KeyStage)
