import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getTopList, getRankingList } from '../service/ranking'

export const getTops = createAsyncThunk('getTops', (_, { dispatch }) => {
  getTopList().then((res) => {
    dispatch(changeTopListAction(res.list))
    console.log('toplist', res)
  })
})

export const getRanking = createAsyncThunk<void, number>(
  'getRanking',
  (id, { dispatch }) => {
    getRankingList(id).then((res) => {
      dispatch(changePlayListAction(res.playlist))
      console.log('playlist', res.playlist)
    })
  }
)

interface IRecommendState {
  topList: any[]
  currentIndex: number
  playList: any
}

const initialState: IRecommendState = {
  topList: [],
  currentIndex: 0,
  playList: {}
}

const rankingSlice = createSlice({
  name: 'ranking',
  initialState,
  reducers: {
    changeTopListAction(state, { payload }) {
      state.topList = payload
    },
    changePlayListAction(state, { payload }) {
      state.playList = payload
    },
    changeCurrentIndex(state, { payload }) {
      state.currentIndex = payload
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchBannerDataAction.pending, () => {
  //       console.log('pending')
  //     })
  //     .addCase(fetchBannerDataAction.fulfilled, (state, { payload }) => {
  //       state.banners = payload
  //     })
  //     .addCase(fetchBannerDataAction.rejected, () => {
  //       console.log('rejected')
  //     })
  // }
})

export const { changeTopListAction, changePlayListAction, changeCurrentIndex } =
  rankingSlice.actions
export default rankingSlice.reducer
