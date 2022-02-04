import React, {FC, useCallback, useRef} from 'react'
import {GoogleMap, Marker} from "@react-google-maps/api";
import {Col} from "antd";
import {OrderType} from "../../Api/OrderingSystemApi";
import imgTaxi from '../../assets/images/taxi_18540.png'
import imgClient_Taxi from '../../assets/images/Client_Taxi.svg'
import {PositionCenterType} from "../../redux/OrderMapReducer";


const Map: FC<PropsType> = ({center, ordersMany, myPosition}) => {

    const mapRef = useRef(undefined)
    const onLoad = useCallback(function callback(map) {
        mapRef.current = map
    }, [])
    const onUnmount = useCallback(function callback() {
        mapRef.current = undefined
    }, [])

    const clientMap = ordersMany.map(order => ( <div key={order.id}>
            <Marker title={order.subject} position={{lat:order.source.lat, lng: order.source.lon}}
                    icon={imgClient_Taxi}/>
        </div>))

    return <Col style={{height: '500px'}}>
            <GoogleMap mapContainerStyle={{width: '100%', height: '100%'}} center={center} zoom={10}
                onLoad={onLoad} onUnmount={onUnmount}>
                <Marker title={'It is you'} position={myPosition} icon={imgTaxi}/>
                { clientMap }
            </GoogleMap>
        </Col>
}

export {Map}

type PropsType = {
    center: PositionCenterType
    ordersMany: Array<OrderType>
    myPosition: PositionCenterType
}
