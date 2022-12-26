import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { getImageSize, formatCount } from '@/utils/format'

import { ThemeCoverWrapper } from './style'

interface IProps {
  children?: ReactNode
  right: any
  info: any
}

const HYThemeCover: FC<IProps> = (props) => {
  const { info, right } = props

  return (
    <ThemeCoverWrapper right={right}>
      <div className="cover-top">
        <img src={getImageSize(info.picUrl || info.coverImgUrl, 140)} alt="" />
        <div className="cover sprite_covor">
          <div className="info sprite_covor">
            <span>
              <i className="sprite_icon erji"></i>
              {formatCount(info.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom text-nowrap">{info.name}</div>
      {/* <div className="cover-source">
        by {info.copywriter || info.creator.nickname}
      </div> */}
    </ThemeCoverWrapper>
  )
}

export default memo(HYThemeCover)
