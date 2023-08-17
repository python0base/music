import React, { memo, useEffect } from 'react'

import type { FC, ReactNode } from 'react'
import { shallowEqualApp, useAppSelector, useAppDispatch } from '@/store'

import { getSimiSongAction } from '../../store/player'

import HYThemeHeaderPlayer from '@/components/theme-header-player'
import { RelevantWrapper } from './style'
import { useLocation } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  id?: number
}

const HYRelevant: FC<IProps> = () => {
  // const { id } = props

  const { simiSongs } = useAppSelector(
    (state) => ({
      simiSongs: state.player.simiSongs
      // currentId: state.player.currentSongD.id
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()
  const location = useLocation()
  const currentId = location.state.currentSong.id
  useEffect(() => {
    if (currentId !== null) dispatch(getSimiSongAction(currentId))
  }, [currentId])

  return (
    <RelevantWrapper>
      <HYThemeHeaderPlayer title="相似歌曲" />
      <div className="songs">
        {simiSongs.map((item) => (
          <div className="song-item" key={item.id}>
            <div className="info">
              <div className="title">
                <a href="#/">{item.name}</a>
              </div>
              <div className="artist">
                <a href="#/">{item.artists[0].name}</a>
              </div>
            </div>
            <div className="operate">
              <button className="item sprite_icon3 play"></button>
              <button className="item sprite_icon3 add"></button>
            </div>
          </div>
        ))}
      </div>
    </RelevantWrapper>
  )
}

export default memo(HYRelevant)
