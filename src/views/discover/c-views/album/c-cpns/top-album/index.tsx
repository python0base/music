import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import { getTopAlbumsAction } from '../../store/album'

import HYThemeHeaderNormal from '@/components/theme-header-normal'
import HYAlbumCover from '@/components/new-album-item'
import HYPagination from '@/components/pagination'
import { TopAlbumWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HYTopAlbum: FC<IProps> = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const { topAlbums, total } = useAppSelector(
    (state) => ({
      topAlbums: state.album.topAlbums,
      total: state.album.topTotal
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTopAlbumsAction(1))
  }, [dispatch])

  const onPageChange = (page: any, pageSize: any) => {
    setCurrentPage(page)
    dispatch(getTopAlbumsAction(page))
  }

  return (
    <TopAlbumWrapper>
      <HYThemeHeaderNormal title="全部新碟" rightSlot={undefined} />
      <div className="album-list">
        {topAlbums.map((item) => {
          const data = {
            size: '130px',
            width: '153px',
            bgp: '-845px',
            info: item
          }
          return <HYAlbumCover itemData={data} key={item.id} />
        })}
      </div>
      <HYPagination
        currentPage={currentPage}
        total={total}
        pageSize={30}
        onPageChange={onPageChange}
      />
    </TopAlbumWrapper>
  )
}

export default memo(HYTopAlbum)
