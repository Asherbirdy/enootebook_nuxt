import type { LineAccountMemberCheckAccountStatusError, LineAccountMemberCheckAccountStatusPayload, LineAccountMemberCreatePayload, LineAccountMemberGetAllResponse } from '~/type'
import { UserRequestUrl } from '~/enum'

interface LineAccountMemberEditActivatePayload {
  lineAccountMemberId: string
  active: boolean
}

export interface LineAccountMemberCheckAccountStatusResponse {
  msg: string
  lineAccountMember: LineAccountMemberCheck
}

export interface LineAccountMemberCheck {
  _id: string
  name: string
  lineProfileId: string
  districtId: string
  active: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export const useLineAccountMemberApi = {
  getAll: async () =>
    await useRequestApi<LineAccountMemberGetAllResponse, any>(
      UserRequestUrl.LineAccountMemberGetAll,
      {
        method: 'GET',
        server: false,
        lazy: true,
      },
    ),
  checkAccountStatus: async (payload: LineAccountMemberCheckAccountStatusPayload) =>
    await useRequestApi<LineAccountMemberCheckAccountStatusResponse, LineAccountMemberCheckAccountStatusError>(
      UserRequestUrl.LineAccountMemberCheck,
      {
        method: 'POST',
        server: false,
        lazy: true,
        immediate: false,
        body: payload,
      },
    ),
  create: async (payload: LineAccountMemberCreatePayload) =>
    await useRequestApi(UserRequestUrl.LineAccountMemberCreate, {
      method: 'POST',
      server: false,
      lazy: true,
      immediate: false,
      watch: false,
      body: payload,
    }),
  editActivate: async (payload: LineAccountMemberEditActivatePayload) =>
    await useRequestApi(UserRequestUrl.LineAccountMemberEditActivate, {
      method: 'PUT',
      server: false,
      lazy: true,
      immediate: false,
      watch: false,
      body: payload,
    }),
  delete: async (payload: any) =>
    await useRequestApi(UserRequestUrl.LineAccountMemberDelete, {
      method: 'DELETE',
      server: false,
      lazy: true,
      immediate: false,
      watch: false,
      body: payload,
    }),
}
