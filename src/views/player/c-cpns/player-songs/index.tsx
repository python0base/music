import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqualApp, useAppSelector, useAppDispatch } from '@/store'
import { getImageSize } from '@/utils/format'

import HYThemeHeaderPlayer from '@/components/theme-header-player'
import { PlayerSongsWrapper } from './style'
import { getSimiSongAction } from '../../store/player'
import { useLocation } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  id?: number
}

const HYPlayerSongs: FC<IProps> = () => {
  // const { id } = props
  // redux hooks
  const { simiPlaylist } = useAppSelector(
    (state) => ({
      simiPlaylist: state.player.simiPlaylist
      // currentId: state.player.currentSongD.id
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()
  const location = useLocation()
  const currentId = location.state.currentSong.id
  // other hooks
  useEffect(() => {
    if (currentId !== null) dispatch(getSimiSongAction(currentId))
    console.log(currentId)
  }, [currentId])

  return (
    <PlayerSongsWrapper>
      <HYThemeHeaderPlayer title="包含这首歌的歌单" />
      <div className="songs">
        {simiPlaylist.map((item) => (
          <div className="song-item" key={item.id}>
            <a className="image" href="/#">
              <img src={getImageSize(item.coverImgUrl, 50)} alt="" />
            </a>
            <div className="info text-nowrap">
              <a href="#/" className="name">
                {item.name}
              </a>
              <div className="auchor">
                by
                <a href="#/" className="nickname">
                  {item.creator.nickname}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </PlayerSongsWrapper>
  )
}

export default memo(HYPlayerSongs)
