import {AppThunkType, InferActionTypes} from "./store";
import {setIsLoggedInAC} from "../features/authReducer";
import {authApi} from "../api/todolist-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

export type AppInitialStateType = typeof initialState

const initialState = {
    status: 'idle' as RequestStatusType,
    errorMessage: null as ErrorType,
    initialized: false,
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status};
        }
        case 'APP/SET-ERROR': {
            return {...state, errorMessage: action.error}
        }
        case 'APP/SET-INITIALIZED':
            return {...state, initialized:action.initialized}
        default:
            return {...state}
    }
}

export type AppActionsType = InferActionTypes<typeof actionApp>

export const actionApp = {
    setAppStatus: (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const),
    setAppError: (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const),
    setAppInitialized: (initialized: boolean) => ({type: 'APP/SET-INITIALIZED', initialized} as const)
}

export const initializeAppTC = ():AppThunkType => (dispatch) => {
    authApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        }else {

        }
        dispatch(actionApp.setAppInitialized(true))
    })
}