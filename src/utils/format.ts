export function formatCount(count: number) {
  if (count > 100000) {
    return Math.floor(count / 10000) + '万'
  } else {
    return count
  }
}

export function getImageSize(
  imageUrl: string,
  width: number,
  height: number = width
) {
  return imageUrl + `?param=${width}y${height}`
}

export function formatTime(time: number) {
  // 1.将毫秒转成秒钟
  const timeSeconds = time / 1000

  // 2.获取分钟和秒钟
  // 100s => 01:40
  // 200s => 03:20
  // Math.floor(100 / 60) => 1
  const minute = Math.floor(timeSeconds / 60)
  const second = Math.floor(timeSeconds) % 60

  // 3.格式化时间
  const formatMinute = String(minute).padStart(2, '0')
  const formatSecond = String(second).padStart(2, '0')

  return `${formatMinute}:${formatSecond}`
}

export function formatDate(time: string | number | Date, fmt: string) {
  const date = new Date(time)

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }

  const o: { [key: string]: number } = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

function padLeftZero(str: string) {
  return ('00' + str).substr(str.length)
}

export function formatMonthDay(time: string | number | Date) {
  return formatDate(time, 'MM月dd日')
}

export function formatMinuteSecond(time: string | number | Date) {
  return formatDate(time, 'mm:ss')
}
