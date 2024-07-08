'use client'

import { useMutation } from '@tanstack/react-query'
import { useToast, useInverter } from '..'
import { GetUserArgs, RequestedModules } from '@inverter-network/sdk'
import { useAppDispatch, setOrchestratorAddress } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAccount } from 'wagmi'

export const usePrepDeploy = () => {
  const { isConnected } = useAccount()
  const dispatch = useAppDispatch()
  const { addToast } = useToast()
  const router = useRouter()

  const inverter = useInverter()

  const [requestedModules, setRequestedModules] = useState(
    {} as RequestedModules
  )

  const [step, setStep] = useState<'Prepare' | 'Deploy'>('Prepare')

  const prep = useMutation({
    mutationFn: async () => {
      if (
        !requestedModules?.authorizer ||
        !requestedModules?.fundingManager ||
        !requestedModules?.paymentProcessor
      )
        throw new Error(
          'Authorizer, Funding Manager and Payment Processor are required'
        )

      if (!inverter) throw new Error('Inverter instance not found')

      const { run, inputs } = await inverter.getDeploy(requestedModules)

      setStep('Deploy')

      return { run, inputs }
    },
    onError: (error) => {
      addToast({
        text: error.message,
        status: 'error',
      })
    },
    onSuccess: () => {
      addToast({
        text: 'Deployment prepared',
        status: 'success',
      })
    },
  })

  const deploy = useMutation({
    mutationFn: async (userArgs: GetUserArgs) => {
      if (!prep.data) throw new Error('No deploy data found')
      return prep.data.run(userArgs)
    },
    onError: (error) => {
      addToast({
        text: error.message,
        status: 'error',
      })
    },
    onSuccess: async ({ transactionHash, orchestratorAddress }) => {
      addToast({
        text: `Waiting for confirmation: ${transactionHash}`,
        status: 'info',
      })

      await inverter?.publicClient.waitForTransactionReceipt({
        hash: transactionHash,
      })

      dispatch(setOrchestratorAddress(orchestratorAddress))

      addToast({
        text: `Workflow deployed at Orchestrator Address: ${orchestratorAddress}`,
        status: 'success',
      })

      router.push('/operate')
    },
  })

  const addRequestedModule = (moduleType: string, module: any) => {
    setRequestedModules((prev) => {
      return {
        ...prev,
        [moduleType]: module,
      }
    })
  }

  const resetRequestedModules = () => {
    setRequestedModules({} as RequestedModules)
  }

  return {
    isConnected,
    requestedModules,
    addRequestedModule,
    prep,
    deploy,
    step,
    setStep,
    resetRequestedModules,
  }
}

export type UsePrepDeployReturn = ReturnType<typeof usePrepDeploy>
