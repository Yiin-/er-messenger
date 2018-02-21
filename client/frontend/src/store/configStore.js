import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { RealTimeAPI } from 'rocket.chat.realtime.api.rxjs';

import epics from './epics/combinedEpics';
import reducers from './reducers/combinedReducers';

const URL = 'wss://localhost:3000/websocket';
const realtimeAPI = new RealTimeAPI(URL);

/**
 * Error handlers
 */
realtimeAPI.onError(err => store.dispatch({ type: "ADD_ERROR", payload: { reason: "Error" } }));
realtimeAPI.onMessage(msg => msg.type === "error" &&
	store.dispatch({ type: "ADD_ERROR", payload: { reason: "Error Connecting to Server" } })
);
realtimeAPI.onCompletion(() => store.dispatch({ type: "ADD_ERROR", payload: { reason: "Not Connected to Server" } }));


realtimeAPI.keepAlive(); // Ping Server


const epicMiddleware = createEpicMiddleware(epics, {
	dependencies: {
		realtimeAPI: realtimeAPI
	}
});

export const store = createStore(reducers, applyMiddleware(epicMiddleware));