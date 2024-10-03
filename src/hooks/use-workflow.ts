'use-client'

import { useQuery } from '@tanstack/react-query'
import { useInverter } from '.'

export type UseWorkFlowReturnType = ReturnType<typeof useWorkflow>

export function useWorkflow(orchestratorAddress?: `0x${string}`) {
  const inverter = useInverter().data

  const enabled = !!inverter && !!orchestratorAddress

  const workflowQuery = useQuery({
    queryKey: [
      'workflow',
      orchestratorAddress,
      inverter?.walletClient?.account.address,
    ],
    queryFn: () =>
      inverter!.getWorkflow({ orchestratorAddress: orchestratorAddress! }),
    enabled,
    gcTime: 0,
    staleTime: 30 * 60_000, // 30 minutes
  })

  const hasOrchestrator = !!orchestratorAddress

  return { ...workflowQuery, hasOrchestrator }
}
