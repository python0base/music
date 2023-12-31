import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Avatar, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderLeft, HeaderRight, HeaderWrapper } from './style'
import { shallowEqualApp, useAppSelector } from '@/store'
import headerTitles from '@/assets/data/header_titles.json'
import { Button, Modal, Space } from 'antd'
import Login from '../../views/login'
interface IProps {
  children?: ReactNode
}

const AppHeader: FC<IProps> = () => {
  /** 定义组件内部的状态 */
  // const [currentIndex, setCurrentIndex] = useState(0)

  /** 组件的展示逻辑 */
  // 登录框的显示
  const [isModalOpen, setIsModalOpen] = useState(false)

  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink
          to={item.link}
          className={({ isActive }) => {
            return isActive ? 'active' : undefined
          }}
        >
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return (
        <a href={item.link} rel="noreferrer" target="_blank">
          {item.title}
        </a>
      )
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const { loginInfo } = useAppSelector(
    (state) => ({
      loginInfo: state.login.loginDetail
    }),
    shallowEqualApp
  )
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a className="logo sprite_01" href="/">
            YH音乐
          </a>
          <div className="title-list">
            {headerTitles.map((item) => (
              <div className="item" key={item.title}>
                {showItem(item)}
              </div>
            ))}
          </div>
        </HeaderLeft>
        <HeaderRight isLogin={loginInfo.account !== undefined}>
          <Input
            className="search"
            placeholder="音乐/视频/电台/用户"
            prefix={<SearchOutlined />}
          />

          <span className="center">创作者中心</span>
          {
            <span className="login" onClick={showModal}>
              登录
            </span>
          }
          <Avatar
            icon={<img src={loginInfo.profile?.avatarUrl} />}
            className="loginInfo"
          />
          <Modal
            title="手机号登录"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[<a key="other">其他登录方式&gt;</a>]}
          >
            <Login onOk={handleOk} />
          </Modal>
        </HeaderRight>
      </div>
      <div className="divider"></div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
