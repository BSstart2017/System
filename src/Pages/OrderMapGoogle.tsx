import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Table, Divider, Button, Col, Row} from 'antd';
import {OrderType} from "../Api/CargoSpeedApi";
import {MapGoogle} from "../Components/MapGoogle";
import {useJsApiLoader} from "@react-google-maps/api";
import {Autocomplete} from "../Components/AutoComplete";
import {API_KEY} from "../Api/api";
import {getBrowserLocation} from "../utils/geo";
import {Preloader} from "../Components/Common/Preloader";
import {getFindShortestPathThunk, getOrdersManyThunk} from "../redux/OrderMapReducer";
import {
    getCenterDefaultSelector,
    getColumnsTableSelector, getFindShortestPathSelector,
    getOrdersManySelector
} from "../redux/Selectors/OrderMapSelectors";

const OrderMapGoogle: FC = () => {

    const ordersMany = useSelector(getOrdersManySelector)
    const columnsTable = useSelector(getColumnsTableSelector)
    const centerDefault = useSelector(getCenterDefaultSelector)
    const findShortestPath = useSelector(getFindShortestPathSelector)

    const dispatch = useDispatch()


    const [selectedRowShortCut, setSelectedRowShortCut] = useState<Array<OrderType>>([])
    const [ libraries ] = useState<("drawing" | "geometry" | "localContext" | "places" | "visualization")[]>
    (["places" ,"drawing" , "geometry" , "localContext" ,"visualization"])

    const [center, setCenter] = useState(centerDefault)
    const [myPosition, setMyPosition] = useState(centerDefault)
    //todo:actions

    const onPlaceSelect = useCallback((coordinates) => setCenter(coordinates),[])
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY,
        libraries
    })

    useEffect(() => {
        if(ordersMany.length === 0 ) dispatch(getOrdersManyThunk())
    },[dispatch, ordersMany])

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: OrderType[]) => {
            setSelectedRowShortCut(selectedRows)
        }
    }
    console.log(findShortestPath)
    const onTakeShortCut = useCallback( () =>{
     //  dispatch(getFindShortestPathThunk())
        console.log(selectedRowShortCut)
    },[selectedRowShortCut, dispatch])

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
            <Table rowKey={record => record.id} rowSelection={{type: 'radio', ...rowSelection}}
                pagination={false} columns={columnsTable} dataSource={ordersMany}/>
            <Button type={"primary"} onClick={onTakeShortCut}>Go</Button>
            <Row justify={"center"}>
                <Col span={8}><Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect}/></Col>
            </Row>
            {
                isLoaded
                ? <MapGoogle center={center} ordersMany={ordersMany} myPosition={myPosition} findShortestPath={findShortestPath}/>
                : <Preloader/>
            }
        </div>
    )
}
//todo read field is Orders Source / Destination https://nominatim.org/release-docs/latest/api/Overview/

export default OrderMapGoogle

