import { useRequestApi } from '~/composables'
import { UserRequestUrl } from '~/enum'

export interface BlendingResponse {
  msg: string
  response: Blending[]
}

export interface Blending {
  _id: string
  district: string
  name: string
  ageRange: string
  gender: string
  identity: string
  notes: string
  inviteList: string
  editedAt: string
  createdAt: string
  updatedAt: string
  __v: number
  selectSchedule: string
}

export const useBlendingApi = {
  get: async () => {
    return await useRequestApi<BlendingResponse, null>(UserRequestUrl.BlendingGetAll, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  createFromSheet: async () => {
    return await useRequestApi(UserRequestUrl.BlendingCreateFromSheet, {
      method: 'GET',
      server: false,
      lazy: true,
      immediate: false,
      watch: false,
    })
  },
}
