import { AppStateType } from "../store"

export const getIsLoginSelector = (state: AppStateType) => state.AuthorizationReducer.isLogin
export const getTokenSelector = (state: AppStateType) => state.AuthorizationReducer.token
export const getIsLoginValidationErrorSelector = (state: AppStateType) => state.AuthorizationReducer.isLoginValidationError