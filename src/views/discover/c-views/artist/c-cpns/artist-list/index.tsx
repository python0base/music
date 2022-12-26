import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import HYThemeHeaderNormal from '@/components/theme-header-normal'
import HYAlphaList from './c-cpns/alpha-list'
import HYArtistItem from './c-cpns/artist-item'
import { ArtistListWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const HYArtistList: FC<IProps> = () => {
  // redux hooks
  const { currentType, artistList } = useAppSelector(
    (state) => ({
      currentType: state.artist.currentType,
      artistList: state.artist.artistList
    }),
    shallowEqualApp
  )

  return (
    <ArtistListWrapper>
      <HYThemeHeaderNormal title={currentType.name} rightSlot={undefined} />
      <HYAlphaList />
      <div className="artist-list">
        {artistList.map((item, index) => {
          return <HYArtistItem key={item.id} index={index} info={item} />
        })}
      </div>
    </ArtistListWrapper>
  )
}

export default memo(HYArtistList)
