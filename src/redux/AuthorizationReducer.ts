import {BaseThunkType, InferActionType} from "./store"
import CargoSpeedApi from "../Api/CargoSpeedApi";

let defaultState = {
    token: null as null | string,
    isLogin : false
}

const AuthorizationReducer = (state = defaultState, action: ActionType) : defaultStateType => {
    switch (action.type){
        case "AuthorizationReducer/Aliaksandr_Andreyeu/GET_LOGIN_TOKEN_SUCCESS" :
            return {...state,
                token : action.token,
                isLogin : true
            }
        case "AuthorizationReducer/Aliaksandr_Andreyeu/GET_REFRESH_TOKEN_SUCCESS" :
            return {...state,
                token : action.token
            }
        default:
            return state
    }
}

export const actions = {
    setLoginToken: (token: string) => ({type : 'AuthorizationReducer/Aliaksandr_Andreyeu/GET_LOGIN_TOKEN_SUCCESS', token} as const),
    setRefreshToken: (token: string) => ({type : 'AuthorizationReducer/Aliaksandr_Andreyeu/GET_REFRESH_TOKEN_SUCCESS', token} as const)
}

export const postRefreshTokenThunk = ():ThunkType => async (dispatch) => {
    try {
        const response = await CargoSpeedApi.postRefreshToken()
        dispatch(actions.setRefreshToken(response.data.access_token))
    } catch (err : any) {
        console.log(err.message)
    }

}
export const postRefreshTokenAuthThunk = (username : string, password : string):ThunkType => async (dispatch) => {
    try {
        const response = await CargoSpeedApi.postRefreshTokenAuth(username, password)
        dispatch(actions.setLoginToken(response.data.access_token))
    } catch (err : any) {
        console.log(err.message)
    }
    // todo:  dispatch(actions.setIsPreloader(false))
}

export default AuthorizationReducer;

export type defaultStateType = typeof defaultState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>