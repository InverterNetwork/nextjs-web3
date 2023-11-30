/**
 * Shade a specified color
 * @param color - the color in hex format
 * @param magnitude - the amount to lighten (0-100) | darken (-100-0)
 */
export const shadeColor = (hexColor: string, magnitude: number) => {
  hexColor = hexColor.replace(`#`, ``)
  if (hexColor.length === 6) {
    const decimalColor = parseInt(hexColor, 16)
    let r = (decimalColor >> 16) + magnitude
    r > 255 && (r = 255)
    r < 0 && (r = 0)
    let g = (decimalColor & 0x0000ff) + magnitude
    g > 255 && (g = 255)
    g < 0 && (g = 0)
    let b = ((decimalColor >> 8) & 0x00ff) + magnitude
    b > 255 && (b = 255)
    b < 0 && (b = 0)
    return `#${(g | (b << 8) | (r << 16)).toString(16)}`
  } else {
    return hexColor
  }
}

/**
 * Shade a specified color into 10 shades
 * @param baseColor - the color in hex format
 * @param interval - deterimen the incremet of the shades ( put a negative number to darken the color )
 */
export function generateColorShades(
  baseColor: string,
  interval: number = 10
): Record<number, string> {
  const shades: Record<number, string> = {}
  const percentages = []

  for (let i = 0; i < 10; i++) percentages.push(i * interval)
  percentages.reverse()

  shades[50] = shadeColor(baseColor, percentages[0])

  for (let i = 1; i < percentages.length; i++) {
    const key = (i + 1) * 100
    if (key === 1000) shades[900] = baseColor
    else shades[key - 100] = shadeColor(baseColor, percentages[i])
  }
  return shades
}

export function reduceOpacity(hexColor: string) {
  // Remove '#' symbol from the hex color
  hexColor = hexColor.replace('#', '')

  // Extract the RGB values from the hex color
  const red = parseInt(hexColor.substring(0, 2), 16)
  const green = parseInt(hexColor.substring(2, 4), 16)
  const blue = parseInt(hexColor.substring(4, 6), 16)

  // Convert the RGB values to the desired opacity (30%)
  const opacity = 0.3

  // Create the RGBA color string
  const rgbaColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`

  return rgbaColor
}
