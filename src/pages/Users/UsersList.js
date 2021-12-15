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

import { deleteUser as onDeleteUser, getUsers as onGetUsers } from "store/user-management/contacts/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreateUserModal from "./CreateUserModal"

import { showToastMessage } from "helpers/toaster"

import images from "assets/images"


const UsersList = props => {
  const dispatch = useDispatch()

  const { roles, get_loading, get_error, get_success, del_error, del_success } = useSelector(state => ({
    roles: state.contacts.users,
    get_loading: pending(state, "GET_USERS"),
    get_error: rejected(state, "GET_USERS"),
    get_success: fulfilled(state, "GET_USERS"),
    // done: done(state, 'GET_ROLES'),
    // del_loading: pending(state, 'DELETE_ROLE'),
    del_error: rejected(state, "DELETE_USER"),
    del_success: fulfilled(state, "DELETE_USER")
    // del_done: done(state, 'DELETE_ROLE'),
  }))

  useEffect(() => {
    return () => {
      dispatch(clean("DELETE_USER"))
    }
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "User successfully deleted")
    }
    if (del_error) {
      showToastMessage("error", "User failed to delete")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [visibleAssignModal, setVisibleAssignModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: roles.length,
    custom: true
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc"
    }
  ]

  const extractUserRoles = (roles) => {
    var roleString = ""
    if (roles.length) {
      roleString = roles.map(item => item.name).toString()
    }
    return roleString
  }

  const tableColumnsList = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, user) => <>{user.id}</>
    },
    {
      dataField: "img",
      text: "#",
      formatter: (cellContent, user) => (
        <>
          {!user.img ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {user.first_name.charAt(0)}
              </span>
            </div>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-xs"
                src={images[user.img]}
                alt=""
              />
            </div>
          )}
        </>
      )
    },
    {
      dataField: "first_name",
      text: "First Name",
      sort: true,
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.first_name}
            </Link>
          </h5>
          <p className="text-muted mb-0">{extractUserRoles(user.roles || [])}</p>
        </>
      )
    },
    {
      dataField: "last_name",
      text: "Last Name",
      sort: true
    },
    {
      dataField: "email",
      text: "Email",
      sort: true
    },
    {
      dataField: "phone",
      text: "Phone",
      sort: false,
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              (+{user.country_code}) {user.phone}
            </Link>
          </h5>
          {/* <p className="text-muted mb-0">{user.designation}</p> */}
        </>
      )
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, user) => (
        <div className="d-flex gap-3">
          <Permission permission="update-user">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(user)}
              />
            </Link>
          </Permission>
          <Permission permission="delete-user">
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => handleDeleteUser(user)}
              />
            </Link>
          </Permission>

        </div>
      )
    }
  ]

  useEffect(() => {
    dispatch(onGetUsers())
    setIsEdit(false)
  }, [])


  useEffect(() => {
    setUserData(roles)
    setIsEdit(false)
  }, [roles])

  useEffect(() => {
    if (!isEmpty(roles) && !!isEdit) {
      setUserData(roles)
      setIsEdit(false)
    }
  }, [roles])


  const handleUserClick = arg => {
    const user = arg
    setEditData({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      country_code: user.country_code,
      phone: user.phone,
      password: user.password,
      role_id: user.roles.map(role => role.id)
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const handleDeleteUser = role => {
    dispatch(onDeleteUser(role))
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
          <Breadcrumbs title="Users" breadcrumbItem="Users List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={tableColumnsList}
                    data={roles}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={roles}
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
                                <Permission permission="create-user">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New User
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

                                  <CreateUserModal visible={visibleCreateModal} isEdit={isEdit} userData={editData}
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

export default withRouter(UsersList)
