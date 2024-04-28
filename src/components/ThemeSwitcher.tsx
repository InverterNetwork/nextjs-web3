'use client'

import { useTheme } from '@/hooks'
import { FaMoon, FaSun } from 'react-icons/fa'
import { cn } from '@/styles/cn'

export function ThemeSwitcher(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  const { theme, setTheme } = useTheme()

  const { className, ...rest } = props

  return (
    <div className={cn('flex item-center justify-center', className)} {...rest}>
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
    </div>
  )
}
