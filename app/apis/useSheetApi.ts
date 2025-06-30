import type { CreateSheetPayload, DeleteSheetPayload, EditSheetPayload, SheetGetAllResponse } from '~/type'
import { useRequestApi } from '~/composables'
import { UserRequestUrl } from '~/enum'

export const useSheetApi = {
  /*
     * CREATE
  */
  create: async (payload: CreateSheetPayload) =>
    await useRequestApi(UserRequestUrl.SheetCreate, {
      method: 'POST',
      server: false,
      lazy: true,
      immediate: false,
      watch: false,
      body: payload,
    }),
  /*
     * GET ALL
  */
  getAll: async () =>
    await useRequestApi<SheetGetAllResponse, any>(UserRequestUrl.SheetAll, {
      method: 'GET',
      server: false,
    }),
  /*
    * EDIT
  */
  edit: async (payload: EditSheetPayload) =>
    await useRequestApi(UserRequestUrl.SheetEdit, {
      method: 'PUT',
      server: false,
      lazy: true,
      immediate: false,
      watch: false,
      body: payload,
    }),
  /*
    * DELETE
  */
  delete: async (payload: DeleteSheetPayload) =>
    await useRequestApi(UserRequestUrl.SheetDelete, {
      method: 'DELETE',
      server: false,
      lazy: true,
      immediate: false,
      watch: false,
      body: payload,
    }),
}
