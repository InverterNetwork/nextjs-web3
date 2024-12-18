'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@inverter-network/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@inverter-network/react/client'
import { useTheme } from 'next-themes'

export function ThemeSwitcher({ className }: { className?: string }) {
  const { setTheme } = useTheme()

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="w-full">
          <Button variant="ghost" size="icon" className="mx-auto px-3">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setTheme('light')}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('dark')}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme('system')}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
