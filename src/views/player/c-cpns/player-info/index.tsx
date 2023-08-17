import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import * as formatUtils from '@/utils/format'

import HYSongOperationBar from '@/components/song-operation-bar'
import { InfoWrapper, InfoLeft, InfoRight } from './style'
import { useLocation } from 'react-router-dom'
import { getDetailSongAction } from '../../store/player'

interface IProps {
  children?: ReactNode
  id?: number
}

const HYPlayerInfo: FC<IProps> = () => {
  // props and hooks
  // const { id } = props
  const [isSpread, setIsSpread] = useState(false)
  const location = useLocation()
  const dispatch = useAppDispatch()
  // redux hooks
  const { currentLyrics } = useAppSelector(
    (state) => ({
      // currentSong: state.player.currentSongD,
      currentLyrics: state.player.lyricsD
    }),
    shallowEqualApp
  )

  // handle code
  const totalLyricCount = isSpread ? currentLyrics.length : 13

  useEffect(() => {
    dispatch(getDetailSongAction(location.state.currentSong.id))
    console.log('info')
  }, [dispatch])
  const currentSong = location.state.currentSong

  return (
    <InfoWrapper>
      <InfoLeft>
        <div className="image">
          <img
            src={formatUtils.getImageSize(currentSong.al.picUrl, 130)}
            alt=""
          />
          <span className="cover image_cover"></span>
        </div>
        <div className="link">
          <i className="sprite_icon2"></i>
          <a href="#/">生成外联播放器</a>
        </div>
      </InfoLeft>
      <InfoRight isSpread={isSpread}>
        <div className="header">
          <i className="sprite_icon2"></i>
          <h3 className="title">{currentSong.name}</h3>
        </div>
        <div className="singer">
          <span className="label">歌手：</span>
          <a href="/#" className="name">
            {currentSong.ar[0].name}
          </a>
        </div>
        <div className="album">
          <span className="label">所属专辑：</span>
          <a href="/#" className="name">
            {currentSong.al.name}
          </a>
        </div>

        <HYSongOperationBar
          favorTitle="收藏"
          shareTitle="分享"
          downloadTitle="下载"
          commentTitle="(167366)"
          id={currentSong.id}
        />

        <div className="lyric">
          <div className="lyric-info">
            {currentLyrics.slice(0, totalLyricCount).map((item) => (
              <p key={item.time} className="text">
                {item.text}
              </p>
            ))}
          </div>
          <button
            className="lyric-control"
            onClick={() => setIsSpread(!isSpread)}
          >
            {isSpread ? '收起' : '展开'}
            <i className="sprite_icon2"></i>
          </button>
        </div>
      </InfoRight>
    </InfoWrapper>
  )
}

export default memo(HYPlayerInfo)
