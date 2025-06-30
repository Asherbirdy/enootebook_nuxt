export interface LineAccountMemberGetAllResponse {
  msg: string
  data: LineAccountMemberGetAll[]
}

export interface LineAccountMemberGetAll {
  _id: string
  name: string
  lineProfileId: string
  districtId: string
  active: boolean
  createdAt: string
  updatedAt: string
  __v: number
}
