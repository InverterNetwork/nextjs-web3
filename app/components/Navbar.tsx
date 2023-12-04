'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import NextLink from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import Link from 'next/link'
import { Button, Menu, Swap } from 'react-daisyui'
import WalletWidget from './WalletWidget'
import { GiHamburgerMenu } from 'react-icons/gi'
import { VscChromeClose } from 'react-icons/vsc'
import { useDisclosure } from '@/hooks'

const NavItems = ({
  pathname,
  reverse = false,
}: {
  pathname: string
  reverse?: boolean
}) => {
  const arr = [
    { href: '/', label: 'Landing' },
    { href: '/one', label: 'One' },
    { href: '/two', label: 'two' },
  ]

  if (reverse) arr.reverse()

  return arr.map((i, index) => (
    <Link href={i.href} key={index}>
      <Button size={'sm'} {...(pathname !== i.href && { color: 'ghost' })}>
        {i.label}
      </Button>
    </Link>
  ))
}

export default function Navbar() {
  const pathname = usePathname()
  const { toggle, isOpen } = useDisclosure()
  return (
    <div className="navbar-c bottom-0 drop-shadow-2xl rounded-tl-xl rounded-tr-xl bg-base-100 border-t border-x">
      <NextLink href="/">
        <Image
          priority
          src="/inverter-light-logo.svg"
          alt="inverter_logo"
          width={42}
          height={42}
        />
      </NextLink>

      <ThemeSwitcher className="lg:flex hidden" />

      <WalletWidget />

      <div className="items-center lg:flex hidden gap-4">
        <h1>|</h1>
        <NavItems pathname={pathname} />
      </div>

      <div className="relative items-center flex lg:hidden">
        {isOpen && (
          <Menu className="bg-base-100 rounded-box absolute bottom-[200%] right-0">
            <Menu.Item className="flex gap-2">
              <ThemeSwitcher className="w-full" />
            </Menu.Item>
            {NavItems({ pathname, reverse: true }).map((i, index) => (
              <Menu.Item key={index}>{i}</Menu.Item>
            ))}
          </Menu>
        )}
        <Swap
          rotate
          onElement={
            <VscChromeClose className="fill-current w-5 h-5" onClick={toggle} />
          }
          offElement={
            <GiHamburgerMenu
              className="fill-current w-5 h-5"
              onClick={toggle}
            />
          }
        />
      </div>
    </div>
  )
}
