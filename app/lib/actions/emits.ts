// This File Can Not Contain use server or use client,
// it is meant to be consumed by next.js instrumentation.ts

import { UserModel } from '../models'
import { EventType } from '../types'
import fetchBuilder from 'fetch-retry-ts'

export async function getWebHookUrl(address: string) {
  const webHookUrl = (await UserModel.findOne({ address }, 'webHookUrl').lean())
    ?.webHookUrl

  if (!webHookUrl) throw new Error()

  return webHookUrl
}

export async function postWebHook({
  webHookUrl,
  uid,
  type,
  data,
}: {
  webHookUrl: string
  uid: string
  type: EventType
  data: any
}) {
  const options = {
      retries: 3,
      retryDelay: 1000,
    },
    reFetch = fetchBuilder(fetch, options),
    body = JSON.stringify({
      type,
      uid,
      data,
    })

  await reFetch(webHookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
  })

  return
}
