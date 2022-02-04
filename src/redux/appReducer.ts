import {BaseThunkType, InferActionType} from "./store"
import {postRefreshTokenThunk} from "./AuthorizationReducer";

let defaultState = {
    initialized : false
}

const appReducer = (state = defaultState, action: ActionType) : defaultStateType => {
    switch (action.type){
        case "app/Aliaksandr_Andreyeu/INITIALIZED_SUCCESS" :
            return {...state,
                initialized: true
            }
        default:
            return state
    }
}

export const actions = {
    setInitialized: () => ({type : 'app/Aliaksandr_Andreyeu/INITIALIZED_SUCCESS'} as const)
}

export const initializedApp = ():ThunkType => async (dispatch) => {
    let promise = await dispatch(postRefreshTokenThunk())

    await Promise.all([promise]).then(()=>{
        dispatch(actions.setInitialized())
    })
}


export default appReducer;

export type defaultStateType = typeof defaultState
type ActionType = InferActionType<typeof actions>
type ThunkType = BaseThunkType<ActionType>