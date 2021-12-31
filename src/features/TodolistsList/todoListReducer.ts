import {todolistsAPI, TodolistType} from "../../api/todolist-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RequestStatusType, setAppStatus} from "../../app/appReduser";


export const fetchTodolist = createAsyncThunk('todolists/fetchTodolist', async (param, {dispatch}) => {
    dispatch(setAppStatus({status: "loading"}));
    const res = await todolistsAPI.getTodolists();
    dispatch(setAppStatus({status: "succeeded"}));
    return {todolists: res.data};
});

export const removeTodolist = createAsyncThunk('todolists/removeTodolist', async (id: string, {dispatch}) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({todolistId: id, status: "loading"}))
    await todolistsAPI.deleteTodolist(id);
    dispatch(setAppStatus({status: "succeeded"}));
    return {todolistId: id};
});

export const createTodolist = createAsyncThunk('todolists/createTodolistTitle', async (title: string, {dispatch}) => {
    dispatch(setAppStatus({status: "loading"}));
    const res = await todolistsAPI.createTodolist(title);
    dispatch(setAppStatus({status: "succeeded"}));
    return {todolist: res.data.data.item};
});

export const updateTitleTodolist = createAsyncThunk('todolists/updateTitleTodolist', async (param: { todolistId: string, title: string }, {dispatch}) => {
    dispatch(setAppStatus({status: "loading"}));
    dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "loading"}))
    await todolistsAPI.updateTodolistTitle(param.todolistId, param.title)
    dispatch(setAppStatus({status: "succeeded"}));
    dispatch(changeTodolistEntityStatus({todolistId: param.todolistId, status: "succeeded"}))
    return {todolistId: param.todolistId, title: param.title};
});

export const asyncActions = {
    fetchTodolist,
    removeTodolist,
    createTodolist,
    updateTitleTodolist,
}

export const slice = createSlice({
    name: "todolists",
    initialState: [] as TodolistDomainType[],
    reducers: {
        changeTodolistEntityStatus: (state, action: PayloadAction<{ todolistId: string, status: RequestStatusType }>) => {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, entityStatus: action.payload.status} : tl)
        },

        changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string, filter: FilterValuesType }>) => {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodolist.fulfilled, (state, action) => {
                return action.payload.todolists.map(m => ({...m, filter: 'all', entityStatus: 'idle'}))
            })
            .addCase(removeTodolist.fulfilled, (state, action) => {
                return state.filter(tl => tl.id !== action.payload.todolistId);
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'});
            })
            .addCase(updateTitleTodolist.fulfilled, (state, action) => {
                return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
            })
    }
});

export const todoListsReducer = slice.reducer
export const {changeTodolistEntityStatus, changeTodolistFilter} = slice.actions

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
    entityStatus: RequestStatusType,
};