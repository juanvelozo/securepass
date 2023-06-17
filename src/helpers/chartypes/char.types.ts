export enum CharTypeEnum {
  MAYUS = 'mayus',
  MINUS = 'minus',
  NUMBER = 'numbers',
  LOGOGRAM = 'logograms',
  ASCII = 'extended_ASCII',
  PUNCTUATION = 'punctuation_marks',
  QUOTATION = 'quotations_marks',
  DASHSLASH = 'dashes_slashes',
  MATH = 'mathematical_symbols',
  KEYS = 'keys',
}

export const charArray = Object.keys(CharTypeEnum).map(name => {
  return {
    name,
  }
})

export declare enum SpecialCharsEnum {
  SIMILAR = 'similar_chars',
}
