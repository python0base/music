import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { RankingItemWrapper } from './style'
import { getImageSize } from '@/utils/format'
import { useAppDispatch } from '@/store'
import {
  fetchCurrentSongAction,
  fetchSongListAction
} from '@/views/player/store/player'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  itemData: any
  ind: number
}

const TopRankingItem: FC<IProps> = (props) => {
  const { itemData, ind } = props
  const { tracks = [] } = itemData
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  function handlePlayClick(id: number) {
    dispatch(fetchCurrentSongAction(id))
  }

  function listPlayClick(id: number) {
    dispatch(fetchSongListAction(id))
  }

  function list() {
    navigate('/discover/ranking', { state: { id: ind } })
  }

  function detail(item: any) {
    navigate('/discover/player', { state: { currentSong: item } })
  }

  return (
    <RankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button
              className="sprite_02 btn play"
              onClick={() => listPlayClick(itemData.id)}
            ></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="item" key={item.id}>
              <div className="index">{index + 1}</div>
              <div className="info">
                <div className="name" onClick={() => detail(item)}>
                  {item.name}
                </div>
                <div className="operator">
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlayClick(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 add"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a onClick={() => list()}>查看全部 &gt;</a>
      </div>
    </RankingItemWrapper>
  )
}

export default memo(TopRankingItem)
