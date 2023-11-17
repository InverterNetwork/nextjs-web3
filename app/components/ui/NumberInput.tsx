import { formatAmountString } from '@/lib/utils'
import {
  useNumberInput,
  HStack,
  Button,
  Input,
  Stack,
  Heading,
  Divider,
  StackProps,
} from '@chakra-ui/react'

export default function NumberInput({
  step = 1,
  defaultValue = 1,
  min = 0,
  max = undefined,
  precision = 0,
  onChange,
  value,
  label,
  ...props
}: {
  step?: number
  defaultValue?: number
  min?: number
  precision?: number
  max?: number
  onChange: (string: string) => void
  value?: string | number
  label?: string
} & Omit<StackProps, 'onChange'>) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step,
      defaultValue,
      min,
      precision,
      max,
      onChange: (valueAsString) => onChange(formatAmountString(valueAsString)),
      value,
    })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()

  return (
    <Stack {...props}>
      {!!label && (
        <>
          <Heading fontSize={'sm'}>{label}</Heading>
          <Divider my={3} />
        </>
      )}
      <HStack>
        <Button {...dec}>-</Button>
        <Input {...input} inputMode="decimal" />
        <Button {...inc}>+</Button>
      </HStack>
    </Stack>
  )
}
