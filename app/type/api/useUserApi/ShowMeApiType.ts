// * Response

import type { Role } from '~/enum'

export interface ShowMeResponse {
  msg: string
  user: ShowMeUser
}

export interface ShowMeUser {
  _id: string
  name: string
  email: string
  emailVerified: boolean
  role: Role
  district: ShowMeDistrict
  leaderOfGroupIds: ShowMeLeaderOfGroupId[]
  groups: ShowMeGroup[]
  landingPageAccess: string[]
}

export interface ShowMeDistrict {
  _id: string
  name: string
  active: boolean
  __v: number
}

export interface ShowMeLeaderOfGroupId {
  _id: string
  name: string
  description: string
  groupLeaderIds: any[]
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface ShowMeGroup {
  _id: string
  name: string
  description: string
  groupLeaderIds: any[]
  createdBy: string
  createdAt: string
  updatedAt: string
  __v: number
}
