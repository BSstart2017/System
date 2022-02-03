import React, {FC, useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import store from "./redux/store";
import {Provider, useDispatch, useSelector} from "react-redux";
import Authorization from "./Pages/Authorization";
import OrderMap from "./Pages/OrderMap";
import { Layout } from "antd";
import {getIsLoginSelector} from "./redux/Selectors/OrderingSystemSelectors";
import Preloader from "./Components/Common/Preloader/Preloader";
import {initializedApp} from "./redux/appReducer";
import {getInitialized} from "./redux/Selectors/appSelector";

const { Content } = Layout;

const App: FC = () => {
    const initialized = useSelector(getInitialized)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializedApp())
    })

    if (!initialized){
        return <Preloader/>
    }else{
        return <AppStart/>
    }
}


const AppStart : FC = () =>{
    const isLogin = useSelector(getIsLoginSelector)

    return (
        <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
                {isLogin ?
                    <Switch>
                        <Route path="/orderMap" render={() =>  <OrderMap />}/>
                        <Route path="/" render={() => <Authorization />}/>
                        <Route render={() => <div>404 non found</div>}/>
                    </Switch>
                    : <Route path="/" render={() => <Authorization />}/>
                }
            </Content>
        </Layout>
    )
}

export const AppFastTaxiDriver = () => {
    return <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App/>
      </Provider>
    </BrowserRouter>
    </React.StrictMode>
}