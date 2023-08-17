export function scrollTo(element: any, to: number, duration: number) {
  if (duration <= 0) return

  const difference = to - element.scrollTop
  const perTick = (difference / duration) * 10

  let time: any = null
  time = setTimeout(() => {
    clearTimeout(time)
    if (element.scrollTop === to) return
    element.scrollTop = element.scrollTop + perTick
    scrollTo(element, to, duration - 10)
  }, 10)
}
