import React from 'react'
import './App.css';
import {AppBar, Button, Container, IconButton, Toolbar} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {LinearProgress} from "@mui/material";
import TodolistList from "../features/TodolistsList/TodolistList";
import {SnackbarError} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reduser";

type PropsType = {
    demo?: boolean
}

const App = ({demo=false,...props}:PropsType) => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className="App">
            <SnackbarError/>
            <AppBar style={{backgroundColor: "green", color: "white"}} color={"transparent"} position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Button variant={"outlined"} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            {status === "loading" && <LinearProgress sx={{position:"relative"}} color={"warning"} />}
            <Container fixed>
                <TodolistList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;
