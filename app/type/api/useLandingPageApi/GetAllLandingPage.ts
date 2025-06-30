export interface GetAllLandingPageResponse {
  msg: string
  data: LandingPageGetAllData[]
}

export interface LandingPageGetAllData {
  _id: string
  title: string
  description: string
  isCustom: boolean
  isCustomId: string
  isActive: boolean
  updatedBy: string
  lastEditVisited: any
  lastEditVisitedUser: string
  createdAt: string
  updatedAt: string
  __v: number
  urlPathId?: string
}
