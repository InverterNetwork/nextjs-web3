'use client'

import { FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '@/hooks'

export default function ThemeSwitcher() {
  const { isLight, toggleTheme } = useTheme(true)

  return (
    <label className="swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        className="theme-controller"
        value="synthwave"
        checked={!isLight}
        onChange={toggleTheme}
      />

      <FaSun className="swap-on fill-current w-7 h-7" />

      <FaMoon className="swap-off fill-current w-7 h-7" />
    </label>
  )
}
