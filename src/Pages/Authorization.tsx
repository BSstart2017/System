import React, {FC} from "react";
import Login from "../Components/Login/Login";
import {useSelector} from "react-redux";
import {getIsLoginSelector} from "../redux/Selectors/OrderingSystemSelectors";
import {Redirect} from "react-router-dom";


const Authorization: FC = () => {

    const isLogin = useSelector(getIsLoginSelector)

    if (isLogin) return <Redirect to="orderMap/"/>

  return (
      <>
          <Login />
      </>
  )
}

export default Authorization