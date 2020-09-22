import TwoCheckoutClient from '../src/2checkout-node'

import { get2CheckoutCredentials } from '../testUtils'

/**
 * API Client test
 */

describe('2Checkout orders', () => {
  let client: TwoCheckoutClient
  beforeAll(() => {
    client = new TwoCheckoutClient(get2CheckoutCredentials())
  }, 2000)

  it('2checkout verify LCN hash', async () => {
    const lcnObj = {
      COMPANY: 'Paladin Analytics (PVT) Ltd.',
      LICENSE_CODE: '5LF8IJ7L1I',
      EXPIRATION_DATE: '2021-09-22',
      DATE_UPDATED: '2020-09-22 16:17:49',
      IS_TRIAL: '0',
      EXTERNAL_CUSTOMER_REFERENCE: 'rooster-company:1',
      TEST: '1',
      CHANGED_BY: 'VENDOR',
      LICENSE_TYPE: 'REGULAR',
      DISABLED: '1',
      RECURRING: '1',
      LICENSE_PRODUCT_CODE: 'rooster-hire-annually',
      STATUS: 'CANCELED',
      EXPIRED: '0',
      NEXT_RENEWAL_PRICE: '',
      NEXT_RENEWAL_CURRENCY: '',
      NEXT_RENEWAL_PRICE_TYPE: '',
      NEXT_RENEWAL_DATE: '',
      NEXT_RENEWAL_PAYMETHOD: 'Visa/MasterCard',
      NEXT_RENEWAL_PAYMETHOD_CODE: 'CCVISAMC',
      NEXT_RENEWAL_CARD_LAST_DIGITS: '1111',
      NEXT_RENEWAL_CARD_TYPE: 'visa',
      NEXT_RENEWAL_CARD_EXPIRATION_DATE: '12/2023',
      PURCHASE_DATE_TIME: '2020-09-22 15:57:32',
      START_DATE_TIME: '2020-09-22 15:57:32',
      EXPIRATION_DATE_TIME: '2021-09-22 15:57:32',
      LAST_ORDER_REFERENCE: '133506738',
      RENEWALS_NUMBER: '0',
      UPGRADES_NUMBER: '0',
      HASH: '875dd60449884d43b4d789d13f50be2c'
    }
    const confirmHash = client.getLCNHash(lcnObj)
    expect(confirmHash).toEqual(lcnObj.HASH)
  })

  it('2checkout verify IPN hash', async () => {
    const ipnObj = {
      'IPN_PID[]': '31582142',
      'IPN_PNAME[]': 'Rooster Hire Annually',
      IPN_DATE: '20200922171511',
      HASH: '3c85d2f036f159116e380c346a903269'
    }
    const confirmHash = client.getIPNHash(ipnObj)
    expect(confirmHash).toEqual(ipnObj.HASH)
  })
})
