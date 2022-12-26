import React, { memo } from 'react'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import { changeCurrentCategoryAction, getSongList } from '../../store/songs'

import { CategoryWrapper } from './style'

export default memo(function HYSongsCategory() {
  // redux
  const { category } = useAppSelector(
    (state) => ({
      category: state.songs.category
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  function selectCategory(name: any) {
    dispatch(changeCurrentCategoryAction(name))
    dispatch(getSongList(0))
  }
  interface item {
    name: any
    subs: any[]
  }

  return (
    <CategoryWrapper>
      <div className="arrow sprite_icon"></div>
      <div className="all">
        <span className="link" onClick={() => selectCategory('全部')}>
          全部风格
        </span>
      </div>
      <div className="category">
        {category.map((item: item, index) => {
          return (
            <dl key={item.name} className={'item' + index}>
              <dt>
                <i className="icon sprite_icon2"></i>
                <span>{item.name}</span>
              </dt>
              <dd>
                {item.subs.map((sItem) => {
                  return (
                    <div className="item" key={sItem.name}>
                      <span
                        className="link"
                        onClick={() => selectCategory(sItem.name)}
                      >
                        {sItem.name}
                      </span>
                      <span className="divider">|</span>
                    </div>
                  )
                })}
              </dd>
            </dl>
          )
        })}
      </div>
    </CategoryWrapper>
  )
})
