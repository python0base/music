import React, { memo } from 'react'

import type { FC, ReactNode } from 'react'

import { Pagination } from 'antd'
import { PaginationWrapper } from './style'

interface IProps {
  children?: ReactNode
  currentPage: any
  total: any
  onPageChange: any
  pageSize?: number
}

const HYPagination: FC<IProps> = (props) => {
  const { currentPage, total, onPageChange } = props

  // render function
  function itemRender(current: any, type: any, originalElement: any) {
    if (type === 'prev') {
      return <button className="control prev"> &lt; 上一页</button>
    }
    if (type === 'next') {
      return <button className="control next">上一页 &gt;</button>
    }
    return originalElement
  }

  return (
    <PaginationWrapper>
      <Pagination
        className="pagination"
        size="small"
        current={currentPage}
        defaultCurrent={1}
        total={total}
        pageSize={35}
        showSizeChanger={false}
        itemRender={itemRender}
        onChange={onPageChange}
      />
    </PaginationWrapper>
  )
}
export default memo(HYPagination)
