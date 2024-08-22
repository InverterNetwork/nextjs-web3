import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { useEffect, useRef } from 'react'

export const useChainSpecs = () => {
  const dynamicContext = useDynamicContext()
  const { primaryWallet, networkConfigurations } = dynamicContext,
    { network: chainId, connected: isConnected, address } = primaryWallet || {},
    evmNetwork = networkConfigurations?.evm?.find(
      ({ chainId: id }) => id === chainId
    ),
    iconSrc = evmNetwork?.iconUrls?.[0],
    isUnsupportedChain =
      !!isConnected &&
      (networkConfigurations?.evm?.every(({ chainId: id }) => id !== chainId) ??
        false),
    showWalletWidget = !isConnected || isUnsupportedChain

  const prevChainId = useRef(chainId)
  const didChainIdChange =
    chainId !== undefined &&
    prevChainId.current !== undefined &&
    prevChainId.current !== chainId

  const explorerUrl = evmNetwork?.blockExplorerUrls?.[0]

  useEffect(() => {
    if (didChainIdChange) prevChainId.current = chainId
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId])

  return {
    dynamicContext,
    isUnsupportedChain,
    prevChainId: prevChainId.current,
    chainId,
    isConnected,
    address: address as `0x${string}` | undefined,
    networkConfigurations,
    iconSrc,
    didChainIdChange,
    showWalletWidget,
    explorerUrl,
  }
}
