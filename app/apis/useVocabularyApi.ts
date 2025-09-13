import type { AddVobToLibraryPayload, AddVobToLibraryResponse, DeleteVobPayload, DeleteVobResponse, EditVobPayload, EditVobResponse } from '~/type'
import type { CheckVobExistPayload, CheckVobExistResponse } from '~/type/api/useVocabularyApi/CheckVobExistType'
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
  /*
    * 刪除 vocabulary
  */
  deleteVob: async (payload: DeleteVobPayload) => {
    return await useRequestApi<DeleteVobResponse, any>(PublicRequestUrl.Dev, {
      method: 'DELETE',
      body: payload,
      server: false,
      lazy: true,
    })
  },
  /*
    * 檢查 vocabulary 是否存在
  */
  checkVobExist: async (payload: CheckVobExistPayload) => {
    return await useRequestApi<CheckVobExistResponse, any>(PublicRequestUrl.Dev, {
      method: 'GET',
      body: payload,
      server: false,
      lazy: true,
    })
  },
}
