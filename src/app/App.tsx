import React, {useEffect} from 'react'
import './App.css';
import {AppBar, Button, CircularProgress, Container, Toolbar} from "@material-ui/core";
import {LinearProgress} from "@mui/material";
import TodolistList from "../features/TodolistsList/TodolistList";
import {SnackbarError} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reduser";
import {Login} from "../features/login";
import {Navigate, Route, Routes} from "react-router-dom";
import {logoutTC} from "../features/authReducer";

type PropsType = {
    demo?: boolean
}

const App = ({demo=false,...props}:PropsType) => {
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    const logOut = () => {
        dispatch(logoutTC())
    }


    return (
        <div className="App">
            <SnackbarError/>
            <AppBar style={{backgroundColor: "green", color: "white"}} color={"transparent"} position="static">
                <Toolbar>
                    {/*<IconButton edge="start" color="inherit" aria-label="menu">*/}
                    {/*    <Menu/>*/}
                    {/*</IconButton>*/}

                    {isLoggedIn && <Button variant={"outlined"} onClick={logOut} color={"inherit"}>Log out</Button>}
                </Toolbar>

            </AppBar>
            {status === "loading" && <LinearProgress sx={{position:"relative"}} color={"warning"} />}
            <Container fixed>
                <Routes>
                    <Route path={"/"} element={<TodolistList demo={demo}/>}/>
                    <Route path={"login"} element={<Login/>}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND </h1>}/>
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
