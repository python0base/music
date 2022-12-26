import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import classNames from 'classnames'

import { artistCategories } from '@/assets/data/local_data'

import { CategoryWrapper, CategoryItem } from './style'
import {
  changeCurrentAreaAction,
  changeCurrentTypeAction
} from '../../store/artist'

interface IProps {
  children?: ReactNode
}

const HYArtistCategory: FC<IProps> = () => {
  // redux hooks
  const { currentArea, currentType } = useAppSelector(
    (state) => ({
      currentArea: state.artist.currentArea,
      currentType: state.artist.currentType
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  // handle function
  const selectArtist = (area: any, type: any) => {
    dispatch(changeCurrentAreaAction(area))
    dispatch(changeCurrentTypeAction(type))
  }

  // render jsx
  const renderArtist = (artists: any[], area: number) => {
    return (
      <div>
        {artists.map((item) => {
          const isSelect =
            currentArea === area && currentType.type === item.type
          return (
            <CategoryItem
              key={item.name}
              className={classNames({ active: isSelect })}
            >
              <span onClick={() => selectArtist(area, item)}>{item.name}</span>
            </CategoryItem>
          )
        })}
      </div>
    )
  }

  return (
    <CategoryWrapper>
      {artistCategories.map((item, index) => {
        return (
          <div className="section" key={item.area}>
            <h2 className="title">{item.title}</h2>
            {renderArtist(item.artists, item.area)}
          </div>
        )
      })}
    </CategoryWrapper>
  )
}

export default memo(HYArtistCategory)
