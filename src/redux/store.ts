import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk, {ThunkDispatch} from "redux-thunk";
import {storeReducer} from "./storeReducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    store: storeReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния

export type AppRootReducerType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootReducerType,unknown,any>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
