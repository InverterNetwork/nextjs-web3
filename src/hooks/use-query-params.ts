'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type GetNewHrefParams<T extends string = string> = {
  name: string
  value: T
  keepNames?: string[]
}

export const useQueryParams = <T extends string = string>() => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const route = useRouter()

  const getNewHref = (params: GetNewHrefParams<T>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    // If excludeRest is true, remove all parameters except the one specified in keepValue
    if (!!params.keepNames) {
      for (const key of newSearchParams.keys()) {
        if (!params.keepNames.includes(key)) newSearchParams.delete(key)
      }
    }

    // Set the new parameter
    newSearchParams.set(params.name, params.value)

    return `${pathname}?${newSearchParams.toString()}`
  }

  const setQueryParam = (params: GetNewHrefParams<T>) => {
    const newHref = getNewHref(params)
    const newQuery = newHref.split('?')[1]
    route.push(`?${newQuery}`)
  }

  const hasValues = (name: string, values: string[]) => {
    const currentValues = searchParams.getAll(name)
    return values.some((value) => currentValues.includes(value))
  }

  const getAscDescToggleHref = (params: GetNewHrefParams<T>) => {
    const isAsc = hasValues(params.name, [`${params.value}:asc`])
    const isDesc = hasValues(params.name, [`${params.value}:desc`])

    const href = getNewHref({
      name: params.name,
      value: (isAsc
        ? `${params.value}:desc`
        : `${params.value}:${isDesc ? 'asc' : 'desc'}`) as T,
      keepNames: params.keepNames,
    })

    return {
      href,
      isAsc,
      isDesc,
    }
  }

  const getQueryParam = <F extends string | undefined = undefined>({
    name,
    fallback,
  }: {
    name: string
    fallback?: F
  }) =>
    (searchParams.get(name) || fallback) as F extends string
      ? string
      : string | undefined

  return {
    pathname,
    searchParams,
    getQueryParam,
    setQueryParam,
    getNewHref,
    hasValues,
    getAscDescToggleHref,
  }
}
