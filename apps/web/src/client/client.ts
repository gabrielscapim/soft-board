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

  async signIn (command: SignInCommand): Promise<SignInResult> {
    return (await this.axios.post<SignInResult>('/sign-in', command)).data
  }
}
