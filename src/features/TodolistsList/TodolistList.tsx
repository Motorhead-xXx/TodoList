import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemFormPropsType/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import React, {useCallback, useEffect} from "react";
import {createTodolist, fetchTodolist, TodolistDomainType} from "./todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {TasksStateType} from "./tasksReducer";
import {RequestStatusType} from "../../app/appReduser";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}

export const TodolistList = React.memo(({demo=false}:PropsType) => {
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todoLists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todoLists)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch();

    useEffect(() => {
        if(demo || !isLoggedIn){
            return
        }
        dispatch(fetchTodolist())
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, []);

    if (!isLoggedIn){
        return <Navigate to="/login"/>
    }

    return <>
        <Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist} disabled={status === "loading"}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map((tl) => {

                    let allTodolistTasks = tasks[tl.id];

                    return <Grid item key={tl.id}>
                        <Paper style={{padding: '10px'}}>
                            <Todolist
                                todolist={tl}
                                tasks={allTodolistTasks}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
})