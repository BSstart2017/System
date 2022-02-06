import {BaseThunkType, InferActionType} from "./store"
import CargoSpeedApi, {OrderType, SourceOrderType} from "../Api/CargoSpeedApi";
import {ColumnsType} from "antd/es/table";
import OSRMApi, {CoordinatesPathType, FindShortestPathType} from "../Api/OSRM_Api";
import {Feature, Position} from "geojson";

let defaultState = {
    ordersMany : [] as Array<OrderType>,
    columnsTableDefault : [
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
    ] as ColumnsType<OrderType>,
    centerDefault : {lat: 52.13, lng: 21.02} as PositionCenterType,
    findShortestPath : null as FindShortestPathType | null,
    geoTaxi: {lat: 52.13, lon: 21.02} as SourceOrderType,
    selectClient : null as null | OrderType,
    activeClient : null as null | OrderType,
    dataSourceOSRM: {
    type: 'Feature',
    geometry: {
        type: 'LineString',
        coordinates: [] as Position[]
    },
    properties: {}
} as Feature
}

const OrderMapReducer = (state = defaultState, action: ActionType) : defaultStateType => {
    switch (action.type){
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_ORDERS_MANY_SUCCESS" :
            return {...state,
                ordersMany: [...action.ordersMany]
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_FIND_SHORTEST_PATH_SUCCESS" :
            return {...state,
                findShortestPath: {...action.findShortestPath}
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_GEO_TAXI_SUCCESS" :
            return {...state,
                geoTaxi: {...action.geoTaxi}
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_ACTIVE_CLIENT_SUCCESS" :
            return {...state,
                activeClient: {...action.activeClient}
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_DELETE_ACTIVE_CLIENT_SUCCESS" :
            return {...state,
                activeClient: null
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_SELECT_CLIENT_SUCCESS" :
            return {...state,
                selectClient: {...action.selectClient}
            }
        case "orderMapReducer/Aliaksandr_Andreyeu/SET_DATA_SOURCE_OSRM_SUCCESS" :
           debugger
            return {...state,
                dataSourceOSRM: {...state.dataSourceOSRM,
                    geometry : { ...state.dataSourceOSRM.geometry,
                        //@ts-ignore
                    coordinates: [...action.coordinatesFindPath] as Position[]
                    } }
            }
        default:
            return state
    }
}

export const actions = {
    setOrdersMany: (ordersMany: Array<OrderType>) => ({type : 'orderMapReducer/Aliaksandr_Andreyeu/SET_ORDERS_MANY_SUCCESS', ordersMany} as const),
    setFindShortestPath: (findShortestPath:FindShortestPathType) => ({type : 'orderMapReducer/Aliaksandr_Andreyeu/SET_FIND_SHORTEST_PATH_SUCCESS', findShortestPath} as const),
    setGeoTaxiPath: (geoTaxi:SourceOrderType) => ({type : 'orderMapReducer/Aliaksandr_Andreyeu/SET_GEO_TAXI_SUCCESS', geoTaxi} as const),
    setActiveClientPath: (activeClient:OrderType) => ({type : 'orderMapReducer/Aliaksandr_Andreyeu/SET_ACTIVE_CLIENT_SUCCESS', activeClient} as const),
    setSelectClientPath: (selectClient:OrderType) => ({type : 'orderMapReducer/Aliaksandr_Andreyeu/SET_SELECT_CLIENT_SUCCESS', selectClient} as const),
    setDeleteActiveClientPath: () => ({type : 'orderMapReducer/Aliaksandr_Andreyeu/SET_DELETE_ACTIVE_CLIENT_SUCCESS'} as const),
    setDataSourceOSRM: (coordinatesFindPath: Position[]) => ({type : "orderMapReducer/Aliaksandr_Andreyeu/SET_DATA_SOURCE_OSRM_SUCCESS", coordinatesFindPath} as const)
}

export const getOrdersManyThunk = ():ThunkType => async (dispatch, getState) => {
    try{
        const token = getState().AuthorizationReducer.token
        if(token) {
            const response = await CargoSpeedApi.getOrdersMany(token)
            dispatch(actions.setOrdersMany(response.data))
        }
    } catch (err : any) {
        console.log(err.message)
    }
}

export const getFindShortestPathThunk = (coordinates : CoordinatesPathType):ThunkType => async (dispatch, getState) => {
    try{
        const response = await OSRMApi.getFindTheShortestPath(coordinates)
        dispatch(actions.setFindShortestPath(response.data))
    } catch (err : any) {
        console.log(err.message)
    }
}


export default OrderMapReducer;

export type PositionCenterType = {
    lat: number
    lng: number
}
export type defaultStateType = typeof defaultState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>