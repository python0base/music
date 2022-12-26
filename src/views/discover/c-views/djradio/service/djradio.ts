import hyRequest from '@/service'

export function getDjRadioCatelist() {
  return hyRequest.get({
    url: '/dj/catelist'
  })
}

export function getDjRadioRecommend(type: any) {
  return hyRequest.get({
    url: '/dj/recommend/type',
    params: {
      type
    }
  })
}

export function getDjRadios(cateId: any, limit: any, offset: any) {
  return hyRequest.get({
    url: '/dj/radio/hot',
    params: {
      cateId,
      limit,
      offset
    }
  })
}
