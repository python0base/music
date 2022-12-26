import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayerLeft, PlayerRight, PlayerWrapper } from './style'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import HYPlayerInfo from './c-cpns/player-info'
import HYPlayerComment from './c-cpns/player-comment'
import HYPlayerSongs from './c-cpns/player-songs'
import HYPlayerRelevant from './c-cpns/player-relevant'
import { useLocation } from 'react-router-dom'
import { getDetailSongAction, getSimiSongAction } from './store/player'
interface IProps {
  children?: ReactNode
}

const Player: FC<IProps> = () => {
  // const dispatch = useAppDispatch()
  // const location = useLocation()
  // hooks
  // useEffect(() => {
  //   console.log('index')
  //   dispatch(getSimiSongAction(location.state.currentSong.id))
  //   dispatch(getDetailSongAction(location.state.currentSong.id))
  // }, [dispatch])
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <HYPlayerInfo />
          <HYPlayerComment />
        </PlayerLeft>
        <PlayerRight>
          <HYPlayerSongs />
          <HYPlayerRelevant />
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
}

export default memo(Player)
