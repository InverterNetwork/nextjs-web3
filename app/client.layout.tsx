'use client'

import Navbar from './components/Navbar'
import { Box, Stack } from '@chakra-ui/react'

export default function RootClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box>
      <Navbar />
      <Stack overflow-y="scroll" align={'center'} p={3}>
        {children}
      </Stack>
    </Box>
  )
}
