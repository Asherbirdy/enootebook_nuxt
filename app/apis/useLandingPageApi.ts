import type {
  CreateLandingPagePayload,
  EditInfoByIdPayload,
  GetAllLandingPageResponse,
  GetInfoByIdPayload,
  GetInfoByILandingPageResponse,
} from '~/type'
import { useRequestApi } from '~/composables'
import { PublicRequestUrl, UserRequestUrl } from '~/enum'

interface EditHtmlByIdPayload {
  landingPageId: string
  html: string
}

export const useLandingPageApi = {
  /*
    * CREATE
  */
  create: async (payload: CreateLandingPagePayload) =>
    await useRequestApi(UserRequestUrl.LandingPageCreate, {
      method: 'POST',
      server: false,
      lazy: true,
      immediate: false,
      watch: false,
      body: payload,
    }),
  /*
    * GET
  */
  getAll: async () => {
    const nuxtApp = useNuxtApp()
    return await useRequestApi<GetAllLandingPageResponse, null>(UserRequestUrl.LandingPageGetALL, {
      method: 'GET',
      server: false,
      key: UserRequestUrl.LandingPageGetALL,
      getCachedData: key => nuxtApp.payload.data[key] || nuxtApp.static.data[key],
    })
  },
  /*
    * GET
  */
  getInfoById: async (payload: GetInfoByIdPayload) =>
    await useRequestApi<GetInfoByILandingPageResponse, null>(
      `${PublicRequestUrl.LandingPageGetInfoById}/?landingPageId=${payload.query.landingPageId}`,
      {
        method: 'GET',
        server: payload.ssr,
        lazy: payload.ssr,
      },
    ),
  /*
    * EDIT
  */
  editInfoById: async (payload: EditInfoByIdPayload) =>
    await useRequestApi(
      `${UserRequestUrl.LandingPageEditInfoById}/?landingPageId=${payload.query.landingPageId}`,
      {
        method: 'PUT',
        server: false,
        lazy: true,
        immediate: false,
        watch: false,
        body: payload.body,
      },
    ),
  /*
    * EDIT
  */
  editHtmlById: async (payload: EditHtmlByIdPayload) =>
    await useRequestApi(
      `${UserRequestUrl.LandingPageEditHtmlById}`,
      {
        method: 'PUT',
        server: false,
        lazy: true,
        immediate: false,
        watch: false,
        body: payload,
      },
    ),
  /*
    * DELETE
  */
  deleteById: async (payload: GetInfoByIdPayload) =>
    await useRequestApi<GetInfoByILandingPageResponse, null>(
      `${UserRequestUrl.LandingPage}/?landingPageId=${payload.query.landingPageId}`,
    ),
}
