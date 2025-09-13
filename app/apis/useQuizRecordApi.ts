import type { GetAllQuizRecordsResponse } from '~/type'
import { useRequestApi } from '~/composables'
import { PublicRequestUrl } from '~/enum'

export const useQuizRecordApi = {
  get: async () => {
    return await useRequestApi<GetAllQuizRecordsResponse, any>(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
}
