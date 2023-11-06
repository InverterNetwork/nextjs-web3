'use client'

import Navbar from './components/Navbar'
import { Box, Flex } from '@chakra-ui/react'

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box minH={'100vh'} w={'100vw'}>
      <Navbar />
      <Flex justify={'center'} gap={32} p={52} h={'100%'}>
        {children}
      </Flex>
    </Box>
  )
}
