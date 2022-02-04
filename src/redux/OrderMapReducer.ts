import {BaseThunkType, InferActionType} from "./store"
import OrderingSystemApi, {OrderType} from "../Api/OrderingSystemApi";
import {ColumnsType} from "antd/es/table";

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
    centerDefault : {lat: 52.13, lng: 21.02} as PositionCenterType
}

const AuthorizationReducer = (state = defaultState, action: ActionType) : defaultStateType => {
    switch (action.type){
        case "orderMapReducer/Aliaksandr_Andreyeu/GET_ORDERS_MANY_SUCCESS" :
            return {...state,
                ordersMany: [...action.ordersMany]
            }
        default:
            return state
    }
}

export const actions = {
    setOrdersMany: (ordersMany: Array<OrderType>) => ({type : 'orderMapReducer/Aliaksandr_Andreyeu/GET_ORDERS_MANY_SUCCESS', ordersMany} as const)
}

export const getOrdersManyThunk = ():ThunkType => async (dispatch, getState) => {
    try{
        const token = getState().AuthorizationReducer.token
        if(token) {
            const response = await OrderingSystemApi.getOrdersMany(token)
            dispatch(actions.setOrdersMany(response.data))
        }
    } catch (err : any) {
        console.log(err.message)
    }
}

export default AuthorizationReducer;

export type PositionCenterType = {
    lat: number
    lng: number
}
export type defaultStateType = typeof defaultState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>