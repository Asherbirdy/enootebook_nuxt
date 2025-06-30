import type { GetAllDistrictResponse } from '~/type'
import { useRequestApi } from '~/composables'
import { UserRequestUrl } from '~/enum'

export const useDistrictApi = {
  /*
    * GET
  */
  getAll: async () => {
    const nuxtApp = useNuxtApp()
    return await useRequestApi<GetAllDistrictResponse, null>(UserRequestUrl.District, {
      method: 'GET',
      server: false,
      lazy: true,
      key: UserRequestUrl.District,
      getCachedData: key => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    })
  },

  /*
    * CREATE
  */
  create: async (payload: { name: string }) =>
    await useRequestApi(UserRequestUrl.District, {
      method: 'POST',
      server: false,
      lazy: true,
      body: payload,
    }),

  /*
    * EDIT
  */
  edit: async (payload: { newName: string, districtId: string }) =>
    await useRequestApi(UserRequestUrl.District, {
      method: 'PUT',
      server: false,
      lazy: true,
      body: payload,
    }),
}
