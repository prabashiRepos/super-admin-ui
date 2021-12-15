import React, { useState } from "react"
import classnames from "classnames"
import { Alert, Badge, Col, Collapse, Label, Row } from "reactstrap"
import { Link } from "react-router-dom"

const QuestionsAccordionComponent = function({
                                               data,
                                               index,
                                               collapsed,
                                               onClick,
                                               onEdit,
                                               onDelete,
                                               onAddQuestion,
                                               children = <></>
                                             }) {
  const isCorrectAnswer = answer => {
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
            Q{index} - Question Number : {data.question_number || "-"}
            <Badge className="ms-2 bg-success">
              <strong>{data.mark || "0"}</strong> Marks
            </Badge>
            {data.status !== "publish" && (
              <Badge className="ms-2 bg-danger">{data.status}</Badge>
            )}
          </button>
        </h2>

        <Collapse isOpen={collapsed} className="accordion-collapse">
          <div className="accordion-body">
            <div>
              {data.question_content_type === "string" && (
                <h4 dangerouslySetInnerHTML={{ __html: data.question }} />
              )}
              {data.question_content_type === "image" && (
                <img src={data.question} height="100" />
              )}
            </div>
            <div className="text-muted">
              <div>Answers</div>
              <strong className="text-dark">
                <Row>
                  {data.answers.map((ans, ans_index) => (
                    <React.Fragment key={ans.answer}>
                      <Col>
                        <div
                          className={(isCorrectAnswer(ans.answer) ? "underline text-success d-flex" : "")}
                        >
                          <span className="me-2">{ans_index + 1}. </span>
                          {(ans.type === "url" || ans.type === "image") && (
                            <img height="40" src={ans.answer} />
                          )}

                          {ans.type === "string" && (
                            <span
                              dangerouslySetInnerHTML={{ __html: ans.answer }}
                            />
                          )}
                        </div>
                      </Col>
                    </React.Fragment>
                  ))}
                </Row>
              </strong>{" "}
              <Alert color="warning" role="alert" className="mt-2">
                <strong>Solution</strong>{" "}
                <div dangerouslySetInnerHTML={{ __html: data.solution }} />
              </Alert>
              {/*<div></div>*/}
              {data?.video_explanation?.embed?.html && (
                <>
                  <Label>Explanation Video</Label>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.video_explanation?.embed?.html
                    }}
                  />
                </>
              )}
              <div>
                {children}
              </div>
              <Link onClick={() => onAddQuestion(data)} className="me-4" to="#">
                <i
                  className="bx bx-add-to-queue font-size-18"
                  id="addtooltip"
                />{" "}
                Add Sub Question
              </Link>
              <Link onClick={() => onEdit(data)} className="text-success me-4" to="#">
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />{" "}Edit
              </Link>
              <Link onClick={() => onDelete(data)} className="text-danger" to="#">
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />{" "}Delete
              </Link>
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  )
}


const QuestionsAccordion = ({
                              data,
                              index,
                              onEdit,
                              onDelete,
                              onAddQuestion
                            }) => {
  const [activeAccordion, setActiveAccordion] = useState(-1)
  const [activeChildrenAccordion, setActiveChildrenAccordion] = useState(-1)

  const onSetAccordion = index => {
    setActiveAccordion(index)
    if (index == activeAccordion) {
      setActiveAccordion(-1)
    }
  }

  const onSetChildrenAccordion = index => {
    setActiveChildrenAccordion(index)
    if (index == activeChildrenAccordion) {
      setActiveChildrenAccordion(-1)
    }
  }

  return (
    <div>
      <QuestionsAccordionComponent
        index={index}
        data={data}
        collapsed={activeAccordion == index}
        onClick={() => onSetAccordion(index)}
        onEdit={() => onEdit({ from: "parent", data })}
        onDelete={() => onDelete(data)}
        onAddQuestion={onAddQuestion}
        children={
          <>
            {data.children.map((children, children_index) => (
              <QuestionsAccordionComponent
                index={children_index + 1}
                data={children}
                collapsed={activeChildrenAccordion == children_index}
                onClick={() => onSetChildrenAccordion(children_index)}
                onEdit={() => onEdit({ from: "children", data: children })}
                onDelete={() => onDelete(children)}
                onAddQuestion={onAddQuestion}
              />
            ))}
          </>
        }
      />
    </div>
  )
}

QuestionsAccordion.propTypes = {}

export default QuestionsAccordion

