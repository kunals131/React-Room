import {combineReducers} from "redux"
import userReducer from "./userReducer"
import LoadingReducer from "./LoadingReducer"
import roleReducer from "./roleReducer"
import activityReducer from "./activityReducer"
import authReducer from "./authReducer"
import videoControlsReducer from "./videoControlsReducer"


export default combineReducers({
    user : userReducer,
    role : roleReducer,
    authStatus : authReducer,
    isActive : activityReducer,
    controls : videoControlsReducer,

})