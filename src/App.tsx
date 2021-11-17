import React, {useCallback} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {AddItemForm} from "./components/AddItemFormPropsType";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTaskAC, changeStatusAC, onChangeTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasksReducer";
import {addTodoListAC, changeTodoFilterAC, onChangeTodoListTitleAC, removeTodolistAC, todoListsReducer} from "./reducers/todoListReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


const  App = React.memo(() => {
    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootStateType,TodolistType[]>(state =>state.todoLists)
    const tasks = useSelector<AppRootStateType,TasksStateType>(state=>state.tasks)

 const onChangeTitle = useCallback((value: string, todolistId: string, id: string) => {
        dispatch(onChangeTitleAC(value,todolistId,id))
    },[dispatch])

    const removeTask = useCallback((id: string, todolistId: string) => {
    dispatch(removeTaskAC(id,todolistId))
    },[dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
    dispatch(addTaskAC(title,todolistId))
    },[dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeStatusAC(id,isDone,todolistId))
    },[dispatch])


    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    },[dispatch])

    const changeTodoFilter = useCallback((valueFilter: FilterValuesType, todolistId: string) => {
        dispatch(changeTodoFilterAC(valueFilter,todolistId))
    },[dispatch])

    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id)
        dispatch(action)
    },[dispatch])

    const onChangeTodoListTitle = useCallback((title: string, id: string) => {
        dispatch(onChangeTodoListTitleAC(title, id))
    },[dispatch])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed style={{marginTop:"10px"}}>
                <Grid container>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
            </Container>

            <Container fixed>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];


                            return <Grid item>
                                <Paper style={{padding:"20px", marginTop: "40px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeTodoFilter={changeTodoFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        onChangeTaskTitle={onChangeTitle}
                                        onChangeTodoListTitle={onChangeTodoListTitle}
                                    />
                                </Paper>

                                </Grid>
                        })
                    }

                </Grid>
            </Container>

        </div>
    );
})

export default App;
