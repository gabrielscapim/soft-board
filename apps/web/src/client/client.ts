import axios, { AxiosError, type AxiosInstance } from 'axios'
import type {
  CreateBoardCommand,
  CreateBoardResult,
  CreateMemberCommand,
  CreateRequirementCommand,
  CreateRequirementResult,
  CreateMemberResult,
  CreateTeamCommand,
  CreateTeamResult,
  DeleteBoardCommand,
  DeleteMemberCommand,
  GetAuthenticatedUserResult,
  GetBoardQuery,
  GetBoardResult,
  GetBoardsQuery,
  GetBoardsResult,
  GetCurrentUserRoleResult,
  GetMembersQuery,
  GetMembersResult,
  GetMessagesQuery,
  GetMessagesResult,
  GetTeamResult,
  GetTeamsResult,
  SendMessageCommand,
  SendMessageResult,
  SignInCommand,
  SignInResult,
  UpdateBoardCommand,
  UpdateMemberRoleCommand,
  UpdateTeamCommand,
  UpdateTeamResult,
  DeleteRequirementCommand,
  GetRequirementsQuery,
  GetRequirementsResult,
  UpdateRequirementCommand
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

  async createRequirement (data: CreateRequirementCommand): Promise<CreateRequirementResult> {
    return (await this.axios.post<CreateRequirementResult>('/createRequirement', data)).data
  }

  async createTeam (data: CreateTeamCommand): Promise<CreateTeamResult> {
    return (await this.axios.post<CreateTeamResult>('/createTeam', data)).data
  }

  async deleteBoard (data: DeleteBoardCommand): Promise<void> {
    await this.axios.post('/deleteBoard', data)
  }

  async deleteMember (data: DeleteMemberCommand): Promise<void> {
    await this.axios.post('/deleteMember', data)
  }

  async deleteRequirement (data: DeleteRequirementCommand): Promise<void> {
    await this.axios.post('/deleteRequirement', data)
  }

  async getAuthenticatedUser (): Promise<GetAuthenticatedUserResult> {
    return (await this.axios.post<GetAuthenticatedUserResult>('/getAuthenticatedUser')).data
  }

  async getBoard (data: GetBoardQuery): Promise<GetBoardResult> {
    return (await this.axios.post<GetBoardResult>('/getBoard', data)).data
  }

  async getBoards (data: GetBoardsQuery): Promise<GetBoardsResult> {
    return (await this.axios.post<GetBoardsResult>('/getBoards', data)).data
  }

  async getCurrentUserRole (): Promise<GetCurrentUserRoleResult> {
    return (await this.axios.post<GetCurrentUserRoleResult>('/getCurrentUserRole')).data
  }

  async getMembers (data: GetMembersQuery): Promise<GetMembersResult> {
    return (await this.axios.post<GetMembersResult>('/getMembers', data)).data
  }

  async getMessages (data: GetMessagesQuery): Promise<GetMessagesResult> {
    return (await this.axios.post<GetMessagesResult>('/getMessages', data)).data
  }

  async getRequirements (data: GetRequirementsQuery): Promise<GetRequirementsResult> {
    return (await this.axios.post<GetRequirementsResult>('/getRequirements', data)).data
  }

  async getTeam (): Promise<GetTeamResult> {
    return (await this.axios.post<GetTeamResult>('/getTeam')).data
  }

  async getTeams (): Promise<GetTeamsResult> {
    return (await this.axios.post<GetTeamsResult>('/getTeams')).data
  }

  async sendMessage (data: SendMessageCommand): Promise<SendMessageResult> {
    return (await this.axios.post<SendMessageResult>('/sendMessage', data)).data
  }

  async leaveTeam (): Promise<void> {
    await this.axios.post('/leaveTeam')
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

  async updateRequirement (data: UpdateRequirementCommand): Promise<void> {
    await this.axios.post('/updateRequirement', data)
  }

  async updateTeam (data: UpdateTeamCommand): Promise<UpdateTeamResult> {
    return (await this.axios.post<UpdateTeamResult>('/updateTeam', data)).data
  }
}
