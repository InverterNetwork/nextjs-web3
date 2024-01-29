'use client'

import { useAppContext } from '@/providers'
import { useRef, useEffect, useState } from 'react'

export function useInputFocus(tracker?: any) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputIndex, setInputIndex] = useState(0)
  const inputs = useAppContext().inputFocus

  useEffect(() => {
    if (!!inputs) {
      const newIndex = inputs.findIndex((i) => i === inputRef.current)
      setInputIndex(newIndex)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputs])

  const onDone = () => {
    if (inputs) {
      const nonHiddenInputs = inputs.filter(
          (input) => input && input.offsetParent !== null
        ),
        nextIndex = nonHiddenInputs.findIndex(
          (input) => input && parseInt(input.dataset.inputindex!) > inputIndex
        )

      const finalNextIndex = nextIndex === -1 ? 0 : nextIndex

      setTimeout(() => {
        nonHiddenInputs[finalNextIndex].focus()
      }, 0.1)
    }
  }

  useEffect(() => {
    if (inputRef.current && tracker) {
      inputRef.current.focus()
    }
  }, [tracker])

  return {
    inputRef,
    inputIndex,
    onDone,
  }
}

export function useInputFocusHandler() {
  const [inputs, setInputs] = useState<HTMLInputElement[]>([])

  const updateInputs = () => {
    if (typeof document !== 'undefined') {
      const newInputs = Array.from(
        document.querySelectorAll('input[data-inputindex]')
      )
      // @ts-ignore
      setInputs(newInputs)
    }
  }

  useEffect(() => {
    // Create a MutationObserver instance to watch for changes in the DOM
    const observer = new MutationObserver((mutationsList) => {
      let runCondition = false
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          ;(['addedNodes', 'removedNodes'] as const).map((key) => {
            Array.from(mutation[key]).forEach((node) => {
              if (
                node instanceof HTMLElement &&
                node.querySelector('input[data-inputindex]')
              ) {
                runCondition = true
              }
            })
          })
        }
      }

      if (runCondition) updateInputs()
    })

    // Start observing the document with the configured parameters
    observer.observe(document, {
      childList: true,
      subtree: true,
    })

    updateInputs()

    // Clean up: disconnect the observer when the component is unmounted
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return inputs
}
