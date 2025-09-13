import type { CreateQuizPayload, CreateQuizResponse } from '~/type'
import { useRequestApi } from '~/composables'
import { PublicRequestUrl } from '~/enum'

export const useQuizApi = {
  create: async (payload: CreateQuizPayload) => {
    return await useRequestApi<CreateQuizResponse, any>(
      `${PublicRequestUrl.Dev}?libraryId=${payload.libraryId}&quizQuantity=${payload.quizQuantity}`,
      {
        method: 'POST',
        server: false,
        lazy: true,
      },
    )
  },
  currentQuiz: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  getQuizQuestions: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  closeQuiz: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
  answerQuiz: async () => {
    return await useRequestApi(PublicRequestUrl.Dev, {
      method: 'GET',
      server: false,
      lazy: true,
    })
  },
}
