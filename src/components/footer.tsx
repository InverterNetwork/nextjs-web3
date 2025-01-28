import Link from 'next/link'
import { FaDiscord, FaTwitter } from 'react-icons/fa'
import { Button } from '@inverter-network/react'

export function Footer() {
  return (
    <div className="border-t border-border py-2 px-4 flex justify-end gap-2">
      <Link target="_blank" href={'https://x.com/inverternetwork'}>
        <Button size="sm" variant="link" startIcon={<FaTwitter />}>
          X (formerly Twitter)
        </Button>
      </Link>

      <Link target="_blank" href={'https://discord.inverter.network/'}>
        <Button size="sm" variant="link" startIcon={<FaDiscord />}>
          Discord
        </Button>
      </Link>
    </div>
  )
}
