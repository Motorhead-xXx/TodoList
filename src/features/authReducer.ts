import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {authAPI, FieldErrorType, LoginParamsType} from "../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Dispatch} from "redux";
import {setAppStatus} from "../app/app-reduser";
import {AxiosError} from "axios";


export const login = createAsyncThunk<{ isLoggedIn: boolean },LoginParamsType, {
    rejectValue:{errors: Array<string>, fieldsErrors?: Array<FieldErrorType>}}
>('auth/login', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    let res = await authAPI.login(param);
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({errors: res.data.messages})
        }
    } catch (error) {
        let err = error as AxiosError
        handleServerNetworkError({message: err.message}, dispatch);
        return rejectWithValue({errors: [err.message], fieldsErrors: undefined})
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, {dispatch,rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error) {
        let err = error as AxiosError
        handleServerNetworkError({message: err.message}, dispatch);
        return rejectWithValue({errors: [err.message], fieldsErrors: undefined})
    }
})

export const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: (builder => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })

    })
});

export const {setIsLoggedIn} = slice.actions
export const authReducer = slice.reducer;

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedIn({value: false}))
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}