export const get2CheckoutCredentials = ():{ merchantCode: string, secretKey: string, tpayToken: string } => {
    return {
        merchantCode: process.env.TCO_MERCHANT_CODE || '',
        secretKey: process.env.TCO_SECRET_KEY || '',
        tpayToken: process.env.TPAY_TOKEN || '',
    }
}