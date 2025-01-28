import { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import { createPublicKey } from 'crypto'
import { isNotEmpty } from '@inverter-network/sdk'

type JWK = {
  kty: string
  n: string
  e: string
  alg: string
  kid: string
  use: string
}

export const getBearerToken = (headers: Headers | ReadonlyHeaders) => {
  const token = headers.get('authorization')?.split(' ')[1]
  return token
}

export const splitBearerToken = (token: string) => {
  const [key, secret] = token.split(':')

  isNotEmpty(key || secret, 'Key or Secret is empty')

  return { key, secret }
}

export const getBearerConfig = (token?: string) => {
  if (!token) throw new Error('No token provided')

  const config: RequestInit = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }

  return config
}

export async function getPublicKeyFromJWKS(JWKS_URL: string): Promise<string> {
  const response = await fetch(JWKS_URL)
  const jwks: { keys: JWK[] } = await response.json()
  const jwk = jwks.keys[0]

  const publicKey = createPublicKey({ key: jwk, format: 'jwk' })
    .export({
      type: 'spki', // Changed from pkcs1 to spki
      format: 'pem',
    })
    .toString()

  return publicKey
}
