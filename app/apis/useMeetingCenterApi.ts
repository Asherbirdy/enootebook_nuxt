import { useRequestApi } from '~/composables'
import { UserRequestUrl } from '~/enum'

export interface MeetingCenterResponse {
  msg: string
  data: MeetingCenter[]
}

export interface MeetingCenter {
  _id: string
  districtName: string
  name: string
  identity: string
  departure: string
  returnRide: string
  notes: string
  createdAt: string
  updatedAt: string
  __v: number
}

export const useMeetingCenterApi = {
  getAll: async () =>
    await useRequestApi<MeetingCenterResponse, null>(UserRequestUrl.MeetingCenter, {
      method: 'GET',
      server: false,
    }),
  create: async () =>
    await useRequestApi(UserRequestUrl.MeetingCenter, {
      method: 'POST',
      server: false,
      lazy: true,
      immediate: false,
    }),
}
