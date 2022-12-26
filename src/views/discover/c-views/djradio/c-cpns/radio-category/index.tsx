import React, { useEffect, useRef, memo, ElementRef } from 'react'

import type { FC, ReactNode } from 'react'
import classnames from 'classnames'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'

import { getRadioCategories, changeCurrentIdAction } from '../../store/djradio'

import { Carousel } from 'antd'
import { CategoryWrapper, CategoryContent, CategoryItemImage } from './style'

const PAGE_SIZE = 16

interface IProps {
  children?: ReactNode
}

const HYRadioCategory: FC<IProps> = () => {
  // redux
  const dispatch = useAppDispatch()
  const { categories, currentId } = useAppSelector(
    (state) => ({
      categories: state.djradio.categories,
      currentId: state.djradio.currentId
    }),
    shallowEqualApp
  )

  // data handle
  const page = Math.ceil(categories.length / PAGE_SIZE) || 1

  // hooks
  useEffect(() => {
    dispatch(getRadioCategories())
  }, [dispatch])
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)

  // handle function
  function getSize(index: number) {
    return index * PAGE_SIZE > categories.length
      ? index * PAGE_SIZE
      : categories.length
  }

  return (
    <CategoryWrapper>
      <div
        className="arrow arrow-left"
        onClick={() => carouselRef.current?.prev()}
      ></div>
      <CategoryContent>
        <Carousel dots={{ className: 'dots' }} ref={carouselRef}>
          {Array(page)
            .fill(0)
            .map((_, index) => {
              return (
                <div key={index} className="category-page">
                  {categories
                    .slice(index * PAGE_SIZE, getSize(index + 1))
                    .map((item) => {
                      return (
                        <div
                          key={item.id}
                          onClick={() =>
                            dispatch(changeCurrentIdAction(item.id))
                          }
                          className={classnames('category-item', {
                            active: currentId === item.id
                          })}
                        >
                          <CategoryItemImage
                            className="image"
                            imgUrl={item.picWebUrl}
                          ></CategoryItemImage>
                          <span>{item.name}</span>
                        </div>
                      )
                    })}
                </div>
              )
            })}
        </Carousel>
      </CategoryContent>
      <div
        className="arrow arrow-right"
        onClick={() => carouselRef.current?.next()}
      ></div>
    </CategoryWrapper>
  )
}

export default memo(HYRadioCategory)
