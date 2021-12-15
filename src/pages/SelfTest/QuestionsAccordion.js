import React from "react"
import classnames from "classnames"
import { Alert, Badge, Col, Collapse, Row } from "reactstrap"
import { Link } from "react-router-dom"

function QuestionsAccordion({
                              data,
                              index,
                              collapsed,
                              onClick,
                              onEdit,
                              onDelete
                            }) {
  const isCorrectAnswer = (answer) => {
    let isCorrect = false
    data.correct_answers?.forEach(item => {
      if (item.answer == answer) {
        isCorrect = true
      }
    })
    return isCorrect
  }
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="headingFlushOne">
          <button
            className={classnames("accordion-button", "fw-medium", {
              collapsed: collapsed
            })}
            type="button"
            onClick={onClick}
            style={{ cursor: "pointer" }}
          >
            Question {index}
            <Badge className="ms-2 bg-success">
              <strong>{data.mark || "0"}</strong> Marks
            </Badge>
            {(data.status != "publish") && (
              <Badge className="ms-2 bg-danger">
                {data.status}
              </Badge>
            )}
          </button>
        </h2>

        <Collapse isOpen={collapsed} className="accordion-collapse">
          <div className="accordion-body">
            <div>
              <h4>{data.question}</h4>
            </div>
            <div className="text-muted">
              <div>Answers</div>
              <strong className="text-dark">
                <Row>
                  {data.answers.map((ans, ans_index) => (
                    <div key={ans.id}>
                      <Col>
                        <div className={isCorrectAnswer(ans.answer) && "underline text-success"}>
                          <span className="me-2">{ans_index + 1}. </span>
                          {(ans.type == "image" || ans.type == "url") && (
                            <img height="40" src={ans.answer} />
                          )}

                          {ans.type == "string" && ans.answer}
                        </div>
                      </Col>
                    </div>
                  ))}
                </Row>
              </strong>{" "}
              <Alert color="warning" role="alert" className="mt-2">
                <strong>Solution</strong> {data.solution}
              </Alert>

              <Link onClick={() => onEdit(data)} className="text-success me-4" to="#">
                <i
                  className="mdi mdi-pencil font-size-18"
                  id="edittooltip"
                />{" "}
                Edit
              </Link>
              <Link onClick={() => onDelete(data)} className="text-danger" to="#">
                <i
                  className="mdi mdi-delete font-size-18"
                  id="deletetooltip"
                />{" "}
                Delete
              </Link>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  )
}

QuestionsAccordion.propTypes = {}

export default QuestionsAccordion
