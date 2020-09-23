import TwoCheckoutClient from '../src/2checkout-node'

import { get2CheckoutCredentials } from '../testUtils'

const testOrder = {
  Currency: 'USD',
  ExternalCustomerReference: 'rooster-company:1',
  Language: 'en',
  BillingDetails: {
    Company: 'Paladin Analytics (PVT) Ltd.',
    Address1: '60/26, 9B Lane, Araliya Uyana',
    City: 'Depanama Pannipitiya',
    CountryCode: 'LK',
    Email: 'nisalp2006@gmail.com',
    FirstName: 'John',
    FiscalCode: '056.027.963-98',
    LastName: 'Doe',
    Phone: '556133127400',
    State: 'Western',
    Zip: '10230'
  },
  Items: [
    {
      Code: 'rooster-hunt-annually',
      Quantity: '1'
    },
    {
      Code: 'hunt-credits',
      Quantity: '10'
    }
  ],
  PaymentDetails: {
    Currency: 'USD',
    PaymentMethod: {
      EesToken: get2CheckoutCredentials().tpayToken,
      RecurringEnabled: true
    },
    Type: 'TEST'
  }
}

/**
 * API Client test
 */

describe('2Checkout orders', () => {
  it('2checkout create order by token', async () => {
    try {
      let client = new TwoCheckoutClient(get2CheckoutCredentials())

      const data = await client.call({
        method: 'post',
        url: '/orders/',
        data: testOrder
      })

      console.log(data)
    } catch (e) {
      console.log('ERROR')
      console.log(e.response.data)
      throw e
    }
  }, 20000)
})
