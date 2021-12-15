import React, { useEffect } from "react"
import { Button, Col, Container, Row } from "reactstrap"
import MetaTags from "react-meta-tags"
import { Link } from "react-router-dom"

import Breadcrumbs from "../../components/Common/Breadcrumb"
import CardPricing from "components/Common/CardPricing"
import { clean, done, fulfilled, pending, rejected } from "redux-saga-thunk"
import { deleteItem as onDeletePlan, getList as onGetPlans } from "store/plan-and-prices/actions"
import { useDispatch, useSelector } from "react-redux"
import { showToastMessage } from "helpers/toaster"
import Permission from "components/Common/Permission"

const PlanAndPrices = (props) => {
  const dispatch = useDispatch()
  // const [isEdit, setIsEdit]=useState(false)

  const {
    plans,
    error,
    success,
    get_loading,
    failed,
    del_error,
    del_success
  } = useSelector(state => ({
    plans: state.plansAndPrices.plans,
    error_message: state.plansAndPrices.error,
    form_errors: state.plansAndPrices.form_errors,
    get_loading: pending(state, "GET_PLANS"),
    success: fulfilled(state, "GET_PLANS"),
    failed: rejected(state, "GET_PLANS"),
    done: done(state, "GET_PLANS"),
    del_error: rejected(state, "DELETE_PLAN"),
    del_success: fulfilled(state, "DELETE_PLAN")
  }))

  useEffect(() => {
    dispatch(onGetPlans())
    dispatch(clean("DELETE_PLAN"))
  }, [])

  useEffect(() => {
    if (del_success) {
      showToastMessage("success", "Plan successfully deleted")
    }
    if (del_error) {
      showToastMessage("error", "Plan failed to delete")
    }
  }, [del_success, del_error])

  const onRemovePlan = (plan) => {
    dispatch(onDeletePlan({ id: plan.id }))
  }
  const onEdit = (plan) => {
    // setIsEdit(true)
    props.history.push({
      pathname: "/plan-and-prices/edit",
      search: "",
      state: {
        isEdit: true,
        plan
      }
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Plans and Pricing | SqillUp</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Plan and Prices" breadcrumbItem="Plans List" />
          <Permission permission="create-plan">
            <Row>
              <Col sm="12" className="mb-3">
                <div className="text-sm-end">
                  <Link to="/plan-and-prices/create">
                    <Button
                      color="primary"
                      className="font-16 btn-block btn btn-primary">
                      <i className="mdi mdi-plus-circle-outline me-1" />
                      Create New Plan
                    </Button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Permission>
          <Row>
            {plans.map((plan, key) => (
              <CardPricing onEdit={onEdit} onRemove={onRemovePlan} pricing={plan} key={"_pricing_" + key} md="3"
                           xl="4" />
            ))}
          </Row>
          <Row>
            <Col>
              {get_loading && (
                <div className="text-center text-success">
                  <i className="bx bx-loader bx-spin bx-lg font-size-25 align-middle me-2" />
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default PlanAndPrices
