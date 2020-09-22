import TwoCheckoutClient from '../src/2checkout-node'

import { get2CheckoutCredentials } from '../testUtils'

/**
 * API Client test
 */

describe('2Checkout initializing', () => {
  it('2Checkout is instantiable', () => {
    expect(
      new TwoCheckoutClient({
        merchantCode: 'testing',
        secretKey: 'hello'
      })
    ).toBeInstanceOf(TwoCheckoutClient)
  })
})

describe('2Checkout product API calls', () => {
  let client: TwoCheckoutClient
  beforeAll(() => {
    client = new TwoCheckoutClient(get2CheckoutCredentials())
  }, 2000)

  it('2checkout get products', async () => {
    try {
      const data = await client.call({
        method: 'get',
        url: '/products/'
      })
      expect(data).not.toBeNull()
    } catch (e) {
      console.log('ERROR')
      throw e
    }
  })
})
