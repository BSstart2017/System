import React, {FC} from "react"
import LoginForm from "./LoginForm"
import {Col, Row} from "antd"
import styles from './login.module.css'

const Login: FC = () => {

    return (
        <Row justify={"center"} align={'middle'} className={styles.container}>
            <Col span={6}>
                <LoginForm onSubmit={values => {}}/>
            </Col>
        </Row>
    )
}

export {Login}

