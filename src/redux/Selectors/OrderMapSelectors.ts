import { AppStateType } from "../store"

export const getOrdersManySelector = (state: AppStateType) => state.OrderMapReducer.ordersMany
export const getColumnsTableSelector = (state: AppStateType) => state.OrderMapReducer.columnsTableDefault
export const getCenterDefaultSelector = (state: AppStateType) => state.OrderMapReducer.centerDefault