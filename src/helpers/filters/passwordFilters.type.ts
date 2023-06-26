export type CharType =
  | 'MAYUS'
  | 'MINUS'
  | 'NUMBER'
  | 'LOGOGRAM'
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
  PUNCTUATION: boolean
  QUOTATION: boolean
  DASHSLASH: boolean
  MATH: boolean
  KEYS: boolean
}
export const initialCharFilterState:PasswordFilters = {
  DASHSLASH: false,
  KEYS: false,
  LOGOGRAM: true,
  MATH: false,
  MAYUS: true,
  MINUS: true,
  NUMBER: true,
  PUNCTUATION: false,
  QUOTATION: false,
};