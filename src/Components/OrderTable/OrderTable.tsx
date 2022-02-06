import React, {FC, useCallback, useEffect} from "react";
import {Col, Divider, Row, Table} from "antd";
import {actions, getFindShortestPathThunk, OrdersManyDataTableType} from "../../redux/OrderMapReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllPathSelector,
    getColumnsTableSelector,
    getGeoTaxiSelector,
} from "../../redux/Selectors/OrderMapSelectors";
import {ButtonPanel} from "./ButtonPanel";
import {Position} from "geojson";

const OrderTable : FC<PropsType> = ({ordersMany, selectClient, activeClient}) => {

    const dispatch = useDispatch()

    const columnsTable = useSelector(getColumnsTableSelector)
    const geoTaxi = useSelector(getGeoTaxiSelector)
    const allPath = useSelector(getAllPathSelector)

    useEffect(()=>{
        if(selectClient){
        dispatch(getFindShortestPathThunk({
            taxiGeo: geoTaxi ,
            clientSource: {lat: selectClient.source.lat, lon: selectClient.source.lon} ,
            clientDestination: {lat: selectClient.destination.lat, lon: selectClient.destination.lon}
        }))
        }
    },[dispatch, selectClient, geoTaxi])

    useEffect(()=>{
        dispatch(actions.setDataSourceOSRM(allPath as Position[]))
    }, [dispatch,allPath])

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: OrdersManyDataTableType[]) => {
                       dispatch(actions.setSelectClientPath(selectedRows[0]))
        },

        getCheckboxProps: useCallback(() => {
            if(activeClient) {
            return ({disabled: true})
        }else {return ({})}
        },[activeClient])
    }



    return (
        <Row>
            <Col span={24}>
                <Divider orientation="left">Select order</Divider>
                <Table loading={ordersMany.length === 0} rowKey={record => record.id} rowSelection={{type: 'radio', ...rowSelection}}
                       pagination={false} columns={columnsTable} dataSource={ordersMany}/>
                <ButtonPanel selectClient={selectClient} activeClient={activeClient}/>
            </Col>
        </Row>

    )
}



export {OrderTable}

type PropsType = {
    ordersMany: Array<OrdersManyDataTableType>
    selectClient: OrdersManyDataTableType | null
    activeClient: OrdersManyDataTableType | null
}