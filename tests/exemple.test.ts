import { expect, describe, it } from 'bun:test'
import utils from '../tools/utils'

describe('Should give a hint about the bun tests', () => {
  it('should write an exemple', async () => {
    utils.writeLog({
      content: {
        value: 'test',
      },
      label: 'exemple',
      format: 'json',
    })

    expect(true).toBeTruthy()
  })
})
