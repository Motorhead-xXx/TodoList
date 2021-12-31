import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {authAPI, FieldErrorType, LoginParamsType} from "../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "../app/appReduser";
import {AxiosError} from "axios";


export const login = createAsyncThunk<undefined , LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>('auth/login', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    let res = await authAPI.login(param);
    try {
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return
        } else {
            handleServerAppError(res.data, dispatch);
            return rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error) {
        let err = error as AxiosError
        handleServerNetworkError({message: err.message}, dispatch);
        return rejectWithValue({errors: [err.message], fieldsErrors: undefined})
    }
})

export const logout = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setAppStatus({status: 'succeeded'}))
            return
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
                state.isLoggedIn = true
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false
            })

    })
});

export const {setIsLoggedIn} = slice.actions
export const authReducer = slice.reducer;
