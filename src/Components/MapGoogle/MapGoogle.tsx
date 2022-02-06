import React, {FC, useCallback, useRef} from 'react'
import {GoogleMap, Marker} from "@react-google-maps/api";
import {Col} from "antd";
import {OrderType} from "../../Api/CargoSpeedApi";
import imgTaxi from '../../assets/images/taxi_18540.png'
import imgClient_Taxi from '../../assets/images/Client_Taxi.png'
import {PositionCenterType} from "../../redux/OrderMapReducer";
import {FindShortestPathType} from "../../Api/OSRM_Api";

const MapGoogle: FC<PropsType> = ({center, ordersMany, myPosition, findShortestPath}) => {

    const mapRef = useRef(undefined)
    const onLoad = useCallback(function callback(map) {
        mapRef.current = map
    }, [])
    const onUnmount = useCallback(function callback() {
        mapRef.current = undefined
    }, [])

    const clientMap = ordersMany.map((order) => ( <div key={order.id}>
            <Marker title={order.subject} position={{lat:order.source.lat, lng: order.source.lon}}
                    icon={imgClient_Taxi}/>
        </div>))


    return <Col style={{height: '500px'}}>
            <GoogleMap mapContainerStyle={{width: '100%', height: '100%'}} center={center} zoom={10}
                onLoad={onLoad} onUnmount={onUnmount}>
                {/* findShortestPath && <DirectionsRenderer directions={findShortestPath} />
                 <DirectionsService options={} callback={}/>*/}
                <Marker title={'It is you'} position={myPosition} icon={imgTaxi}/>
                { clientMap }
            </GoogleMap>
        </Col>
}

export {MapGoogle}

type PropsType = {
    center: PositionCenterType
    ordersMany: Array<OrderType>
    myPosition: PositionCenterType
    findShortestPath: FindShortestPathType | null
}
