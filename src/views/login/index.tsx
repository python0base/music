import React, { memo, useEffect, useRef } from 'react'
import type { FC, ReactNode } from 'react'
import { Button, Form, Input, InputRef } from 'antd'
import { LoginWrapper } from './style'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { getCaptcha } from './store/login'
import { Logins } from './store/login'
interface IProps {
  children?: ReactNode
  onOk: any
}

const Login: FC<IProps> = (props) => {
  const { onOk } = props
  const { loginInfo } = useAppSelector(
    (state) => ({
      loginInfo: state.login.loginDetail
      // currentId: state.player.currentSongD.id
    }),
    shallowEqualApp
  )
  const dispatch = useAppDispatch()
  const inp = useRef<InputRef>(null)
  const inp1 = useRef<InputRef>(null)
  const onFinish = (values: any) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  function Captcha() {
    const phone = inp.current?.input?.value
    if (phone !== '' || phone !== undefined)
      dispatch(getCaptcha(phone)), [dispatch]
  }
  function login() {
    const phone = inp.current?.input?.value.toString()
    const password = inp1.current?.input?.value.toString()
    if (phone !== undefined && password !== undefined) {
      const param = {
        phone,
        password
      }
      dispatch(Logins(param))
    }
  }
  useEffect(() => {
    if (loginInfo.account !== undefined) onOk()
  }, [loginInfo.account !== undefined])
  return (
    <LoginWrapper>
      <Form
        name="form"
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 12 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="手机号"
          rules={[
            { required: true, message: 'Please input your phone number!' }
          ]}
        >
          <Input className="input2" ref={inp} />
        </Form.Item>
        <Form.Item
          label="密码"
          rules={[{ required: true, message: 'Please input your password!' }]}
          wrapperCol={{ span: 12 }}
        >
          <Input.Password className="input" ref={inp1} />
          {/* <Button
            type="primary"
            shape="round"
            style={{ backgroundColor: '#FF3A3A', borderColor: '#FF3A3A' }}
            onClick={() => Captcha()}
          >
            获取验证码
          </Button> */}
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 32 }} className="itemPad">
          <Button
            className="button1"
            htmlType="submit"
            type="primary"
            shape="round"
            style={{ backgroundColor: '#FF3A3A', borderColor: '#FF3A3A' }}
            onClick={() => login()}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </LoginWrapper>
  )
}

export default memo(Login)
