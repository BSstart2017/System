import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Divider, Col, Row} from 'antd';
import {MapGoogle} from "../Components/MapGoogle";
import {useJsApiLoader} from "@react-google-maps/api";
import {Autocomplete} from "../Components/AutoComplete";
import {getBrowserLocation} from "../utils/geo";
import {Preloader} from "../Components/Common/Preloader";
import { getOrdersManyThunk} from "../redux/OrderMapReducer";
import {
    getCenterDefaultSelector, getFindShortestPathSelector,
    getOrdersManySelector
} from "../redux/Selectors/OrderMapSelectors";

const OrderMapGoogle: FC = () => {

    const ordersMany = useSelector(getOrdersManySelector)
    const centerDefault = useSelector(getCenterDefaultSelector)
    const findShortestPath = useSelector(getFindShortestPathSelector)

    const dispatch = useDispatch()

    const [ libraries ] = useState<("drawing" | "geometry" | "localContext" | "places" | "visualization")[]>
    (["places" ,"drawing" , "geometry" , "localContext" ,"visualization"])

    const [center, setCenter] = useState(centerDefault)
    const [myPosition, setMyPosition] = useState(centerDefault)

    const onPlaceSelect = useCallback((coordinates) => setCenter(coordinates),[])
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_API_KEY_GOOGLE_MAP as string,
        libraries
    })

    useEffect(() => {
        if(ordersMany.length === 0 ) dispatch(getOrdersManyThunk())
    },[dispatch, ordersMany])

    useEffect(()=>{
        getBrowserLocation(centerDefault).then((curLoc)=>{
            setMyPosition(curLoc);
            setCenter(curLoc);
        }).catch((defaultLocation) =>{
            setCenter(defaultLocation);
            setMyPosition(defaultLocation)
        })
    },[centerDefault])

    return (
        <div>
            <Divider orientation="left">Select order</Divider>
            <Row justify={"center"}>
                <Col span={8}><Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/></Col>
            </Row>
            <div><h2>
                Google api for finding a short path is paid.
Tried to bypass. By getting the short path data with osrm and converting the object to be rendered in the DirectionsRenderer component
            </h2></div>
            {
                isLoaded
                ? <MapGoogle center={center} ordersMany={ordersMany} myPosition={myPosition} findShortestPath={findShortestPath}/>
                : <Preloader/>
            }
        </div>
    )
}

export default OrderMapGoogle

