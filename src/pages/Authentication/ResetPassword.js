import PropTypes from "prop-types"
import MetaTags from "react-meta-tags"
import React, { useState, useEffect, createRef } from "react"

import { Row, Col, Alert, Card, CardBody, Container } from "reactstrap"
// Router
import {
  useParams
} from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux"

import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// action
import { userResetPassword } from "../../store/actions"

import { pending, rejected, fulfilled } from "redux-saga-thunk"

// import images
import profile from "../../assets/images/profile-img.png"
import logo from "../../assets/images/logo.svg"

const ResetPassword = props => {
  const dispatch = useDispatch()

  const { resetMessage, resetSuccessMessage, success, failed  } = useSelector(state => ({
    loading: pending(state, "RESET_PASSWORD"),
    failed: rejected(state, "RESET_PASSWORD"),
    success: fulfilled(state, "RESET_PASSWORD"),
    resetMessage: state.ForgetPassword.resetMessage,
    resetSuccessMessage: state.ForgetPassword.resetSuccessMessage,
  }))

  const [user, setUser] = useState({password:'',confirmation_password:''})
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")

  const formRef=createRef()

  useEffect(() => {
    if (success) {
      setUser({password:'',confirmation_password:''})
      formRef.current.reset()
    }
  },[success])

  function handleValidSubmit(event, values) {
    const data = {
      ...values,
      token,
      email,
    }
    dispatch(userResetPassword(data, props.history))
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(props.location.search)
    setToken(props.match.params[0])
    setEmail(urlParams.get('email'))
  },[])
 

  return (
    <React.Fragment>
      <MetaTags>
        <title>
          Reset Password | SqillUp
        </title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-softbg-soft-primary">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue to SqillUp.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <Link to="/">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    {resetMessage && resetMessage ? (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        {resetMessage}
                      </Alert>
                    ) : null}
                    {success && (
                      <Alert color="success" style={{ marginTop: "13px" }}>
                        Password reset successful!
                      </Alert>
                    )}
                    {failed && (
                      <Alert color="danger" style={{ marginTop: "13px" }}>
                        Password reset failed!
                      </Alert>
                    )}

                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => handleValidSubmit(e, v)}
                      ref={formRef}
                    >
                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          className="form-control"
                          placeholder="New password"
                          type="password"
                          required
                          value={user.password}
                          errorMessage="The password field is invalid"
                          validate={{
                            required: { value: true },
                          }}
                        />
                      </div>
                      <div className="mb-3">
                        <AvField
                          name="password_confirmation"
                          label="Confirm Password"
                          className="form-control"
                          placeholder="Confirm new Password"
                          type="password"
                          required
                          value={user.confirmation_password}
                          errorMessage="The confirmation password field is invalid"
                          validate={{
                            required: { value: true },
                            samePassword: (value,state) => {
                              if (state.password == value)
                                return true
                              else return "Passwords are not match"
                            }
                          }}
                        />
                      </div>
                      <Row className="mb-3">
                        <Col className="text-end">
                          <button
                            className="btn btn-primary w-md "
                            type="submit"
                          >
                            Reset
                          </button>
                        </Col>
                      </Row>
                    </AvForm>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Go back to{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} NUVAY.
                  {/*Crafted with{" "} <i className="mdi mdi-heart text-danger" /> by SmartSkillSoft*/}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

ResetPassword.propTypes = {
  history: PropTypes.object,
}

export default withRouter(ResetPassword)
