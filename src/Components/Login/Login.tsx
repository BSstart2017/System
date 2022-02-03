import React, {FC} from "react";
import LoginForm from "./LoginForm";
import {Col, Row} from "antd";

const Login: FC = () => {

    return (
        <Row>
            <Col span={8}>
                <LoginForm onSubmit={values => {}}/>
            </Col>
        </Row>
    );
}

export default Login

