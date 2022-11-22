import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { PacksActionsType, packsReducer } from './packsReducer'
import { AppActionsType, appReducer } from './appReducer'
import { AuthActionsType, authReducer } from './authReducer'
import { CardsActionsType, cardsReducer } from './cardsReducer'

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    packsCard: packsReducer,
    cards: cardsReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootReducerType = ReturnType<typeof rootReducer>

type AllActionsType = AppActionsType | AuthActionsType | PacksActionsType | CardsActionsType

export type AppDispatch = ThunkDispatch<AppRootReducerType, unknown, AllActionsType>

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootReducerType> = useSelector

// @ts-ignore
window.store = store //for console view
