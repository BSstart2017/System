import React, {FC, useCallback, useState} from "react";
import {Button, Col, Divider, Row, Table} from "antd";
import {OrderType} from "../../Api/CargoSpeedApi";
import {actions, getFindShortestPathThunk} from "../../redux/OrderMapReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getColumnsTableSelector,
    getGeoTaxiSelector, getStepsClientToDestinationPathSelector,
    getStepsTaxiToClientPathSelector
} from "../../redux/Selectors/OrderMapSelectors";
import {Position} from "geojson";


const OrderTable : FC<PropsType> = ({ordersMany, selectClient, activeClient}) => {

    const dispatch = useDispatch()
//todo:reselect
    const columnsTable = useSelector(getColumnsTableSelector)
    const geoTaxi = useSelector(getGeoTaxiSelector)
    const taxiToClientPath = useSelector(getStepsTaxiToClientPathSelector)
    const clientToDestinationPath = useSelector(getStepsClientToDestinationPathSelector)

    const [fulfillingAnOrder, setFulfillingAnOrder] = useState<boolean>(false)

    const taxiToClient = taxiToClientPath?.map(step => step.maneuver.location)
    const clientToDestination = clientToDestinationPath?.map(step => step.maneuver.location)
    const allPath = [...[taxiToClient].flat(1), ...[clientToDestination].flat(1)]

    const rowSelection = {
        onChange: useCallback( (selectedRowKeys: React.Key[], selectedRows: OrderType[]) => {
            dispatch(actions.setSelectClientPath(selectedRows[0]))
            dispatch(getFindShortestPathThunk({
               taxiGeo: geoTaxi ,
               clientSource: selectedRows[0].source ,
               clientDestination: {lat: selectedRows[0].destination.lat, lon: selectedRows[0].destination.lon}
               }))
            if(taxiToClient) {
                dispatch(actions.setDataSourceOSRM(taxiToClient))
            }
        },[dispatch, geoTaxi, taxiToClient]),

        getCheckboxProps: useCallback(() => {
            if(activeClient) {
            return ({disabled: true})
        }else {return ({})}
        },[activeClient])
    }

    const onTakeShortCut = useCallback( () =>{
        if(selectClient){
            dispatch(actions.setActiveClientPath(selectClient))
        }
        setFulfillingAnOrder(true)
    },[dispatch,selectClient])
    const onCanselShortCut = useCallback( () =>{
        dispatch(actions.setDeleteActiveClientPath())
        setFulfillingAnOrder(false)
    },[dispatch])

    return (
        <Row>
            <Col span={24}>
                <Divider orientation="left">Select order</Divider>
                <Table loading={ordersMany.length === 0} rowKey={record => record.id} rowSelection={{type: 'radio', ...rowSelection}}
                       pagination={false} columns={columnsTable} dataSource={ordersMany}/>
                <Row justify={"end"} style={{paddingTop: 15,paddingBottom: 15, paddingRight: 20 }}>
                    <Col>
                        <Button disabled={fulfillingAnOrder || selectClient === null} style={{width: 200}}
                                type={"primary"} onClick={onTakeShortCut}>I will fulfill the order</Button>
                    </Col>
                    <Col style={{paddingLeft:20}}>
                        <Button style={{width: 200}} type={"primary"} onClick={onCanselShortCut}
                                disabled={!fulfillingAnOrder} danger>Cancel order</Button>
                    </Col>
                </Row>
            </Col>
        </Row>

    )
}
//todo read field is Orders Source / Destination https://nominatim.org/release-docs/latest/api/Overview/
export {OrderTable}

type PropsType = {
    ordersMany: Array<OrderType>
    selectClient: OrderType | null
    activeClient: OrderType | null
}