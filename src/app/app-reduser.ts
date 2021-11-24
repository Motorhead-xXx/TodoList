import {InferActionTypes} from "./store";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

export type AppInitialStateType = typeof initialState

const initialState = {
    status: 'loading' as RequestStatusType,
    errorMessage: null as ErrorType
}

export const appReducer = (state: AppInitialStateType = initialState, action: AppActionsType): AppInitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS': {
            return {...state, status: action.status};
        }
        case 'APP/SET-ERROR': {
            return {...state, errorMessage: action.error}
        }
        default:
            return {...state}
    }
}

export type AppActionsType = InferActionTypes<typeof actionApp>

export const actionApp = {
    setAppStatus: (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const),
    setAppError: (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const),
}