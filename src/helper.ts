export const isNone = (s: string): boolean => {
  return s === 'NONE'
}

export const isNullOrEmpty = (s: string): boolean => {
  return s === null || s === ''
}

export const extractKeyAlias = (s: string): string => {
  const parts = s.split('|')
  if (parts.length < 4) {
    return ''
  }
  return parts[3]
}
