import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AlbumItemWrapper } from './style'
import { getImageSize } from '@/utils/format'

interface IProps {
  children?: ReactNode
  itemData: any
}

const NewAlbumItem: FC<IProps> = (props) => {
  const {
    info,
    size = '100px',
    width = '118px',
    bgp = '-570px'
  } = props.itemData
  return (
    <AlbumItemWrapper size={size} width={width} bgp={bgp}>
      <div className="album-image">
        <img src={getImageSize(info.picUrl, 150)} alt="" />
        <a href="/abc" className="cover sprite_covor">
          {info.name}
        </a>
      </div>
      <div className="album-info">
        <div className="name">{info.name}</div>
        <div className="artist">{info.artist.name}</div>
      </div>
    </AlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)
