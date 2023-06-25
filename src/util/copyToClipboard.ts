export function copyToClipboard(string: string) {
  navigator.clipboard
    .writeText(string)
    .then(() => {
      console.log('Copied to clipboard: ' + string)
    })
    .catch(err => {
      console.error('Failed to copy to clipboard: ', err)
    })
}
