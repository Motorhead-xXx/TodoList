import {authAPI} from "../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setIsLoggedIn} from "../features/authReducer";


export const initializeApp = createAsyncThunk('application/initializeApp', async (param, {dispatch}) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedIn({value: true}));
    } else {

    }
})

export const slice = createSlice({
    name: "app",
    initialState: {
        status: 'idle',
        errorMessage: null,
        initialized: false,
    } as InitialStateType,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.errorMessage = action.payload.error
        },
    },
    extraReducers: (builder => {
        builder
            .addCase(initializeApp.fulfilled, (state) => {
                state.initialized = true
            })
    })
})


export const {setAppStatus, setAppError} = slice.actions

export const appReducer = slice.reducer
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    errorMessage: string | null
    initialized: boolean
}