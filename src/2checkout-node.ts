import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { createHmac } from 'crypto'
import * as moment_ from 'moment'

const moment = moment_

const defaultHost = 'https://api.2checkout.com/rest/6.0'
const defaultSandboxHost = 'https://api.2checkout.com/rest/6.0'

interface TwoCheckoutClientInitParams {
  merchantCode: string
  secretKey: string
  sandbox?: boolean
}

const generateHash = (val: string, salt: string) => {
  return createHmac('md5', salt)
    .update(val)
    .digest('hex')
}

export default class TwoCheckoutClient {
  merchantCode: string
  secretKey: string
  hostURL: string

  constructor(params: TwoCheckoutClientInitParams) {
    this.merchantCode = params.merchantCode
    this.secretKey = params.secretKey
    this.hostURL = defaultHost

    if (params.sandbox) {
      this.hostURL = defaultSandboxHost
    }
  }

  private hashValue(rawString: string): string {
    return generateHash(rawString, this.secretKey)
  }

  private getAuthenticationHeaderValue() {
    let now = moment()
      .utc()
      .format('YYYY-MM-DD HH:mm:ss')
    let toHash = this.merchantCode.length + this.merchantCode + now.length + now
    return `code="${this.merchantCode}" date="${now}" hash="${this.hashValue(toHash)}"`
  }

  static serializeArray(obj: Object): string {
    let tmp = ''
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'HASH') continue
      if (Array.isArray(value)) {
        tmp += this.serializeArray(value)
      } else {
        tmp += value.length + value
      }
    }
    return tmp
  }

  getLCNHash(obj: Object): string {
    return this.hashValue(TwoCheckoutClient.serializeArray(obj))
  }

  getIPNHash(obj: Object): string {
    return this.hashValue(TwoCheckoutClient.serializeArray(obj))
  }

  private getInstance(): AxiosInstance {
    const token = this.getAuthenticationHeaderValue()
    return axios.create({
      baseURL: this.hostURL,
      headers: {
        'X-Avangate-Authentication': token
      }
    })
  }

  async call(options: AxiosRequestConfig): Promise<any> {
    const instance = this.getInstance()
    try {
      const resp = await instance(options)
      return resp.data
    } catch (e) {
      throw e
    }
  }
}
