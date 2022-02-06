import { AppStateType } from "../store"
import {createSelector} from "reselect";

export const getOrdersManySelector = (state: AppStateType) => state.OrderMapReducer.ordersMany
export const getColumnsTableSelector = (state: AppStateType) => state.OrderMapReducer.columnsTableDefault
export const getCenterDefaultSelector = (state: AppStateType) => state.OrderMapReducer.centerDefault
export const getGeoTaxiSelector = (state: AppStateType) => state.OrderMapReducer.geoTaxi
export const getActiveClientSelector = (state: AppStateType) => state.OrderMapReducer.activeClient
export const getSelectClientSelector = (state: AppStateType) => state.OrderMapReducer.selectClient
export const getDataSourceOSRMSelector = (state: AppStateType) => state.OrderMapReducer.dataSourceOSRM
export const getFindShortestPathSelector = (state: AppStateType) => state.OrderMapReducer.findShortestPath
export const getIsPreloadingSelector = (state: AppStateType) => state.OrderMapReducer.isPreloader

export const getStepsTaxiToClientPathSelector = createSelector(getFindShortestPathSelector, (findShortestPath)=>{
    return findShortestPath?.routes[0].legs[0].steps.map(step => step.maneuver.location)
})

export const getStepsClientToDestinationPathSelector = createSelector(getFindShortestPathSelector, (findShortestPath)=>{
    return findShortestPath?.routes[0].legs[1].steps.map(step => step.maneuver.location)
})

export const getAllPathSelector = createSelector(getStepsTaxiToClientPathSelector,getStepsClientToDestinationPathSelector,
    (taxiToClientPath, clientToDestinationPath)=>{
    return [...[taxiToClientPath].flat(1), ...[clientToDestinationPath].flat(1)]
})
