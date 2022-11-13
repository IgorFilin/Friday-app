import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkDispatch} from "redux-thunk";
import {storeReducer} from "./storeReducer";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    store: storeReducer,
    app: appReducer,
    auth:authReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния

export type AppRootReducerType = ReturnType<typeof rootReducer>
// типизация store

export type AppDispatch = ThunkDispatch<AppRootReducerType,unknown,any>
// типизация Dispatch thunk


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
