'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type GetNewHrefParams<T extends string = string> = {
  name: string
  value: T
  keepNames?: string[]
  overridePathname?: string
}

type SetMultipleQueryParamsParams<T extends string = string> = {
  entries: {
    name: string
    value: T
  }[]
  overridePathname?: string
  keepNames?: string[]
}

export type UseQueryParamsReturnType<T extends string = string> = ReturnType<
  typeof useQueryParams<T>
>

export const useQueryParams = <T extends string = string>() => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const route = useRouter()

  /**
   * Get a brand new href with the query params.
   * If keepNames is specified, only those parameters are retained.
   * Otherwise, all existing parameters are extended with the new one.
   */
  const getNewHref = (params: GetNewHrefParams<T>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())

    // If keepNames is specified, remove all parameters except those specified
    if (params.keepNames) {
      for (const key of newSearchParams.keys()) {
        if (!params.keepNames.includes(key)) newSearchParams.delete(key)
      }
    }

    // Go through the params and remove duplicates keeping the first occurrence
    for (const [key, value] of newSearchParams.entries()) {
      if (newSearchParams.getAll(key).length > 1) {
        newSearchParams.delete(key)
        newSearchParams.set(key, value)
      }
    }

    // Set the new parameter
    newSearchParams.set(params.name, params.value)

    const finalPathname = params.overridePathname || pathname

    return `${finalPathname}?${newSearchParams.toString()}`
  }

  /**
   * Set a query param using the previous href to extend the query params.
   * If keepNames is not specified, all existing parameters are retained.
   * If overridePathname is specified, the new href is set to the overridePathname.
   */
  const setQueryParam = (params: GetNewHrefParams<T>) => {
    const newHref = getNewHref(params)
    const newQuery = newHref.split('?')[1]

    if (params.overridePathname) {
      route.push(`${params.overridePathname}?${newQuery}`)
    } else {
      route.push(`?${newQuery}`)
    }
  }

  /**
   * Set multiple query params using the previous href to extend the query params.
   * If keepNames is not specified, all existing parameters are retained.
   */
  const setMultipleQueryParams = (params: SetMultipleQueryParamsParams<T>) => {
    const newHrefs = params.entries.map(({ name, value }) =>
      getNewHref({
        name,
        value,
        keepNames: params.keepNames,
      })
    )
    const newQuerys = newHrefs.map((href) => href.split('?')[1])

    if (params.overridePathname) {
      route.push(`${params.overridePathname}?${newQuerys.join('&')}`)
    } else {
      route.push(`?${newQuerys.join('&')}`)
    }
  }

  /**
   * Check if the query param has any of the values
   */
  const hasValues = (name: string, values: string[]) => {
    const currentValues = searchParams.getAll(name)
    return values.some((value) => currentValues.includes(value))
  }

  /**
   * Get the href with the query params for the asc/desc toggle
   */
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

  /**
   * Get a query param by name with a fallback
   */
  const getQueryParam = <
    ET extends string | undefined = undefined,
    F extends string | undefined = undefined,
  >({
    name,
    fallback,
  }: {
    name: string
    fallback?: F
  }) =>
    (searchParams.get(name) || fallback) as F extends string
      ? F | ET extends string
        ? ET
        : T
      : F | ET extends string
        ? ET
        : T | undefined

  return {
    pathname,
    searchParams,
    getQueryParam,
    setQueryParam,
    getNewHref,
    hasValues,
    getAscDescToggleHref,
    setMultipleQueryParams,
  }
}
