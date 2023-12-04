'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import NextLink from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import Link from 'next/link'
import { Button } from 'react-daisyui'
import WalletWidget from './WalletWidget'

export function NavbarTop() {
  return (
    <div className="navbar-c top-0 drop-shadow-xl rounded-bl-lg rounded-br-lg bg-base-100">
      <NextLink href="/">
        <Image
          priority
          src="/inverter-light-logo.svg"
          alt="inverter_logo"
          width={42}
          height={42}
        />
      </NextLink>
      <ThemeSwitcher />
      <WalletWidget />
    </div>
  )
}

export function NavbarBottom() {
  const pathname = usePathname()

  return (
    <div className="navbar-c bottom-0 drop-shadow-xl rounded-tl-lg rounded-tr-lg bg-base-100">
      {[
        { href: '/', label: 'Landing' },
        { href: '/one', label: 'One' },
        { href: '/two', label: 'two' },
      ].map((i, index) => (
        <Link href={i.href} key={index}>
          <Button size={'sm'} {...(pathname !== i.href && { color: 'ghost' })}>
            {i.label}
          </Button>
        </Link>
      ))}
    </div>
  )
}
