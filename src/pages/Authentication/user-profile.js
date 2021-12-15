import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Media,
  Row,
  Table,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import EditProfile from "./EditProfile";

import { fulfilled } from "redux-saga-thunk"
import { useSelector, useDispatch } from "react-redux"
import {
  getProfile as onGetProfile,
} from "store/auth/profile/actions"

import images from "assets/images"

const ContactsProfile = props => {
  const { userProfile, onGetUserProfile } = props
  const [visibleEditModal, setVisibleEditModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState({})

   const {
    update_success,
  } = useSelector(state => ({
    update_success: fulfilled(state, "EDIT_PROFILE"),
  }))


  useEffect(() => {
    onGetUserProfile()
  }, [])
  
  useEffect(() => {
    if (update_success) {
      onGetUserProfile()
    }
  },[update_success])
  
  const handleEditClick = arg => {
    const user = userProfile
    setEditData({
      id: user.id,
      first_name:user.first_name,
      last_name:user.last_name,
      email:user.email,
      country_code:user.country_code,
      phone:user.phone,
      password:user.password,
      role_id:user.roles.map(role=>role.id)
    })
    setIsEdit(true)
    setVisibleEditModal(true)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Sqillup</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Home" breadcrumbItem="Profile" />

          <Row>
            <Col xl="4">
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs="7">
                      <div className="text-primary p-3">
                        <h5 className="text-primary">Welcome Back !</h5>
                        {/* <p>It will seem like simplified</p> */}
                      </div>
                    </Col>
                    <Col xs="5" className="align-self-end">
                      <img src={images.avatar1} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <Row>
                    <Col>
                      <div className="avatar-md profile-user-wid mb-4">
                        <img
                          src={images.avatar1}
                          alt=""
                          className="img-thumbnail rounded-circle"
                        />
                      </div>
                      <h5 className="font-size-15">
                        {`${userProfile.first_name} ${userProfile.last_name}`}
                      </h5>
                      <p className="text-muted mb-0">{(userProfile.roles_array && userProfile.roles_array.length!=0) && userProfile.roles_array.map(item => item).toString()}</p>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col xl="8">
              <Card>
                <CardBody>
                  <Row>
                    <Col>
                      <CardTitle className="mb-4">Personal Information</CardTitle>
                    </Col>
                    <Col className="d-flex justify-content-end">
                      <Link className="text-success" to="#">
                        <i
                          className="mdi mdi-pencil font-size-18"
                          id="edittooltip"
                          onClick={() => handleEditClick()}
                        ></i>
                      </Link>
                    </Col>
                  </Row>
                  <EditProfile  visible={visibleEditModal} isEdit userData={editData} onClose={ ()=>{setVisibleEditModal(!visibleEditModal)}}/>
                 
                  <div className="table-responsive">
                    <Table className="table-nowrap mb-0">
                      <tbody>
                        <tr>
                          <th scope="row">Full Name :</th>
                          <td>{`${userProfile.first_name} ${userProfile.last_name}`}</td>
                        </tr>
                        <tr>
                          <th scope="row">Mobile :</th>
                          <td>{`${userProfile.country_code || ""} ${userProfile.phone}`}</td>
                        </tr>
                        <tr>
                          <th scope="row">E-mail :</th>
                          <td>{userProfile.email || ""}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ContactsProfile.propTypes = {
  userProfile: PropTypes.any,
  onGetUserProfile: PropTypes.func,
}

const mapStateToProps = ({ Profile }) => {
  return {
    userProfile: Profile.profile,
  }
}

const mapDispatchToProps = dispatch => ({
  onGetUserProfile: () => dispatch(onGetProfile()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactsProfile))
