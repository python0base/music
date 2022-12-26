import hyRequest from '@/service'

export function getSongDetail(ids: number) {
  return hyRequest.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

export function getSongLyric(id: number) {
  return hyRequest.get({
    url: '/lyric',
    params: {
      id
    }
  })
}

export function getSimiPlaylist(id: number) {
  return hyRequest.get({
    url: '/simi/playlist',
    params: {
      id
    }
  })
}

export function getSimiSong(id: number) {
  return hyRequest.get({
    url: '/simi/song',
    params: {
      id
    }
  })
}
