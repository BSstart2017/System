import React, {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Formik} from 'formik'
import {actions, postRefreshTokenAuthThunk} from "../../redux/AuthorizationReducer";
import {Input, SubmitButton, Form} from "formik-antd"
import styles from './login.module.css'
import {getIsLoginValidationErrorSelector} from "../../redux/Selectors/AuthorizationSelectors";

const LoginForm: React.FC<PropsType> = ({onSubmit}) => {

    const dispatch = useDispatch()

    const isLoginValidationError = useSelector(getIsLoginValidationErrorSelector)

    const handleSubmit = async (values: FormType) => {
        onSubmit(values)
       await dispatch(postRefreshTokenAuthThunk(values.username, values.password))
    }

    const onStopIsError = useCallback(()=>{
        dispatch(actions.setIsLoginValidationErrorToken(false))
    },[dispatch])

    return (
        <Formik<FormType> initialValues={{username:'', password:''}} onSubmit={handleSubmit}>
            <Form onClick={onStopIsError} className={styles.formContainer}>
                <Input required={true} className={styles.item} name='username' aria-label='username' placeholder='username' type={"text"}/>
                <Input required={true} className={styles.item} name='password' aria-label='password' placeholder='Password' type={"password"}/>
                {isLoginValidationError && <div style={{color: 'red'}}>Wrong username or password entered</div>}
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