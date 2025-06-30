import type { GetSheepListResponse } from '~/type'
import { UserRequestUrl } from '~/enum'

export const useSheepApi = {
  list: async () => {
    return await useRequestApi<GetSheepListResponse, null>(UserRequestUrl.SheepList, {
      method: 'GET',
      server: false,
    })
  },
  create: async (payload: any) => {
    return await useRequestApi(UserRequestUrl.SheepCreate, {
      method: 'POST',
      server: false,
      body: payload,
      immediate: false,
      watch: false,
      lazy: true,
    })
  },
  edit: async (payload: any) => {
    return await useRequestApi(UserRequestUrl.SheepEdit, {
      method: 'POST',
      server: false,
      body: payload,
      immediate: false,
      watch: false,
      lazy: true,
    })
  },
  delete: async (payload: any) => {
    return await useRequestApi(UserRequestUrl.SheepDelete, {
      method: 'DELETE',
      server: false,
      body: payload,
      immediate: false,
      watch: false,
      lazy: true,
    })
  },
}
