'use client'

import { Box, useColorModeValue } from '@chakra-ui/react'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const borderColor = useColorModeValue('light.border', 'dark.border')
  return (
    <Box className="navbar" borderBottom="1px solid" borderColor={borderColor}>
      <Link href="/">
        <Image
          priority
          src="/inverter-light-logo.svg"
          alt="inverter_logo"
          width={42}
          height={42}
        />
      </Link>
      <DynamicWidget variant="modal" />
    </Box>
  )
}
