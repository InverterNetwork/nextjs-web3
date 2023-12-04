'use client'

import { useTheme } from 'react-daisyui'
import { FaMoon, FaSun } from 'react-icons/fa'

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        value={theme}
        checked={theme === 'dark'}
        onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />

      <FaSun className="swap-on fill-current w-5 h-5" />

      <FaMoon className="swap-off fill-current w-5 h-5" />
    </label>
  )
}
