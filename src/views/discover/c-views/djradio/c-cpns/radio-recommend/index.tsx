import React, { useEffect, memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import { getRadioRecommend } from '../../store/djradio'

import HYThemeHeaderNormal from '@/components/theme-header-normal'
import HYRadioRecomendCover from '@/components/radio-recommend-cover'
import { RecommendWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HYRadioRecommend: FC<IProps> = () => {
  // redux
  const { currentId, recommends } = useAppSelector(
    (state) => ({
      currentId: state.djradio.currentId,
      recommends: state.djradio.recommends
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  // hooks
  useEffect(() => {
    if (currentId === 0) return
    dispatch(getRadioRecommend(currentId))
  }, [dispatch, currentId])

  return (
    <RecommendWrapper>
      <HYThemeHeaderNormal title="优秀新电台" rightSlot={undefined} />
      <div className="radio-list">
        {recommends.slice(0, 5).map((item) => {
          return <HYRadioRecomendCover info={item} key={item.id} />
        })}
      </div>
    </RecommendWrapper>
  )
}

export default memo(HYRadioRecommend)
