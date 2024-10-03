import { expect, describe, it } from 'bun:test'
import tools from '../tools'

describe('Should give a hint about the bun tests', () => {
  it('should write an exemple', async () => {
    tools.writeLog({
      content: {
        value: 'test',
      },
      label: 'exemple',
      format: 'json',
    })

    expect(true).toBeTruthy()
  })
})
