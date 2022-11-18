import { configureStore } from '@reduxjs/toolkit'
import projectReducer from '../features/projectsSlice'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'list',
    storage
}

const persistedReducer = persistReducer(persistConfig, projectReducer)

export const store = configureStore({
    reducer: {
        list: persistedReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)
