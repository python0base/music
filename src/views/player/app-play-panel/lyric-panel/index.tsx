import React, { memo, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { PannelWrapper } from './style'
import { shallowEqualApp, useAppSelector } from '@/store'
import { scrollTo } from '@/utils/ui-helper'
import classNames from 'classnames'

interface IProps {
  children?: ReactNode
}

const HYLyricPanel: FC<IProps> = () => {
  const { currentLyrics, currentLyricIndex } = useAppSelector(
    (state) => ({
      currentLyrics: state.player.lyrics,
      currentLyricIndex: state.player.lyricIndex
    }),
    shallowEqualApp
  )
  const panelRef = useRef(null)
  useEffect(() => {
    if (currentLyricIndex > 0 && currentLyricIndex < 3) return
    scrollTo(panelRef.current, (currentLyricIndex - 3) * 32, 300)
  }, [currentLyricIndex])
  return (
    <PannelWrapper ref={panelRef}>
      <div className="lrc-content">
        {currentLyrics.map((item, index) => (
          <div
            key={item.time}
            className={classNames('lrc-item', {
              active: index === currentLyricIndex
            })}
          >
            {item.text}
          </div>
        ))}
      </div>
    </PannelWrapper>
  )
}

export default memo(HYLyricPanel)
