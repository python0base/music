import React, { useState, memo } from 'react'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import { PER_PAGE_NUMBER } from '../../store/constants'
import { getSongList } from '../../store/songs'

import HYThemeCover from '@/components/theme-cover'
import HYPagination from '@/components/pagination'
import { SongListWrapper } from './style'

export default memo(function HYSongsList() {
  // hooks
  const [currentPage, setCurrentPage] = useState(1)

  // redux
  const { categorySongs } = useAppSelector(
    (state) => ({
      categorySongs: state.songs.categorySongs
    }),
    shallowEqualApp
  )
  const songList: any[] = categorySongs.playlists || []
  const total = categorySongs.total || 0
  const dispatch = useAppDispatch()

  function onPageChange(page: any, pageSize: any) {
    setCurrentPage(page)
    dispatch(getSongList(page))
  }

  return (
    <SongListWrapper>
      <div className="songs-list">
        {songList.map((item, index) => {
          return <HYThemeCover info={item} key={item.id} right="30px" />
        })}
      </div>
      <HYPagination
        currentPage={currentPage}
        total={total}
        pageSize={PER_PAGE_NUMBER}
        onPageChange={onPageChange}
      />
    </SongListWrapper>
  )
})
