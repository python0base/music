import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { PanelWrapper } from './style'
import HYLyricPanel from './lyric-panel'
import HYPlayHeader from './play-header'
import HYPlayList from './play-list'

interface IProps {
  children?: ReactNode
}

const HYAppPlayList: FC<IProps> = () => {
  return (
    <PanelWrapper>
      <HYPlayHeader />
      <div className="main">
        <img
          className="image"
          src="https://p4.music.126.net/qeN7o2R3_OTPhghmkctFBQ==/764160591569856.jpg"
          alt=""
        />
        <HYPlayList />
        <HYLyricPanel />
      </div>
    </PanelWrapper>
  )
}

export default memo(HYAppPlayList)
