import type { CreateLibraryResponse, DeleteLibraryResponse, EditLibraryPayload, EditLibraryResponse, GetAllLibraryResponse, GetVocabularyResponse } from '~/type'
import { useRequestApi } from '~/composables'
import { UserRequestUrl } from '~/enum'

export const useLibraryApi = {

  /*
    * 取得所有 library
  */
  getAll: async () => {
    return await useRequestApi<GetAllLibraryResponse, any>(UserRequestUrl.Library, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },

  /*
    * 取得 指定 library 所有 vocabulary
  */
  getVocabulary: async (libraryId: string) => {
    return await useRequestApi<GetVocabularyResponse, any>(`${UserRequestUrl.LibraryGetVocabulary}?libraryId=${libraryId}`, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },

  /*
    * 建立 library
  */
  create: async (title: string) => {
    return await useRequestApi<CreateLibraryResponse, any>(UserRequestUrl.Library, {
      method: 'POST',
      body: { title },
      server: false,
      lazy: true,
    })
  },

  /*
    * 修改 library
  */
  edit: async (payload: EditLibraryPayload) => {
    return await useRequestApi<EditLibraryResponse, any>(UserRequestUrl.Library, {
      method: 'POST',
      body: payload,
      server: false,
      lazy: true,
    })
  },

  /*
    * 刪除 library
  */
  delete: async (libraryId: string) => {
    return await useRequestApi<DeleteLibraryResponse, any>(UserRequestUrl.Library, {
      method: 'DELETE',
      body: { libraryId },
      server: false,
      lazy: true,
    })
  },
}
