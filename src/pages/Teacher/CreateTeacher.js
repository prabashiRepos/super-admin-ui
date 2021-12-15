import React from "react"
import MetaTags from 'react-meta-tags';

import {
  Card,
  Col,
  Container,
  Row,
  CardBody,
  CardTitle,
  Label,
  Button,
  Form,
  Input,
  InputGroup,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

const CreateTeacher = props => {
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Create Teacher | SqillUp</title>
        </MetaTags>
        <Container fluid={true}>
          <Breadcrumbs title="Teachers" breadcrumbItem="Create Teacher" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  {/* <CardTitle className="mb-4">{props.t("Student Informations")}</CardTitle> */}
                  <CardTitle className="mb-4">Teacher Informations</CardTitle>

                  <Form>
                    <Row>
                        <Col md={6}>
                            <div className="mb-3">
                            <Label htmlFor="formrow-firstname-Input">First name</Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="formrow-firstname-Input"
                            />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                            <Label htmlFor="formrow-firstname-Input">Last name</Label>
                            <Input
                                type="text"
                                className="form-control"
                                id="formrow-firstname-Input"
                            />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-email-Input">Email</Label>
                          <Input
                            type="email"
                            className="form-control"
                            id="formrow-email-Input"
                          />
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-password-Input">Password</Label>
                          <Input
                            type="password"
                            className="form-control"
                            id="formrow-password-Input"
                          />
                        </div>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-InputCity">City</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-InputCity"
                          />
                        </div>
                      </Col>
                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-InputState">State</Label>
                          <select
                            id="formrow-InputState"
                            className="form-control"
                          >
                            <option defaultValue>Choose...</option>
                            <option>...</option>
                          </select>
                        </div>
                      </Col>

                      <Col lg={4}>
                        <div className="mb-3">
                          <Label htmlFor="formrow-InputZip">Zip</Label>
                          <Input
                            type="text"
                            className="form-control"
                            id="formrow-InputZip"
                          />
                        </div>
                      </Col>
                    </Row>

                    <div className="mb-3">
                      <div className="form-check">
                        <Input
                          type="checkbox"
                          className="form-check-Input"
                          id="formrow-customCheck"
                        />
                        <Label
                          className="form-check-Label"
                          htmlFor="formrow-customCheck"
                        >
                          Check me out
                        </Label>
                      </div>
                    </div>
                    <div>
                      <button type="submit" className="btn btn-primary w-md">
                        Submit
                      </button>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* end row  */}
          </Container>
        {/* container-fluid */}
      </div>
    </React.Fragment>
  )
}

export default CreateTeacher
