import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {routerMiddleware} from "connected-react-router";
import rootReducer from "../reducers/rootReducer";


export default function configureStore(history){
    const store = createStore(
        rootReducer(history),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
    return store
        
}