import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { getImageSize } from '@/utils/format'

import { CoverWrapper } from './style'

interface IProps {
  children?: ReactNode
  info: any
}

const HYRadioRecommendCover: FC<IProps> = (props) => {
  const { info } = props

  return (
    <CoverWrapper>
      <a href="/#">
        <img src={getImageSize(info.picUrl, 150)} alt="" />
      </a>
      <a href="/#" className="text-nowrap name">
        {info.name}
      </a>
      <p className="text-nowrap">{info.desc}</p>
    </CoverWrapper>
  )
}

export default memo(HYRadioRecommendCover)
