import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLogin, getLoginCaptcha } from '../service/login'

interface login {
  phone: string
  password: string
}
export const Logins = createAsyncThunk<void, login>(
  'getLogin',
  (login: login, { dispatch }) => {
    getLogin(login.phone, login.password).then((res) => {
      console.log(login, res)
      if (res.code === 200) {
        dispatch(changeCurrentLogin(res))
      }
    })
  }
)

export const getCaptcha = createAsyncThunk<void, any>(
  'currentSong',
  (phone: any) => {
    // 没有找到相同的
    // 1.获取歌曲信息
    getLoginCaptcha(phone).then((res) => {
      if (res.data === true) console.log('getLoginCaptcha__success')
    })
  }
)

interface ILoginState {
  loginDetail: any
}
const initialState: ILoginState = {
  loginDetail: {}
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeCurrentLogin(state, { payload }) {
      state.loginDetail = payload
    }
  }
})

export const { changeCurrentLogin } = loginSlice.actions
export default loginSlice.reducer
