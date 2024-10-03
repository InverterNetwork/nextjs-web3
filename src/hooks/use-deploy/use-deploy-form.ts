'use client'

import { GetUserArgs, RequestedModules } from '@inverter-network/sdk'
import { useEffect, useRef, useState } from 'react'
import { UsePrepDeployReturn } from './use-prep-deploy'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { toast } from 'sonner'

export type DeployFormSteps = keyof RequestedModules | 'orchestrator'

type InitialUserArgs = GetUserArgs & {
  // this is hear because as of now paymentProcessor doesn't have any inputs
  paymentProcessor: any
}

export const useDeployForm = ({
  prep: { data },
  setStep,
  deploy,
  step,
}: UsePrepDeployReturn) => {
  const chainId = useDynamicContext()?.primaryWallet?.network
  const prevChainId = useRef(chainId)
  const [formStep, setFormStep] = useState<DeployFormSteps>('orchestrator')

  const [userArgs, setUserArgs] = useState({} as InitialUserArgs)

  const handleSetUserArgs = (
    type: DeployFormSteps,
    name: string,
    value: any,
    optName?: string
  ) => {
    setUserArgs((prev) => {
      const prevTypeVal = prev?.[type] || {}
      const prevTypeValObj = prevTypeVal?.[name]
      let typeVal

      if (type === 'optionalModules')
        typeVal = {
          ...prevTypeVal,
          [optName!]: {
            ...(prevTypeVal?.[optName!] || {}),
            [name]: value,
          },
        }
      else if (typeof prevTypeValObj === 'object')
        typeVal = {
          ...prevTypeVal,
          [name]: {
            ...prevTypeValObj,
            ...value,
          },
        }
      else
        typeVal = {
          ...prevTypeVal,
          [name]: value,
        }

      return {
        ...prev,
        [type]: typeVal,
      }
    })
  }

  // Available Form Steps based on data inputs length not being 0
  const availableFormSteps = !data
    ? []
    : (Object.keys(data.inputs) as DeployFormSteps[]).filter((key) => {
        const { optionalModules, ...rest } = data.inputs
        if (key === 'optionalModules')
          return optionalModules.some((optItem) => !!optItem.inputs.length)
        return !!rest[key]?.inputs?.length
      })

  // Get the current form step index
  const currentStepIndex = availableFormSteps.indexOf(formStep)
  // Construct a next step function that increments the current step index until it reaches the last step
  const isLastStep = currentStepIndex === availableFormSteps.length - 1

  const nextStep = () => {
    // if (!userArgs.orchestrator?.independentUpdates)
    //   userArgs.orchestrator = undefined
    console.log('userArgs', userArgs)
    if (isLastStep) return deploy.mutate(userArgs)
    setFormStep(availableFormSteps[currentStepIndex + 1])
  }

  const resetDeployForm = (full?: boolean) => {
    deploy.reset()
    if (full) setStep('Prepare')
    setFormStep('orchestrator')
    setUserArgs({} as InitialUserArgs)
  }

  // Construct a previous step function that decrements the current step index until it reaches the first step
  const prevStep = () => {
    if (currentStepIndex === 0) {
      resetDeployForm(true)
      return
    }
    setFormStep(availableFormSteps[currentStepIndex - 1])
  }

  useEffect(() => {
    if (
      step === 'Deploy' &&
      chainId !== undefined &&
      prevChainId.current !== chainId
    ) {
      resetDeployForm(true)
      prevChainId.current = chainId

      toast.warning('Network changed, reseting deployment')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  return {
    setRawUserArgs: setUserArgs,
    formStep,
    userArgs,
    handleSetUserArgs,
    nextStep,
    prevStep,
    isLastStep,
    availableFormSteps,
  }
}

export type UseDeployFormReturn = ReturnType<typeof useDeployForm>
