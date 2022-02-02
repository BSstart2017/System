import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import OrderingSystemReducer from "./OrderingSystemReducer";

let rootReducer = combineReducers({
    OrderingSystemReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionType<T> = T extends {[key : string]: (...arg: any[])=> infer U} ? U : never
export type BaseThunkType<A extends Action, P = Promise<void>> = ThunkAction<P, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))