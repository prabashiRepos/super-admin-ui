import React, { useState } from "react"
import PropTypes from 'prop-types'
import {  Label,  InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { AvField, AvGroup, AvFeedback } from 'availity-reactstrap-validation';

const PasswordField = ({ name, label, value, onChange, validate, errorMessage }) => {
    const [isVisibleText, setIsVisibleText] = useState(false)

    const typeHandler = () => {
        setIsVisibleText(!isVisibleText)
    }
    return (
       <>
            <AvGroup>
                <Label for="amount">{label}</Label>
                <InputGroup className="sq-password-field"> 
                    <AvField
                        name={name}
                        type={ isVisibleText?'text':'password'}
                        errorMessage={errorMessage}
                        validate={validate}
                        value={value || ""}
                        onChange={onChange}
                    />
                        <InputGroupAddon addonType="prepend">
                        <InputGroupText onClick={typeHandler}>
                            <a href="#">
                                <i class={`${isVisibleText? 'fas fa-eye-slash':'fas fa-eye'} `} aria-hidden="true"></i>
                            </a>
                        </InputGroupText>
                    </InputGroupAddon>
                    <AvFeedback>{errorMessage}</AvFeedback>
                </InputGroup>
            </AvGroup>
        </>
  )
}

PasswordField.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    errorMessage:PropTypes.string,
    validate: PropTypes.shape({}),
    onChange: PropTypes.func
}
PasswordField.defaultProps = {
    name: "password",
    label: "Password",
    value: "",
    errorMessage: "The Password field is invalid",
    validate: {},
    onChange: ()=>{}
}

export default PasswordField
