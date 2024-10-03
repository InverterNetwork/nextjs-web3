'use client'

import { useMutation } from '@tanstack/react-query'
import { useInverter } from '..'
import { GetUserArgs, RequestedModules } from '@inverter-network/sdk'
import { useAppDispatch, setOrchestratorAddress } from '@/lib/store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import { toast } from 'sonner'

export const usePrepDeploy = () => {
  const { isConnected } = useAccount()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const inverter = useInverter().data

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

      const { run, inputs } = await inverter.getDeploy({ requestedModules })

      setStep('Deploy')

      return { run, inputs }
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success('Deployment prepared')
    },
  })

  const deploy = useMutation({
    mutationFn: async (userArgs: GetUserArgs) => {
      if (!prep.data) throw new Error('No deploy data found')
      return prep.data.run(userArgs)
    },
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async ({ transactionHash, orchestratorAddress }) => {
      toast.info(`Waiting for confirmation: ${transactionHash}`)

      await inverter?.publicClient.waitForTransactionReceipt({
        hash: transactionHash,
      })

      dispatch(setOrchestratorAddress(orchestratorAddress))

      toast.success(
        `Workflow deployed at Orchestrator Address: ${orchestratorAddress}`
      )

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
