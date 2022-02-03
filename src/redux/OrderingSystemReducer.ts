import {BaseThunkType, InferActionType} from "./store"
import OrderingSystemApi, {OrderType} from "../Api/OrderingSystemApi";
import {ResultCodeEnum, ResultCodeTokenEnum} from "../Api/api";

let defaultState = {
    ordersMany : [] as Array<OrderType>,
    token: null as null | string,
    isLogin : false
}

const OrderingSystemReducer = (state = defaultState, action: ActionType) : defaultStateType => {
    switch (action.type){
        case "orderingSystem/Aliaksandr_Andreyeu/GET_ORDERS_MANY_SUCCESS" :
            return {...state,
                ordersMany: [...action.ordersMany]
            }
        case "orderingSystem/Aliaksandr_Andreyeu/GET_LOGIN_TOKEN_SUCCESS" :
            return {...state,
                token : action.token,
                isLogin : true
            }
        case "orderingSystem/Aliaksandr_Andreyeu/GET_REFRESH_TOKEN_SUCCESS" :
            return {...state,
                token : action.token
            }
        default:
            return state
    }
}

export const actions = {
    setOrdersMany: (ordersMany: Array<OrderType>) => ({type : 'orderingSystem/Aliaksandr_Andreyeu/GET_ORDERS_MANY_SUCCESS', ordersMany} as const),
    setLoginToken: (token: string) => ({type : 'orderingSystem/Aliaksandr_Andreyeu/GET_LOGIN_TOKEN_SUCCESS', token} as const),
    setRefreshToken: (token: string) => ({type : 'orderingSystem/Aliaksandr_Andreyeu/GET_REFRESH_TOKEN_SUCCESS', token} as const)
}

export const getOrdersManyThunk = ():ThunkType => async (dispatch, getState) => {
    const token = getState().OrderingSystemReducer.token
    if(token) {
        const response = await OrderingSystemApi.getOrdersMany(token)
        dispatch(actions.setOrdersMany(response.data))
    }
}
export const postRefreshTokenThunk = ():ThunkType => async (dispatch) => {
    try {
        const response = await OrderingSystemApi.postRefreshToken()
        if (response.status === ResultCodeEnum.Success) {
            dispatch(actions.setRefreshToken(response.data.access_token))
        } else if (response.status === ResultCodeEnum.Unauthorized) {
            console.log('не авторизирован')
        } else if (response.status === ResultCodeEnum.Forbidden) {
            console.log('запрещённый')
        } else if (response.status === ResultCodeTokenEnum.ValidationError) {
            console.log(response)
        }
    } catch (e) {
       console.log(e)
    }

}
export const postRefreshTokenAuthThunk = (username : string, password : string):ThunkType => async (dispatch) => {

    const response = await OrderingSystemApi.postRefreshTokenAuth(username, password)
    if (response.status === ResultCodeEnum.Success){
        dispatch(actions.setLoginToken(response.data.access_token))
    } else if (response.status === ResultCodeEnum.Unauthorized){
        console.log('не авторизирован')
    } else if ( response.status === ResultCodeEnum.Forbidden){
        console.log('запрещённый')
    } else if (response.status === ResultCodeTokenEnum.ValidationError){
        console.log(response)
    }

    // todo:  dispatch(actions.setIsPreloader(false))
}


export default OrderingSystemReducer;

export type defaultStateType = typeof defaultState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>