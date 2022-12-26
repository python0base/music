import type { IRootState } from '@/store'
import { ILyric, parseLyric } from '@/utils/parse-lyric'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getArtistList } from '../service/artist'

interface IThunkState {
  state: IRootState
}

interface Ireturn {
  area: number
  type: any
  alpha: any
}
export const getArtistListAction = createAsyncThunk<void, Ireturn, IThunkState>(
  'liststSong',
  (abc: Ireturn, { dispatch }) => {
    getArtistList(abc.area, abc.type, abc.alpha).then((res) => {
      console.log(res)
      dispatch(changeArtistListAction(res.artists))
    })
  }
)

interface IArtistState {
  currentArea: number
  currentType: any
  artistList: any[]
}
const initialState: IArtistState = {
  currentArea: 7,
  currentType: {
    name: '推荐歌手',
    type: 1
  },
  artistList: []
}

const artistSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeArtistListAction(state, { payload }) {
      state.artistList = payload
    },
    changeCurrentAreaAction(state, { payload }) {
      state.currentArea = payload
    },
    changeCurrentTypeAction(state, { payload }) {
      state.currentType = payload
    }
  }
})

export const {
  changeArtistListAction,
  changeCurrentAreaAction,
  changeCurrentTypeAction
} = artistSlice.actions
export default artistSlice.reducer
