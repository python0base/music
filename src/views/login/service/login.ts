import hyRequest from '@/service'

export function getLoginCaptcha(phone: number) {
  return hyRequest.get({
    url: '/captcha/sent',
    params: {
      phone
    }
  })
}

export function getLogin(phone: string, password: string) {
  console.log(phone, password)
  return hyRequest.post({
    url: '/login/cellphone',
    params: {
      phone,
      password
    }
  })
}
