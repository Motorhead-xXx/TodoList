import './App.css';
import {AppBar, Button, CircularProgress, Container, Toolbar} from "@material-ui/core";
import {LinearProgress} from "@mui/material";
import {SnackbarError} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {initializeApp, RequestStatusType} from "./appReduser";
import {Login} from "../features/login";
import {Navigate, Route, Routes} from "react-router-dom";
import {logout} from "../features/authReducer";
import {useCallback, useEffect} from "react";
import {TodolistList} from "../features/TodolistsList/TodolistList";

type PropsType = {
    demo?: boolean
}

const App = ({demo = false}: PropsType) => {
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.initialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!demo){
            dispatch(initializeApp())
        }
    }, [dispatch])

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [dispatch])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (

        <div className="App">
            <SnackbarError/>
            <AppBar style={{backgroundColor: "green", color: "white"}} color={"transparent"} position="static">
                <Toolbar>
                    {isLoggedIn && <Button color="inherit" variant={"outlined"} onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
            </AppBar>
            <div style={{height:"3px"}}>{status === "loading" && <LinearProgress sx={{position: "relative"}} color={"warning"}/>}</div>
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
