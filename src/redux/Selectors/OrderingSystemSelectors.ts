import { AppStateType } from "../store"

export const getOrdersManySelector = (state: AppStateType) => state.OrderingSystemReducer.ordersMany
export const getIsLoginSelector = (state: AppStateType) => state.OrderingSystemReducer.isLogin
export const getTokenSelector = (state: AppStateType) => state.OrderingSystemReducer.token