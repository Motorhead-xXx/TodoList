import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {login} from "./authReducer";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../app/store";
import {Navigate} from "react-router-dom";
import {FormikHelpers, useFormik} from "formik";
import {LoginParamsType} from '../api/todolist-api';


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
type FormikValueType = {
    email: string
    password: string
    rememberMe: boolean
}


export const Login = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values: { email: string; password: string }) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required field';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required field'
            } else if (values.password.length < 3) {
                errors.password = "Invalid password ( < 3 symbols )"
            }
            return errors;
        },
        onSubmit: async (values: LoginParamsType, formikHelpers: FormikHelpers<FormikValueType>) => {
            const resultAction = await dispatch(login(values));

            if (login.rejected.match(resultAction)) {
                if (resultAction.payload?.fieldsErrors?.length) {
                    const error = resultAction.payload?.fieldsErrors[0];
                    formikHelpers.setFieldError(error.field, error.message)
                }
            }
        },
    })

    if (isLoggedIn) {
        return <Navigate to="/"/>
    }

    return (
        <div style={{marginTop: "50px"}}>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <FormLabel>
                            <p style={{fontWeight: "bold"}}>To log in get registered
                                <a href={'https://social-network.samuraijs.com/'}
                                   target={' _blank'}> here
                                </a>
                            </p>
                            <p style={{fontWeight: "bold"}}>or use common test account credentials:</p>
                            <p style={{fontWeight: "bold"}}>Email: <span style={{color: "orange"}}>free@samuraijs.com</span></p>
                            <p style={{fontWeight: "bold"}}>Password: <span style={{color: "orange"}}>free</span></p>
                        </FormLabel>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <TextField
                                    color={"success"}
                                    label="Email"
                                    margin="normal"
                                    {...formik.getFieldProps('email')}/>
                                {formik.touched.email || formik.errors.email ? <div style={{color: "red"}}>{formik.errors.email}</div> : null}

                                <TextField color={"success"} type="password" label="Password"
                                           margin="normal"
                                           {...formik.getFieldProps('password')}
                                />
                                {formik.touched.password || formik.errors.password ? <div style={{color: "red"}}>{formik.errors.password}</div> : null}
                                <FormControlLabel label={'Remember me'} control={<Checkbox color={"success"} onChange={formik.handleChange}
                                                                                           checked={formik.values.rememberMe}
                                                                                           name={"rememberMe"}/>}/>
                                <Button type={'submit'} variant={'contained'} color={'success'}>
                                    Login
                                </Button>
                            </FormGroup>
                        </form>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    )
}

