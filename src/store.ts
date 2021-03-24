import { createStore } from "redux";
import mapDataReducer from "./ducks/map";

const store = createStore(mapDataReducer);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
