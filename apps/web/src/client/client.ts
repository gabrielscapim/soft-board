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
  GetTeamsResult,
  SignInCommand,
  SignInResult,
  UpdateBoardCommand,
  UpdateMemberRoleCommand,
  UpdateTeamCommand,
  UpdateTeamResult
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

  async createBoard (data: CreateBoardCommand): Promise<CreateBoardResult> {
    return (await this.axios.post<CreateBoardResult>('/createBoard', data)).data
  }

  async createMember (data: CreateMemberCommand): Promise<CreateMemberResult> {
    return (await this.axios.post<CreateMemberResult>('/createMember', data)).data
  }

  async deleteBoard (data: DeleteBoardCommand): Promise<void> {
    await this.axios.post('/deleteBoard', data)
  }

  async deleteMembers (data: DeleteMembersCommand): Promise<void> {
    await this.axios.post('/deleteMembers', data)
  }

  async getAuthenticatedUser (): Promise<GetAuthenticatedUserResult> {
    return (await this.axios.post<GetAuthenticatedUserResult>('/getAuthenticatedUser')).data
  }

  async getBoards (data: GetBoardsQuery): Promise<GetBoardsResult> {
    return (await this.axios.post<GetBoardsResult>('/getBoards', data)).data
  }

  async getMembers (data: GetMembersQuery): Promise<GetMembersResult> {
    return (await this.axios.post<GetMembersResult>('/getMembers', data)).data
  }

  async getTeam (): Promise<GetTeamResult> {
    return (await this.axios.post<GetTeamResult>('/getTeam')).data
  }

  async getTeams (): Promise<GetTeamsResult> {
    return (await this.axios.post<GetTeamsResult>('/getTeams')).data
  }

  async signIn (data: SignInCommand): Promise<SignInResult> {
    return (await this.axios.post<SignInResult>('/signIn', data)).data
  }

  async signOut (): Promise<void> {
    await this.axios.post('/signOut')
  }

  async updateBoard (data: UpdateBoardCommand): Promise<void> {
    await this.axios.post('/updateBoard', data)
  }

  async updateMemberRole (data: UpdateMemberRoleCommand): Promise<void> {
    await this.axios.post('/updateMemberRole', data)
  }

  async updateTeam (data: UpdateTeamCommand): Promise<UpdateTeamResult> {
    return (await this.axios.post<UpdateTeamResult>('/updateTeam', data)).data
  }
}
