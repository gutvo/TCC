import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './rootReducer'
import rootSaga from './rootSaga'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  // devTools: false,
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export default store
