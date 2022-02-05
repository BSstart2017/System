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
import {getStepsClientToDestinationPathSelector, getStepsTaxiToClientPathSelector} from "../../redux/Selectors/OrderMapSelectors";
import {Feature, Position} from "geojson";
import {OrderType} from "../../Api/CargoSpeedApi";
import {actions} from "../../redux/OrderMapReducer";

const API_KEY_MAPBOX = 'pk.eyJ1Ijoic2FuZHJlYWQiLCJhIjoiY2t6OWtudDVoMGs1czMwbzFoNjE4bzRvdSJ9.SKnUrVB2W0EfGcg63l4trw'
//todo: .env
//todo: optimization

const MapBoxOSRM: FC<PropsType> = ({ordersMany, activeClient, selectClient}) => {

    const dispatch = useDispatch()
    //todo:reselect
    const taxiToClientPath = useSelector(getStepsTaxiToClientPathSelector)
    const clientToDestinationPath = useSelector(getStepsClientToDestinationPathSelector)

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
    console.log(ordersMany)
    const orderMarker = useMemo(() => ordersMany.map(order => (
        <Marker key={order.id} longitude={order.source.lon} latitude={order.source.lat} anchor="bottom">
            <img src={imgClient_Taxi} alt={imgTaxi}/>
        </Marker>
    )), [ordersMany])

    const taxiToClient = taxiToClientPath?.map(step => step.maneuver.location)
    const clientToDestination = clientToDestinationPath?.map(step => step.maneuver.location)
    const allPath = [...[taxiToClient].flat(1), ...[clientToDestination].flat(1)]

    const data: Feature = {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: allPath as Position[]
        },
        properties: {}
    }

    //todo: actions

    return (
        <Map onLoad={onLoadHandle} mapboxAccessToken={API_KEY_MAPBOX} style={{width: '100%', height: 600}}
                mapStyle="mapbox://styles/mapbox/streets-v8">
            {ordersMany && orderMarker}
            { selectClient && <>
                <Source id='route' type='geojson' data={data}/>
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