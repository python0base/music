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

  const { currentCategory } = useAppSelector(
    (state) => ({
      currentCategory: state.songs.currentCategory
    }),
    shallowEqualApp
  )

  useEffect(() => {
    dispatch(getCategory())
  }, [dispatch])

  useEffect(() => {
    dispatch(getSongList(0))
  }, [currentCategory])

  return (
    <SongsWrapper className="wrap-v2">
      <HYSongsHeader />
      <HYSongsList />
    </SongsWrapper>
  )
}

export default memo(Songs)
