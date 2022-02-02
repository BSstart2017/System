import {BaseThunkType, InferActionType} from "./store"

let defaultState = {
    initialized : false,
    collapsed: false
}

const OrderingSystemReducer = (state = defaultState, action: ActionType) : defaultStateType => {
    switch (action.type){
        case "app/Aliaksandr_Andreyeu/INITIALIZED_SUCCESS" :
            return {...state,
                initialized: true
            }
        case "app/Aliaksandr_Andreyeu/TOGGLE_COLLAPSED" :
            return {...state,
                collapsed: action.collapsed
            }
        default:
            return state
    }
}

export const actions = {
    setInitialized: () => ({type : 'app/Aliaksandr_Andreyeu/INITIALIZED_SUCCESS'} as const),
    setToggleCollapsed: (collapsed: boolean) => ({type : 'app/Aliaksandr_Andreyeu/TOGGLE_COLLAPSED', collapsed} as const)
}

export const initializedApp = ():ThunkType => async (dispatch) => {
   /* let promise = await dispatch(getAuthUser())

    await Promise.all([promise]).then(()=>{
        dispatch(actions.setInitialized())
    })*/
}


export default OrderingSystemReducer;

export type defaultStateType = typeof defaultState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>