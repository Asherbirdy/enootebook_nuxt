// * Payload
export interface RegisterPayload {
  name: string
  email: string
  password: string
  confirmPassword: string
  serialNumber: string
}

// * Response
export interface RegisterResponse {
  user: RegisterUser
  token: RegisterToken
}

export interface RegisterUser {
  name: string
  userId: string
  role: string
  districtId: string
  emailVerified: boolean
  landingPageAccess: any[]
}

export interface RegisterToken {
  accessTokenJWT: string
  refreshTokenJWT: string
}
