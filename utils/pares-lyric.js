const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
// "[00:00.000] 作词 : 赵雷"

export function parseLyric(lyricString) {
  const lyricInfos = []
  const lyricLines = lyricString.split('\n')
  for (const lineString of lyricLines) {
    const res = timeReg.exec(lineString)
    if (!res) continue
    const minute = res[1] * 60 * 1000
    const second = res[2] * 1000
    const ms = res[3].length === 2 ? res[3] * 10 : res[3] * 1
    const time = minute + second + ms
    let text = lineString.replace(timeReg, "") 
    if (text === '') text = '...'
    lyricInfos.push({ time, text })
  }
  return lyricInfos
}