// * PAYLOAD
export interface LineAccountMemberCheckAccountStatusPayload {
  lineProfileId: string
}

// * ERROR
export interface LineAccountMemberCheckAccountStatusError {
  data: {
    success: boolean
    error: LineAccountMemberCheckAccountStatusErrorType
  }
}

export type LineAccountMemberCheckAccountStatusErrorType = 'LINE_PROFILE_ID_REQUIRED' | 'LINE_ACCOUNT_MEMBER_NOT_FOUND' | 'LINE_ACCOUNT_MEMBER_NOT_ACTIVE'

// * RESPONSE
