import {combineReducers} from "redux"

import LoadingReducer from "./LoadingReducer"

import activityReducer from "./activityReducer"
import authReducer from "./authReducer"
import messageReducer from "./messageReducer"
import videoControlsReducer from "./videoControlsReducer"
import tempAuthReducer from "./tempAuthReducer"


export default combineReducers({

    authStatus : authReducer,
    isActive : activityReducer,
    controls : videoControlsReducer,
    popupMessage : messageReducer,
    tempUser : tempAuthReducer
})