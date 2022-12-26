import React, { useState, memo } from 'react'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import HYSongsCategory from '../songs-category'
import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'

export default memo(function HYSongsHeader() {
  // hooks
  const [showCategory, setShowCategory] = useState(false)

  // redux
  const { currentCategory } = useAppSelector(
    (state) => ({
      currentCategory: state.songs.currentCategory
    }),
    shallowEqualApp
  )

  return (
    <HeaderWrapper>
      <HeaderLeft>
        <span className="title">{currentCategory.toString()}</span>
        <button
          className="select"
          onClick={() => setShowCategory(!showCategory)}
        >
          <span>选择分类</span>
          <i className="sprite_icon2"></i>
        </button>
        {showCategory ? <HYSongsCategory /> : null}
      </HeaderLeft>
      <HeaderRight>
        <button className="hot">热门</button>
      </HeaderRight>
    </HeaderWrapper>
  )
})
