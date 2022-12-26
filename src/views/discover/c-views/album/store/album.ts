import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getHotAlbums, getTopAlbums } from '../service/album'

export const getHotAlbumsAction = createAsyncThunk(
  'getHotAlbumsAction',
  (_, { dispatch }) => {
    getHotAlbums().then((res) => {
      dispatch(changeHotAlbumsAction(res.albums))
    })
  }
)

export const getTopAlbumsAction = createAsyncThunk<void, number>(
  'getTopAlbumsAction',
  (page: number, { dispatch }) => {
    getTopAlbums(30, (page - 1) * 30).then((res) => {
      dispatch(changeTopAlbumAction(res.albums))
      dispatch(changeTopTotalAction(res.total))
      console.log(res)
    })
  }
)

interface IAlbumState {
  hotAlbums: any[]
  topAlbums: any[]
  topTotal: number
}
const initialState: IAlbumState = {
  hotAlbums: [],
  topAlbums: [],
  topTotal: 0
}

const albumSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeHotAlbumsAction(state, { payload }) {
      state.hotAlbums = payload
    },
    changeTopAlbumAction(state, { payload }) {
      state.topAlbums = payload
    },
    changeTopTotalAction(state, { payload }) {
      state.topTotal = payload
    }
  }
})

export const {
  changeHotAlbumsAction,
  changeTopAlbumAction,
  changeTopTotalAction
} = albumSlice.actions
export default albumSlice.reducer
