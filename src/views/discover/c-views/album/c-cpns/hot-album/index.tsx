import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import { getHotAlbumsAction } from '../../store/album'

import HYAlbumCover from '@/components/new-album-item'
import HYThemHeaderNormal from '@/components/theme-header-normal'
import { HotAlbumWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HYHotAlbum: FC<IProps> = () => {
  const { hotAlbums } = useAppSelector(
    (state) => ({
      hotAlbums: state.album.hotAlbums
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getHotAlbumsAction())
  }, [dispatch])

  return (
    <HotAlbumWrapper>
      <HYThemHeaderNormal title="热门新碟" rightSlot={undefined} />
      <div className="album-list">
        {hotAlbums.slice(0, 10).map((item) => {
          const data = {
            size: '130px',
            width: '153px',
            bgp: '-845px',
            info: item
          }
          return <HYAlbumCover itemData={data} key={item.id} />
        })}
      </div>
    </HotAlbumWrapper>
  )
}

export default memo(HYHotAlbum)
