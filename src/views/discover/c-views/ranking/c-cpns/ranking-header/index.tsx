import React, { memo } from 'react'
import { shallowEqualApp, useAppSelector } from '@/store'
import { formatMonthDay } from '@/utils/format'

import HYSongOperationBar from '@/components/song-operation-bar'
import { RankingHeaderWrapper } from './style'

export default memo(function HYRankingHeader() {
  // redux
  const { playList } = useAppSelector(
    (state) => ({
      playList: state.ranking.playList
    }),
    shallowEqualApp
  )

  return (
    <RankingHeaderWrapper>
      <div className="image">
        <img src={playList.coverImgUrl} alt="" />
        <span className="image_cover">封面</span>
      </div>
      <div className="info">
        <div className="title">{playList.name}</div>
        <div className="time">
          <i className="clock sprite_icon2"></i>
          <div>最近更新：{formatMonthDay(playList.updateTime)}</div>
          <div className="update-f">（{'每日更新:TODO'}）</div>
        </div>
        <HYSongOperationBar
          favorTitle={`(${playList.subscribedCount})`}
          shareTitle={`(${playList.shareCount})`}
          downloadTitle="下载"
          commentTitle={`(${playList.commentCount})`}
          id={0}
        />
      </div>
    </RankingHeaderWrapper>
  )
})
