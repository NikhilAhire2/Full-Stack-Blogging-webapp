import { combineReducers, configureStore } from "@reduxjs/toolkit"
import authSlice from "../redux/authSlice.js"
import themeSlice from "../redux/themeSlice.js"
import blogSlice from "../redux/blogSlice.js"
import storage from 'redux-persist/lib/storage'
import commentSlice from "./commentSlice.js"
import {
persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'



const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth', 'theme',"blog"], // 👈 ONLY persist these
}

const rootReducer = combineReducers({
    auth: authSlice,
    theme: themeSlice,
    blog:blogSlice,
    comment:commentSlice
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})



export default store;
