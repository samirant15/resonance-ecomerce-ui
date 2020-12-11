import { combineReducers } from 'redux';
import userReducer from "../user/userReducer";
import furnitureReducer from "../furniture/furnitureReducer";

const rootReducer = combineReducers({
    userReducer,
    furnitureReducer,
})

export default rootReducer;