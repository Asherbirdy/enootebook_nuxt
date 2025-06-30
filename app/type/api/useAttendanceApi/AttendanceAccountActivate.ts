export interface AttendanceAccountActivatePayload {
  lineProfileId: string
  serialNumber: string
}

export interface AttendanceAccountActivateError {
  data: {
    success: boolean
    error: 'LINE_PROFILE_ID_ALREADY_EXISTS' | 'ATTENDANCE_ACCOUNT_NOT_FOUND'
  }
}
