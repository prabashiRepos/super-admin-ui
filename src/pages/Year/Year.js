import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Link, withRouter } from "react-router-dom"
import { Badge, Button, Card, CardBody, Col, Container, Row } from "reactstrap"
import paginationFactory, { PaginationListStandalone, PaginationProvider } from "react-bootstrap-table2-paginator"
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import Permission from "components/Common/Permission"

import { deleteYear as onDeleteYear, getYears as onGetYears } from "store/settings/years/actions"

import { isEmpty } from "lodash"
import { clean, fulfilled, pending, rejected } from "redux-saga-thunk"

import { useDispatch, useSelector } from "react-redux"

import CreateYear from "./CreateYear"

import { showToastMessage } from "helpers/toaster"

import images from "assets/images"


const Year = props => {
  const dispatch = useDispatch()

  const { years, get_loading, get_error, get_success, del_error, del_success } = useSelector(state => ({
    years: state.years.years,
    get_loading: pending(state, "GET_YEARS"),
    get_error: rejected(state, "GET_YEARS"),
    get_success: fulfilled(state, "GET_YEARS"),
    // done: done(state, 'GET_YEARS'),
    // del_loading: pending(state, 'DELETE_EXAM_BOARD'),
    del_error: rejected(state, "DELETE_YEAR"),
    del_success: fulfilled(state, "DELETE_YEAR")
    // del_done: done(state, 'DELETE_YEAR'),
  }))

  useEffect(() => {
    return () => {
      dispatch(clean("DELETE_YEAR"))
    }
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Year successfully deleted")
    }
    if (del_error) {
      showToastMessage("error", "Year failed to delete")
    }
  }, [del_success, del_error])

  const [UserData, setUserData] = useState([])
  const [editData, setEditData] = useState({})
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { SearchBar } = Search

  const pageOptions = {
    sizePerPage: 10,
    totalSize: years.length,
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
      dataField: "description",
      text: "Description",
      sort: true
    },
    {
      dataField: "year",
      text: "Year",
      sort: true,
      formatter: (cellContent, item) => (
        <div className="d-flex">
          <h5>
            <Badge className="bg-success">
              {item.year}
            </Badge>
          </h5>
        </div>
      )
    },
    {
      dataField: "key_stage",
      text: "Key Stage",
      sort: true,
      formatter: (cellContent, { key_stage }) => (
        <div className="d-flex">
          {(key_stage && key_stage.length) && key_stage.map(item => (
            <h5 key={item}>
              <Badge className="bg-warning mx-1">
                {item.display_name}
              </Badge>
            </h5>
          ))}
        </div>
      )
    },
    {
      dataField: "menu",
      isDummyField: true,
      editable: false,
      text: "Action",
      formatter: (cellContent, year) => (
        <div className="d-flex gap-3">
          <Permission permission="update-year">
            <Link className="text-success" to="#">
              <i
                className="mdi mdi-pencil font-size-18"
                id="edittooltip"
                onClick={() => handleUserClick(year)}
              />
            </Link>
          </Permission>
          <Permission permission="delete-year">
            <Link className="text-danger" to="#">
              <i
                className="mdi mdi-delete font-size-18"
                id="deletetooltip"
                onClick={() => handleDeleteUser(year)}
              />
            </Link>
          </Permission>
        </div>
      )
    }
  ]

  useEffect(() => {
    dispatch(onGetYears())
    setIsEdit(false)
  }, [])


  useEffect(() => {
    setUserData(years)
    setIsEdit(false)
  }, [years])

  useEffect(() => {
    if (!isEmpty(years) && !!isEdit) {
      setUserData(years)
      setIsEdit(false)
    }
  }, [years])


  const handleUserClick = arg => {
    const year = arg
    setEditData({
      id: year.id,
      name: year.name,
      description: year.description,
      year: year.year,
      key_stage_id: year.key_stage.map(item => item.id)
    })
    setIsEdit(true)

    setVisibleCreateModal(true)
  }

  const handleDeleteUser = examboard => {
    dispatch(onDeleteYear(examboard))
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
          <Breadcrumbs title="Year" breadcrumbItem="Year List" />
          <Row>
            <Col lg="12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={tableColumnsList}
                    data={years}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        data={years}
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

                                  <CreateYear visible={visibleCreateModal}
                                              isEdit={isEdit}
                                              editYearData={editData}
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

export default withRouter(Year)
