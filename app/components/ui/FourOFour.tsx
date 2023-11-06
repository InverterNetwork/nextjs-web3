import { Stack, Heading, Divider, Button, Link } from '@chakra-ui/react'

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
