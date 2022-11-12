import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import thunk from "redux-thunk";
import {storeReducer} from "./storeReducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    store: storeReducer
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware(thunk))
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store
