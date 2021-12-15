import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from "react-redux"

function Permission({permission,children}) {
    // const { permissions_array } = useSelector(state => ({
    //     permissions_array: state.Login.permissions_array,
    // }));
    const permissions_array=JSON.parse(localStorage.getItem("sqillup_permissions"))
    
    if (Array.isArray(permission)) {
        const isFound = permissions_array.some(r => permission.indexOf(r) >= 0)
        return isFound && children
    }
    return permissions_array.includes(permission) && children
}

export default Permission