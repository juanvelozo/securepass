import { dashSlash, keys, lowercaseChars, mathSymbols, numbers, punctuation, quotation, symbols, uppercaseChars } from "@/helpers/chartypes/char.types";
import { PasswordFilters } from "@/helpers/filters/passwordFilters.type";

export function randomizePassword({filters,length}:IRandomPass) {
    const characters: any[] =[
        ...(filters.NUMBER ? numbers : []),
        ...(filters.MINUS ? lowercaseChars : []),
        ...(filters.MAYUS ? uppercaseChars : []),
        ...(filters.LOGOGRAM ? symbols : []),
        ...(filters.DASHSLASH ? dashSlash : []),
        ...(filters.KEYS ? keys : []),
        ...(filters.MATH ? mathSymbols : []),
        ...(filters.PUNCTUATION ? punctuation : []),
        ...(filters.QUOTATION ? quotation : []),
    ]
    let password = ''
    if (characters.length === 0) return ''
  
        for(let i = 0; i < length; i++){
            const index = Math.floor(Math.random() * characters.length)
            password += characters[index]
        }
        
        return password
  }

  interface IRandomPass {
    length: number,
    filters: PasswordFilters
  }