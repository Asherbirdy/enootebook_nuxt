// * Payload
export interface LoginPayload {
  name: string
  password: string
}

// * Response

export interface LoginResponse {
  user: LoginUser
  token: {
    accessTokenJWT: string
    refreshTokenJWT: string
  }
}

export interface LoginUser {
  name: string
  userId: string
  role: string
  districtId: string
  emailVerified: boolean
  landingPageAccess: string[]
}

// * Error

export interface LoginError {
  data: {
    success: boolean
    error: 'WRONG_EMAIL_OR_PASSWORD'
  }
}
