import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {authAPI, LoginParamsType} from "../api/todolist-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatus} from "../app/app-reduser";

const initialState = {
    isLoggedIn: false
}

export const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction <{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    }
})

export const {setIsLoggedIn} = slice.actions

export const authReducer = slice.reducer;

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.login(data).then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({value: true}))
            dispatch(setAppStatus({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch);
        }
    })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const logoutTC = () => (dispatch:Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: false}))
                dispatch(setAppStatus({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}