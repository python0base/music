import React, { memo, useState, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import classNames from 'classnames'

import { singerAlphas } from '@/utils/handle-data'
import { getArtistListAction } from '../../../../store/artist'

import { AlphaListWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HYAlphaList: FC<IProps> = () => {
  const [currentAlpha, setCurrentAlpha] = useState('-1')

  const { currentType, currentArea } = useAppSelector(
    (state) => ({
      currentType: state.artist.currentType,
      currentArea: state.artist.currentArea
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    setCurrentAlpha('-1')
  }, [currentType, currentArea])

  useEffect(() => {
    dispatch(
      getArtistListAction({
        area: currentArea,
        type: currentType.type,
        alpha: currentAlpha
      })
    )
  }, [currentAlpha, currentType, currentArea, dispatch])

  return (
    <AlphaListWrapper hasTop={currentArea !== -1}>
      {currentArea !== -1 &&
        singerAlphas.map((item) => {
          const isActive = currentAlpha === item
          if (item === '0') item = '其他'
          if (item === '-1') item = '热门'
          return (
            <div
              key={item}
              className={classNames('item', { active: isActive })}
            >
              <span onClick={() => setCurrentAlpha(item)}>
                {item.toUpperCase()}
              </span>
            </div>
          )
        })}
    </AlphaListWrapper>
  )
}

export default memo(HYAlphaList)
