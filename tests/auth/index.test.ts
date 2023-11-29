import { expect, describe, it } from 'bun:test'

describe('AuthVerifier', () => {
  it('should verify a claim', async () => {
    const res = await fetch('http://localhost:3000/api/auth/verify', {
      headers: {
        Authorization: `Bearer ${await Bun.file(
          import.meta.dir + '/authToken.txt'
        ).text()}`,
      },
      credentials: 'include',
    })

    console.log(res.status, res.statusText)

    const data = await res.json()

    console.log(data)

    expect(data).toBeTruthy()
  })
})
