import React, { useEffect, useState } from "react"
import MetaTags from "react-meta-tags"
import { Card, CardBody, CardTitle, Col, Container, Label, Row } from "reactstrap"
import { AvField, AvForm } from "availity-reactstrap-validation"
import Breadcrumbs from "components/Common/Breadcrumb"
import { useDispatch, useSelector } from "react-redux"
import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"
import { addNewItem as onCreatePlan, updateItem as onUpdatePlan } from "store/plan-and-prices/actions"
import { showToastMessage } from "helpers/toaster"

const INITIAL_DATA = {
  name: "",
  monthly_price: 0,
  yearly_price: 0,
  yearly_discount: 0,
  max_students: "",
  min_students: "",
  restrictions: {
    video_per_chapter: null,
    q_a: null,
    self_test_per_chapter: null,
    past_paper_topic_interactive: null,
    past_paper_topic_pdf: null,
    past_paper_year_interactive: null,
    past_paper_year_pdf: null,
    past_paper_marking_scheme_pdf: null,
    chalanges_per_chapter: null,
    work_sheet_per_chapter: null,
    free_resources: null,
    email_response: null
  }
}

const restrictions = [
  { label: "Video per chapter", value: "video_per_chapter", selected: null, user_value: "" },
  { label: "Q&A", value: "q_a", selected: null, user_value: "" },
  { label: "Self test per chapter", value: "self_test_per_chapter", selected: null, user_value: "" },
  {
    label: "Past Paper Topic - Interactive mode",
    value: "past_paper_topic_interactive",
    selected: null,
    user_value: ""
  },
  { label: "Pass Paper - PDF", value: "past_paper_topic_pdf", selected: null, user_value: "" },
  { label: "Pass Paper Year - Interactive", value: "past_paper_year_interactive", selected: null, user_value: "" },
  { label: "Pass Paper Year - PDF", value: "past_paper_year_pdf", selected: null, user_value: "" },
  { label: "Past Paper marking scheme - PDF", value: "past_paper_marking_scheme_pdf", selected: null, user_value: "" },
  { label: "Challenges per chapter", value: "chalanges_per_chapter", selected: null, user_value: "" },
  { label: "Worksheet per Chapter", value: "work_sheet_per_chapter", selected: null, user_value: "" },
  { label: "Free Resources", value: "free_resources", selected: null, user_value: "" },
  { label: "Email Response", value: "email_response", selected: null, user_value: "" }
]

const CustomValue = ({ item, onChange, value }) => (item.selected == 1 && (
  <Col md="4" xl="4">
    <AvField
      name="custom_value"
      type="text"
      placeholder="Number of feature"
      errorMessage="The number of feature field is invalid"
      validate={{
        // required: { value: true },
        // server: serverValidate,
      }}
      value={value}
      className="mb-3"
      onChange={(e) => onChange(e)}
    />
  </Col>
))

