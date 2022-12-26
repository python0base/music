import hyRequest from '@/service'

export function getHotAlbums() {
  return hyRequest.get({
    url: '/album/newest'
  })
}

export function getTopAlbums(limit: any, offset: any) {
  return hyRequest.get({
    url: '/album/new',
    params: {
      limit,
      offset
    }
  })
}
