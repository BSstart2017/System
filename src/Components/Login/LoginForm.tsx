import React from "react";
import {useDispatch} from "react-redux";
import { Formik } from 'formik'
import {postRefreshTokenAuthThunk} from "../../redux/AuthorizationReducer";
import {Input, SubmitButton, Form} from "formik-antd"
import styles from './login.module.css'

const LoginForm: React.FC<PropsType> = ({onSubmit}) => {

    const dispatch = useDispatch()
    //todo: validation
    const handleSubmit = async (values: FormType) => {
        onSubmit(values)
       await dispatch(postRefreshTokenAuthThunk(values.username, values.password))
    }

    return (
        <Formik<FormType> initialValues={{username:'', password:''}} onSubmit={handleSubmit}>
            <Form className={styles.formContainer}>
                <Input className={styles.item} name='username' aria-label='username' placeholder='username' type={"text"}/>
                <Input className={styles.item} name='password' aria-label='password' placeholder='Password' type={"password"}/>
                <SubmitButton type={"primary"}>Login</SubmitButton>
            </Form>
        </Formik>
    );
};

export default LoginForm

type PropsType = {
    onSubmit: (values:FormType) => void
}

type FormType = {
    username: string
    password: string
}