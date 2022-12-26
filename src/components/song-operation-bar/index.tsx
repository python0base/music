import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { OperationBarWrapper } from './style'
import { useAppDispatch } from '@/store'
import { fetchCurrentSongAction } from '@/views/player/store/player'

interface IProps {
  children?: ReactNode
  favorTitle: any
  shareTitle: any
  downloadTitle: any
  commentTitle: any
  id: number
}

const HYSongOperationBar: FC<IProps> = (props) => {
  const { favorTitle, shareTitle, downloadTitle, commentTitle, id } = props
  // const { currentSong } = useAppSelector(
  //   (state) => ({
  //     currentSong: state.player.currentSong
  //   }),
  //   shallowEqualApp
  // )
  const dispatch = useAppDispatch()

  function play() {
    dispatch(fetchCurrentSongAction(id))
  }
  return (
    <OperationBarWrapper>
      <span className="play">
        <a className="play-icon sprite_button" onClick={() => play()}>
          <span className="play sprite_button">
            <i className="sprite_button"></i>
            <span>播放</span>
          </span>
        </a>
        <a href="/abc" className="add-icon sprite_button">
          +
        </a>
      </span>
      <a href="/abc" className="item sprite_button">
        <i className="icon favor-icon sprite_button">{favorTitle}</i>
      </a>
      <a href="/abc" className="item sprite_button">
        <i className="icon share-icon sprite_button">{shareTitle}</i>
      </a>
      <a href="/abc" className="item sprite_button">
        <i className="icon download-icon sprite_button">{downloadTitle}</i>
      </a>
      <a href="/abc" className="item sprite_button">
        <i className="icon comment-icon sprite_button">{commentTitle}</i>
      </a>
    </OperationBarWrapper>
  )
}

export default memo(HYSongOperationBar)
