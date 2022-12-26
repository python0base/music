import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongCategory, getSongCategoryList } from '../service/songs'
import { handleSongsCategory } from '@/utils/handle-data'
import type { IRootState } from '@/store'

export const getCategory = createAsyncThunk(
  'getCategory',
  (_, { dispatch }) => {
    getSongCategory().then((res) => {
      const categoryData = handleSongsCategory(res)
      dispatch(changeCategoryAction(categoryData))
    })
  }
)
import { PER_PAGE_NUMBER } from './constants'

interface IThunkState {
  state: IRootState
}
export const getSongList = createAsyncThunk<void, number, IThunkState>(
  'liststSong',
  (page: number, { dispatch, getState }) => {
    // 1.获取currentCategory
    const name = getState().songs.currentCategory

    // 2.获取数据
    getSongCategoryList(name, page * PER_PAGE_NUMBER).then((res) => {
      dispatch(changeSongListAction(res))
    })
  }
)

interface ISongsState {
  category: any[]
  currentCategory: string
  categorySongs: any
}

const initialState: ISongsState = {
  category: [],
  currentCategory: '全部',
  categorySongs: {}
}

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    changeCategoryAction(state, { payload }) {
      state.category = payload
    },
    changeSongListAction(state, { payload }) {
      state.categorySongs = payload
    },
    changeCurrentCategoryAction(state, { payload }) {
      state.currentCategory = payload
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

export const {
  changeCategoryAction,
  changeSongListAction,
  changeCurrentCategoryAction
} = songsSlice.actions
export default songsSlice.reducer
