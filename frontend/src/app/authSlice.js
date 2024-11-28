import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name : 'auth',
    initialState : {
        isAuth : false,
        user : {}       
    },
    reducers : {
        setIsAuth : (state,action) => {
            state.isAuth = action.payload;
        },
        setUser : (state,action) => {
            state.user = action.payload;
        }
    }    
})

export const { 
    setIsAuth,
    setUser   
} = authSlice.actions

export default authSlice.reducer