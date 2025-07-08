import axios, { AxiosError, type AxiosInstance } from 'axios'
import type {
  CreateBoardCommand,
  CreateBoardResult,
  CreateMemberCommand,
  CreateMemberResult,
  DeleteBoardCommand,
  DeleteMembersCommand,
  GetAuthenticatedUserResult,
  GetBoardsQuery,
  GetBoardsResult,
  GetMembersQuery,
  GetMembersResult,
  GetTeamResult,
  SignInCommand,
  SignInResult,
  UpdateBoardCommand,
  UpdateMemberRoleCommand
} from 'types/endpoints'

export type ClientOptions = {
  baseUrl?: string
}

export const DEFAULT_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

export class Client {
  private axios: AxiosInstance
  private baseUrl: string
  public teamSlug?: string

  constructor (options: ClientOptions = {}) {
    this.baseUrl = options.baseUrl || DEFAULT_API_BASE_URL
    this.axios = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true // Enable cookies to be sent with requests
    })
    this.axios.interceptors.request.use(config => {
      if (this.teamSlug) {
        config.headers['team-slug'] = this.teamSlug
      }

      return config
    })
  }

  static isBadRequest (error: unknown): boolean {
    return axios.isAxiosError(error) && error.response?.status === 400
  }

  static isConflict (error: unknown): boolean {
    return axios.isAxiosError(error) && error.response?.status === 409
  }

  static isForbidden (error: unknown): boolean {
    return axios.isAxiosError(error) && error.response?.status === 403
  }

  static isNotFound (error: unknown): boolean {
    return axios.isAxiosError(error) && error.response?.status === 404
  }

  static getError (error: any): AxiosError | null {
    if (axios.isAxiosError(error)) {
      return error
    }

    return null
  }

  /** Endpoints */

  async createBoard (command: CreateBoardCommand): Promise<CreateBoardResult> {
    return (await this.axios.post<CreateBoardResult>('/createBoard', command)).data
  }

  async createMember (command: CreateMemberCommand): Promise<CreateMemberResult> {
    return (await this.axios.post<CreateMemberResult>('/createMember', command)).data
  }

  async deleteBoard (command: DeleteBoardCommand): Promise<void> {
    await this.axios.post('/deleteBoard', command)
  }

  async deleteMembers (command: DeleteMembersCommand): Promise<void> {
    await this.axios.post('/deleteMembers', command)
  }

  async getAuthenticatedUser (): Promise<GetAuthenticatedUserResult> {
    return (await this.axios.post<GetAuthenticatedUserResult>('/getAuthenticatedUser')).data
  }

  async getBoards (params: GetBoardsQuery): Promise<GetBoardsResult> {
    return (await this.axios.post<GetBoardsResult>('/getBoards', { params })).data
  }

  async getMembers (params: GetMembersQuery): Promise<GetMembersResult> {
    return (await this.axios.post<GetMembersResult>('/getMembers', { params })).data
  }

  async getTeam (): Promise<GetTeamResult> {
    return (await this.axios.post<GetTeamResult>('/getTeam')).data
  }

  async signIn (command: SignInCommand): Promise<SignInResult> {
    return (await this.axios.post<SignInResult>('/signIn', command)).data
  }

  async updateBoard (command: UpdateBoardCommand): Promise<void> {
    await this.axios.post('/updateBoard', command)
  }

  async updateMemberRole (command: UpdateMemberRoleCommand): Promise<void> {
    await this.axios.post('/updateMemberRole', command)
  }
}
