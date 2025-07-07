import axios, { type AxiosInstance } from 'axios'
import type {
  SignInCommand,
  SignInResult
} from 'types/endpoints'

export type ClientOptions = {
  baseUrl?: string
}

export const DEFAULT_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export class Client {
  private axios: AxiosInstance
  private baseUrl: string

  constructor (options: ClientOptions = {}) {
    this.baseUrl = options.baseUrl || DEFAULT_API_BASE_URL
    this.axios = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true // Enable cookies to be sent with requests
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getError (error: any): Promise<string> {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.detail
    }

    return error?.response?.data?.message ?? 'An unexpected error occurred'
  }

  async signIn (command: SignInCommand): Promise<SignInResult> {
    return (await this.axios.post<SignInResult>('/signIn', command)).data
  }
}
