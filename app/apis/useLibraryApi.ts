import { useRequestApi } from '~/composables'
import { PublicRequestUrl } from '~/enum'

export interface GetAllLibraryResponse {
  msg: string
  count: number
  library: Library[]
}

export interface Library {
  _id: string
  userId: string
  title: string
  averageLevel: number
  librarySize: number
  onQuiz: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export const useLibraryApi = {
  getAll: async () => {
    return await useRequestApi<GetAllLibraryResponse, any>(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  getvobFromLin: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  create: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
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
