import React from 'react'
import { Alert } from 'antd'
import { setError } from '../../app/ipPhoneSlice'
import { useDispatch, useSelector } from 'react-redux'

const Warning = ({error}) => {
    const dispatch = useDispatch()
    return(
        <Alert
            message="Warning"
            description={error}
            type="warning"
            showIcon
            closable    
            onClose={() => dispatch(setError(''))}  
        />
    )
}

export default Warning