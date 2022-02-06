import { AppStateType } from "../store"

export const getOrdersManySelector = (state: AppStateType) => state.OrderMapReducer.ordersMany
export const getColumnsTableSelector = (state: AppStateType) => state.OrderMapReducer.columnsTableDefault
export const getCenterDefaultSelector = (state: AppStateType) => state.OrderMapReducer.centerDefault
export const getFindShortestPathSelector = (state: AppStateType) => state.OrderMapReducer.findShortestPath
export const getGeoTaxiSelector = (state: AppStateType) => state.OrderMapReducer.geoTaxi
export const getActiveClientSelector = (state: AppStateType) => state.OrderMapReducer.activeClient
export const getSelectClientSelector = (state: AppStateType) => state.OrderMapReducer.selectClient
export const getDataSourceOSRMSelector = (state: AppStateType) => state.OrderMapReducer.dataSourceOSRM
export const getStepsTaxiToClientPathSelector = (state: AppStateType) => state.OrderMapReducer.findShortestPath?.routes[0].legs[0].steps
export const getStepsClientToDestinationPathSelector = (state: AppStateType) => state.OrderMapReducer.findShortestPath?.routes[0].legs[1].steps