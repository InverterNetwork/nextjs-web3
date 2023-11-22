'use client'

import {
  Box,
  Button,
  Flex,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import { Link } from '@chakra-ui/next-js'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import NextLink from 'next/link'

export default function Navbar() {
  const borderColor = useColorModeValue('light.border', 'dark.border')
  const pathname = usePathname()

  const { toggleColorMode } = useColorMode()

  return (
    <Box className="header" borderBottom="1px solid" borderColor={borderColor}>
      <Flex justifyContent={'space-between'} pb={3}>
        <NextLink href="/">
          <Image
            priority
            src="/inverter-light-logo.svg"
            alt="inverter_logo"
            width={42}
            height={42}
          />
        </NextLink>
        <Button onClick={toggleColorMode}>Toggle</Button>
        <DynamicWidget variant="modal" />
      </Flex>

      <Flex
        justify={'center'}
        gap={4}
        pt={2}
        borderTop="1px solid"
        borderColor={borderColor}
      >
        <Button
          variant={'frame'}
          as={Link}
          href="/"
          isActive={pathname === '/'}
        >
          Landing
        </Button>
        <Button
          variant={'frame'}
          as={Link}
          href="/one"
          isActive={pathname === '/one'}
        >
          One
        </Button>
        <Button
          variant={'frame'}
          as={Link}
          href="/two"
          isActive={pathname === '/two'}
        >
          Two
        </Button>
      </Flex>
    </Box>
  )
}
