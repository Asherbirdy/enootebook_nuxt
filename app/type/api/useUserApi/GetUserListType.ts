export interface GetUserListResponse {
  users: GetUserList[]
}

export interface GetUserList {
  _id: string
  name: string
  email: string
  emailVerified: boolean
  OTPAttempts: number
  isBlocked: boolean
  __v: number
  district: string
  groups: string[]
  leaderOfGroupIds: string[]
  landingPageAccess: string[]
  role: string
}
