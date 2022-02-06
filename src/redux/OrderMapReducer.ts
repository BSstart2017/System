import {BaseThunkType, InferActionType} from "./store"
import CargoSpeedApi, {DestinationOrderType, OrderType, SourceOrderType} from "../Api/CargoSpeedApi";
import {ColumnsType} from "antd/es/table";
import OSRMApi, {CoordinatesPathType, FindShortestPathType} from "../Api/OSRM_Api";
import {Feature, Position} from "geojson";
import NominatimApi from "../Api/NominatimApi";

let defaultState = {
    ordersMany: [] as Array<OrdersManyDataTableType>,
    columnsTableDefault: [
        {
            title: 'Order Number',
            dataIndex: 'order_number',
        },
        {
            title: 'Source',
            dataIndex: 'sourceAddress',
        },
        {
            title: 'Destination',
            dataIndex: 'destinationAddress',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
        },
        {
            title: 'Comment',
            dataIndex: 'comment',
        },
    ] as ColumnsType<OrdersManyDataTableType>,
    centerDefault: {lat: 52.13, lng: 21.02} as PositionCenterType,
    findShortestPath: null as FindShortestPathType | null,
    geoTaxi: {lat: 52.13, lon: 21.02} as SourceOrderType,
    selectClient: null as null | OrdersManyDataTableType,
    activeClient: null as null | OrdersManyDataTableType,
    dataSourceOSRM: {
        type: 'Feature',
        geometry: {
            type: 'LineString',
            coordinates: [] as Position[]
        },
        properties: {}
    } as Feature,
    isPreloader: false
}

const OrderMapReducer = (state = defaultState, action: ActionType): defaultStateType => {
    switch (action.type) {
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_ORDERS_MANY_SUCCESS" :
            return {
                ...state,
                ordersMany: [...state.ordersMany, action.ordersMany]
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_FIND_SHORTEST_PATH_SUCCESS" :
            return {
                ...state,
                findShortestPath: {...action.findShortestPath}
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_GEO_TAXI_SUCCESS" :
            return {
                ...state,
                geoTaxi: {...action.geoTaxi}
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_ACTIVE_CLIENT_SUCCESS" :
            return {
                ...state,
                activeClient: {...action.activeClient}
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_DELETE_ACTIVE_CLIENT_SUCCESS" :
            return {
                ...state,
                activeClient: null
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_SELECT_CLIENT_SUCCESS" :
            return {
                ...state,
                selectClient: {...action.selectClient}
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_PRELOAD_SUCCESS" :
            return {
                ...state,
                isPreloader: action.isPreloader
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_DATA_SOURCE_OSRM_SUCCESS" :
            return {
                ...state,
                dataSourceOSRM: {
                    ...state.dataSourceOSRM,
                    geometry: {
                        ...state.dataSourceOSRM.geometry,
                        //todo: ts-ignore
                        //@ts-ignore
                        coordinates: [...action.coordinatesFindPath] as Position[]
                    }
                }
            }
        default:
            return state
    }
}

export const actions = {
    setOrdersMany: (ordersMany: OrdersManyDataTableType) => ({
        type: 'orderMapReducer/Aliaksandr_Andreyeu/SET_ORDERS_MANY_SUCCESS',
        ordersMany
    } as const),
    setFindShortestPath: (findShortestPath: FindShortestPathType) => ({
        type: 'orderMapReducer/Aliaksandr_Andreyeu/SET_FIND_SHORTEST_PATH_SUCCESS',
        findShortestPath
    } as const),
    setGeoTaxiPath: (geoTaxi: SourceOrderType) => ({
        type: 'orderMapReducer/Aliaksandr_Andreyeu/SET_GEO_TAXI_SUCCESS',
        geoTaxi
    } as const),
    setActiveClientPath: (activeClient: OrdersManyDataTableType) => ({
        type: 'orderMapReducer/Aliaksandr_Andreyeu/SET_ACTIVE_CLIENT_SUCCESS',
        activeClient
    } as const),
    setSelectClientPath: (selectClient: OrdersManyDataTableType) => ({
        type: 'orderMapReducer/Aliaksandr_Andreyeu/SET_SELECT_CLIENT_SUCCESS',
        selectClient
    } as const),
    setDeleteActiveClientPath: () => ({type: 'orderMapReducer/Aliaksandr_Andreyeu/SET_DELETE_ACTIVE_CLIENT_SUCCESS'} as const),
    setDataSourceOSRM: (coordinatesFindPath: Position[]) => ({
        type: "orderMapReducer/Aliaksandr_Andreyeu/SET_DATA_SOURCE_OSRM_SUCCESS",
        coordinatesFindPath
    } as const),
    setIsPreloading: (isPreloader: boolean) => ({
        type: "orderMapReducer/Aliaksandr_Andreyeu/SET_PRELOAD_SUCCESS",
        isPreloader
    } as const),
}

export const getOrdersManyThunk = (): ThunkType => async (dispatch, getState) => {
    try {
        dispatch(actions.setIsPreloading(true))
        const token = getState().AuthorizationReducer.token
        if (token) {
            const response = await CargoSpeedApi.getOrdersMany(token)
            await response.data.map(async (order: OrderType) => {
                const responseSourceReverse = await NominatimApi.getReverseLngLat(order.source.lat, order.source.lon)
                const sourceAddress = (responseSourceReverse.data.address.town + ' ' + responseSourceReverse.data.address.state
                    + ' ' + responseSourceReverse.data.address.neighbourhood + ' ' +
                    responseSourceReverse.data.address.building).split('undefined').join('')
                const responseDestinationReverse = await NominatimApi.getReverseLngLat(order.destination.lat, order.destination.lon)
                const destinationAddress = (responseDestinationReverse.data.address.town + ' ' + responseDestinationReverse.data.address.state
                    + ' ' + responseDestinationReverse.data.address.neighbourhood + ' ' +
                    responseDestinationReverse.data.address.building).split('undefined').join('')
                dispatch(actions.setOrdersMany({...order, sourceAddress, destinationAddress}))
            })
        }
    } catch (err: any) {
        console.log(err)
    } finally {
        dispatch(actions.setIsPreloading(false))
    }
}

export const getFindShortestPathThunk = (coordinates: CoordinatesPathType): ThunkType => async (dispatch, getState) => {
    try {
        const response = await OSRMApi.getFindTheShortestPath(coordinates)
        dispatch(actions.setFindShortestPath(response.data))
    } catch (err: any) {
        console.log(err)
    }
}


export default OrderMapReducer;

export type PositionCenterType = {
    lat: number
    lng: number
}

export type OrdersManyDataTableType = {
    id: string
    order_number: number
    sourceAddress: string
    destinationAddress: string
    subject: string
    comment: string
    source: SourceOrderType
    destination: DestinationOrderType
}

export type defaultStateType = typeof defaultState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>