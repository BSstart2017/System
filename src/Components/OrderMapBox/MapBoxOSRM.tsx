import * as React from 'react';
import Map, {
    FullscreenControl,
    GeolocateControl,
    GeolocateControlRef, GeolocateResultEvent, Layer,
    MapboxEvent,
    Marker,
    NavigationControl, Source
} from 'react-map-gl';
import {FC, useCallback, useEffect, useMemo, useRef, useState} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import imgTaxi from '../../assets/images/taxi_18540.png'
import imgClient_Taxi from '../../assets/images/Client_Taxi.png'
import {useDispatch, useSelector} from "react-redux";
import {getDataSourceOSRMSelector} from "../../redux/Selectors/OrderMapSelectors";
import {OrderType} from "../../Api/CargoSpeedApi";
import {actions} from "../../redux/OrderMapReducer";

//todo: .env
//todo: optimization

const MapBoxOSRM: FC<PropsType> = ({ordersMany, activeClient, selectClient}) => {

    const dispatch = useDispatch()

    const dataSourceOSRMS = useSelector(getDataSourceOSRMSelector)

    const geoLocateControlRef = useRef<GeolocateControlRef>(null)

    const [typeLoadMap, setTypeLoadMap] = useState<string>('')

    const onLoadHandle = useCallback((event: MapboxEvent) => setTypeLoadMap(event.type), [])

    useEffect(() => {
        if (typeLoadMap === 'load' && geoLocateControlRef.current) {
            geoLocateControlRef.current.trigger();
        }
    }, [typeLoadMap])

    const onGeoLocateHandle = useCallback((evt: GeolocateResultEvent ) => {
        dispatch(actions.setGeoTaxiPath({lat: evt.coords.latitude, lon: evt.coords.longitude }))
    },[dispatch])

    const orderMarker = useMemo(() => ordersMany.map(order => (
        <Marker key={order.id} longitude={order.source.lon} latitude={order.source.lat} anchor="bottom">
            <img src={imgClient_Taxi} alt={imgTaxi}/>
        </Marker>
    )), [ordersMany])

    return (
        <Map onLoad={onLoadHandle} mapboxAccessToken={process.env.REACT_APP_API_KEY_MAPBOX} style={{width: '100%', height: 600}}
                mapStyle="mapbox://styles/mapbox/streets-v8">
            {ordersMany && orderMarker}
            { selectClient && <>
                <Source id='route' type='geojson' data={dataSourceOSRMS}/>
                <Layer id='route' type='line' source='route' layout={{'line-join': 'round', 'line-cap': 'round'}}
                       paint={{'line-color': '#888', 'line-width': 8}}/>
            </>
            }
            <NavigationControl visualizePitch={true}/>
            <GeolocateControl onGeolocate={onGeoLocateHandle} trackUserLocation={true} showUserHeading={true} ref={geoLocateControlRef}/>
            <FullscreenControl position={"top-left"}/>
        </Map>
    )
}

export {MapBoxOSRM}

type PropsType = {
    ordersMany: Array<OrderType>
    activeClient: OrderType | null
    selectClient: OrderType | null
}