import React, {FC, useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrdersManySelector} from "../redux/Selectors/OrderingSystemSelectors";
import {getOrdersManyThunk} from "../redux/OrderingSystemReducer";
import {Table, Divider, Button, Col, Row} from 'antd';
import {OrderType} from "../Api/OrderingSystemApi";
import {Map} from "../Components/Map";
import {useJsApiLoader} from "@react-google-maps/api";
import Preloader from "../Components/Common/Preloader/Preloader";
import {Autocomplete} from "../Components/AutoComplete";
import {API_KEY_GOOGLE_MAP} from "../Api/api";

const columns = [
    {
        title: 'Order Number',
        dataIndex: 'order_number',
    },
    {
        title: 'Source',
        dataIndex: 'source',
    },
    {
        title: 'Destination',
        dataIndex: 'destination',
    },
    {
        title: 'Subject',
        dataIndex: 'subject',
    },
    {
        title: 'Comment',
        dataIndex: 'comment',
    },
]

const center = {
    lat: 52.13,
    lng: 21.02
}
const OrderMap: FC = () => {
    const ordersMany = useSelector(getOrdersManySelector)
    const dispatch = useDispatch()
    const [selectedRowShortCut, setSelectedRowShortCut] = useState<Array<OrderType>>([])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY_GOOGLE_MAP,
    })

    useEffect(() => {
        if(ordersMany.length === 0 ){
            dispatch(getOrdersManyThunk())
        }
    },[dispatch, ordersMany])

    const rowSelection = {
        onChange: (selectedRowKeys: React.Key[], selectedRows: OrderType[]) => {
            setSelectedRowShortCut(selectedRows)
        }
    }
    const onTakeShortCut = useCallback(() =>{
        console.log(selectedRowShortCut)
    },[selectedRowShortCut])

    return (
        <div>
            <Divider orientation="left">Select order</Divider>
            <Table
                rowKey={record => record.id}
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                pagination={false}
                columns={columns}
                dataSource={ordersMany}
            />
            <Button type={"primary"} onClick={onTakeShortCut}>Go</Button>
            <Row justify={"center"}>
                <Col span={8}><Autocomplete isLoaded={isLoaded} /></Col>
            </Row>
            {isLoaded
                ? <Map center={center} ordersMany={ordersMany}/>
                : <Preloader/>}

        </div>
    )
}

export default OrderMap