import PropTypes from 'prop-types'
import React from "react"
import { Link } from "react-router-dom"
import { Button, Card, CardBody, Col, Media, Badge } from "reactstrap"
import Permission from 'components/Common/Permission'

const restrictions = [
  {label:"Video per chapter",value:"video_per_chapter"},
  {label:"Q&A",value:"q_a"},
  {label:"Self test per chapter",value:"self_test_per_chapter"},
  {label:"Past Paper Topic - Interactive mode",value:"past_paper_topic_interactive"},
  {label:"Pass Paper - PDF",value:"past_paper_topic_pdf"},
  {label:"Pass Paper Year - Interactive",value:"past_paper_year_interactive"},
  {label:"Pass Paper Year - PDF",value:"past_paper_year_pdf"},
  {label:"Past Paper marking scheme - PDF",value:"past_paper_marking_scheme_pdf"},
  {label:"Challenges per chapter",value:"chalanges_per_chapter"},
  {label:"Free Resources",value:"free_resources"},
  {label:"Email Response",value:"email_response"}
]

const CardPricing = props => {

  const getFeatureName = (object,key) => {
    var value = object[key]

    // For email field only
    if (key == "email_response") {
      if (value == 'all') {
        label = "fas fa-check-circle text-success"
        return (
          <div className={`me-2 mt-1 ${label}`}></div>
        )
      } else if (value==null) {
        label = "fas fa-times-circle text-danger"
        return (
          <div className={`me-2 mt-1 ${label}`}></div>
        )
      }
    }
    
    
    // Except Email Field
    var label = "";
    if (value == null) {
      label = "fas fa-check-circle text-success"
      return (
        <div className={`me-2 mt-1 ${label}`}></div>
      )
    }

    if (value == 0) {
      label = "fas fa-times-circle text-danger"
      return (
        <div className={`me-2 mt-1 ${label}`}></div>
      )
    }
    else {
      label = value
      return (
        <h6>
          <Badge className="bg-success me-2 mt-1">
            {/* {item.year} */}
            {/* <div className="my-2"> */}
              {label}
            {/* </div> */}
          </Badge>
        </h6>
      )
    }
    
  }

  return (
    <React.Fragment>
      <Col xl={props.xl} md={props.md}>
        <Card className="plan-box">
          <CardBody className="p-4">
            <Media>
              <Media body>
                <h5>{props.pricing.name}</h5>
              </Media>
              <div className="ms-3">
              <Permission permission="update-plan">
                <Button
                  onClick={()=>props.onEdit(props.pricing)}
                  className="btn btn-sm btn-warning mr-2">
                      <i className="bx bx bx-edit text-white" />
                </Button>
              </Permission>
              <Permission permission="delete-plan">
                <Button
                  onClick={()=>props.onRemove(props.pricing)}
                  className="btn btn-sm btn-danger">
                      <i className="bx bx-x text-white" />
                  </Button>
              </Permission>
                  
              </div>
              {/* <div className="ms-3">
                <i
                  className={"bx bx bx-message-square-edit h1 text-primary"}
                />
              </div> */}
            </Media>
            <div className="">
                Monthly 
              <h3 className="my-2">
                <sup>
                  <small>$</small>
                </sup>
                {props.pricing.monthly_price}
                {/* <span className="font-size-13">{props.pricing.duration}</span> */}
              </h3>
            </div>
            <div className="mb-2">
              Yearly 
              <h3 className="my-2">
                <sup>
                  <small>$</small>
                </sup>
                {props.pricing.yearly_price}{" "}
                {props.pricing.yearly_discount != 0 && (
                  <span className="font-size-14 bg-warning px-2">{(props.pricing.yearly_discount/((props.pricing.monthly_price*12)/100)).toFixed(2)}%</span>
                )}
              </h3>
            </div>
            <div className="plan-features mt-2">
              {restrictions.map((feature, key) => (
                <p className="d-flex" key={"_feature_" + key}>
                  {/* <i className="bx bx-checkbox-square text-primary me-2" />{" "} */}
                  {getFeatureName(props.pricing.restrictions, feature.value)}
                  {feature.label}
                </p>
              ))}
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardPricing.propTypes = {
  pricing: PropTypes.object,
  md:PropTypes.number,
  xl:PropTypes.number
}
CardPricing.defaultProps = {
  pricing: {},
  md:6,
  xl:3
}

export default CardPricing
