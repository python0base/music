import React, { useEffect, memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import { getRadios } from '../../store/djradio'

import HYThemeHeaderNormal from '@/components/theme-header-normal'
import HYRadioRankingCover from '@/components/radio-ranking-cover'
import HYPagination from '@/components/pagination'
import { RankingWraper } from './style'
import { useState } from 'react'

interface IProps {
  children?: ReactNode
}

const HYRadioRanking: FC<IProps> = () => {
  // state
  const [currentPage, setCurrentPage] = useState(1)

  // redux
  const { currentId, radios } = useAppSelector(
    (state) => ({
      currentId: state.djradio.currentId,
      radios: state.djradio.radios
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  // hooks
  useEffect(() => {
    if (currentId === 0) return
    dispatch(getRadios({ currentId, offset: 0 }))
  }, [dispatch, currentId])

  // hanlde function
  const onPageChange = (page: number, pageSize: number) => {
    setCurrentPage(page)
    dispatch(getRadios({ currentId, offset: page * 30 }))
  }

  return (
    <RankingWraper>
      <HYThemeHeaderNormal title="电台排行榜" rightSlot={undefined} />
      <div className="ranking-list">
        {radios.map((item, index) => {
          return <HYRadioRankingCover key={item.id} radio={item} />
        })}
      </div>
      <HYPagination
        currentPage={currentPage}
        total={1000}
        pageSize={30}
        onPageChange={onPageChange}
      />
    </RankingWraper>
  )
}

export default memo(HYRadioRanking)
