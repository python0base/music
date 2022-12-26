import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector,
  useDispatch,
  TypedUseSelectorHook,
  shallowEqual
} from 'react-redux'

import counterReducer from './modules/counter'
import recommendReducer from '../views/discover/c-views/recommend/store/recommend'
import playerReducer from '../views/player/store/player'
import rankingReducer from '../views/discover/c-views/ranking/store/ranking'
import songsReducer from '../views/discover/c-views/songs/store/songs'
import djradioReducer from '../views/discover/c-views/djradio/store/djradio'
import artistReducer from '../views/discover/c-views/artist/store/artist'
import albumReducer from '../views/discover/c-views/album/store/album'
import loginReducer from '../views/login/store/login'
const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
    player: playerReducer,
    ranking: rankingReducer,
    songs: songsReducer,
    djradio: djradioReducer,
    artist: artistReducer,
    album: albumReducer,
    login: loginReducer
  }
})

// const state = store.getState()
// type StateType = typeof state

type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch

// useAppSelector的hook
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export const shallowEqualApp = shallowEqual

export default store
