import {BaseThunkType, InferActionType} from "./store"
import CargoSpeedApi from "../Api/CargoSpeedApi";

let defaultState = {
    token: null as null | string,
    isLogin : false,
    isLoginValidationError: false
}

const AuthorizationReducer = (state = defaultState, action: ActionType) : defaultStateType => {
    switch (action.type){
        case "AuthorizationReducer/Aliaksandr_Andreyeu/SET_LOGIN_TOKEN_SUCCESS" :
            return {...state,
                token : action.token,
                isLogin : true
            }
        case "AuthorizationReducer/Aliaksandr_Andreyeu/SET_REFRESH_TOKEN_SUCCESS" :
            return {...state,
                token : action.token,
                isLogin : true
            }
            case "AuthorizationReducer/Aliaksandr_Andreyeu/SET_IS_LOGIN_ERROR_SUCCESS" :
            return {...state,
                isLoginValidationError : action.isLoginValidationError
            }
        default:
            return state
    }
}

export const actions = {
    setLoginToken: (token: string) => ({type : 'AuthorizationReducer/Aliaksandr_Andreyeu/SET_LOGIN_TOKEN_SUCCESS', token} as const),
    setRefreshToken: (token: string) => ({type : 'AuthorizationReducer/Aliaksandr_Andreyeu/SET_REFRESH_TOKEN_SUCCESS', token} as const),
    setIsLoginValidationErrorToken: (isLoginValidationError: boolean) => ({type : 'AuthorizationReducer/Aliaksandr_Andreyeu/SET_IS_LOGIN_ERROR_SUCCESS', isLoginValidationError} as const)
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
        if(err.message === 'Invalid credentials'){
            dispatch(actions.setIsLoginValidationErrorToken(true))
        } else {
            console.log(err.message)
        }
    }
}

export default AuthorizationReducer;

export type defaultStateType = typeof defaultState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>