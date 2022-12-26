import hyRequest from '@/service'

interface Iparam {
  cat?: number
  type?: any
  area?: any
  initial?: any
  limit: number
}
export function getArtistList(area: any, type: any, initial: any) {
  let url = '/artist/list'
  let params: Iparam = { limit: 100 }
  if (area === -1 && type === 1) {
    url = '/top/artists'
  } else {
    if (area === -1) {
      params = { limit: 100, cat: 5001 }
    } else {
      params = {
        type,
        area,
        initial,
        limit: 100
      }
    }
  }

  console.log('url:', url, 'params:', params)

  return hyRequest.get({
    url,
    params
  })
}
