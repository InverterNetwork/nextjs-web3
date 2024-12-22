import { expect, describe, it } from 'bun:test'
import { writeLog } from '../tools'

describe('Should give a hint about the bun tests', () => {
  it('should write an exemple', async () => {
    writeLog({
      content: {
        value: 'test',
      },
      label: 'exemple',
      format: 'json',
    })

    expect(true).toBeTruthy()
  })
})
