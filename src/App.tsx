import React, {FC, useEffect} from "react";
import {BrowserRouter} from "react-router-dom";
import store from "./redux/store";
import {Provider} from "react-redux";
import Authorization from "./Pages/Authorization";
import OrderMap from "./Pages/OrderMap";


const App: FC = () => {
  return (
      <>
        <Authorization />
        <OrderMap />
      </>
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