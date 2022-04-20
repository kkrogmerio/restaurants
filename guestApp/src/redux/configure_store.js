import { combineReducers,createStore,compose,applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import restaurantMenuReducer from "./reducers/restaurantMenu";
import restaurantOverviewReducer from "./reducers/restaurantOverview";
import createReduxWaitForMiddleware from 'redux-wait-for-action-rn';
import {watcherSaga} from './sagas/rootsaga';
const reducer=combineReducers({restaurants:restaurantMenuReducer,
restaurantOverview:restaurantOverviewReducer});
const sagam = createSagaMiddleware();
const waitm = createReduxWaitForMiddleware();

const store=createStore(reducer,{},compose(applyMiddleware(sagam),applyMiddleware(waitm)));
sagam.run(watcherSaga);
export default store;