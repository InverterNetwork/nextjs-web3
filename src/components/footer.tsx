import Link from 'next/link'
import { MdOutlineFeedback } from 'react-icons/md'
import { FaDiscord } from 'react-icons/fa'
import { Button } from '@inverter-network/react'

export function Footer() {
  return (
    <div className="border-t border-border py-2 px-4 flex justify-end gap-2">
      <Link
        target="_blank"
        href={
          'https://docs.google.com/forms/d/e/1FAIpQLSdqXPSiXCxlChtsm-P7GaWMWwf1AO7riDzPvmBdTdpuMwD7pQ/viewform'
        }
      >
        <Button size="sm" variant="link" startIcon={<MdOutlineFeedback />}>
          Feedback
        </Button>
      </Link>

      <Link target="_blank" href={'https://discord.com/invite/Aa7gCRNw38'}>
        <Button size="sm" variant="link" startIcon={<FaDiscord />}>
          Discord
        </Button>
      </Link>
    </div>
  )
}
