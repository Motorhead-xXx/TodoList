import {actionApp, AppActionsType} from "../app/app-reduser";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch:ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(actionApp.setAppError(data.messages[0]))
    } else {
        dispatch(actionApp.setAppError('Some error occurred'))
    }
    dispatch(actionApp.setAppStatus('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch:ErrorUtilsDispatchType) => {
    dispatch(actionApp.setAppError(error.message))
    dispatch(actionApp.setAppStatus('failed'))
}
type ErrorUtilsDispatchType = Dispatch<AppActionsType>
