import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersManyThunk} from "../redux/OrderMapReducer";
import {
    getActiveClientSelector, getIsPreloadingSelector,
    getOrdersManySelector,
    getSelectClientSelector
} from "../redux/Selectors/OrderMapSelectors";
import {MapBoxOSRM} from "../Components/OrderMapBox";
import {OrderTable} from "../Components/OrderTable";
import {Preloader} from "../Components/Common/Preloader";
import {Button} from "antd";
import OrderMapGoogle from "./OrderMapGoogle";

const OrderMapBoxOSRM: FC = () => {

    const dispatch = useDispatch()

    const ordersMany = useSelector(getOrdersManySelector)
    const activeClient = useSelector(getActiveClientSelector)
    const selectClient = useSelector(getSelectClientSelector)
    const isPreloader = useSelector(getIsPreloadingSelector)

    const [toggleOrderMap, setToggleOrderMap] =useState<boolean>(true)

    const onClickOrderMap = useCallback(()=>{
        setToggleOrderMap(!toggleOrderMap)
    },[toggleOrderMap])

    useEffect( () => {
        if(ordersMany.length === 0 ) {
            dispatch(getOrdersManyThunk())
        }
    },[dispatch,ordersMany])

    return ( <>
            {isPreloader ? <Preloader/>
                : <div>
                    <Button type={'primary'} onClick={onClickOrderMap}>{toggleOrderMap? 'Go to Google map' : 'Go to Map Box'}</Button>
                    <OrderTable ordersMany={ordersMany} activeClient={activeClient} selectClient={selectClient}/>
                    {toggleOrderMap ?
                        <MapBoxOSRM ordersMany={ordersMany} selectClient={selectClient}/>
                        :<OrderMapGoogle />
                    }

                </div>}
    </>
    )

}


export default OrderMapBoxOSRM

