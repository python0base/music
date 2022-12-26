import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { getImageSize, formatMinuteSecond } from '@/utils/format'

import HYThemeHeaderSong from '@/components/theme-header-song'
import { RankingListWrapper } from './style'
import { useNavigate } from 'react-router-dom'
import { fetchCurrentSongAction } from '@/views/player/store/player'

interface IProps {
  children?: ReactNode
}

const HYRankingList: FC<IProps> = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const state = useAppSelector(
    (state) => ({
      playList: state.ranking.playList
    }),
    shallowEqualApp
  )
  const tracks: any[] = state.playList.tracks || []

  function detail(item: any) {
    navigate('/discover/player', { state: { currentSong: item } })
  }

  function handlePlayClick(id: number) {
    dispatch(fetchCurrentSongAction(id))
  }

  return (
    <RankingListWrapper>
      <HYThemeHeaderSong />
      <div className="play-list">
        <table>
          <thead>
            <tr className="header">
              <th className="ranking"></th>
              <th className="title">标题</th>
              <th className="duration">时长</th>
              <th className="singer">歌手</th>
            </tr>
          </thead>
          <tbody>
            {tracks.map((item, index) => {
              return (
                <tr className="" key={item.id}>
                  <td>
                    <div className="rank-num">
                      <span className="num">{index + 1}</span>
                      <span className="new sprite_icon2"></span>
                    </div>
                  </td>
                  <td>
                    <div className="song-name">
                      <a>
                        {index < 3 ? (
                          <img
                            src={getImageSize(item.al.picUrl, 50)}
                            alt=""
                            onClick={() => detail(item)}
                          />
                        ) : null}
                      </a>
                      <a
                        className="play sprite_table"
                        onClick={() => handlePlayClick(item.id)}
                      ></a>
                      <a className="name" onClick={() => detail(item)}>
                        {item.name}
                      </a>
                    </div>
                  </td>
                  <td>{formatMinuteSecond(item.dt)}</td>
                  <td>{item.ar[0].name}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </RankingListWrapper>
  )
}

export default memo(HYRankingList)
