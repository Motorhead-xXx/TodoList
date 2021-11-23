import React, {useCallback, useEffect} from 'react'
import './App.css';
import {
    actionTodo,
    createTodolistTC,
    FilterValuesType,
    getTodolistThunkTC,
    removeTodolistTC,
    TodolistDomainType,
    updateTitleTodolistTC
} from "./reducers/todoListReducer";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {createTaskTC, removeTaskTC, TasksStateType, titleUpdateTaskTC, updateTaskStatusTC} from "./reducers/tasksReducer";
import {AddItemForm} from "./components/AddItemFormPropsType";
import {TaskStatuses} from "./api/todolist-api";
import {Todolist} from "./components/Todolist";
import {AppRootStateType} from "./store/store";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";



function App() {
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodolistThunkTC())
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        dispatch(removeTaskTC(id, todolistId));
    }, []);
    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(createTaskTC(todolistId, title));
    }, []);
    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskStatusTC(id, todolistId, status));
    }, []);
    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(titleUpdateTaskTC(id, newTitle, todolistId));
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        dispatch(removeTodolistTC(id));
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        dispatch(actionTodo.changeTodolistFilterAC(todolistId, value));
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(updateTitleTodolistTC(id,title));
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolistTC(title));
    }, []);

    return (
        <div className="App">
            <AppBar style={{backgroundColor:"green", color:"white"}} color={"transparent"} position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default App;
