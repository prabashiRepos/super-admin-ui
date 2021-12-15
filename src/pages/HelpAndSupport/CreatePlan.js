import React, { useState } from "react"
import MetaTags from "react-meta-tags"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  Label,
  Button,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  InputGroup,
  InputGroupAddon,
} from "reactstrap"
import classnames from "classnames"
import { AvForm, AvField } from "availity-reactstrap-validation"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import CardPricing from "components/Common/CardPricing"

const INITIAL_DATA = {
  title: "",
}

const CreatePlan = props => {
  const [plan, setPlan] = useState(INITIAL_DATA)

  const handleSubmit = () => {}
  const handleInvalidSubmit = () => {}

  const serverValidate = (value, context, input, callback) => {
    // if (error || update_error) {
    //   let serverErrors = form_errors[input.props.name]
    //   if (typeof serverErrors == "undefined") serverErrors = true
    //   else serverErrors = callback(serverErrors[0])
    //   return serverErrors
    // } else {
    callback(true)
    // }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Plan and Prices | SqillUp</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Plan and Prices" breadcrumbItem="Create Plan" />
          <Row>
            <Col lg="12">
              <h4 className="card-title mb-4"></h4>
              <div className="crypto-buy-sell-nav">
                <Row>
                  <Col>
                    <Card>
                      <CardBody>
                        <AvForm
                          onValidSubmit={handleSubmit}
                          onInvalidSubmit={handleInvalidSubmit}
                        >
                          <Row>
                            <Col xl="3" sm="4">
                              <div className="mb-3">
                                <label className="card-radio-label mb-2">
                                  <input
                                    type="radio"
                                    name="currency"
                                    id="buycurrencyoption1"
                                    className="card-radio-input"
                                    defaultChecked
                                    readOnly
                                  />

                                  <div className="card-radio">
                                    <div>
                                      <i className="mdi mdi-bitcoin font-size-24 text-warning align-middle me-2" />
                                      <span>Yearly</span>
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </Col>

                            <Col xl="3" sm="4">
                              <div className="mb-3">
                                <Label className="card-radio-label mb-2">
                                  <Input
                                    type="radio"
                                    name="currency"
                                    id="buycurrencyoption2"
                                    className="card-radio-input"
                                  />

                                  <div className="card-radio">
                                    <div>
                                      <i className="mdi mdi-ethereum font-size-24 text-primary align-middle me-2" />
                                      <span>Monthly</span>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            </Col>

                            <Col xl="3" sm="4">
                              <div className="mb-3">
                                <Label className="card-radio-label mb-2">
                                  <Input
                                    type="radio"
                                    name="currency"
                                    id="buycurrencyoption3"
                                    className="card-radio-input"
                                  />

                                  <div className="card-radio">
                                    <div>
                                      <i className="mdi mdi-litecoin font-size-24 text-info align-middle me-2" />
                                      <span>Type 3</span>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12" xl="12">
                              <div className="mb-3">
                                <AvField
                                  name="name"
                                  label="Plan Name"
                                  type="text"
                                  errorMessage="The Plan Name field is invalid"
                                  validate={{
                                    required: { value: true },
                                    server: serverValidate,
                                  }}
                                  value={plan.title || ""}
                                />
                              </div>
                            </Col>
                            <Col md="12" xl="12">
                              <div className="mb-3">
                                <AvField
                                  name="description"
                                  label="Description"
                                  type="text"
                                  errorMessage="The Description field is invalid"
                                  validate={{
                                    required: { value: true },
                                    server: serverValidate,
                                  }}
                                  value={plan.title || ""}
                                />
                              </div>
                            </Col>
                            <Col md="12" xl="12">
                              <div className="mb-3">
                                <AvField
                                  name="amount"
                                  label="Amount"
                                  type="text"
                                  errorMessage="The Amount field is invalid"
                                  validate={{
                                    required: { value: true },
                                    server: serverValidate,
                                  }}
                                  value={plan.title || ""}
                                />
                              </div>
                            </Col>
                            <Col md="12" xl="12">
                              <div className="mb-3">
                                <AvField
                                  name="type"
                                  label="Type"
                                  type="select"
                                  errorMessage="The Type is invalid"
                                  validate={{
                                    required: { value: true },
                                    server: serverValidate,
                                  }}
                                  value={plan.title || ""}
                                >
                                  <option>Yearly</option>
                                  <option>Monthly</option>
                                </AvField>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <div>
                              <Label>Available Features</Label>
                              <div className="form-check form-check-primary mb-3">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customCheckcolor1"
                                  // checked={customchkPrimary}
                                  onChange={() => {
                                    // setcustomchkPrimary(!customchkPrimary)
                                  }}
                                />

                                <label
                                  className="form-check-label"
                                  htmlFor="customCheckcolor1"
                                >
                                  Option 1
                                </label>
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <Col>
                              <div className="text-end">
                                {/* {!loading && !update_loading && ( */}
                                <button
                                  type="submit"
                                  className="btn btn-success"
                                >
                                  Save
                                </button>
                                {/* )} */}
                                {/* {(loading || update_loading) && (
                                  <button
                                    type="button"
                                    className="btn btn-success "
                                  >
                                    <i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2"></i>{" "}
                                    Loading
                                  </button>
                                )} */}
                              </div>
                            </Col>
                          </Row>
                        </AvForm>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col>
                    <Row>
                      <CardPricing
                        xl="12"
                        md="12"
                        pricing={{
                          id: 4,
                          title: "Package 04",
                          description: "description about package",
                          icon: "bx-car",
                          price: "49",
                          duration: "Per month",
                          link: "",
                          features: [
                            { title: "Options" },
                            { title: "Options" },
                            { title: "Options" },
                            { title: "Options" },
                          ],
                        }}
                      />
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default CreatePlan
