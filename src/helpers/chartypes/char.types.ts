export enum CharTypeEnum {
  MAYUS = 'MAYUS',
  MINUS = 'MINUS',
  NUMBER = 'NUMBER',
  LOGOGRAM = 'LOGOGRAM',
  PUNCTUATION = 'PUNCTUATION',
  QUOTATION = 'QUOTATION',
  DASHSLASH = 'DASHSLASH',
  MATH = 'MATH',
  KEYS = 'KEYS',
}

type CharactersLabels = {
  [x in CharTypeEnum]: string
}

export const charsLabels: CharactersLabels = {
  DASHSLASH: 'Dashes & Slashes',
  KEYS: 'Keys',
  LOGOGRAM: 'Special characters',
  MATH: 'Math symbols',
  MAYUS: 'Capital letter',
  MINUS: 'Lower case letter',
  NUMBER: 'Number',
  PUNCTUATION: 'Punctuation symbols',
  QUOTATION: 'Quotations symbols',
}

export const charArray = Object.keys(CharTypeEnum).map(name => {
  return {
    name,
  }
})

export declare enum SpecialCharsEnum {
  SIMILAR = 'similar_chars',
}

const iterationCode = Array.from(Array(26)).map((_, i) => i + 97)

export const lowercaseChars = iterationCode.map(code =>
  String.fromCharCode(code)
) // a,b,c,d,e...
export const uppercaseChars = lowercaseChars.map(ch => ch.toUpperCase()) //A,B,C,D,E...

export const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
export const symbols = ['$', '@', '?', '!']
export const punctuation = [
  '.',
  ',',
  ';',
  ':',
  '!',
  '?',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
  '"',
  "'",
  '-',
  '_',
  '/',
  '\\',
]
export const quotation = ['"', "'", '`']
export const dashSlash = ['-', '/', '\\']
export const mathSymbols = ['+', '-', '/', '*', '%', '=', '<', '>']
export const keys = [
  '+',
  '-',
  '*',
  '=',
  '%',
  '.',
  ',',
  '(',
  ')',
  '[',
  ']',
  '{',
  '}',
]
