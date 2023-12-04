'use client'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import NextLink from 'next/link'
import ThemeSwitcher from './ThemeSwitcher'
import Link from 'next/link'
import { Button } from 'react-daisyui'
import WalletWidget from './WalletWidget'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className={`header border-b`}>
      <div className="flex pb-3 justify-between">
        <NextLink href="/">
          <Image
            priority
            src="/inverter-light-logo.svg"
            alt="inverter_logo"
            width={42}
            height={42}
          />
        </NextLink>
        <WalletWidget />
      </div>

      <div className="flex justify-center gap-4 border-t pt-2">
        <ThemeSwitcher />

        {[
          { href: '/', label: 'Landing' },
          { href: '/one', label: 'One' },
          { href: '/two', label: 'two' },
        ].map((i, index) => (
          <Link href={i.href} key={index}>
            <Button
              size={'sm'}
              {...(pathname !== i.href && { color: 'ghost' })}
            >
              {i.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
