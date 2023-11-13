import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import jobsReducer from '../reducers/jobsReducer';
import allJobsReducer from '../reducers/allJobsReducer';
import jobStatusReducer from '../reducers/jobStatusReducer';
import activityReducer from '../reducers/activityReducer';
import traderReducer from '../reducers/traderReducer';
import inventoryReducer from './inventoryReducer';
import customersReducer from './customersReducer';
import photosReducer from './photosReducer';
import searchReducer from './searchReducer';

const rootReducer = history => combineReducers({
    router:connectRouter(history),
    trader:traderReducer,
    status: jobStatusReducer,
    jobs: allJobsReducer,
    job: jobsReducer,
    photos: photosReducer,
    activity: activityReducer,
    customers: customersReducer,
    inventory:inventoryReducer,
    searchResult: searchReducer
});

export default rootReducer;