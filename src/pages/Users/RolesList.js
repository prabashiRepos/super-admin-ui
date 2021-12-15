import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { withRouter, Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
// import overlayFactory from 'react-bootstrap-table2-overlay';

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Permission from 'components/Common/Permission'

import {
  getRoles as onGetRoles,
  addNewRole as onAddNewRole,
  updateRole as onUpdateRole,
  deleteRole as onDeleteRole,
} from "store/user-management/roles/actions"

import {
  getPermissions as onGetPermissions,
  assignPermission as onAssignPermissions,
} from "store/user-management/permissions/actions"
import { isEmpty } from "lodash"
import { pending, rejected, fulfilled, done } from 'redux-saga-thunk'

//redux
import { useSelector, useDispatch } from "react-redux"

import CreateRoleModal from "./CreateRoleModal";
import AssignPermission from "./AssignPermission";

import { showToastMessage } from "helpers/toaster"

const RolesList = props => {
  const dispatch = useDispatch()

  const { roles,get_loading, del_error, del_success, assign_success } = useSelector(state => ({
    roles: state.roles.roles,
    get_loading: pending(state, 'GET_ROLES'),
    del_error: rejected(state, 'DELETE_ROLE'),
    del_success: fulfilled(state, 'DELETE_ROLE'),
    assign_success:fulfilled(state, 'ASSIGN_PERMISSION')
  }));
  
  useEffect(() => {
    if (del_success) {
      showToastMessage('success',"Role successfully deleted")
    }
    if (del_error) {
      showToastMessage('error',"Role failed to delete")
    }
  }, [del_success,del_error])
  
  useEffect(() => {
    if (assign_success) {
      dispatch(onGetRoles())
    }
  }, [assign_success])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [RoleData, setRoleData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [visibleAssignModal, setVisibleAssignModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: roles.length,
    custom: true,
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ]

  const rolesListColumns = [
    {
      text: "id",
      dataField: "id",
      sort: true,
      hidden: true,
      formatter: (cellContent, user) => <>{user.id}</>,
    },
    {
      dataField: "img",
      text: "#",
      formatter: (cellContent, user) => (
        <>
          {!user.img ? (
            <div className="avatar-xs">
              <span className="avatar-title rounded-circle">
                {user.name.charAt(0)}
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
      ),
    },
    {
      text: "Name",
      dataField: "name",
      sort: true,
      formatter: (cellContent, user) => (
        <>
          <h5 className="font-size-14 mb-1">
            <Link to="#" className="text-dark">
              {user.name}
            </Link>
          </h5>
          <p className="text-muted mb-0">{user.role}</p>
        </>
      ),
    },
    {
      dataField: "display_name",
      text: "Display Name",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, role) => (
        <div className="d-flex gap-3">
          <Permission permission="update-role">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(role)}
              />
            </Link>
          </Permission>
          <Permission permission="delete-role">
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => handleDeleteUser(role)}
              />
          </Link>
          </Permission>
          <Permission permission="assign-permission">
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-security font-size-18"
                id="permissiontooltip"
                onClick={() => handleAssignPermission(role)}
              />
            </Link>
          </Permission>
            
        </div>
      ),
    },
  ]

  useEffect(() => {
      dispatch(onGetRoles())
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
      name: user.name,
      display_name: user.display_name,
      description: user.description,
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const handleDeleteUser = role => {
    dispatch(onDeleteRole(role))
  }
  
  const handleAssignPermission = arg => {
    const user = arg
    setRoleData(user)
    setVisibleAssignModal(true)
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
          <title>Roles List | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Roles" breadcrumbItem="Roles List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={rolesListColumns}
                    data={roles}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={roles}
                        columns={rolesListColumns}
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
                                <Permission permission="create-role">
                                  <div className="text-sm-end">
                                    <Button
                                      color="primary"
                                      className="font-16 btn-block btn btn-primary"
                                      onClick={handleUserClicks}
                                    >
                                      <i className="mdi mdi-plus-circle-outline me-1" />
                                      Create New Role
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
                                    // loading
                                    // overlay={overlayFactory()}
                                    classes={
                                      "table align-middle table-nowrap table-hover"
                                    }
                                    bordered={false}
                                    striped={false}
                                    responsive
                                  />

                                  <CreateRoleModal  visible={visibleCreateModal} isEdit={isEdit} roleData={editData} onClose={ ()=>{setVisibleCreateModal(!visibleCreateModal)}}/>
                                  <AssignPermission visible={visibleAssignModal} RoleData={ RoleData}onClose={ ()=>{setVisibleAssignModal(!visibleAssignModal)}}/>

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

export default withRouter(RolesList)
