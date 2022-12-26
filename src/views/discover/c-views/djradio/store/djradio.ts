import { IRootState } from '@/store'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  getDjRadioCatelist,
  getDjRadioRecommend,
  getDjRadios
} from '../service/djradio'

interface IThunkState {
  state: IRootState
}

export const getRadioCategories = createAsyncThunk(
  'getRadioCategories',
  (_, { dispatch }) => {
    getDjRadioCatelist().then((res) => {
      dispatch(changeCategoryAction(res.categories))
      const currentId = res.categories[0].id
      dispatch(changeCurrentIdAction(currentId))
    })
  }
)

export const getRadioRecommend = createAsyncThunk<void, number, IThunkState>(
  'getRadioRecommend',
  (currentId: number, { dispatch }) => {
    getDjRadioRecommend(currentId).then((res) => {
      dispatch(changeRecommendsAction(res.djRadios))
    })
  }
)
interface int {
  currentId: number
  offset: any
}
export const getRadios = createAsyncThunk<void, any, IThunkState>(
  'getRadios',
  (abc: int, { dispatch }) => {
    getDjRadios(abc.currentId, 30, abc.offset).then((res) => {
      dispatch(changeRadiosAction(res.djRadios))
    })
  }
)

interface IDjradioState {
  categories: any[]
  currentId: number
  recommends: any[]
  radios: any[]
}

const initialState: IDjradioState = {
  categories: [],
  currentId: 0,
  recommends: [],
  radios: []
}

const djradioSlice = createSlice({
  name: 'djradio',
  initialState,
  reducers: {
    changeCategoryAction(state, { payload }) {
      state.categories = payload
    },
    changeRecommendsAction(state, { payload }) {
      state.recommends = payload
    },
    changeRadiosAction(state, { payload }) {
      state.radios = payload
    },
    changeCurrentIdAction(state, { payload }) {
      state.currentId = payload
    }
  }
})

export const {
  changeCategoryAction,
  changeRecommendsAction,
  changeRadiosAction,
  changeCurrentIdAction
} = djradioSlice.actions
export default djradioSlice.reducer
