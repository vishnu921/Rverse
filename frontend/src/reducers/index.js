import { combineReducers } from "redux"

import reviews from './reviews'
import auth from './auth'

// store
export default combineReducers({
    reviews,auth
});