'use client'

import { Flex } from '@chakra-ui/react'
import { DynamicWidget } from '@dynamic-labs/sdk-react-core'
import Image from 'next/image'
import Link from 'next/link'
import { RouteProgressBar } from './ui'

export default function Navbar() {
  return (
    <>
      <RouteProgressBar />
      <Flex
        flex={1}
        justify={'space-between'}
        align={'center'}
        style={{
          height: 80,
          padding: '10px 30px 10px 30px',
        }}
        shadow={'accent'}
      >
        <Link href="/">
          <Image
            priority
            src="/inverter-light-logo.svg"
            alt="inverter_logo"
            width={52}
            height={52}
          />
        </Link>
        <DynamicWidget variant="modal" />
      </Flex>
    </>
  )
}
