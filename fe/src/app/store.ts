import { configureStore } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'
import { history } from '../utils'

export const store = configureStore({
  reducer: {
    router: connectRouter(history),
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch