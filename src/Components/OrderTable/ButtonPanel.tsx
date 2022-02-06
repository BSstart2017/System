import React, {FC, useCallback} from 'react'
import {Button, Col, Row} from "antd";
import {actions, OrdersManyDataTableType} from "../../redux/OrderMapReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllPathSelector,
    getStepsClientToDestinationPathSelector,
    getStepsTaxiToClientPathSelector
} from "../../redux/Selectors/OrderMapSelectors";
import {Position} from "geojson";

const ButtonPanel : FC<PropsType> = ({selectClient, activeClient}) => {

    const dispatch = useDispatch()

    const allPath = useSelector(getAllPathSelector)
    const taxiToClientPath = useSelector(getStepsTaxiToClientPathSelector)
    const clientToDestinationPath = useSelector(getStepsClientToDestinationPathSelector)

    const onTaxiToClient = useCallback(()=>{
        if(taxiToClientPath) dispatch(actions.setDataSourceOSRM(taxiToClientPath))
    },[taxiToClientPath, dispatch])

    const onClientToHome = useCallback(()=>{
        if(clientToDestinationPath) dispatch(actions.setDataSourceOSRM(clientToDestinationPath))
    },[clientToDestinationPath,dispatch])

    const onTakeShortCut = useCallback( () =>{
        if(selectClient) dispatch(actions.setActiveClientPath(selectClient))
    },[dispatch,selectClient])

    const onAllPatch = useCallback( () =>{
        if(selectClient) dispatch(actions.setDataSourceOSRM(allPath as Position[]))
    },[dispatch,selectClient,allPath])

    const onCanselShortCut = useCallback( () =>{
        dispatch(actions.setDeleteActiveClientPath())
    },[dispatch])

    return (
        <Row justify={"end"} style={{paddingTop: 15,paddingBottom: 15, paddingRight: 20 }}>
            <Col>
                <Button style={{width: 200}} type={"primary"} onClick={onTaxiToClient}
                        disabled={selectClient === null} >From taxi to client</Button>
            </Col>
            <Col style={{paddingLeft:20}}>
                <Button style={{width: 200}} type={"primary"} onClick={onClientToHome}
                        disabled={selectClient === null} >From client to home</Button>
            </Col>
            <Col style={{paddingLeft:20}}>
                <Button style={{width: 200}} type={"primary"} onClick={onAllPatch}
                        disabled={selectClient === null} >All path</Button>
            </Col>
            <Col style={{paddingLeft:20}}>
                <Button disabled={selectClient === null || activeClient !== null} style={{width: 200}}
                        type={"primary"} onClick={onTakeShortCut}>I will fulfill the order</Button>
            </Col>
            <Col style={{paddingLeft:20}}>
                <Button style={{width: 200}} type={"primary"} onClick={onCanselShortCut}
                        disabled={activeClient === null} danger>Cancel order</Button>
            </Col>
        </Row>
    )
}

export {ButtonPanel}

type PropsType = {
    selectClient: OrdersManyDataTableType | null
    activeClient: OrdersManyDataTableType | null
}