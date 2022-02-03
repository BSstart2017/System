import React from "react";
import {useDispatch} from "react-redux";
import { Formik } from 'formik'
import {postRefreshTokenAuthThunk} from "../../redux/OrderingSystemReducer";
import {Input, SubmitButton, Form} from "formik-antd";

const LoginForm: React.FC<PropsType> = ({onSubmit}) => {

    const dispatch = useDispatch()

    const handleSubmit = async (values: FormType) => {
        onSubmit(values)
       await dispatch(postRefreshTokenAuthThunk(values.username, values.password))
    }

    return (
        <Formik<FormType> initialValues={{username:'', password:''}} onSubmit={handleSubmit}>
            <Form>
            <Input name='username' aria-label='username' placeholder='username' type={"text"}/>
            <Input name='password' aria-label='password' placeholder='Password' type={"password"}/>
            <SubmitButton type={"primary"}>login</SubmitButton>
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