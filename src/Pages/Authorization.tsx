import React, {FC} from "react";
import {useSelector} from "react-redux";
import {getIsLoginSelector} from "../redux/Selectors/AuthorizationSelectors";
import {Redirect} from "react-router-dom";
import {Login} from "../Components/Login";


const Authorization: FC = () => {

    const isLogin = useSelector(getIsLoginSelector)

    if (isLogin) return <Redirect to="orderMap/"/>

    return <Login />
}

export default Authorization