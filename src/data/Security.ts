export const SecurityArray: Array[] = [
  {
    title: 'Prevent unauthorized access',
    description:
      'A strong password acts as a barrier against hackers, identity thieves, and unauthorized individuals who may attempt to gain access to your accounts.',
    logo: '🔐',
  },
  {
    title: 'Protect sensitive information',
    description:
      'Many online accounts contain sensitive information such as financial data, personal details, and private communications. A secure password ensures that this information remains confidential and inaccessible to unauthorized individuals.',
    logo: '🪪',
  },
  {
    description:
      'Data breaches are unfortunately common, and they can expose your username and password combinations to attackers. Using a strong and unique password makes it more difficult for hackers to exploit stolen data.',
    logo: '🦺',
    title: 'Safeguard against data breaches',
  },
  {
    description:
      'Hackers often use specialized software that automatically checks thousands of common words and phrases to crack passwords. By avoiding predictable words or phrases, you can protect yourself against dictionary attacks.',
    logo: '📚',
    title: 'Defend against dictionary attacks',
  },
  {
    description:
      'Credential stuffing involves attackers using leaked usernames and passwords from one website to gain unauthorized access to other accounts where users have reused the same credentials. A strong, unique password for each account minimizes the risk of this type of attack.',
    logo: '🥸',
    title: 'Prevent credential stuffing',
  },
  {
    description:
      'If your account is compromised, attackers may use your saved payment methods to make unauthorized purchases. A strong password adds an additional layer of protection against such fraudulent activities.',
    logo: '🤑',
    title: 'Avoid unauthorized purchases',
  },
  {
    description:
      'Hackers who gain unauthorized access to your accounts can misuse your identity to engage in malicious activities, such as spreading false information or engaging in illegal actions. A secure password helps maintain your online reputation and credibility.',
    logo: '👍',
    title: 'Protect your reputation',
  },
  {
    description:
      'Knowing that you have taken steps to secure your online accounts provides peace of mind, allowing you to focus on using online services and platforms without constant worry about potential security breaches.',
    logo: '😎',
    title: 'Peace of mind',
  },
]

export interface Array {
  title: string
  description: string
  logo: string
}
