import hyRequest from '@/service'

export function getSongCategory() {
  return hyRequest.get({
    url: '/playlist/catlist'
  })
}

export function getSongCategoryList(cat = '全部', offset = 0, limit = 35) {
  return hyRequest.get({
    url: '/top/playlist',
    params: {
      cat,
      limit,
      offset
    }
  })
}
