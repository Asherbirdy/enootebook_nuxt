import type { CreateLibraryResponse, GetAllLibraryResponse, GetVocabularyResponse } from '~/type'

import { useRequestApi } from '~/composables'
import { PublicRequestUrl } from '~/enum'

export const useLibraryApi = {
  /*
    * 取得所有 library
  */
  getAll: async () => {
    return await useRequestApi<GetAllLibraryResponse, any>(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  /*
    * 取得所有 vocabulary
  */
  getVocabulary: async (libraryId: string) => {
    return await useRequestApi<GetVocabularyResponse, any>(`${PublicRequestUrl.Dev}?libraryId=${libraryId}`, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  /*
    * 建立 library
  */
  create: async (title: string) => {
    return await useRequestApi<CreateLibraryResponse, any>(PublicRequestUrl.Dev, {
      method: 'POST',
      body: { title },
      server: false,
      lazy: true,
    })
  },
  deleteLib: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  getAll5: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
}
