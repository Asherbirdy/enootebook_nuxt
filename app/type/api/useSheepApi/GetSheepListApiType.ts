export interface GetSheepListResponse {
  msg: string
  sheep: GetSheepList[]
}

export interface GetSheepList {
  weekInviteTag: string[]
  personStatus: string
  _id: string
  name: string
  ageRange?: string
  focusPerson: string
  userId?: string
  note: string
  createdAt: string
  updatedAt: string
  __v: number
  district: {
    _id: string
    name: string
  }
  identity?: string
  attendanceAccount: any
}
