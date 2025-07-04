export interface BindOTPEmailError {
  data: {
    success: boolean
    error: BindOTPEmailErrorType
  }
}

export type BindOTPEmailErrorType = 'INVALID_OTP' | 'ACCOUNT_BLOCKED' | 'OTP_NOT_FOUND_OR_EXPIRED' | 'OTP_EXPIRED'

export interface BindOTPEmailPayload {
  OTP: string
}
