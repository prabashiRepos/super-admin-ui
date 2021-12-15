import React, { useState } from "react"
import MetaTags from 'react-meta-tags';

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Media,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Button
} from "reactstrap"
import classnames from "classnames"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

import CreateQuestion from "./CreateQuestion"

const HelpAndSupport = () => {
  const [activeTab, setactiveTab] = useState("1")
  const [visibleCreateModal, setVisibleCreateModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [questionData , setQuestionData ] = useState(false)

  const createQuestionHandler = () => {
    setVisibleCreateModal(!visibleCreateModal)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Q&A | SqillUp</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Q&A" breadcrumbItem="Questions and Answers" />

          <div className="checkout-tabs">
            <Row>
              <Col lg="2">
                <Nav className="flex-column" pills>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        setactiveTab("1")
                      }}
                    >
                      <i className="bx bx-question-mark d-block check-nav-icon mt-4 mb-2"/>
                      <p className="font-weight-bold mb-4">General Questions</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        setactiveTab("2")
                      }}
                    >
                      <i className="bx bx-support d-block check-nav-icon mt-4 mb-2"/>
                      <p className="font-weight-bold mb-4">Support</p>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col lg="10">
                <Card>
                  <CardBody>
                    <TabContent activeTab={activeTab}>
                      <TabPane tabId="1">
                        <CardTitle className="mb-4">
                          <Row>
                              <Col sm="4">
                                    General Questions
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    color="primary"
                                    className="font-16 btn-block btn btn-primary"
                                    onClick={createQuestionHandler}
                                  >
                                    <i className="mdi mdi-plus-circle-outline me-1" />
                                    Create New Question
                                </Button>
                                <CreateQuestion isEdit={isEdit} questionData={questionData} visible={visibleCreateModal} onClose={ ()=>setVisibleCreateModal(!visibleCreateModal)}/>
                                </div>
                              </Col>
                            </Row>
                        </CardTitle>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20 text-success"/>
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              What is Lorem Ipsum?
                            </h5>
                            <p className="text-muted">
                              New common language will be more simple and
                              regular than the existing European languages. It
                              will be as simple as occidental.
                            </p>
                          </Media>
                        </Media>
                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20 text-success"/>
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              Where does it come from?
                            </h5>
                            <p className="text-muted">
                              Everyone realizes why a new common language would
                              be desirable one could refuse to pay expensive
                              translators.
                            </p>
                          </Media>
                        </Media>
                      </TabPane>
                      <TabPane tabId="2">
                         <CardTitle className="mb-4">
                          <Row>
                              <Col sm="4">
                                    Support
                              </Col>
                              <Col sm="8">
                                <div className="text-sm-end">
                                  <Button
                                    color="primary"
                                    className="font-16 btn-block btn btn-primary"
                                    // onClick={handleUserClicks}
                                  >
                                    <i className="mdi mdi-plus-circle-outline me-1" />
                                    Create New Question
                                  </Button>
                                </div>
                              </Col>
                            </Row>
                        </CardTitle>

                        <Media className="faq-box mb-4">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20 text-success"/>
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              Where can I get some?
                            </h5>
                            <p className="text-muted">
                              To an English person, it will seem like simplified
                              English, as a skeptical Cambridge friend of mine
                              told me what Occidental
                            </p>
                          </Media>
                        </Media>

                        <Media className="faq-box">
                          <div className="faq-icon me-3">
                            <i className="bx bx-help-circle font-size-20 text-success"/>
                          </div>
                          <Media body>
                            <h5 className="font-size-15">
                              What is Lorem Ipsum?
                            </h5>
                            <p className="text-muted">
                              New common language will be more simple and
                              regular than the existing European languages. It
                              will be as simple as occidental.
                            </p>
                          </Media>
                        </Media>
                      </TabPane>
                    </TabContent>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default HelpAndSupport
