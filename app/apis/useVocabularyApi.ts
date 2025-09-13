import type { AddVobToLibraryPayload, AddVobToLibraryResponse, EditVobPayload, EditVobResponse } from '~/type'
import { useRequestApi } from '~/composables'
import { PublicRequestUrl } from '~/enum'

export const useVocabularyApi = {

  /*
    * 新增 vocabulary 到 library
  */
  addVobToLibrary: async (payload: AddVobToLibraryPayload) => {
    return await useRequestApi<AddVobToLibraryResponse, any>(PublicRequestUrl.Dev, {
      method: 'POST',
      body: payload,
      server: false,
      lazy: true,
    })
  },

  /*
    * 修改 vocabulary
  */
  editVob: async (payload: EditVobPayload) => {
    return await useRequestApi<EditVobResponse, any>(
      `${PublicRequestUrl.Dev}?vocabularyId=${payload.vocabularyId}`,
      {
        method: 'PUT',
        body: payload,
        server: false,
        lazy: true,
      },
    )
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
