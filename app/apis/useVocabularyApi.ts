import type { AddVobToLibraryPayload, AddVobToLibraryResponse } from '~/type'
import { useRequestApi } from '~/composables'
import { PublicRequestUrl } from '~/enum'

export const useVocabularyApi = {
  addVobToLibrary: async (payload: AddVobToLibraryPayload) => {
    return await useRequestApi<AddVobToLibraryResponse, any>(PublicRequestUrl.Dev, {
      method: 'POST',
      body: payload,
      server: false,
      lazy: true,
    })
  },
  editVob: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  deleteVob: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  checkVobExist: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
}
