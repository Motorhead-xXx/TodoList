import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {setAppError} from "../../app/appReduser";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function SnackbarError() {

    const error = useSelector<AppRootStateType, string|null>(state => state.app.errorMessage)
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent<any> | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppError({error:null}))
    };


    const isOpen = error !== null

    return (
        <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "center"}} open={isOpen} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}