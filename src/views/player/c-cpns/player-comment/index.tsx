import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const HYPlayerComment: FC<IProps> = () => {
  return <div>HYPlayerComment</div>
}

export default memo(HYPlayerComment)
