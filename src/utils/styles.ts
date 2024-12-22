export const css = (strings: TemplateStringsArray, ...values: any[]) => {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] || '')
  }, '')
}
