import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";
import {setAppError, setAppStatus} from "../app/app-reduser";

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch:Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error:data.messages[0]}))
    } else {
        dispatch(setAppError({error:'Some error occurred'}))
    }
    dispatch(setAppStatus({status:'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch:Dispatch) => {
    dispatch(setAppError({error: error.message}))
    dispatch(setAppStatus({status:'failed'}))
}
