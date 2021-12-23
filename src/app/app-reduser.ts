import {authAPI} from "../api/todolist-api";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoggedIn} from "../features/authReducer";


const initialState: InitialStateType = {
    status: 'idle',
    errorMessage: null,
    initialized: false,
}

export const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatus: (state, action: PayloadAction <{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError:(state, action: PayloadAction <{ error: string|null }>)=>{
            state.errorMessage = action.payload.error
        },
        setAppInitialized:(state, action: PayloadAction <{ initialized: boolean}>) => {
            state.initialized = action.payload.initialized
        },
    }
})

export const initializeAppTC = () => (dispatch:Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value:true}));
        }else {

        }
        dispatch(setAppInitialized({initialized:true}))
    })
}

export const {setAppStatus,setAppError, setAppInitialized} = slice.actions

export const appReducer = slice.reducer

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    errorMessage: string|null
    initialized: boolean
}