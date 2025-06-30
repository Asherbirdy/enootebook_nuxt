// * RESPONSE
export interface GetInfoByILandingPageResponse {
  msg: string
  landingPage: LandingPageGetInfoById
}

export interface LandingPageGetInfoById {
  _id: string
  title: string
  description: string
  isCustom: boolean
  isCustomId: string
  isActive: boolean
  html: string
  updatedBy: string
  lastEditVisited: any
  lastEditVisitedUser: string
  createdAt: string
  updatedAt: string
  __v: number
  urlPathId: string
}

// * PAYLOAD
export interface GetInfoByIdPayload {
  query: {
    landingPageId: string
  }
  ssr: boolean
}
