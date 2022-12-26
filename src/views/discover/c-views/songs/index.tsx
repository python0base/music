import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import { useLocation } from 'react-router-dom'

import {
  getCategory,
  getSongList,
  changeCurrentCategoryAction
} from './store/songs'

import HYSongsHeader from './c-cpns/songs-header'
import HYSongsList from './c-cpns/songs-list'
import { SongsWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Songs: FC<IProps> = () => {
  // redux
  const dispatch = useAppDispatch()
  // const cat = useLocation()

  // useEffect(() => {
  //   dispatch(changeCurrentCategoryAction(cat))
  // }, [dispatch, cat])

  // hooks
  useEffect(() => {
    dispatch(getCategory())
    dispatch(getSongList(0))
  }, [dispatch])

  return (
    <SongsWrapper className="wrap-v2">
      <HYSongsHeader />
      <HYSongsList />
    </SongsWrapper>
  )
}

export default memo(Songs)
