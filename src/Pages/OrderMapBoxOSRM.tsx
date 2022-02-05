import React, {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersManyThunk} from "../redux/OrderMapReducer";
import {
    getActiveClientSelector,
    getOrdersManySelector,
    getSelectClientSelector
} from "../redux/Selectors/OrderMapSelectors";
import {MapBoxOSRM} from "../Components/OrderMapBox";
import {OrderTable} from "../Components/OrderTable";

const OrderMapBoxOSRM: FC = () => {

    const dispatch = useDispatch()
    const ordersMany = useSelector(getOrdersManySelector)
    const activeClient = useSelector(getActiveClientSelector)
    const selectClient = useSelector(getSelectClientSelector)

    useEffect(() => {
        if(ordersMany.length === 0 ) dispatch(getOrdersManyThunk())
    },[dispatch, ordersMany])

    return (
        <div>
            <OrderTable ordersMany={ordersMany} activeClient={activeClient} selectClient={selectClient}/>
            <MapBoxOSRM ordersMany={ordersMany} activeClient={activeClient} selectClient={selectClient}/>
        </div>
    )
}


export default OrderMapBoxOSRM

