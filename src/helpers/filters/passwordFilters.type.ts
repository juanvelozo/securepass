export type CharType =
  | 'MAYUS'
  | 'MINUS'
  | 'NUMBER'
  | 'LOGOGRAM'
  | 'ASCII'
  | 'PUNCTUATION'
  | 'QUOTATION'
  | 'DASHSLASH'
  | 'MATH'
  | 'KEYS'

export interface PasswordFilters {
  MAYUS: boolean
  MINUS: boolean
  NUMBER: boolean
  LOGOGRAM: boolean
  ASCII: boolean
  PUNCTUATION: boolean
  QUOTATION: boolean
  DASHSLASH: boolean
  MATH: boolean
  KEYS: boolean
}
