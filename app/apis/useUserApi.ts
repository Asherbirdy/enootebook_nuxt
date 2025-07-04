import type { ShowMeResponse } from '~/type'
import { useRequestApi } from '~/composables'
import { UserRequestUrl } from '~/enum'

export interface GetUserListResponse {
  users: GetUserList[]
}

export interface GetUserList {
  _id: string
  name: string
  email: string
  emailVerified: boolean
  OTPAttempts: number
  isBlocked: boolean
  __v: number
  district: string
  groups: string[]
  leaderOfGroupIds: string[]
  landingPageAccess: string[]
  role: string
}

export const useUserApi = {
  showMe: async () => {
    const nuxtApp = useNuxtApp()
    return useRequestApi<ShowMeResponse, null>(UserRequestUrl.UserShowMe, {
      method: 'GET',
      server: false,
      lazy: true,
      key: UserRequestUrl.UserShowMe,
      getCachedData: key => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    })
  },
}
