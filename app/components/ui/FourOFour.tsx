'use client'

import { Link } from '@chakra-ui/next-js'
import { Stack, Heading, Divider, Button } from '@chakra-ui/react'

export default function FourOFour() {
  return (
    <Stack gap={5} align={'center'} m={'auto'}>
      <Heading>404 / Page Not Found</Heading>
      <Divider />
      <Button variant={'accent'} w={260} as={Link} href="/">
        Explore
      </Button>
    </Stack>
  )
}
