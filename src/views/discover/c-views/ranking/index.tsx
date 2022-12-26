import type { FC, ReactNode } from 'react'
import React, { useEffect, memo } from 'react'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { useLocation } from 'react-router-dom'
import { changeCurrentIndex, getTops } from './store/ranking'

import HYTopRanking from './c-cpns/top-ranking'
import HYRankingHeader from './c-cpns/ranking-header'
import HYRankingList from './c-cpns/ranking-list'
import { RankingWrapper, RankingLeft, RankingRight } from './style'

interface IProps {
  children?: ReactNode
}

const Ranking: FC<IProps> = () => {
  // redux
  const dispatch = useAppDispatch()
  const location = useLocation()
  // hooks
  useEffect(() => {
    console.log(location)
    dispatch(getTops())
    if (location.state !== null) dispatch(changeCurrentIndex(location.state.id))
  }, [dispatch])

  return (
    <RankingWrapper className="wrap-v2">
      <RankingLeft>
        <HYTopRanking />
      </RankingLeft>
      <RankingRight>
        <HYRankingHeader />
        <HYRankingList />
      </RankingRight>
    </RankingWrapper>
  )
}

export default memo(Ranking)
