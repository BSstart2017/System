import React, {FC, useCallback, useRef} from 'react'
import {GoogleMap, Marker} from "@react-google-maps/api";
import {Col, Row} from "antd";
import {OrderType} from "../../Api/OrderingSystemApi";

const containerStyle = {
    width: '100%',
    height: '100%'
};

const Map: FC<PropsType> = ({center, ordersMany}) => {

    const mapRef = useRef(undefined)

    const onLoad = useCallback(function callback(map) {
        mapRef.current = map
    }, [])

    const onUnmount = useCallback(function callback() {
        mapRef.current = undefined
    }, [])

    return <Col style={{height: '500px'}}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                {
                    ordersMany.map(order =>{
                       return  <div key={order.id}>
                           <Marker title={order.subject} position={{lat:order.source.lat, lng: order.source.lon}}/>
                       </div>
                    })
                }

            </GoogleMap>
        </Col>


}


export {Map}

type PropsType = {
    center: CenterType
    ordersMany: Array<OrderType>
}

type CenterType = {
    lat: number
    lng: number
}