const CreatePlan = props => {
  const dispatch = useDispatch()

  const [plan, setPlan] = useState(INITIAL_DATA)
  const [selectedRestrictions, setSelectedRestrictions] = useState(restrictions)
  const [temp, setTemp] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [editData, setEditData] = useState(false)

  const [yearlyDiscount, setYearlyDiscountPercentage] = useState(0)

  useEffect(() => {
    try {
      if (props.history.location.state && props.history.location.state.isEdit) {
        setIsEdit(true)
        setEditData(props.history.location.state.plan)
        const { plan } = props.history.location.state
        const data = {
          ...plan,
          monthly_price: parseInt(plan.monthly_price),
          yearly_price: parseInt(plan.yearly_price),
          restrictions: extractRestrictionData(plan.restrictions)
        }

        const yearly_discount = 100 - plan.yearly_price / ((plan.monthly_price * 12) / 100)
        setYearlyDiscountPercentage(yearly_discount.toFixed(2))
        setPlan(data)
      } else {
        // props.history.push('/plan-and-prices')
      }
    } catch (ex) {
      props.history.push("/plan-and-prices")
    }
  }, [])

  const extractRestrictionData = (plan) => {
    const extractedData = restrictions.map(item => {
      if (plan[item.value] == null) {
        if (item.value == "email_response") {
          item.selected = "0"
          return item
        } else {
          item.selected = "-1"
          return item
        }
      } else if (parseInt(plan[item.value]) == 0) {
        item.selected = "0"
        // item.user_value=plan[item.value]
        return item
      } else if (plan[item.value] == "general_queries") {
        item.selected = plan[item.value]
        // item.user_value=plan[item.value]
        return item
      } else if (plan[item.value] == "all") {
        item.selected = "-1"
        // item.user_value=plan[item.value]
        return item
      } else {
        item.selected = "1"
        item.user_value = plan[item.value]
        return item
      }
    })
    setSelectedRestrictions(extractedData)
    return extractedData
  }


  const {
    roles,
    error,
    success,
    loading,
    create_loading,
    create_failed,
    create_success,
    update_success,
    update_failed
  } = useSelector(state => ({
    roles: state.roles.roles,
    error_message: state.contacts.error,
    form_errors: state.contacts.form_errors,
    create_loading: pending(state, "ADD_PLAN"),
    create_success: fulfilled(state, "ADD_PLAN"),
    create_failed: rejected(state, "ADD_PLAN"),
    create_done: done(state, "ADD_PLAN"),
    update_loading: pending(state, "UPDATE_PLAN"),
    update_success: fulfilled(state, "UPDATE_PLAN"),
    update_failed: rejected(state, "UPDATE_PLAN"),
    update_done: done(state, "UPDATE_PLAN")
  }))

  useEffect(() => {
    if (create_success) {
      showToastMessage("success", "Plan successfully created")
      props.history.push("/plan-and-prices")
      dispatch(clean("ADD_PLAN"))
    }
    if (create_failed) {
      showToastMessage("error", "Plan failed to create")
    }
  }, [create_success, create_failed])

  useEffect(() => {
    if (update_success) {
      showToastMessage("success", "Plan successfully updated")
      props.history.push("/plan-and-prices")
      dispatch(clean("UPDATE_PLAN"))
    }
    if (update_failed) {
      showToastMessage("error", "Plan failed to update")
    }
  }, [update_success, update_failed])

  const restrictionHandler = (e, index) => {
    const { value } = e.target
    const selectedValue = value == "general_queries" ? value : parseInt(value)
    selectedRestrictions[index].selected = selectedValue
    if (selectedValue != -1) {
      selectedRestrictions[index].user_value = selectedValue
    } else {
      selectedRestrictions[index].user_value = ""
    }
    setSelectedRestrictions(selectedRestrictions)
    setTemp(!temp)
  }

  const customValueHandler = (e, index) => {
    selectedRestrictions[index].user_value = e.target.value
    setSelectedRestrictions(selectedRestrictions)
    setTemp(!temp)
  }

  const setValue = (e) => {
    const { name, value } = e.target
    setPlan({ ...plan, [name]: value })

    if (name == "monthly_price") {
      // setYearlyDiscountPercentage(0)
      const val = value * 12 - (((value * 12) / 100) * yearlyDiscount)
      setPlan({ ...plan, "monthly_price": value, "yearly_price": val })
      return
    }
    if (name == "yearly_price") {
      const val = 100 - value / ((plan.monthly_price * 12) / 100)
      // setPlan({ ...plan, 'yearly_discount': val})
      setYearlyDiscountPercentage(val.toFixed(2))
      setPlan({ ...plan, yearly_price: value, yearly_discount: val })

    }
    if (name == "yearly_discount") {
      setYearlyDiscountPercentage(value.toFixed(2))
      const val = plan.monthly_price * 12 - (((plan.monthly_price * 12) / 100) * value)
      setPlan({ ...plan, yearly_discount: value, "yearly_price": val.toFixed(2) })
    }

  }

  // const onSetDiscount = (e) => {
  //   const { value } = e.target
  //   setYearlyDiscountPercentage(value)
  // }


  const handleSubmit = (event, values) => {
    var features = {}
    const restrictionData = selectedRestrictions.map(item => {
      let value = item.selected == -1 ? null : item.selected
      if (item.value == "email_response") {
        if (item.selected == null || item.selected == -1) {
          value = "all"
        }
        if (item.selected == 0) {
          value = null
        }
      }
      if (item.selected == 1) {
        value = item.user_value
      }
      features[item.value] = value
      return item
    })

    const yearly_discount = plan.monthly_price * 12 - plan.yearly_price
    if (!isEdit) {
      dispatch(onCreatePlan({ ...plan, yearly_discount, restrictions: features }))
    } else {
      dispatch(onUpdatePlan({ ...plan, yearly_discount, restrictions: features }))
    }
  }
  const handleInvalidSubmit = () => {
  }

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
          <Breadcrumbs title="Plan and Prices" breadcrumbItem={`${isEdit ? "Edit" : "Create"} Plan`} />
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
                          <CardTitle className="mb-4">General Information</CardTitle>
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
                                    server: serverValidate
                                  }}
                                  onChange={setValue}
                                  value={plan.name || ""}
                                />
                              </div>
                            </Col>
                            <Col md="4" xl="4">
                              <div className="mb-3">
                                <AvField
                                  name="monthly_price"
                                  label="Monthly Price"
                                  type="number"
                                  errorMessage="The Monthly Price field is invalid"
                                  validate={{
                                    required: { value: true },
                                    server: serverValidate
                                  }}
                                  onChange={setValue}
                                  value={plan.monthly_price || ""}
                                />
                              </div>
                            </Col>
                            <Col md="4" xl="4">
                              <div className="mb-3">
                                <AvField
                                  name="yearly_price"
                                  label="Yearly Price"
                                  type="number"
                                  errorMessage="The yearly price field is invalid"
                                  validate={{
                                    required: { value: true },
                                    server: serverValidate
                                  }}
                                  onChange={setValue}
                                  value={plan.yearly_price || ""}
                                />
                              </div>
                            </Col>
                            <Col md="4" xl="4">
                              <div className="mb-3">
                                <AvField
                                  name="yearly_discount"
                                  label="Yearly Discount (%)"
                                  type="number"
                                  // readOnly
                                  onChange={setValue}
                                  // errorMessage="The yearly price field is invalid"
                                  // validate={{
                                  //   required: { value: true },
                                  //   server: serverValidate,
                                  // }}
                                  value={yearlyDiscount}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col md="4" xl="4">
                              <div className="mb-3">
                                <AvField
                                  name="max_students"
                                  label="Max Students"
                                  type="number"
                                  errorMessage="The maximum students field is invalid"
                                  validate={{
                                    required: { value: true },
                                    server: serverValidate
                                  }}
                                  onChange={setValue}
                                  value={plan.max_students || ""}
                                />
                              </div>
                            </Col>
                            <Col md="4" xl="4">
                              <div className="mb-3">
                                <AvField
                                  name="min_students"
                                  label="Min Students"
                                  type="number"
                                  errorMessage="The minimum students field is invalid"
                                  validate={{
                                    required: { value: true },
                                    server: serverValidate
                                  }}
                                  onChange={setValue}
                                  value={plan.min_students || ""}
                                />
                              </div>
                            </Col>
                          </Row>
                          <CardTitle className="mb-4">Available Features</CardTitle>
                          {selectedRestrictions.map((item, index) => (
                            <Row key={item.label}>
                              <Col md="4" xl="4">
                                <div className="mb-3">
                                  <Label>{item.label}</Label>
                                </div>
                              </Col>
                              <Col md="4" xl="4">
                                <AvField
                                  name="restrictions"
                                  type="select"
                                  // errorMessage="The minimum students field is invalid"
                                  // validate={{
                                  //   required: { value: true },
                                  //   server: serverValidate,
                                  // }}
                                  value={item.selected || ""}
                                  onChange={(e) => restrictionHandler(e, index)}
                                  className="mb-3"
                                >
                                  {/* {item.value == "email_response" && (
                                    <option value="all">Available for all</option>
                                  )} */}
                                  {/* {item.value != "email_response" && ( */}
                                  <option value="-1">Available for all</option>
                                  {/* )} */}
                                  <option value="0">Non Available</option>
                                  {item.value !== "email_response" && (
                                    <option value="1">Custom available</option>
                                  )}
                                  {item.value === "email_response" && (
                                    <option value="general_queries">General Queries</option>
                                  )}

                                </AvField>
                              </Col>
                              <CustomValue value={item.user_value} item={item}
                                           onChange={(e) => customValueHandler(e, index)} />
                              {temp}
                            </Row>
                          ))}
                          <Row>
                            <Col>
                              <div className="text-end">
                                {!create_loading && (
                                  <button
                                    type="submit"
                                    className="btn btn-success">
                                    Save
                                  </button>
                                )}
                                {create_loading && (
                                  <button
                                    type="button"
                                    className="btn btn-success">
                                    <i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />{" "}
                                    Loading
                                  </button>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </AvForm>
                      </CardBody>
                    </Card>
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
