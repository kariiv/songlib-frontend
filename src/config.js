
export const capitalize = (s) => {
    if (typeof s !== 'string') return s
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export const baseName = '/~kariiv/music2'

export const safari = navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1

export const ver = "2.1.2"