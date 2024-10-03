'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import NextLink from 'next/link'
import { ThemeSwitcher, WalletWidget } from '.'
import Link from 'next/link'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Button } from './ui/button'
import { DropdownMenu } from './ui/dropdown-menu'
import { RiGovernmentLine } from 'react-icons/ri'
import { BiPurchaseTagAlt } from 'react-icons/bi'
import { AiOutlineProject } from 'react-icons/ai'

export function Navbar() {
  const pathname = usePathname()
  return (
    <div
      className={`
      items-center py-2 px-4 flex w-screen
      justify-between gap-4 top-0 
      drop-shadow-2xl bg-background-100/50 backdrop-blur-2xl
      border-b border-input
    `.trim()}
    >
      <div className="flex items-center gap-4">
        <NextLink href="/">
          <Image
            priority
            src="/logo.png"
            alt="Rare Earth Logo"
            width={64}
            height={64}
          />
        </NextLink>

        <ThemeSwitcher />

        <div className="items-center lg:flex hidden gap-4">
          <NavItems pathname={pathname} />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <WalletWidget />

        <span className="lg:hidden">
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="outline" size="icon">
                <GiHamburgerMenu className="fill-current w-5 h-5" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
              <NavItems pathname={pathname} reverse />
            </DropdownMenu.Content>
          </DropdownMenu>
        </span>
      </div>
    </div>
  )
}

const NavItems = ({
  pathname,
  reverse = false,
}: {
  pathname: string
  reverse?: boolean
}) => {
  const arr = [
    { href: '/', label: 'Gov', icon: <RiGovernmentLine /> },
    {
      href: '/purchase',
      label: 'Purchase',
      icon: <BiPurchaseTagAlt />,
    },
    {
      href: '/project',
      label: 'Project',
      icon: <AiOutlineProject />,
    },
  ]

  if (reverse) arr.reverse()

  return arr.map((i, index) => {
    if (reverse) {
      return (
        <Link href={i.href} key={index}>
          <DropdownMenu.CheckboxItem
            checked={pathname === i.href}
            className="flex items-center gap-3"
          >
            {i?.icon}
            {i.label}
          </DropdownMenu.CheckboxItem>
        </Link>
      )
    }
    return (
      <Button
        key={index}
        size={'sm'}
        startIcon={i.icon}
        asChild
        {...(pathname !== i.href && { variant: 'outline' })}
      >
        <Link href={i.href}>{i.label}</Link>
      </Button>
    )
  })
}
