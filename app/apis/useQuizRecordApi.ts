import { useRequestApi } from '~/composables'
import { PublicRequestUrl } from '~/enum'

export const useQuizRecordApi = {
  get: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
}
