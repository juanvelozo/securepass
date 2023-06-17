export enum PasswordQualityEnum {
    POOR = 'poor',
    WEAK = 'weak',
    GOOD = 'good',
    STRONG = 'strong',
    GODLIKE = 'godlike',
}
 
type PasswordQualityTypeColor = {
    [x in PasswordQualityEnum]: string    
}
type PasswordQualityTypeLabel = {
    [x in PasswordQualityEnum]: string    
}
type PasswordQualityTypeProgress = {
    [x in PasswordQualityEnum]: number    
}
export const PasswordQualityColor: PasswordQualityTypeColor = {
  weak:'#D14D72',
  poor: '#FAAB78',
  good: '#E8AA42',
  strong: '#7FB77E',
  godlike: '#41644A',
  }
export const PasswordQualityLabel: PasswordQualityTypeLabel = {
  weak: 'Débil',
    poor: 'Pobre',
    good: 'Buena',
    strong: 'Fuerte',
    godlike:'Nivel dios',
  }
export const PasswordQualityProgress: PasswordQualityTypeProgress = {
  weak: 20,
    poor: 40,
    good: 60,
    strong:  80,
    godlike:100,
  }