import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import ipPhoneReducer from './ipPhoneSlice'

//configureStore — функция, предназначенная для создания и настройки хранилища 
export default configureStore({
    reducer : {
        auth : authReducer,
        ipPhone : ipPhoneReducer
    }
})