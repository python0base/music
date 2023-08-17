import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PlayListWrapper } from './style'
import { shallowEqualApp, useAppSelector } from '@/store'
import classNames from 'classnames'
import { formatTime } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const HYPlayList: FC<IProps> = () => {
  const { playList, currentSongIndex } = useAppSelector(
    (state) => ({
      playList: state.player.playSongList,
      currentSongIndex: state.player.playSongIndex
    }),
    shallowEqualApp
  )
  return (
    <PlayListWrapper>
      {playList.map((item, index) => (
        <div
          key={item.id}
          className={classNames('play-item', {
            active: currentSongIndex === index
          })}
        >
          <div className="left">{item.name}</div>
          <div className="right">
            <span className="singer">{item.ar[0].name}</span>
            <span className="duration">{formatTime(item.dt)}</span>
            <span className="sprite_playlist link"></span>
          </div>
        </div>
      ))}
    </PlayListWrapper>
  )
}

export default memo(HYPlayList)
