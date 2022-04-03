import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {superHeroAPI} from "../services/SuperHeroService";

const rootReducer = combineReducers({
  [superHeroAPI.reducerPath]: superHeroAPI.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>
      getDefaultMiddleware().concat(superHeroAPI.middleware)
  })
}

export type RootStateType = ReturnType<typeof rootReducer>
export type AppStoreType = ReturnType<typeof setupStore>
export type AppDispatchType = AppStoreType['dispatch']